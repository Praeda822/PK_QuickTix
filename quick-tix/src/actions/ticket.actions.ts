// This will only run on the "server"
'use server';
import * as Sentry from '@sentry/nextjs';
import { prisma } from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { logEvent } from '../utils/sentry';
import { getCurrentUser } from '@/lib/current-user';

// createTicket function is called on form submission
export async function createTicket(
  // previous return state from last submit
  prevState: { success: boolean; message: string },
  // browser’s FormData object with all form inputs
  formData: FormData
  // the action function must return a Promise that resolves to an object with success and message properties
  // the success property is a boolean indicating if the action was successful
  // the message property is a string that will be displayed to the user
): Promise<{ success: boolean; message: string }> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      logEvent('Unauthorized ticket creation attempt', 'ticket', {}, 'warning');

      return {
        success: false,
        message: 'You must be logged in to create a ticket.',
      };
    }

    const subject = formData.get('subject') as string;
    const description = formData.get('description') as string;
    const priority = formData.get('priority') as string;

    // Error validation and error catching for the formData using Sentry
    // If any of the fields are missing, log an error message using the logEvent helper function that takes in:
    // message, category, data, level
    if (!subject || !description || !priority) {
      logEvent(
        'Validation error: Missing ticket fields',
        'ticket',
        { subject, description, priority },
        'warning'
      );
      return {
        success: false,
        message: 'All fields are required.',
      };
    }

    // Create new ticket
    const ticket = await prisma.ticket.create({
      data: {
        subject,
        description,
        priority,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    // Log the successful creation of the ticket using my helper function that takes in:
    // message, category, data, level
    logEvent(
      `Ticket created successfully: ${ticket.id}`,
      'ticket',
      { ticketId: ticket.id },
      'info'
    );

    // Revalidate the path to update the UI
    revalidatePath('/tickets');

    return { success: true, message: 'Ticket created successfully' };
  } catch (error) {
    logEvent(
      'An error occurred while creating the ticket',
      'ticket',
      { formData: Object.fromEntries(formData.entries()) },
      'error',
      error
    );
    return {
      success: false,
      message: 'An error has occured while creating your ticket.',
    };
  }
}

// Fetch all tickets from the database, ordered by creation date
export async function getTickets() {
  try {
    const tickets = await prisma.ticket.findMany({ orderBy: { createdAt: 'desc' } });
    logEvent('Fetched ticket list', 'ticket', { count: tickets.length }, 'info');
    return tickets;
  } catch (error) {
    logEvent('An error occurred while fetching tickets', 'ticket', {}, 'error', error);
    return [];
  }
}

export async function getTicketById(id: string) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: Number(id) },
    });

    if (!ticket) {
      logEvent('Ticket not found', 'ticket', { ticketId: id }, 'warning');
    }

    return ticket;
  } catch (error) {
    logEvent(
      'An error occurred while fetching ticket details',
      'ticket',
      { ticketId: id },
      'error',
      error
    );
    return null;
  }
}
