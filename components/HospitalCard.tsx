import React from 'react';
import type { Hospital } from '../types';

interface HospitalCardProps {
  hospital: Hospital;
  onSelect: (hospital: Hospital) => void;
}

const StarIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
);

export const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onSelect }) => {
  return (
    <div className="bg-card-bg rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group border border-card-border">
      <div className="relative">
        <img className="w-full h-56 object-cover" src={hospital.imageUrl} alt={hospital.name} />
        <div className="absolute bottom-0 left-0 bg-black/50 text-white p-3 w-full">
            <h3 className="text-xl font-bold">{hospital.name}</h3>
            <div className="flex items-center text-sm">
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                <span>{hospital.location}</span>
            </div>
        </div>
        <div className="absolute top-0 right-0 bg-gold-400 text-accent-text font-bold px-3 py-1 m-2 rounded-full text-sm flex items-center gap-1">
          <StarIcon className="w-4 h-4" />
          <span>{hospital.rating}</span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-text-primary font-semibold mb-3">Key Services:</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {hospital.services.slice(0, 3).map(service => (
            <span key={service} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">{service}</span>
          ))}
          {hospital.services.length > 3 && <span className="text-blue-800 dark:text-blue-200 text-xs font-semibold py-1">...</span>}
        </div>
        <button 
            onClick={() => onSelect(hospital)}
            className="w-full bg-gold-400 text-accent-text font-bold py-2 px-4 rounded-lg hover:bg-gold-500 transition-colors duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
};
