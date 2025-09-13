
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';

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
    const [chat, setChat] = useState<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const chatSession = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: "You are a friendly and helpful AI assistant for a healthcare appointment booking app called 'Health Connect'. Your primary goal is to assist users with their health-related queries and guide them through the app. KEY RULES: 1. **Disclaimer First**: ALWAYS start your first response in any conversation with this exact disclaimer: 'Please remember, I am an AI assistant and not a medical professional. For any medical advice, please consult with a qualified doctor.' 2. **Do NOT provide medical diagnoses or treatment plans**. You can provide general health information, but you must refuse to diagnose. 3. **Guide users within the app**: You can help users find doctors by suggesting they use the search bar and location filters on the homepage. You can explain how to book an appointment (click 'Book Appointment' on a doctor's card). 4. **Keep it conversational and encouraging**.",
                },
            });
            setChat(chatSession);
        } catch (error) {
            console.error("Failed to initialize Gemini AI:", error);
            setMessages(prev => [...prev, { sender: 'ai', text: "I'm sorry, the chat service is currently unavailable." }]);
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading || !chat) return;

        const userMessage: Message = { sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: userMessage.text });
            const aiMessage: Message = { sender: 'ai', text: response.text };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error sending message to Gemini:", error);
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
                <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                    <p className="text-sm">{message.text}</p>
                </div>
            </div>
        );
    };

    const TypingIndicator = () => (
        <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-gray-200 rounded-bl-none">
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
                    className="bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center transform hover:scale-110 transition-all"
                    aria-label="Open chat"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                </button>
            </div>
            
            <div className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full h-full sm:w-[380px] sm:h-[550px] bg-white rounded-none sm:rounded-2xl shadow-2xl flex flex-col z-50 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-none sm:rounded-t-2xl flex-shrink-0">
                    <h3 className="text-lg font-bold text-gray-800">AI Health Assistant</h3>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800" aria-label="Close chat">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto bg-gray-100">
                    <div className="space-y-4">
                        {messages.map((msg, index) => <ChatBubble key={index} message={msg} />)}
                        {isLoading && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                
                {/* Input */}
                <div className="p-4 border-t bg-white rounded-b-none sm:rounded-b-2xl flex-shrink-0">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask a question..."
                            className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={isLoading || !chat}
                            aria-label="Chat input"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !inputValue.trim() || !chat}
                            className="bg-blue-600 text-white rounded-full p-2.5 flex-shrink-0 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            aria-label="Send message"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
