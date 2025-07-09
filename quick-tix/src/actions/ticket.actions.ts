// This will only run on the "server"
'use server';

import * as Sentry from '@sentry/nextjs';
import { prisma } from '@/db/prisma';
import { revalidatePath } from 'next/cache';

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
    const subject = formData.get('subject') as string;
    const description = formData.get('description') as string;
    const priority = formData.get('priority') as string;

    // Error validation and error catching for the formData using Sentry
    // If any of the fields are missing, return an error message and, as a second argument, log a warning to Sentry
    if (!subject || !description || !priority) {
      Sentry.captureMessage('Validation Failed: Missing ticket fields', 'warning');
      return {
        success: false,
        message: 'All fields are required.',
      };
    }

    // Create new ticket
    const ticket = await prisma.ticket.create({
      data: { subject, description, priority },
    });

    Sentry.addBreadcrumb({
      category: 'ticket',
      message: `Ticket created with id: ${ticket.id}`,
      level: 'info',
    });

    Sentry.captureMessage(`Ticket was created successfully: ${ticket.id}`);

    revalidatePath('/tickets/new'); // Revalidate the path to update the UI

    return { success: true, message: 'Ticket created successfully' };
  } catch (error) {
    Sentry.captureException(error as Error, {
      extra: { formData: Object.fromEntries(formData.entries()) },
    });
    return {
      success: false,
      message: 'An error has occured while creating your ticket.',
    };
  }
}
