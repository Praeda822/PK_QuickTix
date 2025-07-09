'use client';

import { useActionState } from 'react';
import { createTicket } from '@/actions/ticket.actions';

/*
// useActionState is a custom React hook that manages the state of a form submission that takes two arguments:
// 1. A server action function (like createTicket)
// 2. An initial state object (e.g., { success: false, message: '' })

// It returns:
// - `state`: the current result of the server action (initially the default I provide)
// - `formAction`: a wrapped version of the server action that I assigned to the form's `action` attribute.

// When the form is submitted:
// - The browser constructs a FormData object from the form inputs.
// - This FormData, along with the current `state` (aka prevState), is sent to the server.
// - The server function (createTicket) receives these and processes the form submission.

// After processing:
// - The server returns a Promise that resolves to a new object (e.g., { success: true, message: '...' }).
// - That returned object becomes the new `state` in my component.
// - I can then render UI conditionally based on `state.success` or display `state.message`.

// In summation, this pattern allows me to submit forms to the server with full SSR/React support AND without a page reload
*/

const NewTicketPage = () => {
  const [state, formAction] = useActionState(createTicket, {
    success: false,
    message: '',
  });

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Submit a Support Ticket
        </h1>
        {state.message && !state.success && (
          <p className="text-red-500 mb-4 text-center">{state.message}</p>
        )}
        <form action={formAction} className="space-y-4 text-gray-700">
          <input
            className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            name="subject"
            placeholder="Subject"
          />
          <textarea
            className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="description"
            placeholder="Describe your issue"
            rows={4}
          />
          <select
            className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            name="priority"
            defaultValue="Low"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <button
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTicketPage;
