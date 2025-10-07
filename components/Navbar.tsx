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
        className={`flex items-center gap-2 transition-colors duration-200 ${
            isMobile
                ? `w-full text-left p-4 rounded-lg text-lg ${isActive ? 'bg-accent/10 text-accent' : 'text-foreground hover:bg-secondary'}`
                : `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}`
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
                <img src={user.profilePictureUrl} alt="User" className="w-9 h-9 rounded-full border-2 border-accent" />
                <span className="text-sm font-medium text-foreground hidden sm:block">{user.name.split(' ')[0]}</span>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 animate-fade-in">
                    <button onClick={() => handleAction(onNavigateToDashboard)} className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-secondary">My Profile</button>
                    <button onClick={() => handleAction(onLogout)} className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-secondary">Logout</button>
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
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Brand */}
                        <div className="flex-shrink-0">
                            <button onClick={() => handleNav('home')} className="text-2xl font-bold text-foreground">Health<span className="text-accent">Connect</span></button>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-1">
                            <NavLink onClick={() => handleNav('home')} isActive={activeView === 'home'}><HomeIcon /> Home</NavLink>
                            <NavLink onClick={() => handleNav('find-care')} isActive={activeView === 'find-care'}><DoctorsIcon /> Find Care</NavLink>
                            <NavLink onClick={() => handleNav('history')} isActive={activeView === 'history'}><AppointmentIcon /> Appointments</NavLink>
                            <NavLink onClick={() => handleNav('medicines')} isActive={activeView === 'medicines'}><MedicineIcon /> Medicines</NavLink>
                            <NavLink onClick={() => handleNav('dashboard')} isActive={activeView === 'dashboard'}><HistoryIcon /> Dashboard</NavLink>
                        </div>
                        
                        {/* Desktop Right Section */}
                        <div className="hidden md:flex items-center gap-4">
                            <button
                                onClick={() => setIsLocationsPanelOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
                            >
                                <LocationPinIcon className="w-5 h-5 text-accent" />
                                <span className="truncate max-w-[120px]">{selectedLocation}</span>
                                <ChevronDownIcon />
                            </button>
                            <button onClick={toggleTheme} className="p-2 rounded-full bg-secondary hover:bg-muted text-foreground">
                                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                            </button>
                            {isLoggedIn && user ? (
                                <UserMenu user={user} onLogout={onLogout} onNavigateToDashboard={() => handleNav('dashboard')} />
                            ) : (
                                <button onClick={onLoginClick} className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold bg-accent text-accent-foreground hover:bg-opacity-90 transition-colors">
                                    <LoginIcon /> Login
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-2">
                             <button onClick={toggleTheme} className="p-2 rounded-full text-foreground">
                                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                            </button>
                            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-md text-foreground">
                                <MenuIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Panel */}
            <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)}></div>
                <div className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-card p-6 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-foreground">Menu</h2>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-muted-foreground"><CloseIcon /></button>
                    </div>
                    <nav className="flex flex-col gap-2">
                        <NavLink onClick={() => handleNav('home')} isActive={activeView === 'home'} isMobile><HomeIcon /> Home</NavLink>
                        <NavLink onClick={() => handleNav('find-care')} isActive={activeView === 'find-care'} isMobile><DoctorsIcon /> Find Care</NavLink>
                        <NavLink onClick={() => handleNav('history')} isActive={activeView === 'history'} isMobile><AppointmentIcon /> Appointments</NavLink>
                        <NavLink onClick={() => handleNav('medicines')} isActive={activeView === 'medicines'} isMobile><MedicineIcon /> Medicines</NavLink>
                        <NavLink onClick={() => handleNav('dashboard')} isActive={activeView === 'dashboard'} isMobile><HistoryIcon /> Dashboard</NavLink>
                        <div className="border-t border-border my-4"></div>
                         <button
                            onClick={() => {
                                setIsLocationsPanelOpen(true);
                                setIsMobileMenuOpen(false);
                            }}
                            className="flex items-center gap-3 w-full text-left p-4 rounded-lg text-lg text-foreground hover:bg-secondary"
                        >
                            <LocationPinIcon className="w-6 h-6 text-accent" />
                            <span className="flex-grow truncate">{selectedLocation}</span>
                            <ChevronDownIcon className="w-6 h-6" />
                        </button>
                        {isLoggedIn && user ? (
                             <NavLink onClick={() => handleNav('dashboard')} isActive={activeView === 'dashboard'} isMobile><UserIcon /> My Profile</NavLink>
                        ) : (
                            <NavLink onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }} isActive={false} isMobile><LoginIcon /> Login / Register</NavLink>
                        )}
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