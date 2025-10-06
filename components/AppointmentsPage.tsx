
import React, { useMemo } from 'react';
import type { Appointment, Doctor, HospitalDoctor } from '../types';
import { AppointmentCard } from './AppointmentCard';

interface AppointmentsPageProps {
    appointments: Appointment[];
    onUpdateRating: (appointmentId: string, doctorRating: number, serviceRating: number) => void;
    onCancelAppointment: (appointmentId: string) => void;
    onRebookAppointment: (doctor: Doctor | HospitalDoctor) => void;
}

// A more robust, cross-browser compatible date/time parsing function.
// It constructs an ISO-like string to avoid inconsistencies in date parsing.
const parseAppointmentDateTime = (dateStr: string, timeStr: string): Date => {
    // Convert 12-hour AM/PM time to 24-hour format.
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier) {
        if (modifier.toUpperCase() === 'PM' && hours < 12) {
            hours += 12;
        }
        if (modifier.toUpperCase() === 'AM' && hours === 12) { // Handle 12 AM (midnight)
            hours = 0;
        }
    }
    
    // Pad hours and minutes to ensure two digits
    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');

    // Construct an ISO-like string (e.g., "2024-07-28T14:30:00").
    // new Date() with this format is reliably parsed as local time across browsers.
    const isoLikeString = `${dateStr}T${paddedHours}:${paddedMinutes}:00`;
    
    return new Date(isoLikeString);
};

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({ appointments, onUpdateRating, onCancelAppointment, onRebookAppointment }) => {
    const { currentAppointments, historyAppointments } = useMemo(() => {
        const now = new Date();
        const current: Appointment[] = [];
        const history: Appointment[] = [];

        appointments.forEach(app => {
            const appointmentDateTime = parseAppointmentDateTime(app.date, app.time);
            
            // If status is 'Upcoming' and the appointment is in the future, it's current.
            // Everything else (Completed, Cancelled, or past Upcoming) goes to history.
            if (app.status === 'Upcoming' && appointmentDateTime >= now) {
                current.push(app);
            } else {
                history.push(app);
            }
        });
        
        // Sort current by date ascending, history by date descending
        current.sort((a, b) => parseAppointmentDateTime(a.date, a.time).getTime() - parseAppointmentDateTime(b.date, b.time).getTime());
        history.sort((a, b) => parseAppointmentDateTime(b.date, b.time).getTime() - parseAppointmentDateTime(a.date, a.time).getTime());

        return { currentAppointments: current, historyAppointments: history };
    }, [appointments]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900">Your Appointments</h1>
                    <p className="mt-2 text-lg text-gray-600">Manage your upcoming and past appointments.</p>
                </header>

                <section id="current-appointments" className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-blue-200">Current Bookings</h2>
                    <div className="space-y-6">
                        {currentAppointments.length > 0 ? (
                            currentAppointments.map(app => (
                                <AppointmentCard key={app.id} appointment={app} onUpdateRating={onUpdateRating} onCancelAppointment={onCancelAppointment} onRebookAppointment={onRebookAppointment} />
                            ))
                        ) : (
                            <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                                 <h3 className="text-xl font-medium text-gray-900">You have no upcoming appointments.</h3>
                                 <p className="mt-2 text-gray-500">
                                    When you book a new appointment, it will show up here.
                                 </p>
                            </div>
                        )}
                    </div>
                </section>

                <section id="history-appointments">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-gray-200">History</h2>
                     <div className="space-y-6">
                        {historyAppointments.length > 0 ? (
                            historyAppointments.map(app => (
                                <AppointmentCard key={app.id} appointment={app} onUpdateRating={onUpdateRating} onCancelAppointment={onCancelAppointment} onRebookAppointment={onRebookAppointment} />
                            ))
                        ) : (
                            <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                                 <h3 className="text-xl font-medium text-gray-900">No past appointments to show.</h3>
                                 <p className="mt-2 text-gray-500">
                                   Your completed or cancelled appointments will appear here.
                                 </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};
