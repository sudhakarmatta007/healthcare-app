import React from 'react';
import type { Medicine } from '../types';

interface MedicineCardProps {
  medicine: Medicine;
  onAddToCart: (medicineId: string) => void;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({ medicine, onAddToCart }) => {
  return (
    <div className="bg-card-bg rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group flex flex-col border border-card-border">
      <div className="relative">
        <img className="w-full h-48 object-cover bg-gray-100 dark:bg-charcoal" src={medicine.imageUrl} alt={medicine.name} />
        {medicine.requiresPrescription && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">Rx ONLY</span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs font-semibold text-gold-600 dark:text-gold-400 mb-1">{medicine.category}</p>
        <h3 className="text-lg font-bold text-text-primary mb-2 truncate">{medicine.name}</h3>
        <p className="text-sm text-text-secondary flex-grow mb-4">{medicine.description}</p>
        <div className="flex justify-between items-center mt-auto">
            <p className="text-xl font-bold text-text-primary">₹{medicine.price.toFixed(2)}</p>
            <button
                onClick={() => onAddToCart(medicine.id)}
                className="bg-gold-100 text-gold-700 font-bold py-2 px-4 rounded-lg hover:bg-gold-400 hover:text-accent-text transition-all duration-300 group-hover:bg-gold-400 group-hover:text-accent-text flex items-center gap-2 dark:bg-gold-900/40 dark:text-gold-300 dark:hover:bg-gold-400 dark:hover:text-accent-text"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span>Add</span>
            </button>
        </div>
      </div>
    </div>
  );
};
