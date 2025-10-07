
import React from "react";
import { AppointmentIcon, MedicineIcon } from "./icons";

interface HeroSectionProps {
  onAppointmentClick: () => void;
  onMedicinesClick: () => void;
}

const NavButton: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; }> = ({ icon, title, description, onClick }) => (
    <button
        onClick={onClick}
        className="group text-left p-6 w-full max-w-sm bg-card border border-border rounded-lg text-foreground transform hover:-translate-y-1 transition-all duration-300 hover:bg-card hover:shadow-xl"
    >
        <div className="w-12 h-12 mb-4 flex items-center justify-center bg-secondary rounded-lg text-accent">
            {icon}
        </div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
    </button>
);

export const HeroSection: React.FC<HeroSectionProps> = ({ onAppointmentClick, onMedicinesClick }) => {
  return (
    <div className="bg-background">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full flex flex-col items-center">
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-foreground mb-6 leading-tight">
             Your Health, <span className="text-accent">Connected</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Seamlessly book appointments, order medicines, and manage your health journey from one convenient place.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 animate-fade-up animation-delay-300">
            <NavButton 
                title="Appointments"
                description="Find and book a visit with a doctor."
                onClick={onAppointmentClick}
                icon={<AppointmentIcon className="h-7 w-7" />}
            />
             <NavButton 
                title="Medicines"
                description="Order prescriptions and wellness products."
                onClick={onMedicinesClick}
                icon={<MedicineIcon className="h-7 w-7" />}
            />
        </div>
      </div>
    </div>
  );
};
