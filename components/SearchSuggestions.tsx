import React, { useEffect, useRef } from 'react';

interface SearchSuggestionsProps {
  suggestions: string[];
  show: boolean;
  onSelect: (suggestion: string) => void;
  onClose: () => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ suggestions, show, onSelect, onClose }) => {
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  if (!show || suggestions.length === 0) {
    return null;
  }

  return (
    <div ref={suggestionsRef} className="absolute z-20 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden dark:bg-charcoal-light dark:border-gray-600">
      <ul className="max-h-60 overflow-y-auto">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => onSelect(suggestion)}
            className="px-4 py-3 cursor-pointer text-gray-800 hover:bg-blue-50 transition-colors duration-150 dark:text-gray-200 dark:hover:bg-charcoal"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};
