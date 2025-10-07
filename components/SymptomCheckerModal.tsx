import React, { useState } from 'react';

interface SymptomCheckerModalProps {
    onClose: () => void;
}

export const SymptomCheckerModal: React.FC<SymptomCheckerModalProps> = ({ onClose }) => {
    // In a real app, this would be more complex, likely involving state for symptoms, AI responses, etc.
    const [step, setStep] = useState(1);
    const [symptoms, setSymptoms] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState('');

    const handleAnalyze = () => {
        if (!symptoms.trim()) return;
        setIsLoading(true);
        // Simulate an API call to a generative AI model
        setTimeout(() => {
            setAnalysis("Based on your symptoms, possible conditions include the common cold or a mild flu. It's recommended to rest, stay hydrated, and monitor your symptoms. If they worsen or you develop a high fever, please consult a doctor. \n\nDisclaimer: This is not a medical diagnosis.");
            setIsLoading(false);
            setStep(2);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <h2 className="text-xl font-bold text-foreground">AI Symptom Checker</h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    {step === 1 && (
                        <div>
                            <label htmlFor="symptoms" className="text-sm font-medium text-muted-foreground">Describe your symptoms</label>
                            <textarea
                                id="symptoms"
                                rows={5}
                                value={symptoms}
                                onChange={(e) => setSymptoms(e.target.value)}
                                className="mt-1 w-full p-2 border rounded-lg bg-background text-foreground border-border focus:ring-ring focus:border-ring"
                                placeholder="e.g., I have a sore throat, a slight fever, and a headache..."
                            />
                            <div className="mt-2 text-xs text-muted-foreground">
                                This tool provides potential insights and is not a substitute for professional medical advice.
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h3 className="font-bold text-foreground mb-2">Preliminary Analysis</h3>
                            <div className="p-4 bg-secondary rounded-lg text-sm text-secondary-foreground whitespace-pre-wrap">
                                {analysis}
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-border mt-auto">
                    {step === 1 && (
                        <button 
                            onClick={handleAnalyze} 
                            disabled={isLoading || !symptoms.trim()}
                            className="w-full bg-accent text-accent-foreground font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
                        </button>
                    )}
                    {step === 2 && (
                         <div className="flex gap-4">
                            <button onClick={() => setStep(1)} className="w-full bg-secondary text-secondary-foreground font-bold py-3 px-4 rounded-lg hover:bg-muted transition-colors">
                                Start Over
                            </button>
                            <button onClick={onClose} className="w-full bg-accent text-accent-foreground font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};