
import React, { useState, useEffect } from 'react';
import type { Hospital, HospitalDoctor } from '../types';

interface HospitalDetailsProps {
    hospital: Hospital;
    onClose: () => void;
    onViewDoctorProfile: (doctor: HospitalDoctor) => void;
}

const DetailSection: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            {icon}
            <span className="ml-2">{title}</span>
        </h3>
        {children}
    </div>
);

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
    <ul className="list-disc list-inside text-gray-600 space-y-1">
        {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
);

export const HospitalDetails: React.FC<HospitalDetailsProps> = ({ hospital, onClose, onViewDoctorProfile }) => {
    const [doctorsVisible, setDoctorsVisible] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const AddressIcon = <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
    const PhoneIcon = <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>;
    const ServicesIcon = <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>;
    const FacilitiesIcon = <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>;
    const StarIcon: React.FC = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>;
    
    return (
        <div className="bg-slate-100 min-h-screen animate-fade-in">
            <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mb-6">
                    <button onClick={onClose} className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back to List
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <img src={hospital.imageUrl} alt={hospital.name} className="w-full h-56 sm:h-72 object-cover" />
                    
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{hospital.name}</h1>
                                <p className="text-md text-gray-500 mt-1">{hospital.location}</p>
                            </div>
                            <div className="flex items-center bg-yellow-400 text-white font-bold px-4 py-2 mt-4 sm:mt-0 rounded-full text-lg gap-2">
                                <StarIcon />
                                <span>{hospital.rating}</span>
                            </div>
                        </div>

                        <hr className="my-8" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            <div>
                                <DetailSection title="Address" icon={AddressIcon}>
                                    <p className="text-gray-600">{hospital.address}</p>
                                </DetailSection>
                                <DetailSection title="Contact" icon={PhoneIcon}>
                                    <a href={`tel:${hospital.contact}`} className="text-blue-600 hover:underline">{hospital.contact}</a>
                                </DetailSection>
                            </div>
                            <div>
                                <DetailSection title="Key Services" icon={ServicesIcon}>
                                    <BulletList items={hospital.services} />
                                </DetailSection>
                                <DetailSection title="Facilities" icon={FacilitiesIcon}>
                                    <BulletList items={hospital.facilities} />
                                </DetailSection>
                            </div>
                        </div>

                        <div className="mt-10">
                            <button onClick={() => setDoctorsVisible(!doctorsVisible)} className="w-full flex justify-between items-center text-left bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition-colors">
                                <h3 className="text-xl font-bold text-gray-800">Our Doctors</h3>
                                <svg className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${doctorsVisible ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            {doctorsVisible && (
                                <div className="mt-4 space-y-4 animate-fade-in-down">
                                    {hospital.doctors.map(doctor => (
                                        <div 
                                            key={doctor.id} 
                                            onClick={() => onViewDoctorProfile(doctor)}
                                            className="flex items-center p-4 border rounded-lg bg-white shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer"
                                        >
                                            <img src={doctor.imageUrl} alt={doctor.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-200" />
                                            <div className="ml-4">
                                                <p className="text-lg font-bold text-gray-900">{doctor.name}</p>
                                                <p className="text-md text-blue-700 font-semibold">{doctor.designation}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
