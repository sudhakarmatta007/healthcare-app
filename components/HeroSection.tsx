import React from "react";
import { AppointmentIcon, MedicineIcon } from "./icons";

interface HeroSectionProps {
  onAppointmentClick: () => void;
  onMedicinesClick: () => void;
}

const NavButton: React.FC<{ icon: React.ReactNode; title: string; onClick: () => void; }> = ({ icon, title, onClick }) => (
    <button
        onClick={onClick}
        className="group flex flex-col items-center justify-center w-48 h-48 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl text-white transform hover:-translate-y-2 transition-all duration-300 hover:bg-white/10 hover:shadow-xl"
    >
        <div className="w-20 h-20 mb-3 flex items-center justify-center bg-white/5 rounded-full group-hover:bg-white/10 transition-colors text-gold-300">
            {icon}
        </div>
        <span className="text-xl font-bold tracking-wide">{title}</span>
    </button>
);

export const HeroSection: React.FC<HeroSectionProps> = ({ onAppointmentClick, onMedicinesClick }) => {
  return (
    <div className="bg-gradient-to-br from-charcoal-dark via-charcoal to-charcoal-dark">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full flex flex-col items-center">
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
             Your Health, <span className="text-gold-400">Connected</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Seamlessly book appointments, order medicines, and manage your health journey from one convenient place.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-fade-up animation-delay-300">
            <NavButton 
                title="Appointments"
                onClick={onAppointmentClick}
                icon={<AppointmentIcon className="h-10 w-10" />}
            />
             <NavButton 
                title="Medicines"
                onClick={onMedicinesClick}
                icon={<MedicineIcon className="h-10 w-10" />}
            />
        </div>
      </div>
    </div>
  );
};
