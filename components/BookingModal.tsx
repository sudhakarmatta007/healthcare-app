
import React, { useState, useMemo } from 'react';
import type { Doctor, HospitalDoctor, Appointment } from '../types';

interface BookingModalProps {
  doctor: Doctor | HospitalDoctor;
  onClose: () => void;
  onAppointmentBooked: (appointment: Appointment) => void;
}

type BookingStep = 'date' | 'time' | 'payment' | 'confirmed';
type TimeSession = 'morning' | 'afternoon' | 'evening';

const timeSlots: Record<TimeSession, string[]> = {
    morning: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM"],
    afternoon: ["01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM"],
    evening: ["06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"]
};

// Icons as components
const CalendarIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
const ClockIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
const SunIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 12a4 4 0 100-8 4 4 0 000 8z"></path></svg>;
const CloudIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.09A4.001 4.001 0 003 15z" /></svg>;
const MoonIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>;
const CreditCardIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>;


export const BookingModal: React.FC<BookingModalProps> = ({ doctor, onClose, onAppointmentBooked }) => {
    const [step, setStep] = useState<BookingStep>('date');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedSession, setSelectedSession] = useState<TimeSession | null>(null);
    const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
    const [copied, setCopied] = useState(false);

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const startOfToday = useMemo(() => new Date(today.getFullYear(), today.getMonth(), today.getDate()), []);
    const daysInMonth = useMemo(() => new Date(currentYear, currentMonth + 1, 0).getDate(), [currentMonth, currentYear]);
    const firstDayOfMonth = useMemo(() => new Date(currentYear, currentMonth, 1).getDay(), [currentMonth, currentYear]);

    const handleDateSelect = (day: number) => {
        const date = new Date(currentYear, currentMonth, day);
        if (date >= startOfToday) {
            setSelectedDate(date);
            setStep('time');
            setSelectedTime(null);
            setSelectedSession(null);
        }
    };
    
    const handleNextMonth = () => {
        setCurrentMonth(prev => prev === 11 ? 0 : prev + 1);
        if (currentMonth === 11) setCurrentYear(prev => prev + 1);
    };

    const canGoBackMonth = useMemo(() => {
         const firstOfThisMonth = new Date(currentYear, currentMonth, 1);
         const firstOfTodayMonth = new Date(startOfToday.getFullYear(), startOfToday.getMonth(), 1);
         return firstOfThisMonth > firstOfTodayMonth;
    }, [currentMonth, currentYear, startOfToday]);

    const handlePrevMonth = () => {
        if (canGoBackMonth) {
            setCurrentMonth(prev => prev === 0 ? 11 : prev - 1);
            if (currentMonth === 0) setCurrentYear(prev => prev - 1);
        }
    };
    
    const handleProceedToPayment = () => {
        setStep('payment');
    };

    const handleFinalizeBooking = () => {
        if(selectedDate && selectedTime) {
            const newAppointment: Appointment = {
                id: `APT${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                doctor,
                hospital: doctor.worksAt[0] || 'General Hospital',
                date: selectedDate.toISOString().split('T')[0],
                time: selectedTime,
                status: 'Upcoming',
                paymentStatus: 'Paid'
            };
            setConfirmedAppointment(newAppointment);
            onAppointmentBooked(newAppointment);
            setStep('confirmed');
        }
    };

    const handleCopyId = (id: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(id).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    const renderCalendar = () => {
        const blanks = Array(firstDayOfMonth).fill(null);
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        const isToday = (day: number) => day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
        const isPast = (day: number) => new Date(currentYear, currentMonth, day) < startOfToday;

        return (
            <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Select a Date</h2>
                <div className="flex justify-between items-center mb-4">
                    <button onClick={handlePrevMonth} disabled={!canGoBackMonth} className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <div className="font-bold text-lg text-gray-700">{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                    <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day} className="font-semibold text-sm text-gray-400">{day}</div>)}
                    {blanks.map((_, i) => <div key={`blank-${i}`}></div>)}
                    {days.map(day => (
                        <button
                            key={day}
                            onClick={() => handleDateSelect(day)}
                            disabled={isPast(day)}
                            className={`w-10 h-10 rounded-full transition-colors duration-200 text-sm font-semibold
                                ${isPast(day) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-100 text-gray-700'}
                                ${isToday(day) ? 'ring-2 ring-blue-500 text-blue-600' : ''}
                                ${selectedDate?.getDate() === day && selectedDate.getMonth() === currentMonth ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                            `}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const renderTimeSlots = () => {
        const sessionIcons: Record<TimeSession, React.ReactNode> = {
            morning: <SunIcon />,
            afternoon: <CloudIcon />,
            evening: <MoonIcon />
        };
        return (
            <div className="p-8">
                <button onClick={() => setStep('date')} className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Calendar
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Select a Time</h2>
                <p className="text-gray-500 mb-6">{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {(Object.keys(timeSlots) as TimeSession[]).map(session => (
                        <button
                            key={session}
                            onClick={() => setSelectedSession(session)}
                            className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${selectedSession === session ? 'bg-blue-500 text-white border-blue-500 shadow-lg' : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-blue-300 hover:text-gray-800'}`}
                        >
                            {sessionIcons[session]}
                            <p className="mt-2 font-semibold text-sm capitalize">{session}</p>
                        </button>
                    ))}
                </div>

                {selectedSession && (
                    <div className="animate-fade-in-down">
                        <p className="font-semibold text-gray-700 mb-3 capitalize">{selectedSession} Slots</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {timeSlots[selectedSession].map(time => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`p-3 rounded-lg border text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${selectedTime === time ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105' : 'border-gray-300 text-gray-700 bg-white hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600'}`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderPayment = () => {
        const bookingFee = 15;
        const total = doctor.consultationFee + bookingFee;

        return (
             <div className="p-8">
                <button onClick={() => setStep('time')} className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Time Selection
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>
                
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Fee Summary</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Consultation Fee</span>
                            <span className="font-medium text-gray-800">₹{doctor.consultationFee.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between text-gray-600">
                            <span>Booking Fee</span>
                            <span className="font-medium text-gray-800">₹{bookingFee.toFixed(2)}</span>
                        </div>
                         <div className="border-t my-2"></div>
                         <div className="flex justify-between text-gray-900 font-bold text-base">
                            <span>Total Amount</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                     <a 
                        href="upi://pay?pa=8125929668-2@axl&pn=Payee" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                    >
                        Pay Securely via UPI
                    </a>
                     <button 
                        onClick={handleFinalizeBooking}
                        className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                    >
                        I Have Paid, Confirm Now
                    </button>
                </div>
            </div>
        );
    };

    const renderConfirmation = () => {
        if (!confirmedAppointment) {
            return (
                <div className="flex flex-col items-center justify-center p-8 text-center h-full">
                    <p>Processing your confirmation...</p>
                </div>
            );
        }
        
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center h-full">
                <div className="mx-auto bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mb-5">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h2>
                <p className="text-gray-600 mb-6">Your appointment with {doctor.name} has been successfully scheduled and payment has been received.</p>
                
                <div className="bg-gray-50 p-6 rounded-xl w-full text-left mb-6 border border-gray-200">
                    <div className="mb-4">
                        <p className="font-semibold text-sm text-gray-500">Date & Time</p>
                        <p className="text-lg font-bold text-gray-800">
                            {new Date(confirmedAppointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' })} at {confirmedAppointment.time}
                        </p>
                    </div>
                    <div className="mb-4">
                         <p className="font-semibold text-sm text-gray-500">Doctor</p>
                        <p className="text-lg font-bold text-gray-800">{doctor.name}, {'specialty' in doctor ? doctor.specialty : doctor.designation}</p>
                    </div>
                    <div className="border-t pt-4">
                        <p className="font-semibold text-sm text-gray-500">Appointment ID</p>
                        <div className="mt-1 flex items-center justify-between bg-blue-50 p-2 rounded-lg border border-dashed border-blue-300">
                            <p className="text-lg font-mono text-blue-700 tracking-widest">{confirmedAppointment.id}</p>
                            <button onClick={() => handleCopyId(confirmedAppointment.id)} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors px-3 py-1 rounded-md hover:bg-blue-100">
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                </div>
        
                <button onClick={onClose} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Done
                </button>
            </div>
        );
    };
    
    const LeftPanel = () => {
        const showConfirmButton = step === 'time' && selectedDate && selectedTime;
        const bookingFee = 15;
        const total = doctor.consultationFee + bookingFee;
        
        return (
            <div className="w-full md:w-1/3 bg-slate-50 p-8 flex flex-col border-b md:border-b-0 md:border-r border-gray-200">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10 md:hidden">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <div className="text-center">
                    <img src={doctor.imageUrl} alt={doctor.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900">{doctor.name}</h2>
                    <p className="text-blue-600 font-semibold text-sm">{'specialty' in doctor ? doctor.specialty : doctor.designation}</p>
                </div>
                <hr className="my-6 border-gray-200" />
                <div className="space-y-4 text-sm">
                    <div className="flex items-center text-gray-700">
                        <CalendarIcon />
                        <span className="ml-3">{selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'No date selected'}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <ClockIcon />
                        <span className="ml-3">{selectedTime || 'No time selected'}</span>
                    </div>
                     {step !== 'date' && (
                        <div className="flex items-center text-gray-700 font-bold">
                           <CreditCardIcon />
                            <span className="ml-3">Total: ₹{total.toFixed(2)}</span>
                        </div>
                    )}
                </div>
                
                <div className="mt-auto pt-6">
                    {showConfirmButton && (
                         <button
                            onClick={handleProceedToPayment}
                            disabled={!selectedTime || !selectedDate}
                            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
                        >
                            Confirm Appointment
                        </button>
                    )}
                    {step === 'payment' && (
                        <div className="text-center text-sm text-gray-500 p-3 bg-gray-100 rounded-lg">
                            Please complete your payment in the right panel.
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden flex flex-col md:flex-row max-h-[95vh]">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10 hidden md:block">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <LeftPanel />
                <div className="w-full md:w-2/3 overflow-y-auto">
                    {step === 'date' && renderCalendar()}
                    {step === 'time' && renderTimeSlots()}
                    {step === 'payment' && renderPayment()}
                    {step === 'confirmed' && renderConfirmation()}
                </div>
            </div>
        </div>
    );
};
