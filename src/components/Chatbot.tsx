import React, { useState, useRef, useEffect } from 'react';
// FIX: Use correct import for GoogleGenAI and import HarmCategory and HarmBlockThreshold
import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from '@google/genai';
import { SendIcon, ChatIcon, CloseIcon } from './icons';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { 
            sender: 'ai', 
            text: "Hello! I'm your AI Health Assistant. How can I help you today? You can ask me general health questions, help finding a doctor, or assistance with booking an appointment." 
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    // Safety settings for the generative model
    // FIX: Use HarmCategory enum for safety settings
    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
         {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
    ];

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: inputValue };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            // FIX: Use GoogleGenAI
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

            // Convert messages to Content[] format
            const contents = newMessages.map(msg => ({
                role: msg.sender === 'user' ? ('user' as const) : ('model' as const),
                parts: [{ text: msg.text }]
            }));
            
            // FIX: use ai.models.generateContent with the correct model
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: contents,
                config: {
                    safetySettings,
                    maxOutputTokens: 200,
                },
            });

            // FIX: get text from response.text property
            const text = response.text;
            
            const aiMessage: Message = { sender: 'ai', text };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("Error fetching from Gemini API:", error);
            const errorMessage: Message = { sender: 'ai', text: "I'm sorry, I'm having trouble connecting right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };


    const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
        const isUser = message.sender === 'user';
        return (
            <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${isUser ? 'bg-gold-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 dark:bg-charcoal-light dark:text-gray-200 rounded-bl-none'}`}>
                    <p className="text-sm" dangerouslySetInnerHTML={{__html: message.text.replace(/\n/g, '<br />')}}></p>
                </div>
            </div>
        );
    };

    const TypingIndicator = () => (
        <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-gray-200 dark:bg-charcoal-light rounded-bl-none">
                <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-short"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-short animation-delay-200"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-short animation-delay-400"></div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gold-400 text-accent-text w-16 h-16 rounded-full shadow-lg hover:bg-gold-500 flex items-center justify-center transform hover:scale-110 transition-all"
                    aria-label="Open chat"
                >
                    <ChatIcon className="w-8 h-8" />
                </button>
            </div>
            
            <div className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full h-full sm:w-[380px] sm:h-[550px] bg-card-bg rounded-none sm:rounded-2xl shadow-2xl flex flex-col z-50 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-card-border bg-gray-50 dark:bg-charcoal-dark rounded-t-none sm:rounded-t-2xl flex-shrink-0">
                    <h3 className="text-lg font-bold text-text-primary">AI Health Assistant</h3>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200" aria-label="Close chat">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                
                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto bg-background">
                    <div className="space-y-4">
                        {messages.map((msg, index) => <ChatBubble key={index} message={msg} />)}
                        {isLoading && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                
                {/* Input */}
                <div className="p-4 border-t border-card-border bg-card-bg rounded-b-none sm:rounded-b-2xl flex-shrink-0">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask a question..."
                            className="w-full px-4 py-2 text-sm text-text-primary bg-gray-100 dark:bg-charcoal-light border border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-400"
                            disabled={isLoading}
                            aria-label="Chat input"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !inputValue.trim()}
                            className="bg-gold-400 text-accent-text rounded-full p-2.5 flex-shrink-0 hover:bg-gold-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            aria-label="Send message"
                        >
                           <SendIcon className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};