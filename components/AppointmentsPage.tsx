
import React, { useState, useMemo, useEffect } from 'react';
import type { Appointment } from '../types';
import { AppointmentCard } from './AppointmentCard';

interface AppointmentsPageProps {
    appointments: Appointment[];
    initialTab?: 'current' | 'history';
    onUpdateRating: (appointmentId: string, doctorRating: number, serviceRating: number) => void;
}

type Tab = 'current' | 'history';

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({ appointments, initialTab = 'current', onUpdateRating }) => {
    const [activeTab, setActiveTab] = useState<Tab>(initialTab);

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    const { currentAppointments, historyAppointments } = useMemo(() => {
        const now = new Date();
        const current: Appointment[] = [];
        const history: Appointment[] = [];

        appointments.forEach(app => {
            const appointmentDateTime = new Date(`${app.date} ${app.time}`);
            
            // An upcoming appointment that is in the past is moved to history
            if (app.status === 'Upcoming' && appointmentDateTime >= now) {
                current.push(app);
            } else {
                history.push(app);
            }
        });
        
        // Sort current by date ascending, history by date descending
        current.sort((a, b) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime());
        history.sort((a, b) => new Date(`${b.date} ${b.time}`).getTime() - new Date(`${a.date} ${a.time}`).getTime());

        return { currentAppointments: current, historyAppointments: history };
    }, [appointments]);

    const displayedAppointments = activeTab === 'current' ? currentAppointments : historyAppointments;

    return (
        <div className="bg-gray-50 min-h-screen pt-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Your Appointments</h1>
                    <p className="mt-2 text-lg text-gray-600">Manage your upcoming and past appointments.</p>
                </header>

                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab('current')}
                                className={`${
                                    activeTab === 'current'
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
                            >
                                Current & Upcoming
                            </button>
                            <button
                                onClick={() => setActiveTab('history')}
                                className={`${
                                    activeTab === 'history'
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
                            >
                                History
                            </button>
                        </nav>
                    </div>
                </div>
                
                <div className="space-y-6">
                    {displayedAppointments.length > 0 ? (
                        displayedAppointments.map(app => (
                            <AppointmentCard key={app.id} appointment={app} onUpdateRating={onUpdateRating} />
                        ))
                    ) : (
                        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                             <h3 className="text-xl font-medium text-gray-900">No appointments to show</h3>
                             <p className="mt-1 text-gray-500">
                                {activeTab === 'current' ? 'You have no upcoming appointments.' : 'You have no past appointments.'}
                             </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
