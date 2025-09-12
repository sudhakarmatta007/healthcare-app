import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DoctorCard } from './components/DoctorCard';
import { HospitalCard } from './components/HospitalCard';
import { HospitalDetails } from './components/HospitalDetails';
import { BookingModal } from './components/BookingModal';
import { DoctorProfileModal } from './components/DoctorProfileModal';
import { AppointmentsPage } from './components/AppointmentsPage';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { OnboardingModal } from './components/OnboardingModal';
import type { Doctor, Hospital, HospitalDoctor, Appointment, User, HealthEvent } from './types';

const DOCTORS_DATA: Doctor[] = [
  { id: 1, name: 'Dr. Sudhakar', specialty: 'Cardiologist', location: 'Eluru', rating: 4.8, imageUrl: 'https://picsum.photos/seed/doc1/400/400', qualification: 'MBBS, MD (Cardiology)', experience: 15, consultationFee: 800, bio: 'A dedicated cardiologist with 15 years of experience in treating heart conditions and promoting cardiac wellness.', satisfaction: 98, workingHours: 'Mon-Fri, 9 AM - 5 PM', contact: '+91 98765 43210', worksAt: ['Eluru Heart Center', 'City General Hospital'] },
  { id: 2, name: 'Dr. Ram', specialty: 'Dermatologist', location: 'Hanuman Junction', rating: 4.9, imageUrl: 'https://picsum.photos/seed/doc2/400/400', qualification: 'MBBS, DNB (Dermatology)', experience: 12, consultationFee: 600, bio: 'Specializes in cosmetic and clinical dermatology, helping patients achieve healthy and radiant skin.', satisfaction: 99, workingHours: 'Tue-Sat, 10 AM - 7 PM', contact: '+91 98765 43211', worksAt: ['Hanuman Junction Skin Clinic'] },
  { id: 3, name: 'Dr. Vaseem', specialty: 'Pediatrician', location: 'Vijayawada', rating: 4.7, imageUrl: 'https://picsum.photos/seed/doc3/400/400', qualification: 'MBBS, MD (Pediatrics)', experience: 10, consultationFee: 700, bio: 'A friendly and compassionate pediatrician committed to the health and well-being of children.', satisfaction: 97, workingHours: 'Mon-Sat, 10 AM - 6 PM', contact: '+91 98765 43212', worksAt: ["Vijayawada Children's Hospital"] },
  { id: 4, name: 'Dr. Rajesh', specialty: 'Orthopedic Surgeon', location: 'Gudivada', rating: 4.6, imageUrl: 'https://picsum.photos/seed/doc4/400/400', qualification: 'MBBS, MS (Orthopedics)', experience: 18, consultationFee: 900, bio: 'Expert in joint replacement and sports injuries, focused on restoring mobility and quality of life.', satisfaction: 96, workingHours: 'Mon-Fri, 9 AM - 4 PM', contact: '+91 98765 43213', worksAt: ['Gudivada Bone & Joint Center'] },
  { id: 5, name: 'Dr. Priya', specialty: 'Neurologist', location: 'Hyderabad', rating: 4.9, imageUrl: 'https://picsum.photos/seed/doc5/400/400', qualification: 'MBBS, DM (Neurology)', experience: 20, consultationFee: 1200, bio: 'Leading neurologist with extensive experience in treating complex neurological disorders.', satisfaction: 98, workingHours: 'Tue & Thu, 11 AM - 5 PM', contact: '+91 98765 43214', worksAt: ['Hyderabad Neuro Institute'] },
  { id: 6, name: 'Dr. Anil', specialty: 'Gastroenterologist', location: 'Eluru', rating: 4.5, imageUrl: 'https://picsum.photos/seed/doc6/400/400', qualification: 'MBBS, MD (Gen Med), DM (Gastro)', experience: 14, consultationFee: 850, bio: 'Focused on digestive health, providing expert care for a wide range of gastrointestinal issues.', satisfaction: 95, workingHours: 'Mon-Sat, 9 AM - 3 PM', contact: '+91 98765 43215', worksAt: ['Eluru Digestive Care'] },
  { id: 7, name: 'Dr. Kavitha', specialty: 'Oncologist', location: 'Vijayawada', rating: 4.8, imageUrl: 'https://picsum.photos/seed/doc7/400/400', qualification: 'MBBS, MD, DM (Oncology)', experience: 16, consultationFee: 1100, bio: 'A compassionate oncologist providing advanced cancer care and dedicated patient support.', satisfaction: 97, workingHours: 'Mon, Wed, Fri, 10 AM - 4 PM', contact: '+91 98765 43216', worksAt: ["Vijayawada Children's Hospital", 'Regional Cancer Institute'] },
];

const HOSPITALS_DATA: Hospital[] = [
  { 
    id: 1, 
    name: 'Eluru Heart Center', 
    location: 'Eluru', 
    address: '123 Heartbeat Avenue, Eluru, 534001',
    contact: '+91 88123 45678',
    services: ['Cardiology', 'Emergency Care', 'Cardiac Surgery', 'Angioplasty'], 
    facilities: ['24/7 Pharmacy', 'Advanced ICU', 'Ambulance Service', 'In-patient Rooms'],
    rating: 4.7, 
    imageUrl: 'https://picsum.photos/seed/hos1/600/400',
    doctors: [
      { id: 101, name: 'Dr. Aarav Sharma', designation: 'Chief Cardiologist', imageUrl: 'https://picsum.photos/seed/doc101/200/200', qualification: 'MBBS, DM (Cardiology)', experience: 22, consultationFee: 1500, bio: 'Renowned for his expertise in complex cardiac procedures and patient-centric approach.', satisfaction: 99, workingHours: 'Mon-Fri, 9 AM - 5 PM', contact: '+91 91234 56780', worksAt: ['Eluru Heart Center'] },
      { id: 102, name: 'Dr. Priya Patel', designation: 'Cardiothoracic Surgeon', imageUrl: 'https://picsum.photos/seed/doc102/200/200', qualification: 'MBBS, MCh (CTVS)', experience: 18, consultationFee: 1800, bio: 'A highly skilled surgeon specializing in minimally invasive heart surgeries.', satisfaction: 98, workingHours: 'By Appointment', contact: '+91 91234 56781', worksAt: ['Eluru Heart Center'] },
      { id: 103, name: 'Dr. Suresh Gupta', designation: 'Interventional Cardiologist', imageUrl: 'https://picsum.photos/seed/doc103/200/200', qualification: 'MBBS, MD, FACC', experience: 15, consultationFee: 1300, bio: 'Expert in angioplasty and stenting procedures, with a focus on rapid recovery.', satisfaction: 97, workingHours: 'Mon-Sat, 10 AM - 6 PM', contact: '+91 91234 56782', worksAt: ['Eluru Heart Center'] },
    ]
  },
  { 
    id: 2, 
    name: 'Hanuman Junction Skin Clinic', 
    location: 'Hanuman Junction', 
    address: '456 Glow Street, Hanuman Junction, 521105',
    contact: '+91 88145 67890',
    services: ['Dermatology', 'Cosmetic Surgery', 'Laser Treatment'], 
    facilities: ['Modern Equipment', 'Consultation Rooms', 'Waiting Area'],
    rating: 4.8, 
    imageUrl: 'https://picsum.photos/seed/hos2/600/400',
    doctors: [
        { id: 201, name: 'Dr. Rohan Verma', designation: 'Lead Dermatologist', imageUrl: 'https://picsum.photos/seed/doc201/200/200', qualification: 'MBBS, MD (Dermatology)', experience: 10, consultationFee: 750, bio: 'Committed to providing personalized skincare solutions for all ages.', satisfaction: 99, workingHours: 'Tue-Sun, 11 AM - 8 PM', contact: '+91 92345 67890', worksAt: ['Hanuman Junction Skin Clinic'] },
        { id: 202, name: 'Dr. Anjali Desai', designation: 'Cosmetic Dermatologist', imageUrl: 'https://picsum.photos/seed/doc202/200/200', qualification: 'MBBS, DDVL', experience: 8, consultationFee: 900, bio: 'Specializes in advanced cosmetic treatments to enhance natural beauty.', satisfaction: 98, workingHours: 'Tue-Sat, 10 AM - 7 PM', contact: '+91 92345 67891', worksAt: ['Hanuman Junction Skin Clinic'] },
    ]
  },
  { 
    id: 3, 
    name: 'Vijayawada Children\'s Hospital', 
    location: 'Vijayawada',
    address: '789 Tiny Tots Road, Vijayawada, 520002',
    contact: '+91 86612 34567',
    services: ['Pediatrics', 'Neonatology', 'Child Vaccinations'],
    facilities: ['Child-friendly Wards', 'NICU', 'Play Area', '24/7 Pediatricians'],
    rating: 4.9, 
    imageUrl: 'https://picsum.photos/seed/hos3/600/400',
    doctors: [
        { id: 301, name: 'Dr. Meena Iyer', designation: 'Senior Pediatrician', imageUrl: 'https://picsum.photos/seed/doc301/200/200', qualification: 'MBBS, MD (Pediatrics)', experience: 25, consultationFee: 800, bio: 'A trusted name in child healthcare with over two decades of experience.', satisfaction: 99, workingHours: 'Mon-Sat, 9 AM - 2 PM', contact: '+91 93456 78901', worksAt: ["Vijayawada Children's Hospital"] },
        { id: 302, name: 'Dr. Vikram Singh', designation: 'Neonatologist', imageUrl: 'https://picsum.photos/seed/doc302/200/200', qualification: 'MBBS, DM (Neonatology)', experience: 15, consultationFee: 1000, bio: 'Provides critical care for newborns with a gentle and expert touch.', satisfaction: 98, workingHours: '24/7 On-Call', contact: '+91 93456 78902', worksAt: ["Vijayawada Children's Hospital"] },
    ]
  },
  { 
    id: 4, 
    name: 'Gudivada Bone & Joint Center', 
    location: 'Gudivada', 
    address: '101 Flex Lane, Gudivada, 521301',
    contact: '+91 86745 54321',
    services: ['Orthopedics', 'Physiotherapy', 'Joint Replacement'], 
    facilities: ['X-Ray & Imaging', 'Rehabilitation Center', 'Surgical Theatres'],
    rating: 4.5, 
    imageUrl: 'https://picsum.photos/seed/hos4/600/400',
    doctors: [
        { id: 401, name: 'Dr. Arjun Reddy', designation: 'Orthopedic Surgeon', imageUrl: 'https://picsum.photos/seed/doc401/200/200', qualification: 'MBBS, MS (Orthopedics)', experience: 19, consultationFee: 950, bio: 'A leading orthopedic surgeon specializing in complex trauma and joint replacements.', satisfaction: 96, workingHours: 'Mon-Sat, 10 AM - 5 PM', contact: '+91 94567 89012', worksAt: ['Gudivada Bone & Joint Center'] },
    ]
  },
  { 
    id: 5, 
    name: 'Hyderabad Neuro Institute', 
    location: 'Hyderabad',
    address: '222 Mind Matters Blvd, Hyderabad, 500081',
    contact: '+91 40123 98765',
    services: ['Neurology', 'Neurosurgery', 'Stroke Care'],
    facilities: ['MRI & CT Scan', 'Neuro ICU', 'Advanced Brain Labs'],
    rating: 4.9, 
    imageUrl: 'https://picsum.photos/seed/hos5/600/400',
    doctors: [
        { id: 501, name: 'Dr. Sana Khan', designation: 'Chief Neurologist', imageUrl: 'https://picsum.photos/seed/doc501/200/200', qualification: 'MBBS, DM (Neurology)', experience: 24, consultationFee: 1500, bio: 'Pioneering research and treatment in neurology for over two decades.', satisfaction: 99, workingHours: 'Mon-Fri, 10 AM - 4 PM', contact: '+91 95678 90123', worksAt: ['Hyderabad Neuro Institute'] },
        { id: 502, name: 'Dr. Omar Abdullah', designation: 'Neurosurgeon', imageUrl: 'https://picsum.photos/seed/doc502/200/200', qualification: 'MBBS, MCh (Neurosurgery)', experience: 21, consultationFee: 2000, bio: 'Expert in intricate brain and spine surgeries with a high success rate.', satisfaction: 98, workingHours: 'By Appointment', contact: '+91 95678 90124', worksAt: ['Hyderabad Neuro Institute'] },
    ]
  },
  { 
    id: 6, 
    name: 'Eluru Digestive Care', 
    location: 'Eluru',
    address: '333 Gut Well St, Eluru, 534002',
    contact: '+91 88123 11223',
    services: ['Gastroenterology', 'Endoscopy', 'Liver Care'],
    facilities: ['Endoscopy Suite', 'Recovery Rooms', 'Dietary Consultation'],
    rating: 4.6, 
    imageUrl: 'https://picsum.photos/seed/hos6/600/400',
    doctors: [
        { id: 601, name: 'Dr. Imran Baig', designation: 'Gastroenterologist', imageUrl: 'https://picsum.photos/seed/doc601/200/200', qualification: 'MBBS, MD, DM (Gastro)', experience: 17, consultationFee: 900, bio: 'Provides comprehensive care for digestive diseases with a focus on patient comfort.', satisfaction: 96, workingHours: 'Mon-Fri, 11 AM - 6 PM', contact: '+91 96789 01234', worksAt: ['Eluru Digestive Care'] },
    ]
  },
];

const MOCK_APPOINTMENTS: Appointment[] = [
    { id: 'HIST1', doctor: DOCTORS_DATA[3], hospital: 'Gudivada Bone & Joint Center', date: '2024-07-15', time: '11:00 AM', status: 'Completed', paymentStatus: 'Paid' },
    { id: 'HIST2', doctor: DOCTORS_DATA[1], hospital: 'Hanuman Junction Skin Clinic', date: '2024-06-20', time: '02:30 PM', status: 'Cancelled', paymentStatus: 'Paid' },
    { id: 'HIST3', doctor: DOCTORS_DATA[2], hospital: "Vijayawada Children's Hospital", date: '2024-05-01', time: '10:00 AM', status: 'Completed', paymentStatus: 'Paid' },
];

const MOCK_USER_WITH_HISTORY: User = {
    id: 'user123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePictureUrl: 'https://i.pravatar.cc/150?u=john_doe',
    hasMedicalProfile: true,
};

const MOCK_USER_NEW: User = {
    id: 'user456',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    profilePictureUrl: 'https://i.pravatar.cc/150?u=jane_smith',
    hasMedicalProfile: false,
};

const MOCK_HEALTH_HISTORY: HealthEvent[] = [
    { id: 'ev1', type: 'Appointment', date: '2024-07-15', title: 'Orthopedic Follow-up', description: 'Post-surgery check-up. Recovery is on track.', doctor: { name: 'Dr. Rajesh', specialty: 'Orthopedic Surgeon' } },
    { id: 'ev2', type: 'Prescription', date: '2024-07-15', title: 'Pain Medication', description: 'Prescribed Ibuprofen for post-op pain management.' },
    { id: 'ev3', type: 'Report', date: '2024-06-22', title: 'X-Ray Results', description: 'X-ray of the knee joint. Results attached.' },
    { id: 'ev4', type: 'Appointment', date: '2024-06-20', title: 'Dermatology Consultation', description: 'Cancelled by patient.', doctor: { name: 'Dr. Ram', specialty: 'Dermatologist' } },
    { id: 'ev5', type: 'Appointment', date: '2024-05-01', title: 'Annual Pediatric Check-up', description: 'Routine check-up for child. All vitals are normal.', doctor: { name: 'Dr. Vaseem', specialty: 'Pediatrician' } },
];

const App: React.FC = () => {
  // Navigation & Page State
  const [activeView, setActiveView] = useState<'home' | 'appointments'>('home');
  const [appointmentsInitialTab, setAppointmentsInitialTab] = useState<'current' | 'history'>('current');
  
  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Data & Filter State
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [doctorQuery, setDoctorQuery] = useState('');
  const [hospitalQuery, setHospitalQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  
  // UI State
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(DOCTORS_DATA);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>(HOSPITALS_DATA);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | HospitalDoctor | null>(null);
  const [selectedDoctorForProfile, setSelectedDoctorForProfile] = useState<Doctor | HospitalDoctor | null>(null);

  useEffect(() => {
    let doctors = DOCTORS_DATA;
    let hospitals = HOSPITALS_DATA;
    
    if (locationFilter && locationFilter !== 'All Locations') {
      doctors = doctors.filter(d => d.location === locationFilter);
      hospitals = hospitals.filter(h => h.location === locationFilter);
    }
    
    if (doctorQuery) {
        doctors = doctors.filter(d => 
            d.name.toLowerCase().includes(doctorQuery.toLowerCase()) || 
            d.specialty.toLowerCase().includes(doctorQuery.toLowerCase())
        );
    }
    
    if (hospitalQuery) {
        hospitals = hospitals.filter(h => 
            h.name.toLowerCase().includes(hospitalQuery.toLowerCase()) ||
            h.services.some(s => s.toLowerCase().includes(hospitalQuery.toLowerCase()))
        );
    }

    setFilteredDoctors(doctors);
    setFilteredHospitals(hospitals);
  }, [doctorQuery, hospitalQuery, locationFilter]);

  // --- Auth Handlers ---
  const handleLoginClick = () => setShowAuthModal(true);
  const handleLogout = () => setCurrentUser(null);

  const handleGoogleLogin = (userType: 'existing' | 'new') => {
      const user = userType === 'existing' ? MOCK_USER_WITH_HISTORY : MOCK_USER_NEW;
      setCurrentUser(user);
      setShowAuthModal(false);
      
      // Trigger onboarding for new users
      if (!user.hasMedicalProfile) {
          setTimeout(() => setShowOnboarding(true), 500);
      }
  };

  const handleOnboardingComplete = () => {
      if (currentUser) {
          setCurrentUser({ ...currentUser, hasMedicalProfile: true });
      }
      setShowOnboarding(false);
  };
  
  // --- Navigation Handlers ---
  const handleNavigate = (view: 'home' | 'appointments') => {
    setActiveView(view);
    if(view !== 'home') setSelectedHospital(null);
  };

  const handleLocationFilter = (location: string) => {
    setLocationFilter(location);
    setDoctorQuery('');
    setHospitalQuery('');
    setSelectedHospital(null);
  };
  
  // --- Modal & Detail View Handlers ---
  const handleSelectHospital = (hospital: Hospital) => setSelectedHospital(hospital);
  const handleCloseDetails = () => setSelectedHospital(null);
  const handleOpenBookingModal = (doctor: Doctor | HospitalDoctor) => setSelectedDoctorForBooking(doctor);
  const handleCloseBookingModal = () => setSelectedDoctorForBooking(null);
  const handleOpenProfileModal = (doctor: Doctor | HospitalDoctor) => setSelectedDoctorForProfile(doctor);
  const handleCloseProfileModal = () => setSelectedDoctorForProfile(null);

  const handleBookFromProfile = (doctor: Doctor | HospitalDoctor) => {
    handleCloseProfileModal();
    setTimeout(() => handleOpenBookingModal(doctor), 100);
  }

  const handleAppointmentBooked = (appointment: Appointment) => {
      setAppointments(prev => [appointment, ...prev]);
  };

  const handleNavigateToAppointments = (tab: 'current' | 'history') => {
    handleCloseBookingModal();
    setTimeout(() => {
        setAppointmentsInitialTab(tab);
        handleNavigate('appointments');
    }, 150);
  };
  
  const renderHomePageContent = () => {
    if (selectedHospital) {
      return (
        <HospitalDetails 
          hospital={selectedHospital} 
          onClose={handleCloseDetails} 
          onViewDoctorProfile={handleOpenProfileModal}
        />
      );
    }

    const hospitalListTitle = locationFilter === 'All Locations' ? 'All Available Hospitals' : `Hospitals in ${locationFilter}`;
    const doctorListTitle = locationFilter === 'All Locations' ? 'All Available Doctors' : `Doctors in ${locationFilter}`;

    return (
      <>
        <HeroSection
          onLocationFilter={handleLocationFilter}
          selectedLocation={locationFilter}
        />
        <div className="bg-slate-100 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-16">
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">{hospitalListTitle}</h2>
                  <div className="relative mb-8 max-w-lg">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                          </svg>
                      </div>
                      <input
                          type="text"
                          placeholder="Search for hospitals or services..."
                          value={hospitalQuery}
                          onChange={(e) => setHospitalQuery(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                  </div>
                  {filteredHospitals.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {filteredHospitals.map(hospital => <HospitalCard key={hospital.id} hospital={hospital} onSelect={handleSelectHospital} />)}
                      </div>
                  ) : (
                      <p className="text-gray-600 text-lg">No hospitals found matching your search.</p>
                  )}
              </div>

              <div>
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">{doctorListTitle}</h2>
                  <div className="relative mb-8 max-w-lg">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                          </svg>
                      </div>
                      <input
                          type="text"
                          placeholder="Search for doctors or specialties..."
                          value={doctorQuery}
                          onChange={(e) => setDoctorQuery(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                  </div>
                   {filteredDoctors.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                          {filteredDoctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} onBook={handleOpenBookingModal} onViewProfile={handleOpenProfileModal}/>)}
                      </div>
                  ) : (
                       <p className="text-gray-600 text-lg">No doctors found matching your search.</p>
                  )}
              </div>
          </div>
        </div>
      </>
    );
  };

  const renderAuthenticatedView = () => {
      if (!currentUser) return null;
      
      if (activeView === 'appointments') {
          return <AppointmentsPage appointments={appointments} initialTab={appointmentsInitialTab} />;
      }
      
      return <Dashboard user={currentUser} healthHistory={MOCK_HEALTH_HISTORY} onNavigateToAppointments={() => handleNavigate('appointments')} />;
  };

  return (
    <>
      <Navbar 
        onNavigate={handleNavigate} 
        activeView={activeView} 
        isLoggedIn={!!currentUser}
        user={currentUser}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
      />
      <main>
        {currentUser ? renderAuthenticatedView() : (activeView === 'home' ? renderHomePageContent() : <AppointmentsPage appointments={appointments} initialTab={appointmentsInitialTab} />)}
      </main>
      
      {/* Modals */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onGoogleLogin={handleGoogleLogin} />}
      {showOnboarding && currentUser && <OnboardingModal user={currentUser} onClose={handleOnboardingComplete} />}

      {selectedDoctorForBooking && (
        <BookingModal 
          doctor={selectedDoctorForBooking as Doctor}
          hospitals={HOSPITALS_DATA}
          onClose={handleCloseBookingModal}
          onAppointmentBooked={handleAppointmentBooked}
          onNavigateToAppointments={handleNavigateToAppointments}
        />
      )}
      {selectedDoctorForProfile && (
        <DoctorProfileModal 
            doctor={selectedDoctorForProfile} 
            onClose={handleCloseProfileModal} 
            onBook={handleBookFromProfile}
        />
      )}
    </>
  );
};

export default App;
