import React, { useState, useMemo } from 'react';
import type { Medicine } from '../types';
import { MedicineCard } from './MedicineCard';

interface MedicinesPageProps {
    medicines: Medicine[];
    onAddToCart: (medicineId: string) => void;
}

const categories: Medicine['category'][] = ['Pain Relief', 'Vitamins & Supplements', 'Cold & Flu', 'Digestive Health', 'First Aid'];

export const MedicinesPage: React.FC<MedicinesPageProps> = ({ medicines, onAddToCart }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Medicine['category'] | 'All'>('All');

    const filteredMedicines = useMemo(() => {
        return medicines.filter(medicine => {
            const categoryMatch = selectedCategory === 'All' || medicine.category === selectedCategory;
            const searchMatch = !searchTerm || medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) || medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
            return categoryMatch && searchMatch;
        });
    }, [medicines, searchTerm, selectedCategory]);

    return (
        <div className="bg-background min-h-screen">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="sticky top-16 bg-background/80 backdrop-blur-md z-40 py-6 mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b border-card-border">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Search for medicines, supplements..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-5 py-3 text-base text-gray-800 bg-white border-2 border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all dark:bg-charcoal-light dark:border-gray-600 dark:text-gray-200"
                            />
                             <svg className="w-5 h-5 absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                             <button
                                onClick={() => setSelectedCategory('All')}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${selectedCategory === 'All' ? 'bg-gold-400 text-accent-text shadow' : 'bg-card-bg text-text-secondary hover:bg-gold-400/20'}`}
                            >
                                All
                            </button>
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${selectedCategory === category ? 'bg-gold-400 text-accent-text shadow' : 'bg-card-bg text-text-secondary hover:bg-gold-400/20'}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                
                {filteredMedicines.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredMedicines.map(medicine => (
                            <MedicineCard key={medicine.id} medicine={medicine} onAddToCart={onAddToCart} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 px-6 bg-card-bg rounded-lg shadow-sm border border-card-border">
                         <h3 className="text-xl font-medium text-text-primary">No Medicines Found</h3>
                         <p className="mt-2 text-text-secondary">
                            Try adjusting your search or filters to find what you're looking for.
                         </p>
                    </div>
                )}
            </main>
        </div>
    );
};