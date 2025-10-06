
import React from "react";

interface HeroSectionProps {
  onAppointmentClick: () => void;
  onMedicinesClick: () => void;
}

const NavButton: React.FC<{ icon: React.ReactNode; title: string; onClick: () => void; }> = ({ icon, title, onClick }) => (
    <button
        onClick={onClick}
        className="group flex flex-col items-center justify-center w-48 h-48 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white transform hover:-translate-y-2 transition-all duration-300 hover:bg-white/20 hover:shadow-xl"
    >
        <div className="w-20 h-20 mb-3 flex items-center justify-center bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
            {icon}
        </div>
        <span className="text-xl font-bold tracking-wide">{title}</span>
    </button>
);

export const HeroSection: React.FC<HeroSectionProps> = ({ onAppointmentClick, onMedicinesClick }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full flex flex-col items-center">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
             <span className="text-blue-300">Anytime, Anywhere</span>
          </h1>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <NavButton 
                title="Appointment"
                onClick={onAppointmentClick}
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>}
            />
             <NavButton 
                title="Medicines"
                onClick={onMedicinesClick}
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.24a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l2.387-.477a2 2 0 001.022-.547z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>}
            />
        </div>
      </div>
    </div>
  );
};
