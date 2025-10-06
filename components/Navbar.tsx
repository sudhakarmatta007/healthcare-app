import React, { useState, useEffect, useRef } from 'react';
import type { User } from '../types';
import { Badge } from './ui/badge';
import { LocationsPanel } from './LocationsPanel';

interface NavbarProps {
    onNavigate: (view: 'home' | 'appointments' | 'medicines' | 'cart') => void;
    onNavigateToDashboard: () => void;
    activeView: 'home' | 'appointments' | 'dashboard' | 'medicines' | 'cart';
    isLoggedIn: boolean;
    user: User | null;
    onLoginClick: () => void;
    onLogout: () => void;
    onOpenRegisterHospital: () => void;
    onOpenRegisterDoctor: () => void;
    cartItemCount: number;
    onCartClick: () => void;
    locations: string[];
    selectedLocation: string;
    onLocationFilter: (location: string) => void;
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
    className: string;
    onOpenRegisterHospital: () => void; 
    onOpenRegisterDoctor: () => void; 
    onCloseMobileMenu: () => void;
}> = ({ className, onOpenRegisterHospital, onOpenRegisterDoctor, onCloseMobileMenu }) => {
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
            <button onClick={() => setIsOpen(!isOpen)} className={`${className} inline-flex items-center`}>
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


export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onNavigateToDashboard, activeView, isLoggedIn, user, onLoginClick, onLogout, onOpenRegisterHospital, onOpenRegisterDoctor, cartItemCount, onCartClick, locations, selectedLocation, onLocationFilter }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLocationsPanelOpen, setIsLocationsPanelOpen] = useState(false);

    const handleNavClick = (view: 'home' | 'appointments' | 'medicines') => {
        onNavigate(view);
        setIsOpen(false);
    };

    const navClasses = 'bg-white shadow-md';
    const brandColor = 'text-gray-900';
    
    // Gold Theme Classes
    const activeLinkClasses = 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-semibold shadow-md';
    const inactiveLinkClasses = 'bg-gradient-to-r from-yellow-200 to-amber-300 text-gray-900 hover:from-yellow-300 hover:to-amber-400 hover:shadow-md';
    const loginBtnClasses = 'bg-gradient-to-r from-yellow-200 to-amber-300 text-gray-900 border border-amber-400 hover:from-yellow-300 hover:to-amber-400';
    const signupBtnClasses = 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white hover:from-amber-500 hover:to-yellow-600 shadow-md';

    const mobileMenuBtnColor = 'text-gray-500 bg-gray-100 hover:bg-gray-200';
    const activeMobileLinkClasses = 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-semibold';
    const inactiveMobileLinkClasses = 'text-gray-800 hover:bg-amber-100';

    const baseLinkClasses = 'px-3 py-2 rounded-md text-sm font-medium transition-all duration-300';
    const mobileBaseLinkClasses = 'block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors';

    const CartIcon = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>;
    const LocationPinIcon = <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"></path></svg>;
    const ChevronDownIcon = <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isLocationsPanelOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 ${navClasses}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <button onClick={() => handleNavClick('home')} className={`text-2xl font-bold ${brandColor}`}>Health Connect</button>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <button onClick={() => handleNavClick('home')} className={`${baseLinkClasses} ${activeView === 'home' ? activeLinkClasses : inactiveLinkClasses}`}>Home</button>
                            <button onClick={() => handleNavClick('appointments')} className={`${baseLinkClasses} ${activeView === 'appointments' ? activeLinkClasses : inactiveLinkClasses}`}>Appointments</button>
                            <button onClick={() => handleNavClick('medicines')} className={`${baseLinkClasses} ${activeView === 'medicines' ? activeLinkClasses : inactiveLinkClasses}`}>Medicines</button>
                            <RegisterMenu 
                                onOpenRegisterHospital={onOpenRegisterHospital} 
                                onOpenRegisterDoctor={onOpenRegisterDoctor}
                                className={`${baseLinkClasses} ${inactiveLinkClasses}`}
                                onCloseMobileMenu={() => {}}
                            />
                        </div>
                    </div>
                     <div className="hidden md:flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setIsLocationsPanelOpen(prev => !prev)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                aria-haspopup="true"
                                aria-expanded={isLocationsPanelOpen}
                            >
                                {LocationPinIcon}
                                <span className="truncate max-w-[120px]">{selectedLocation}</span>
                                {ChevronDownIcon}
                            </button>
                        </div>
                        <div className="flex items-center space-x-4">
                            {isLoggedIn && user ? (
                                <>
                                    <button onClick={onCartClick} className={`${activeView === 'cart' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'} relative p-1 rounded-full`}>
                                        {CartIcon}
                                        {cartItemCount > 0 && <Badge>{cartItemCount}</Badge>}
                                    </button>
                                    <UserMenu user={user} onLogout={onLogout} onNavigateToDashboard={onNavigateToDashboard} />
                                </>
                            ) : (
                                <>
                                    <button onClick={onLoginClick} className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${loginBtnClasses}`}>Login</button>
                                    <button onClick={onLoginClick} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${signupBtnClasses}`}>Sign Up</button>
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
                <div className={`md:hidden bg-white border-t border-gray-200`} id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button onClick={() => handleNavClick('home')} className={`${mobileBaseLinkClasses} ${activeView === 'home' ? activeMobileLinkClasses : inactiveMobileLinkClasses}`}>Home</button>
                        <button onClick={() => handleNavClick('appointments')} className={`${mobileBaseLinkClasses} ${activeView === 'appointments' ? activeMobileLinkClasses : inactiveMobileLinkClasses}`}>Appointments</button>
                        <button onClick={() => handleNavClick('medicines')} className={`${mobileBaseLinkClasses} ${activeView === 'medicines' ? activeMobileLinkClasses : inactiveMobileLinkClasses}`}>Medicines</button>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                        <button onClick={() => { onOpenRegisterHospital(); setIsOpen(false); }} className={`${mobileBaseLinkClasses} ${inactiveMobileLinkClasses}`}>Register Hospital</button>
                        <button onClick={() => { onOpenRegisterDoctor(); setIsOpen(false); }} className={`${mobileBaseLinkClasses} ${inactiveMobileLinkClasses}`}>Register as Doctor</button>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                        <button 
                            onClick={() => {
                                setIsOpen(false);
                                setIsLocationsPanelOpen(true);
                            }} 
                            className={`${mobileBaseLinkClasses} ${inactiveMobileLinkClasses} flex justify-between items-center w-full`}>
                             <span>Location: {selectedLocation}</span>
                             <span className="text-blue-600 font-semibold text-xs">CHANGE</span>
                        </button>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                        {isLoggedIn && user ? (
                             <>
                                <button onClick={() => { onCartClick(); setIsOpen(false); }} className={`${mobileBaseLinkClasses} ${activeView === 'cart' ? activeMobileLinkClasses : inactiveMobileLinkClasses} flex justify-between items-center w-full`}>
                                    <span>My Cart</span>
                                    {cartItemCount > 0 && <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>}
                                </button>
                                <button onClick={() => { onNavigateToDashboard(); setIsOpen(false); }} className={`${mobileBaseLinkClasses} ${activeView === 'dashboard' ? activeMobileLinkClasses : inactiveMobileLinkClasses}`}>My Profile</button>
                                <button onClick={onLogout} className={`${mobileBaseLinkClasses} ${inactiveMobileLinkClasses}`}>Logout</button>
                            </>
                        ) : (
                            <>
                                <button onClick={onLoginClick} className={`${mobileBaseLinkClasses} ${inactiveMobileLinkClasses}`}>Login</button>
                                <button onClick={onLoginClick} className={`${signupBtnClasses} block w-full text-left px-3 py-2 rounded-md text-base font-medium`}>Sign Up</button>
                            </>
                        )}
                    </div>
                </div>
            )}
            <LocationsPanel
                isOpen={isLocationsPanelOpen}
                onClose={() => setIsLocationsPanelOpen(false)}
                locations={locations}
                selectedLocation={selectedLocation}
                onLocationFilter={onLocationFilter}
            />
        </nav>
    );
};