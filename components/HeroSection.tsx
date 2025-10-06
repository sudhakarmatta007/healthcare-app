
import React from "react";

interface HeroSectionProps {
  onOpenSymptomChecker: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenSymptomChecker }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Appointment<br />
            <span className="text-blue-300">Anytime, Anywhere</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed mb-8">
            Connect with top healthcare professionals instantly. Book consultations, get expert advice, 
            and manage your health from the comfort of your home.
          </p>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-2xl mx-auto mb-8">
            <p className="text-xl md:text-2xl font-bold text-white italic leading-relaxed">
              "The Best Doctor Gives The Least Medicines."
            </p>
            <p className="text-white/80 text-sm font-medium mt-2">- Benjamin Franklin</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Feeling Unwell?</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-6">
                Get preliminary insights into your symptoms. Our AI-powered tool can help guide you to the right specialist.
            </p>
            <button
                onClick={onOpenSymptomChecker}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center text-lg"
            >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                Check Your Symptoms
            </button>
        </div>
        
      </div>
    </div>
  );
};
