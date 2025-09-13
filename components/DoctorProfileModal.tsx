
import React from 'react';
import type { Doctor, HospitalDoctor } from '../types';

interface DoctorProfileModalProps {
  doctor: Doctor | HospitalDoctor;
  onClose: () => void;
  onBook: (doctor: Doctor | HospitalDoctor) => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
    <div className={`mb-8 ${className}`}>
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">{title}</h3>
        {children}
    </div>
);

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string | React.ReactNode; }> = ({ icon, label, value }) => (
    <div className="flex items-start text-sm mb-5">
        <div className="text-blue-600 w-5 h-5 mr-4 mt-0.5 flex-shrink-0">{icon}</div>
        <div>
            <p className="font-semibold text-gray-500 text-xs">{label}</p>
            <div className="text-gray-700 font-semibold">{value}</div>
        </div>
    </div>
);


export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({ doctor, onClose, onBook }) => {
  const specialty = 'specialty' in doctor ? doctor.specialty : doctor.designation;
  const location = 'location' in doctor ? doctor.location : 'N/A';

  const PhoneIcon = <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>;
  const LocationIcon = <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
  const FeeIcon = <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h1a2 2 0 002-2v-2a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 002 2h2m-6-4h.01M19 12h.01M12 12h.01M12 16h.01M12 8h.01"></path></svg>;
  const HospitalIcon = () => <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>;
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full p-1 z-20">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        {/* Left Sidebar */}
        <div className="w-full md:w-1/3 bg-slate-50 p-8 border-b md:border-b-0 md:border-r flex-shrink-0">
          <div className="text-center">
              <img 
                  src={doctor.imageUrl} 
                  alt={doctor.name} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
              <p className="text-blue-600 font-semibold">{specialty}</p>
          </div>
          <hr className="my-6" />
          <div className="space-y-2">
              <InfoItem icon={PhoneIcon} label="Contact" value={<a href={`tel:${doctor.contact}`} className="text-blue-600 hover:underline">{doctor.contact}</a>} />
              <InfoItem icon={LocationIcon} label="Location" value={location} />
              <InfoItem icon={FeeIcon} label="Consultation Fee" value={`₹${doctor.consultationFee}`} />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 p-8 overflow-y-auto">
          <Section title="About Me">
              <p className="text-gray-600 text-sm leading-relaxed">{doctor.bio}</p>
          </Section>

          <Section title="Work Experience">
              <div className="flex items-center text-gray-700 mb-4">
                  <HospitalIcon />
                  <p className="ml-3 font-semibold text-sm">Practices at {doctor.worksAt.length} location(s) with {doctor.experience} years of experience.</p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-600 pl-4 text-sm">
                  {doctor.worksAt.map(hospital => <li key={hospital}>{hospital}</li>)}
              </ul>
          </Section>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <Section title="Qualifications">
                  <p className="text-gray-600 text-sm">{doctor.qualification}</p>
              </Section>
              <Section title="Working Hours">
                  <p className="text-gray-700 font-semibold text-sm">{doctor.workingHours}</p>
              </Section>
          </div>
          
          <Section title="Patient Satisfaction">
              <div className="flex items-center">
                  <p className="text-3xl font-bold text-green-500 mr-4">{doctor.satisfaction}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${doctor.satisfaction}%` }}></div>
                  </div>
              </div>
          </Section>
          
          <div className="pt-4 mt-auto">
              <button 
                  onClick={() => onBook(doctor)}
                  className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                  Book Appointment
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};
