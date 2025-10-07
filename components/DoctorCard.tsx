import React from 'react';
import type { Doctor } from '../types';

interface DoctorCardProps {
    doctor: Doctor;
    onBook: (doctor: Doctor) => void;
    onViewProfile: (doctor: Doctor) => void;
}

const StarIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
);

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBook, onViewProfile }) => {
  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 group flex flex-col border border-border hover:shadow-lg">
      <div onClick={() => onViewProfile(doctor)} className="cursor-pointer">
        <div className="relative">
          <img className="w-full h-56 object-cover bg-secondary" src={doctor.imageUrl} alt={`Dr. ${doctor.name}`} />
          <div className="absolute top-0 right-0 bg-background text-foreground font-bold px-3 py-1 m-2 rounded-full text-sm flex items-center gap-1 border border-border">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <span>{doctor.rating}</span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-card-foreground mb-1">{doctor.name}</h3>
          <p className="text-accent font-semibold text-md mb-2">{doctor.specialty}</p>
          <div className="flex items-center text-muted-foreground">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
              <span>{doctor.location}</span>
          </div>
        </div>
      </div>
      <div className="p-5 pt-0 mt-auto">
        <button 
          onClick={() => onBook(doctor)}
          className="w-full bg-accent text-accent-foreground font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-300"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};