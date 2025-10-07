import React from 'react';

// This is a placeholder for a future Chatbot component.
// It can be expanded with state management for conversation history,
// user input, and integration with a generative AI service.

export const Chatbot: React.FC = () => {
  return (
    <div className="fixed bottom-24 right-4 z-40">
        <button className="bg-accent text-accent-foreground w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-110">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.08-3.239A8.995 8.995 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.79 12.222a7.014 7.014 0 008.42 0 1 1 0 111.58 1.184 9.013 9.013 0 01-11.58 0c-.39-.33-.06-1.02.39-1.184a1 1 0 011.19.002z" clipRule="evenodd" /></svg>
        </button>
    </div>
  );
};
