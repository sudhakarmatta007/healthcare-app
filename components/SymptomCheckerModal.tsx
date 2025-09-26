import React, { useState } from 'react';

interface SymptomCheckerModalProps {
    onClose: () => void;
}

// Simple markdown to HTML converter for better readability of AI response
const formatResponse = (text: string) => {
    let html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/### (.*?)\n/g, '<h3 class="text-lg font-bold text-gray-800 mt-4 mb-2">$1</h3>')
        .replace(/\n/g, '<br />');
    return { __html: html };
};


export const SymptomCheckerModal: React.FC<SymptomCheckerModalProps> = ({ onClose }) => {
    const [symptoms, setSymptoms] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCheckSymptoms = async () => {
        if (!symptoms.trim()) {
            setError('Please describe your symptoms.');
            return;
        }
        setError('');
        setIsLoading(true);
        setResult('');

        try {
            // The URL for your backend. Use an environment variable for production.
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/symptom-check';
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symptoms }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setResult(data.reply);

        } catch (e) {
            console.error("Error fetching from backend:", e);
            setError('Sorry, we couldn\'t get a response. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setSymptoms('');
        setResult('');
        setError('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in" aria-modal="true" role="dialog">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-900">AI Symptom Checker</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 z-10" aria-label="Close">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-grow">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg" role="alert">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    This tool provides general information and is not a substitute for professional medical advice.
                                </p>
                            </div>
                        </div>
                    </div>

                    <label htmlFor="symptoms-input" className="font-semibold text-gray-700 block mb-2">Describe your symptoms</label>
                    <textarea
                        id="symptoms-input"
                        rows={5}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 'I have a persistent cough, a slight fever, and feel tired.'"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        disabled={isLoading}
                        aria-label="Symptom description input"
                    />
                    {error && <p className="text-red-500 text-sm mt-2" role="alert">{error}</p>}
                    
                    {isLoading && (
                        <div className="text-center p-8" aria-live="polite">
                            <div className="flex justify-center items-center mb-2">
                                <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            <p className="text-md font-semibold text-gray-700">Analyzing your symptoms...</p>
                            <p className="text-xs text-gray-500 mt-1">This may take a few moments.</p>
                        </div>
                    )}
                    
                    {result && !isLoading && (
                        <div className="mt-6 p-5 bg-slate-50 border border-gray-200 rounded-lg animate-fade-in" aria-live="polite">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">AI-Powered Insights</h3>
                            <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={formatResponse(result)} />
                        </div>
                    )}
                </div>

                <div className="p-6 border-t bg-gray-50 flex flex-col sm:flex-row justify-end gap-3 flex-shrink-0">
                     <button 
                        onClick={handleClear}
                        disabled={isLoading}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
                     >
                        Clear
                    </button>
                    <button
                        onClick={handleCheckSymptoms}
                        disabled={isLoading || !symptoms.trim()}
                        className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Checking...' : 'Get Advice'}
                    </button>
                </div>
            </div>
        </div>
    );
};