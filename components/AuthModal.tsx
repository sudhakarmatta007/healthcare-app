
import React, { useState } from 'react';

interface AuthModalProps {
    onClose: () => void;
    onLogin: (email: string) => boolean;
    onSignUp: (name: string, email: string) => 'success' | 'exists';
}

type AuthTab = 'signIn' | 'signUp';

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin, onSignUp }) => {
    const [activeTab, setActiveTab] = useState<AuthTab>('signIn');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleTabChange = (tab: AuthTab) => {
        setActiveTab(tab);
        setName('');
        setEmail('');
        setPassword('');
        setError('');
    };

    const handleSignInSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        const loginSuccess = onLogin(email);
        if (!loginSuccess) {
            setError('User not found. Please check your email or sign up.');
        }
    };

    const handleSignUpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!name.trim() || !email.trim() || !password.trim()) {
            setError('Please fill in all fields.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        
        const signUpResult = onSignUp(name, email);
        if (signUpResult === 'exists') {
            setError('An account with this email already exists. Please sign in.');
        }
    };

    const formToRender = activeTab === 'signIn' 
        ? (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 sr-only" htmlFor="email-signin">Email</label>
                    <input type="email" id="email-signin" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 sr-only" htmlFor="password-signin">Password</label>
                    <input type="password" id="password-signin" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                    Sign In
                </button>
            </form>
        ) : (
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
                 <div>
                    <label className="text-sm font-medium text-gray-700 sr-only" htmlFor="name-signup">Full Name</label>
                    <input type="text" id="name-signup" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 sr-only" htmlFor="email-signup">Email</label>
                    <input type="email" id="email-signup" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 sr-only" htmlFor="password-signup">Password</label>
                    <input type="password" id="password-signup" placeholder="Password (min. 6 characters)" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                    Create Account
                </button>
            </form>
        );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                        {activeTab === 'signIn' ? 'Welcome Back!' : 'Create Your Account'}
                    </h2>
                    <p className="text-center text-sm text-gray-600 mb-6">
                        {activeTab === 'signIn' ? 'Sign in to manage your appointments.' : 'Sign up to get started.'}
                    </p>
                    
                     <div className="flex border-b border-gray-200 text-center mb-6">
                        <button onClick={() => handleTabChange('signIn')} className={`flex-1 py-2 text-sm font-medium transition-colors ${activeTab === 'signIn' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                            Sign In
                        </button>
                        <button onClick={() => handleTabChange('signUp')} className={`flex-1 py-2 text-sm font-medium transition-colors ${activeTab === 'signUp' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                            Sign Up
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-4 text-sm text-red-700 rounded-r-lg">
                            {error}
                        </div>
                    )}
                    
                    {formToRender}

                    <div className="text-xs text-gray-500 mt-4 bg-gray-50 p-3 rounded-lg text-center">
                        <p className="font-semibold">Demo Info:</p>
                        <p>To sign in, you can use the following existing accounts:</p>
                        <ul className="list-disc list-inside text-left pl-4 mt-1">
                            <li><span className="font-mono">alex.j@example.com</span> (Existing profile)</li>
                            <li><span className="font-mono">maria.g@example.com</span> (New user onboarding)</li>
                        </ul>
                         <p className="mt-2">Any password will work. You can also sign up with a new email.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
