import React, { useState, useEffect, useRef } from 'react';
import type { User } from '../types';
import { LocationsPanel } from './LocationsPanel';
import { HomeIcon, DoctorsIcon, AppointmentIcon, MedicineIcon, HistoryIcon, LoginIcon, UserIcon, MenuIcon, CloseIcon, SunIcon, MoonIcon, LocationPinIcon, ChevronDownIcon } from './icons';

interface NavbarProps {
    onNavigate: (view: 'home' | 'find-care' | 'history' | 'dashboard' | 'medicines' | 'cart') => void;
    activeView: 'home' | 'find-care' | 'history' | 'dashboard' | 'medicines' | 'cart';
    isLoggedIn: boolean;
    user: User | null;
    onLoginClick: () => void;
    onLogout: () => void;
    onOpenRegisterHospital: () => void;
    onOpenRegisterDoctor: () => void;
    locations: string[];
    selectedLocation: string;
    onLocationFilter: (location: string) => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const NavLink: React.FC<{
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
  isMobile?: boolean;
}> = ({ onClick, isActive, children, isMobile = false }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 transition-colors duration-200 ${
            isMobile
                ? `w-full text-left p-4 rounded-lg text-lg ${isActive ? 'bg-gold-400/20 text-gold-400' : 'text-gray-300 hover:bg-white/10'}`
                : `px-4 py-2 rounded-md text-sm font-medium ${isActive ? 'text-gold-400' : 'text-gray-300 hover:text-white'}`
        }`}
    >
        {children}
    </button>
);

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
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAction = (action: () => void) => {
        action();
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
                <img src={user.profilePictureUrl} alt="User" className="w-9 h-9 rounded-full border-2 border-gold-400" />
                <span className="text-sm font-medium text-gray-200 hidden sm:block">{user.name.split(' ')[0]}</span>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-charcoal-light rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 animate-fade-in">
                    <button onClick={() => handleAction(onNavigateToDashboard)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-charcoal">My Profile</button>
                    <button onClick={() => handleAction(onLogout)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-charcoal">Logout</button>
                </div>
            )}
        </div>
    );
};


export const Navbar: React.FC<NavbarProps> = (props) => {
    const { onNavigate, activeView, isLoggedIn, user, onLoginClick, onLogout, locations, selectedLocation, onLocationFilter, theme, toggleTheme } = props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLocationsPanelOpen, setIsLocationsPanelOpen] = useState(false);
    
    const handleNav = (view: 'home' | 'find-care' | 'history' | 'dashboard' | 'medicines' | 'cart') => {
        onNavigate(view);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal-dark/80 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Brand */}
                        <div className="flex-shrink-0">
                            <button onClick={() => handleNav('home')} className="text-2xl font-bold text-white">Health<span className="text-gold-400">Connect</span></button>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-2">
                            <NavLink onClick={() => handleNav('home')} isActive={activeView === 'home'}><HomeIcon /> Home</NavLink>
                            <NavLink onClick={() => handleNav('find-care')} isActive={activeView === 'find-care'}><DoctorsIcon /> Doctors & Hospitals</NavLink>
                            <NavLink onClick={() => handleNav('history')} isActive={activeView === 'history'}><AppointmentIcon /> Appointments</NavLink>
                            <NavLink onClick={() => handleNav('medicines')} isActive={activeView === 'medicines'}><MedicineIcon /> Medicines</NavLink>
                            <NavLink onClick={() => handleNav('dashboard')} isActive={activeView === 'dashboard'}><HistoryIcon /> History</NavLink>
                        </div>
                        
                        {/* Desktop Right Section */}
                        <div className="hidden md:flex items-center gap-4">
                            <button
                                onClick={() => setIsLocationsPanelOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-gray-200 hover:bg-white/20 transition-colors"
                            >
                                <LocationPinIcon className="w-5 h-5 text-gold-400" />
                                <span className="truncate max-w-[120px]">{selectedLocation}</span>
                                <ChevronDownIcon />
                            </button>
                            <button onClick={toggleTheme} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gold-400">
                                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                            </button>
                            {isLoggedIn && user ? (
                                <UserMenu user={user} onLogout={onLogout} onNavigateToDashboard={() => handleNav('dashboard')} />
                            ) : (
                                <button onClick={onLoginClick} className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold bg-gold-400 text-accent-text hover:bg-gold-500 transition-colors">
                                    <LoginIcon /> Login
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10">
                                <MenuIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Panel */}
            <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)}></div>
                <div className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-charcoal-dark p-6 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-white">Menu</h2>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white"><CloseIcon /></button>
                    </div>
                    <nav className="flex flex-col gap-2">
                        <NavLink onClick={() => handleNav('home')} isActive={activeView === 'home'} isMobile><HomeIcon /> Home</NavLink>
                        <NavLink onClick={() => handleNav('find-care')} isActive={activeView === 'find-care'} isMobile><DoctorsIcon /> Doctors & Hospitals</NavLink>
                        <NavLink onClick={() => handleNav('history')} isActive={activeView === 'history'} isMobile><AppointmentIcon /> Appointments</NavLink>
                        <NavLink onClick={() => handleNav('medicines')} isActive={activeView === 'medicines'} isMobile><MedicineIcon /> Medicines</NavLink>
                        <NavLink onClick={() => handleNav('dashboard')} isActive={activeView === 'dashboard'} isMobile><HistoryIcon /> History</NavLink>
                        <div className="border-t border-white/10 my-4"></div>
                        {isLoggedIn && user ? (
                             <NavLink onClick={() => handleNav('dashboard')} isActive={activeView === 'dashboard'} isMobile><UserIcon /> My Profile</NavLink>
                        ) : (
                            <NavLink onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }} isActive={false} isMobile><LoginIcon /> Login / Register</NavLink>
                        )}
                         <button onClick={toggleTheme} className="flex items-center gap-3 w-full text-left p-4 rounded-lg text-lg text-gray-300 hover:bg-white/10">
                             {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                             <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                         </button>
                    </nav>
                </div>
            </div>

            <LocationsPanel
                isOpen={isLocationsPanelOpen}
                onClose={() => setIsLocationsPanelOpen(false)}
                locations={locations}
                selectedLocation={selectedLocation}
                onLocationFilter={onLocationFilter}
            />
        </>
    );
};
