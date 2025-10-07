import React from 'react';

interface PageHeaderProps {
  title: string;
  onBack: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, onBack }) => {
  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-20 z-30 border-b border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="p-2 -ml-2 rounded-full text-text-secondary hover:bg-gray-100 dark:hover:bg-charcoal-light transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-text-primary ml-4">{title}</h1>
        </div>
      </div>
    </header>
  );
};