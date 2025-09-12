import React, { useState } from 'react';

interface AuthModalProps {
    onClose: () => void;
    onGoogleLogin: (userType: 'existing' | 'new') => void;
}

type AuthTab = 'signIn' | 'signUp';

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onGoogleLogin }) => {
    const [activeTab, setActiveTab] = useState<AuthTab>('signIn');

    const GoogleButton = ({ children }: { children: React.ReactNode }) => (
        <button onClick={() => onGoogleLogin('existing')} className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.251,44,30.651,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            {children}
        </button>
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
                    
                    <div className="mb-6">
                        <GoogleButton>Continue with Google</GoogleButton>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or {activeTab === 'signIn' ? 'sign in' : 'sign up'} with email</span>
                        </div>
                    </div>

                    <form className="space-y-4">
                        {activeTab === 'signUp' && (
                            <div>
                                <label className="text-sm font-medium text-gray-700 sr-only" htmlFor="name">Full Name</label>
                                <input type="text" id="name" placeholder="Full Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                        )}
                        <div>
                            <label className="text-sm font-medium text-gray-700 sr-only" htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Email Address" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 sr-only" htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                            {activeTab === 'signIn' ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        {activeTab === 'signIn' ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => setActiveTab(activeTab === 'signIn' ? 'signUp' : 'signIn')} className="font-medium text-blue-600 hover:text-blue-500 ml-1">
                            {activeTab === 'signIn' ? "Sign Up" : "Sign In"}
                        </button>
                    </p>
                    <p className="text-center text-xs text-gray-500 mt-4">
                        This is a demo. Try "Continue with Google" to simulate login for an <button onClick={() => onGoogleLogin('new')} className="font-semibold text-blue-500 underline">new user</button> or an <button onClick={() => onGoogleLogin('existing')} className="font-semibold text-blue-500 underline">existing user</button>.
                    </p>
                </div>
            </div>
        </div>
    );
};
