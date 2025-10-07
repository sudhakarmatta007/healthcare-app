import React from 'react';
import { DoctorsIcon, AppointmentIcon, HistoryIcon, MedicineIcon, CartIcon } from './icons';
import { Badge } from './ui/badge';

interface BottomNavProps {
    activeView: 'home' | 'find-care' | 'history' | 'dashboard' | 'medicines' | 'cart';
    onNavigate: (view: 'home' | 'find-care' | 'history' | 'dashboard' | 'medicines' | 'cart') => void;
    cartItemCount: number;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
    children?: React.ReactNode;
}> = ({ icon, label, isActive, onClick, children }) => (
    <button onClick={onClick} className="relative flex-1 flex flex-col items-center justify-center pt-2 pb-1 text-center transition-colors duration-300 group">
        <div className={`transition-transform duration-300 transform group-hover:scale-110 ${isActive ? 'text-gold-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gold-400'}`}>
            {icon}
        </div>
        <span className={`text-xs mt-1 font-medium transition-colors duration-300 ${isActive ? 'text-gold-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gold-400'}`}>
            {label}
        </span>
        {children}
    </button>
);


export const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavigate, cartItemCount }) => {
    // Hide on desktop
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-card-bg/80 backdrop-blur-lg border-t border-card-border shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)]">
            <div className="flex justify-around items-stretch h-full">
                <NavItem 
                    label="Doctors"
                    isActive={activeView === 'find-care'}
                    onClick={() => onNavigate('find-care')}
                    icon={<DoctorsIcon className="w-6 h-6" />}
                />
                 <NavItem 
                    label="Appointments"
                    isActive={activeView === 'history'}
                    onClick={() => onNavigate('history')}
                    icon={<AppointmentIcon className="w-6 h-6" />}
                />
                 <NavItem 
                    label="History"
                    isActive={activeView === 'dashboard'}
                    onClick={() => onNavigate('dashboard')}
                    icon={<HistoryIcon className="w-6 h-6" />}
                />
                 <NavItem 
                    label="Medicines"
                    isActive={activeView === 'medicines'}
                    onClick={() => onNavigate('medicines')}
                    icon={<MedicineIcon className="w-6 h-6" />}
                />
                <NavItem 
                    label="Cart"
                    isActive={activeView === 'cart'}
                    onClick={() => onNavigate('cart')}
                    icon={<CartIcon className="w-6 h-6" />}
                >
                    {cartItemCount > 0 && <Badge>{cartItemCount}</Badge>}
                </NavItem>
            </div>
        </div>
    );
};