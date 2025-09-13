
import React, { useState } from 'react';
import type { Appointment, Doctor, HospitalDoctor } from '../types';
import { StarRating } from './StarRating';


interface AppointmentCardProps {
    appointment: Appointment;
    onUpdateRating: (appointmentId: string, doctorRating: number, serviceRating: number) => void;
    onCancelAppointment: (appointmentId: string) => void;
    onRebookAppointment: (doctor: Doctor | HospitalDoctor) => void;
}

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div>
        <dt className="flex items-center text-sm font-medium text-gray-500">
            {icon}
            <span className="ml-2">{label}</span>
        </dt>
        <dd className="mt-1 text-sm text-gray-900 font-semibold">{value}</dd>
    </div>
);

const DoctorIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const HospitalIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>;
const CalendarIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
const ClockIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onUpdateRating, onCancelAppointment, onRebookAppointment }) => {
    const { doctor, hospital, date, time, status, id } = appointment;
    const specialty = 'specialty' in doctor ? doctor.specialty : doctor.designation;
    
    const [tempDoctorRating, setTempDoctorRating] = useState(0);
    const [tempServiceRating, setTempServiceRating] = useState(0);

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC' // Add timezone to avoid off-by-one day errors
    });

    const statusStyles: Record<typeof status, string> = {
        Upcoming: 'bg-blue-100 text-blue-800',
        Completed: 'bg-green-100 text-green-800',
        Cancelled: 'bg-red-100 text-red-800',
    };

    const handleSubmitRating = () => {
        if (tempDoctorRating > 0 && tempServiceRating > 0) {
            onUpdateRating(appointment.id, tempDoctorRating, tempServiceRating);
        }
    };
    
    const renderFooter = () => {
        if (status === 'Upcoming') {
            return (
                <div className="bg-gray-50 px-6 py-3 flex flex-wrap gap-2 justify-end">
                    <button onClick={() => onCancelAppointment(id)} className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors">Cancel</button>
                    <button onClick={() => onRebookAppointment(doctor)} className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">Reschedule</button>
                </div>
            );
        }
        
        if (status === 'Completed') {
             return (
                <div className="bg-gray-50 px-6 py-4">
                    {typeof appointment.doctorRating === 'number' && typeof appointment.serviceRating === 'number' ? (
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <div>
                                <h4 className="text-sm font-bold text-gray-700 mb-3 sm:mb-0">Your Rating</h4>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-8">
                                    <div className="flex items-center gap-x-2">
                                        <p className="text-sm font-medium text-gray-600">Doctor:</p>
                                        <StarRating rating={appointment.doctorRating} />
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <p className="text-sm font-medium text-gray-600">Service:</p>
                                        <StarRating rating={appointment.serviceRating} />
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => onRebookAppointment(doctor)} className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0 self-end sm:self-center">Re-book</button>
                        </div>
                    ) : (
                        <div>
                            <h4 className="text-sm font-bold text-gray-700 mb-3">Rate Your Experience</h4>
                            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                               <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-8">
                                    <div className="flex items-center gap-x-2">
                                        <p className="text-sm font-medium text-gray-600 w-16">Doctor</p>
                                        <StarRating rating={tempDoctorRating} onRatingChange={setTempDoctorRating} isEditable />
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <p className="text-sm font-medium text-gray-600 w-16">Service</p>
                                        <StarRating rating={tempServiceRating} onRatingChange={setTempServiceRating} isEditable />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 self-end xl:self-center">
                                     <button onClick={() => onRebookAppointment(doctor)} className="px-4 py-2 border border-blue-600 text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors flex-shrink-0">Re-book</button>
                                     <button
                                        onClick={handleSubmitRating}
                                        disabled={!tempDoctorRating || !tempServiceRating}
                                        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex-shrink-0"
                                    >
                                        Submit Rating
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        if (status === 'Cancelled') {
            return (
                 <div className="bg-gray-50 px-6 py-3 flex justify-end">
                    <button onClick={() => onRebookAppointment(doctor)} className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">Book Again</button>
                </div>
            );
        }
        
        return null;
    };


    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg">
            <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                    <div>
                        <div className="flex items-center mb-4">
                            <img src={doctor.imageUrl} alt={doctor.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                            <div className="ml-4">
                                <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                                <p className="text-md text-blue-600 font-semibold">{specialty}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end">
                         <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>{status}</span>
                         <p className="text-xs text-gray-400 mt-2">ID: {id}</p>
                    </div>
                </div>

                <hr className="my-4" />

                <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
                    <InfoItem icon={<DoctorIcon />} label="Doctor" value={doctor.name} />
                    <InfoItem icon={<HospitalIcon />} label="Hospital" value={hospital} />
                    <InfoItem icon={<CalendarIcon />} label="Date" value={formattedDate} />
                    <InfoItem icon={<ClockIcon />} label="Time" value={time} />
                </dl>
            </div>
            {renderFooter()}
        </div>
    );
};
