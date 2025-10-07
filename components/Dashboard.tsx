import React from 'react';
import type { User, HealthEvent } from '../types';

interface DashboardProps {
    user: User;
    healthHistory: HealthEvent[];
    onNavigateToAppointments: () => void;
}

const AppointmentIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const PrescriptionIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>;
const ReportIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>;

const ICONS: Record<HealthEvent['type'], React.ReactNode> = {
    'Appointment': <AppointmentIcon />,
    'Prescription': <PrescriptionIcon />,
    'Report': <ReportIcon />,
};

const COLORS: Record<HealthEvent['type'], string> = {
    'Appointment': 'bg-blue-500',
    'Prescription': 'bg-green-500',
    'Report': 'bg-purple-500',
};

export const Dashboard: React.FC<DashboardProps> = ({ user, healthHistory, onNavigateToAppointments }) => {
    return (
        <div className="bg-background min-h-screen py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Main Content: Health Timeline */}
                    <div className="md:col-span-2">
                        <div className="relative pl-6 border-l-2 border-border">
                            {healthHistory.map((event, index) => (
                                <div key={event.id} className="mb-10 relative">
                                    <span className={`absolute -left-[30px] top-1 flex items-center justify-center w-8 h-8 rounded-full text-white ${COLORS[event.type]}`}>
                                        {ICONS[event.type]}
                                    </span>
                                    <div className="bg-card p-5 rounded-lg shadow-md border border-border ml-4">
                                        <time className="text-sm font-semibold text-muted-foreground mb-1 block">
                                            {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
                                        </time>
                                        <h3 className="text-lg font-bold text-foreground">{event.title}</h3>
                                        {event.doctor && (
                                            <p className="text-sm font-medium text-accent my-1">with {event.doctor.name} ({event.doctor.specialty})</p>
                                        )}
                                        <p className="text-muted-foreground text-sm mt-2">{event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Sidebar */}
                    <div className="md:col-span-1 space-y-6 sticky top-32">
                         <div className="bg-card p-6 rounded-lg shadow-md border border-border">
                            <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full bg-accent text-accent-foreground font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                                    Book New Appointment
                                </button>
                                <button onClick={onNavigateToAppointments} className="w-full bg-secondary text-secondary-foreground font-bold py-2 px-4 rounded-lg hover:bg-muted transition-colors">
                                    View All Appointments
                                </button>
                                <button className="w-full bg-secondary text-secondary-foreground font-bold py-2 px-4 rounded-lg hover:bg-muted transition-colors">
                                    Upload a Document
                                </button>
                            </div>
                        </div>
                         <div className="bg-card p-6 rounded-lg shadow-md border border-border">
                            <h3 className="text-lg font-bold text-foreground mb-4">Your Profile</h3>
                             <div className="flex items-center space-x-4">
                                <img src={user.profilePictureUrl} alt="User" className="w-16 h-16 rounded-full"/>
                                <div>
                                    <p className="font-bold text-foreground">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};