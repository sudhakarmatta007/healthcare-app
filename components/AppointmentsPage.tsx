import React, { useMemo, useState } from 'react';
import type { Appointment, Doctor, HospitalDoctor } from '../types';
import { AppointmentCard } from './AppointmentCard';

interface AppointmentsPageProps {
    appointments: Appointment[];
    onUpdateRating: (appointmentId: string, doctorRating: number, serviceRating: number) => void;
    onCancelAppointment: (appointmentId: string) => void;
    onRebookAppointment: (doctor: Doctor | HospitalDoctor) => void;
}

const parseAppointmentDateTime = (dateStr: string, timeStr: string): Date => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier) {
        if (modifier.toUpperCase() === 'PM' && hours < 12) hours += 12;
        if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;
    }
    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const isoLikeString = `${dateStr}T${paddedHours}:${paddedMinutes}:00`;
    return new Date(isoLikeString);
};

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({ appointments, onUpdateRating, onCancelAppointment, onRebookAppointment }) => {
    const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');

    const { currentAppointments, historyAppointments } = useMemo(() => {
        const now = new Date();
        const current: Appointment[] = [];
        const history: Appointment[] = [];

        appointments.forEach(app => {
            const appointmentDateTime = parseAppointmentDateTime(app.date, app.time);
            if (app.status === 'Upcoming' && appointmentDateTime >= now) {
                current.push(app);
            } else {
                history.push(app);
            }
        });
        
        current.sort((a, b) => parseAppointmentDateTime(a.date, a.time).getTime() - parseAppointmentDateTime(b.date, b.time).getTime());
        history.sort((a, b) => parseAppointmentDateTime(b.date, b.time).getTime() - parseAppointmentDateTime(a.date, a.time).getTime());

        return { currentAppointments: current, historyAppointments: history };
    }, [appointments]);

    const displayedAppointments = activeTab === 'current' ? currentAppointments : historyAppointments;

    const TabButton: React.FC<{
        label: string;
        count: number;
        isActive: boolean;
        onClick: () => void;
    }> = ({ label, count, isActive, onClick }) => (
        <button
            onClick={onClick}
            className={`flex-1 text-center px-4 py-3 font-semibold border-b-2 transition-colors duration-300 ${
                isActive
                    ? 'border-accent text-accent'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
        >
            {label} <span className={`ml-2 px-2.5 py-1 text-xs rounded-full ${isActive ? 'bg-accent/20 text-accent' : 'bg-secondary text-secondary-foreground'}`}>{count}</span>
        </button>
    );

    return (
        <div className="bg-background min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="border-b border-border mb-8">
                    <div className="flex">
                        <TabButton label="Current" count={currentAppointments.length} isActive={activeTab === 'current'} onClick={() => setActiveTab('current')} />
                        <TabButton label="Past" count={historyAppointments.length} isActive={activeTab === 'history'} onClick={() => setActiveTab('history')} />
                    </div>
                </div>

                <div className="space-y-6">
                    {displayedAppointments.length > 0 ? (
                        displayedAppointments.map((app, index) => (
                            <div key={app.id} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms`}}>
                                <AppointmentCard appointment={app} onUpdateRating={onUpdateRating} onCancelAppointment={onCancelAppointment} onRebookAppointment={onRebookAppointment} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 px-6 bg-card rounded-lg shadow-sm border border-border animate-fade-in">
                             <h3 className="text-xl font-medium text-foreground">
                                {activeTab === 'current' ? 'You have no upcoming appointments.' : 'No past appointments to show.'}
                             </h3>
                             <p className="mt-2 text-muted-foreground">
                                {activeTab === 'current' ? "When you book a new appointment, it will show up here." : "Your completed or cancelled appointments will appear here."}
                             </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};