import React from 'react';
import type { User } from '../types';

interface OnboardingModalProps {
    user: User;
    onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ user, onClose }) => {
    const inputClasses = "mt-1 w-full px-4 py-2 border rounded-lg focus:ring-gold-500 focus:border-gold-500 bg-background text-text-primary border-card-border";

    return (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-card-bg rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden p-8">
                <h2 className="text-2xl font-bold text-center text-text-primary mb-2">Complete Your Profile</h2>
                <p className="text-center text-sm text-text-secondary mb-8">
                    Welcome, {user.name}! Let's get your medical profile set up.
                </p>

                <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-text-secondary" htmlFor="age">Age</label>
                            <input type="number" id="age" placeholder="e.g., 30" className={inputClasses}/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-text-secondary" htmlFor="gender">Gender</label>
                             <select id="gender" className={`${inputClasses} bg-card-bg`}>
                                <option>Select</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-text-secondary" htmlFor="conditions">Existing Health Conditions</label>
                        <textarea id="conditions" placeholder="e.g., Asthma, Diabetes" rows={3} className={inputClasses}></textarea>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-text-secondary" htmlFor="allergies">Allergies</label>
                        <textarea id="allergies" placeholder="e.g., Penicillin, Peanuts" rows={2} className={inputClasses}></textarea>
                    </div>
                    
                    <div className="pt-4">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="w-full bg-gold-400 text-accent-text font-bold py-3 px-4 rounded-lg hover:bg-gold-500 transition-colors shadow-lg"
                        >
                            Save Profile & Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
