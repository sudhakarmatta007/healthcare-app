

import React, { useState, useEffect, useRef } from 'react';

interface LocationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  locations: string[];
  selectedLocation: string;
  onLocationFilter: (location: string) => void;
}

const LocationPinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"></path>
    </svg>
);

export const LocationsPanel: React.FC<LocationsPanelProps> = ({ isOpen, onClose, locations, selectedLocation, onLocationFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);

  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectLocation = (location: string) => {
    onLocationFilter(location);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
        className={`fixed inset-0 z-50 flex justify-center items-center sm:items-start sm:pt-24 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="locations-heading"
    >
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose}></div>
      <div 
        ref={panelRef}
        className={`bg-white rounded-xl shadow-2xl z-10 w-[90vw] max-w-md overflow-hidden flex flex-col transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <div className="p-4 border-b">
          <h2 id="locations-heading" className="text-lg font-bold text-gray-800 text-center">Select Your Location</h2>
          <div className="relative mt-4">
            <input
              type="text"
              placeholder="Search for a location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm text-gray-800 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search locations"
            />
            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
        <ul className="max-h-72 overflow-y-auto p-2">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <li key={location}>
                <button
                  onClick={() => handleSelectLocation(location)}
                  className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium flex items-center transition-colors duration-150 ${
                    selectedLocation === location
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <LocationPinIcon className={`w-5 h-5 mr-3 ${selectedLocation === location ? 'text-white' : 'text-blue-500'}`} />
                  {location}
                </button>
              </li>
            ))
          ) : (
            <li className="px-4 py-8 text-center text-sm text-gray-500">
              No locations found for "{searchTerm}".
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
