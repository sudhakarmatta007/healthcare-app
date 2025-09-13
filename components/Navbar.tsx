
import React, { useState, useEffect, useRef } from 'react';
import type { User } from '../types';

interface NavbarProps {
    onNavigate: (view: 'home' | 'appointments') => void;
    onNavigateToDashboard: () => void;
    activeView: 'home' | 'appointments';
    isLoggedIn: boolean;
    user: User | null;
    onLoginClick: () => void;
    onLogout: () => void;
    onOpenRegisterHospital: () => void;
    onOpenRegisterDoctor: () => void;
}

const UserMenu: React.FC<{ user: User; onLogout: () => void; onNavigateToDashboard: () => void; }> = ({ user, onLogout, onNavigateToDashboard }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleProfileClick = () => {
        onNavigateToDashboard();
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 hidden sm:block">Welcome, {user.name.split(' ')[0]}</span>
                <img src={user.profilePictureUrl} alt="User" className="w-9 h-9 rounded-full border-2 border-white shadow-sm" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                    <button onClick={handleProfileClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</button>
                    <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
            )}
        </div>
    );
};

const RegisterMenu: React.FC<{ 
    onOpenRegisterHospital: () => void; 
    onOpenRegisterDoctor: () => void; 
    linkColor: string;
    onCloseMobileMenu: () => void;
}> = ({ onOpenRegisterHospital, onOpenRegisterDoctor, linkColor, onCloseMobileMenu }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleHospitalClick = () => {
        onOpenRegisterHospital();
        setIsOpen(false);
        onCloseMobileMenu();
    };

    const handleDoctorClick = () => {
        onOpenRegisterDoctor();
        setIsOpen(false);
        onCloseMobileMenu();
    };

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className={`${linkColor} px-3 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center`}>
                Register
                <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 animate-fade-in-down">
                    <button onClick={handleHospitalClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register Hospital</button>
                    <button onClick={handleDoctorClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register as Doctor</button>
                </div>
            )}
        </div>
    );
};

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onNavigateToDashboard, activeView, isLoggedIn, user, onLoginClick, onLogout, onOpenRegisterHospital, onOpenRegisterDoctor }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const handleNavClick = (view: 'home' | 'appointments') => {
        onNavigate(view);
        setIsOpen(false);
    };

    const isLight = activeView === 'appointments' || (isLoggedIn && activeView === 'home');
    
    const navClasses = isLight 
        ? 'bg-white shadow-md' 
        : `transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`;
        
    const brandColor = isLight ? 'text-gray-900' : 'text-white';
    const linkColor = isLight ? 'text-gray-500 hover:text-gray-900' : 'text-gray-300 hover:text-white';
    const loginBtnClasses = isLight ? 'text-gray-600 border-gray-300 hover:border-gray-500 hover:text-gray-800' : 'text-gray-300 border-gray-500 hover:border-white hover:text-white';
    const mobileMenuBtnColor = isLight ? 'text-gray-500 bg-gray-100 hover:bg-gray-200' : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/80';
    const mobileLinkColor = isLight ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-700/50 hover:text-white';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 ${navClasses}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <button onClick={() => handleNavClick('home')} className={`text-2xl font-bold ${brandColor}`}>Health Connect</button>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <button onClick={() => handleNavClick('home')} className={`${linkColor} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Home</button>
                            <button onClick={() => handleNavClick('appointments')} className={`${linkColor} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Appointments</button>
                            <RegisterMenu 
                                onOpenRegisterHospital={onOpenRegisterHospital} 
                                onOpenRegisterDoctor={onOpenRegisterDoctor}
                                linkColor={linkColor}
                                onCloseMobileMenu={() => {}}
                            />
                        </div>
                    </div>
                     <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6 space-x-2">
                            {isLoggedIn && user ? (
                                <UserMenu user={user} onLogout={onLogout} onNavigateToDashboard={onNavigateToDashboard} />
                            ) : (
                                <>
                                    <button onClick={onLoginClick} className={`border px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${loginBtnClasses}`}>Login</button>
                                    <button onClick={onLoginClick} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-md">Sign Up</button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ${mobileMenuBtnColor}`} aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className={`md:hidden ${isLight ? 'bg-white border-t border-gray-200' : 'bg-slate-900/95 backdrop-blur-lg border-t border-slate-700'}`} id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button onClick={() => handleNavClick('home')} className={`${mobileLinkColor} block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors`}>Home</button>
                        <button onClick={() => handleNavClick('appointments')} className={`${mobileLinkColor} block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors`}>Appointments</button>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                        <button onClick={() => { onOpenRegisterHospital(); setIsOpen(false); }} className={`${mobileLinkColor} block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors`}>Register Hospital</button>
                        <button onClick={() => { onOpenRegisterDoctor(); setIsOpen(false); }} className={`${mobileLinkColor} block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors`}>Register as Doctor</button>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                        {isLoggedIn && user ? (
                             <>
                                <button onClick={() => { onNavigateToDashboard(); setIsOpen(false); }} className={`${mobileLinkColor} block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors`}>My Profile</button>
                                <button onClick={onLogout} className={`${mobileLinkColor} block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors`}>Logout</button>
                            </>
                        ) : (
                            <>
                                <button onClick={onLoginClick} className={`${mobileLinkColor} block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors`}>Login</button>
                                <button onClick={onLoginClick} className="bg-blue-600 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors">Sign Up</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};
