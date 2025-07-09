// This will only run on the "server"
'use server';

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
  const subject = formData.get('subject') as string;
  const description = formData.get('description') as string;
  const priority = formData.get('priority') as string;
  // Here I would typically send the data to my backend API
  // I'll just log it to console for now..
  console.log(subject, description, priority);

  return { success: true, message: 'Ticket created successfully' };
}
