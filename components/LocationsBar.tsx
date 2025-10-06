import React from 'react';

interface LocationsBarProps {
  locations: string[];
  selectedLocation: string;
  onLocationFilter: (location: string) => void;
}

const LocationPinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"></path>
    </svg>
);


export const LocationsBar: React.FC<LocationsBarProps> = ({ locations, selectedLocation, onLocationFilter }) => {
    return (
        <nav 
            aria-label="Location Selector"
            className="sticky top-20 bg-slate-50 shadow-sm z-40 border-b border-gray-200"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 h-16">
                    <div className="flex-shrink-0 flex items-center gap-2">
                         <LocationPinIcon className="w-6 h-6 text-blue-600" />
                         <span className="text-sm font-semibold text-gray-700 hidden sm:block">Location:</span>
                    </div>
                    <div className="flex-grow overflow-x-auto whitespace-nowrap scrollbar-hide">
                         <div className="flex items-center gap-2">
                             {locations.map((location) => (
                                <button
                                    key={location}
                                    onClick={() => onLocationFilter(location)}
                                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 flex-shrink-0 ${
                                        selectedLocation === location
                                            ? "bg-blue-600 text-white shadow"
                                            : "bg-white text-gray-700 hover:bg-blue-100 border border-gray-200"
                                    }`}
                                >
                                    {location}
                                </button>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
