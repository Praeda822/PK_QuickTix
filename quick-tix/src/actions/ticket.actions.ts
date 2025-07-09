// This will only run on the "server"
'use server';

import * as Sentry from '@sentry/nextjs';

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
    throw new Error('This is a test error for Prisma'); // Test error to verify Sentry integration

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
    // Here I would typically send the data to my backend API
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
