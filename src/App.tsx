
import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import { Footer } from './components/Footer';
import { RegisterHospitalModal } from './components/RegisterHospitalModal';
import { RegisterDoctorModal } from './components/RegisterDoctorModal';
import { SearchSuggestions } from './components/SearchSuggestions';
import { ConfirmationModal } from './components/ConfirmationModal';
import { MedicinesPage } from './components/MedicinesPage';
import { CartPage } from './components/CartPage';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { BottomNav } from './components/BottomNav';
import { PageHeader } from './components/PageHeader';
import type { Doctor, Hospital, HospitalDoctor, Appointment, User, HealthEvent, Medicine, CartItem, DeliveryDetails, Order } from './types';

type View = 'home' | 'find-care' | 'history' | 'dashboard' | 'medicines' | 'cart';

const DOCTOR_IMAGES = {
  sudhakar: 'https://image2url.com/images/1759759993000-7fec70ae-653e-4103-bcd4-1fbbe7e13020.jpg?auto=compress&cs=tinysrgb&w=600',
  ram: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600',
  vaseem: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600',
  rajesh: 'https://images.pexels.com/photos/5327653/pexels-photo-5327653.jpeg?auto=compress&cs=tinysrgb&w=600',
  priya: 'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=600',
  anil: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600',
  kavitha: 'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=600'
};

const DOCTORS_DATA: Doctor[] = [
  { id: 1, name: 'Dr. Sudhakar', specialty: 'Cardiologist', location: 'Eluru', rating: 4.8, imageUrl: DOCTOR_IMAGES.sudhakar, qualification: 'MBBS, MD (Cardiology)', experience: 15, consultationFee: 800, bio: 'A dedicated cardiologist with 15 years of experience in treating heart conditions and promoting cardiac wellness.', satisfaction: 98, workingHours: 'Mon-Fri, 9 AM - 5 PM', contact: '+91 98765 43210', worksAt: ['Eluru Heart Center', 'City General Hospital'] },
  { id: 2, name: 'Dr. Ram', specialty: 'Dermatologist', location: 'Hanuman Junction', rating: 4.9, imageUrl: DOCTOR_IMAGES.ram, qualification: 'MBBS, DNB (Dermatology)', experience: 12, consultationFee: 600, bio: 'Specializes in cosmetic and clinical dermatology, helping patients achieve healthy and radiant skin.', satisfaction: 99, workingHours: 'Tue-Sat, 10 AM - 7 PM', contact: '+91 98765 43211', worksAt: ['Hanuman Junction Skin Clinic'] },
  { id: 3, name: 'Dr. Vaseem', specialty: 'Pediatrician', location: 'Vijayawada', rating: 4.7, imageUrl: DOCTOR_IMAGES.vaseem, qualification: 'MBBS, MD (Pediatrics)', experience: 10, consultationFee: 700, bio: 'A friendly and compassionate pediatrician committed to the health and well-being of children.', satisfaction: 97, workingHours: 'Mon-Sat, 10 AM - 6 PM', contact: '+91 98765 43212', worksAt: ["Vijayawada Children's Hospital"] },
  { id: 4, name: 'Dr. Rajesh', specialty: 'Orthopedic Surgeon', location: 'Gudivada', rating: 4.6, imageUrl: DOCTOR_IMAGES.rajesh, qualification: 'MBBS, MS (Orthopedics)', experience: 18, consultationFee: 900, bio: 'Expert in joint replacement and sports injuries, focused on restoring mobility and quality of life.', satisfaction: 96, workingHours: 'Mon-Fri, 9 AM - 4 PM', contact: '+91 98765 43213', worksAt: ['Gudivada Bone & Joint Center'] },
  { id: 5, name: 'Dr. Priya', specialty: 'Neurologist', location: 'Hyderabad', rating: 4.9, imageUrl: DOCTOR_IMAGES.priya, qualification: 'MBBS, DM (Neurology)', experience: 20, consultationFee: 1200, bio: 'Leading neurologist with extensive experience in treating complex neurological disorders.', satisfaction: 98, workingHours: 'Tue & Thu, 11 AM - 5 PM', contact: '+91 98765 43214', worksAt: ['Hyderabad Neuro Institute'] },
  { id: 6, name: 'Dr. Anil', specialty: 'Gastroenterologist', location: 'Eluru', rating: 4.5, imageUrl: DOCTOR_IMAGES.anil, qualification: 'MBBS, MD (Gen Med), DM (Gastro)', experience: 14, consultationFee: 850, bio: 'Focused on digestive health, providing expert care for a wide range of gastrointestinal issues.', satisfaction: 95, workingHours: 'Mon-Sat, 9 AM - 3 PM', contact: '+91 98765 43215', worksAt: ['Eluru Digestive Care', 'Eluru Heart Center'] },
  { id: 7, name: 'Dr. Kavitha', specialty: 'Oncologist', location: 'Vijayawada', rating: 4.8, imageUrl: DOCTOR_IMAGES.kavitha, qualification: 'MBBS, MD, DM (Oncology)', experience: 16, consultationFee: 1100, bio: 'A compassionate oncologist providing advanced cancer care and dedicated patient support.', satisfaction: 97, workingHours: 'Mon, Wed, Fri, 10 AM - 4 PM', contact: '+91 98765 43216', worksAt: ["Vijayawada Children's Hospital", 'Regional Cancer Institute'] },
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
    imageUrl: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=600',
    doctors: [
      {
        id: 101, name: 'Dr. Sudhakar', designation: 'Chief Cardiologist', 
        imageUrl: DOCTOR_IMAGES.sudhakar, 
        qualification: 'MBBS, MD (Cardiology)', experience: 15, consultationFee: 800, 
        contact: '+91 98765 43210', 
        bio: 'A dedicated cardiologist with 15 years of experience in treating heart conditions and promoting cardiac wellness.', 
        satisfaction: 98, workingHours: 'Mon-Fri, 9 AM - 5 PM', 
        worksAt: ['Eluru Heart Center', 'City General Hospital']
      },
       { 
        id: 102, name: 'Dr. Anil', designation: 'Gastroenterologist', 
        imageUrl: DOCTOR_IMAGES.anil, 
        qualification: 'MBBS, MD (Gen Med), DM (Gastro)', experience: 14, consultationFee: 850, 
        contact: '+91 98765 43215', 
        bio: 'Focused on digestive health, providing expert care for a wide range of gastrointestinal issues.', 
        satisfaction: 95, workingHours: 'Mon-Sat, 9 AM - 3 PM', 
        worksAt: ['Eluru Digestive Care', 'Eluru Heart Center']
      }
    ]
  },
  {
    id: 2,
    name: "Vijayawada Children's Hospital",
    location: 'Vijayawada',
    address: '456 Rainbow Road, Vijayawada, 520008',
    contact: '+91 86612 34567',
    services: ['Pediatrics', 'Neonatology', 'Pediatric Surgery', 'Vaccinations'],
    facilities: ['Child-Friendly Wards', 'NICU', 'Play Area', 'Emergency Care'],
    rating: 4.8,
    imageUrl: 'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=600',
    doctors: [
      {
        id: 201, name: 'Dr. Vaseem', designation: 'Senior Pediatrician',
        imageUrl: DOCTOR_IMAGES.vaseem,
        qualification: 'MBBS, MD (Pediatrics)', experience: 10, consultationFee: 700,
        contact: '+91 98765 43212',
        bio: 'A friendly and compassionate pediatrician committed to the health and well-being of children.',
        satisfaction: 97, workingHours: 'Mon-Sat, 10 AM - 6 PM',
        worksAt: ["Vijayawada Children's Hospital"]
      },
      {
        id: 202, name: 'Dr. Kavitha', designation: 'Pediatric Oncologist',
        imageUrl: DOCTOR_IMAGES.kavitha,
        qualification: 'MBBS, MD, DM (Oncology)', experience: 16, consultationFee: 1100,
        contact: '+91 98765 43216',
        bio: 'A compassionate oncologist providing advanced cancer care and dedicated patient support.',
        satisfaction: 97, workingHours: 'Mon, Wed, Fri, 10 AM - 4 PM',
        worksAt: ["Vijayawada Children's Hospital", 'Regional Cancer Institute']
      }
    ]
  },
   {
    id: 3,
    name: 'Hanuman Junction Skin Clinic',
    location: 'Hanuman Junction',
    address: '789 Glow Avenue, Hanuman Junction, 521105',
    contact: '+91 86765 43210',
    services: ['Dermatology', 'Cosmetology', 'Laser Hair Removal', 'Acne Treatment'],
    facilities: ['Advanced Laser Equipment', 'Comfortable Waiting Area', 'Pharmacy'],
    rating: 4.9,
    imageUrl: 'https://images.pexels.com/photos/373893/pexels-photo-373893.jpeg?auto=compress&cs=tinysrgb&w=600',
    doctors: [
       {
         id: 301, name: 'Dr. Ram', designation: 'Lead Dermatologist',
         imageUrl: DOCTOR_IMAGES.ram,
         qualification: 'MBBS, DNB (Dermatology)', experience: 12, consultationFee: 600,
         contact: '+91 98765 43211',
         bio: 'Specializes in cosmetic and clinical dermatology, helping patients achieve healthy and radiant skin.',
         satisfaction: 99, workingHours: 'Tue-Sat, 10 AM - 7 PM',
         worksAt: ['Hanuman Junction Skin Clinic']
       }
    ]
  },
  {
    id: 4,
    name: 'Gudivada Bone & Joint Center',
    location: 'Gudivada',
    address: '101 Mobility Street, Gudivada, 521301',
    contact: '+91 86743 21098',
    services: ['Orthopedics', 'Joint Replacement', 'Sports Medicine', 'Physiotherapy'],
    facilities: ['Digital X-Ray', 'Operation Theater', 'Rehabilitation Center'],
    rating: 4.6,
    imageUrl: 'https://images.pexels.com/photos/325682/pexels-photo-325682.jpeg?auto=compress&cs=tinysrgb&w=600',
    doctors: [
      {
        id: 401, name: 'Dr. Rajesh', designation: 'Orthopedic Surgeon',
        imageUrl: DOCTOR_IMAGES.rajesh,
        qualification: 'MBBS, MS (Orthopedics)', experience: 18, consultationFee: 900,
        contact: '+91 98765 43213',
        bio: 'Expert in joint replacement and sports injuries, focused on restoring mobility and quality of life.',
        satisfaction: 96, workingHours: 'Mon-Fri, 9 AM - 4 PM',
        worksAt: ['Gudivada Bone & Joint Center']
      }
    ]
  },
  {
    id: 5,
    name: 'Hyderabad Neuro Institute',
    location: 'Hyderabad',
    address: '222 Mindspace Road, Hitech City, Hyderabad, 500081',
    contact: '+91 40123 45678',
    services: ['Neurology', 'Neurosurgery', 'Stroke Care', 'Epilepsy Treatment'],
    facilities: ['Advanced Neuro-imaging', 'ICU', '24/7 Emergency', 'Research Wing'],
    rating: 4.9,
    imageUrl: 'https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=600',
    doctors: [
       {
        id: 501, name: 'Dr. Priya', designation: 'Senior Neurologist',
        imageUrl: DOCTOR_IMAGES.priya,
        qualification: 'MBBS, DM (Neurology)', experience: 20, consultationFee: 1200,
        contact: '+91 98765 43214',
        bio: 'Leading neurologist with extensive experience in treating complex neurological disorders.',
        satisfaction: 98, workingHours: 'Tue & Thu, 11 AM - 5 PM',
        worksAt: ['Hyderabad Neuro Institute']
       }
    ]
  },
];

const MEDICINES_DATA: Medicine[] = [
  { id: 'med1', name: 'Paracetamol 500mg', category: 'Pain Relief', description: 'Effective relief for fever, headaches, and body aches. 10 tablets.', price: 25, imageUrl: 'https://images.pexels.com/photos/4210610/pexels-photo-4210610.jpeg?auto=compress&cs=tinysrgb&w=600', requiresPrescription: false },
  { id: 'med2', name: 'Vitamin C 1000mg', category: 'Vitamins & Supplements', description: 'Boosts immunity and acts as a powerful antioxidant. 30 effervescent tablets.', price: 250, imageUrl: 'https://images.pexels.com/photos/4047076/pexels-photo-4047076.jpeg?auto=compress&cs=tinysrgb&w=600', requiresPrescription: false },
  { id: 'med3', name: 'Herbal Cough Syrup', category: 'Cold & Flu', description: 'Soothing relief for cough and sore throat. 100ml bottle.', price: 120, imageUrl: 'https://images.pexels.com/photos/5951859/pexels-photo-5951859.jpeg?auto=compress&cs=tinysrgb&w=600', requiresPrescription: false },
  { id: 'med4', name: 'Antacid Gel', category: 'Digestive Health', description: 'Provides fast relief from heartburn and indigestion. 170ml bottle.', price: 90, imageUrl: 'https://images.pexels.com/photos/8438069/pexels-photo-8438069.jpeg?auto=compress&cs=tinysrgb&w=600', requiresPrescription: false },
  { id: 'med5', name: 'Medicated Band-Aids', category: 'First Aid', description: 'Antiseptic and waterproof bandages for cuts and scrapes. Pack of 50.', price: 75, imageUrl: 'https://images.pexels.com/photos/5793952/pexels-photo-5793952.jpeg?auto=compress&cs=tinysrgb&w=600', requiresPrescription: false },
  { id: 'med6', name: 'Multivitamin Tablets', category: 'Vitamins & Supplements', description: 'A daily dose of essential vitamins and minerals for overall health. 60 tablets.', price: 450, imageUrl: 'https://images.pexels.com/photos/4725667/pexels-photo-4725667.jpeg?auto=compress&cs=tinysrgb&w=600', requiresPrescription: false },
  { id: 'med7', name: 'Ibuprofen 400mg', category: 'Pain Relief', description: 'Reduces inflammation and provides relief from moderate pain. 15 tablets.', price: 40, imageUrl: 'https://images.pexels.com/photos/3807379/pexels-photo-3807379.jpeg?auto=compress&cs=tinysrgb&w=600', requiresPrescription: true },
  { id: 'med8', name: 'Cetirizine 10mg', category: 'Cold & Flu', description: 'Anti-allergic tablets for relief from cold symptoms and allergies. 10 tablets.', price: 30, imageUrl: 'https://images.pexels.com/photos/4210611/pexels-photo-4210611.jpeg?auto=compress&cs=tinysrgb&w=600', requiresPrescription: false },
];

const EXISTING_USER: User = {
  id: 'user123',
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  profilePictureUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
  hasMedicalProfile: true,
};

const NEW_USER: User = {
    id: 'user456',
    name: 'Maria Garcia',
    email: 'maria.g@example.com',
    profilePictureUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasMedicalProfile: false,
};

const SAMPLE_APPOINTMENTS: Appointment[] = [
    {
      id: 'APT12345',
      doctor: DOCTORS_DATA[0],
      hospital: 'Eluru Heart Center',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '10:00 AM',
      status: 'Upcoming',
      paymentStatus: 'Paid',
    },
    {
      id: 'APT67890',
      doctor: DOCTORS_DATA[2],
      hospital: "Vijayawada Children's Hospital",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '02:30 PM',
      status: 'Completed',
      paymentStatus: 'Paid',
      doctorRating: 4,
      serviceRating: 5
    },
];

const SAMPLE_HEALTH_HISTORY: HealthEvent[] = [
    {
        id: 'EVT001',
        type: 'Appointment',
        date: SAMPLE_APPOINTMENTS[1].date,
        title: 'Follow-up with Dr. Vaseem',
        description: 'Routine check-up for the little one. Everything is on track.',
        doctor: { name: 'Dr. Vaseem', specialty: 'Pediatrician' }
    },
    {
        id: 'EVT002',
        type: 'Prescription',
        date: SAMPLE_APPOINTMENTS[1].date,
        title: 'Vitamin D Supplements',
        description: 'Prescribed Vitamin D drops for the baby.',
        doctor: { name: 'Dr. Vaseem', specialty: 'Pediatrician' }
    },
     {
        id: 'EVT003',
        type: 'Report',
        date: '2024-05-20',
        title: 'Annual Blood Test Results',
        description: 'All markers are within the normal range. Cholesterol is slightly elevated.',
        doctor: { name: 'Dr. Sudhakar', specialty: 'Cardiologist' }
    }
];

const LOCATIONS = [
    "All Locations", "Eluru", "Hanuman Junction", "Vijayawada", "Gudivada", "Hyderabad"
];

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [viewHistory, setViewHistory] = useState<View[]>(['home']);
  const [activeCareView, setActiveCareView] = useState<'doctors' | 'hospitals'>('doctors');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    }
  }, []);

  useEffect(() => {
      if (theme === 'dark') {
          document.documentElement.classList.add('dark');
      } else {
          document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
      setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Modal states
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | HospitalDoctor | null>(null);
  const [selectedDoctorForProfile, setSelectedDoctorForProfile] = useState<Doctor | HospitalDoctor | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isRegisterHospitalModalOpen, setIsRegisterHospitalModalOpen] = useState(false);
  const [isRegisterDoctorModalOpen, setIsRegisterDoctorModalOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(null);
  
  // User state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [healthHistory, setHealthHistory] = useState<HealthEvent[]>([]);
  
  // Cart & Checkout state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Filtering logic
  const filteredDoctors = useMemo(() => {
    return DOCTORS_DATA.filter(doctor => {
      const locationMatch = selectedLocation === 'All Locations' || doctor.location === selectedLocation;
      const searchMatch = !searchTerm || doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      return locationMatch && searchMatch;
    });
  }, [selectedLocation, searchTerm]);

  const filteredHospitals = useMemo(() => {
    return HOSPITALS_DATA.filter(hospital => {
      const locationMatch = selectedLocation === 'All Locations' || hospital.location === selectedLocation;
      const searchMatch = !searchTerm || hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) || hospital.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      return locationMatch && searchMatch;
    });
  }, [selectedLocation, searchTerm]);

  // Handlers
  const handleLocationFilter = (location: string) => {
    setSelectedLocation(location);
    setSearchTerm('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 1) {
        const docSuggestions = DOCTORS_DATA
            .filter(d => d.name.toLowerCase().includes(value.toLowerCase()) || d.specialty.toLowerCase().includes(value.toLowerCase()))
            .map(d => `${d.name} (${d.specialty})`);
        const hospSuggestions = HOSPITALS_DATA
            .filter(h => h.name.toLowerCase().includes(value.toLowerCase()))
            .map(h => h.name);
        setSearchSuggestions([...new Set([...docSuggestions, ...hospSuggestions])].slice(0, 5));
        setShowSuggestions(true);
    } else {
        setShowSuggestions(false);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
      setSearchTerm(suggestion.split(' (')[0]);
      setShowSuggestions(false);
  };
  
  const handleNavigate = useCallback((newView: View) => {
      if ((newView !== 'home' && newView !== 'find-care') && !isLoggedIn) {
          setIsAuthModalOpen(true);
          return;
      }
      
      setView(prevView => {
          setViewHistory(history => [...history, prevView]);
          return newView;
      });
      setSelectedHospital(null);
      setSearchTerm('');
  }, [isLoggedIn]);

  const handleBack = () => {
      const newHistory = [...viewHistory];
      const lastView = newHistory.pop();
      if (lastView) {
          setView(lastView);
          setViewHistory(newHistory);
      }
  };

  const handleAuthSuccess = (user: User) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    setIsAuthModalOpen(false);

    if (user.hasMedicalProfile) {
        setAppointments(SAMPLE_APPOINTMENTS);
        setHealthHistory(SAMPLE_HEALTH_HISTORY);
        handleNavigate('home');
    } else {
        setAppointments([]);
        setHealthHistory([]);
        setIsOnboardingModalOpen(true);
    }
  };

  const handleLogin = (email: string): boolean => {
    if (email.toLowerCase() === EXISTING_USER.email.toLowerCase()) {
        handleAuthSuccess(EXISTING_USER);
        return true;
    }
    if (email.toLowerCase() === NEW_USER.email.toLowerCase()) {
        handleAuthSuccess(NEW_USER);
        return true;
    }
    return false;
  };

  const handleSignUp = (name: string, email: string): 'success' | 'exists' => {
      if (email.toLowerCase() === EXISTING_USER.email.toLowerCase() || email.toLowerCase() === NEW_USER.email.toLowerCase()) {
          return 'exists';
      }
      const newUser: User = {
          id: `user_${Date.now()}`,
          name: name,
          email: email,
          profilePictureUrl: `https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?auto=compress&cs=tinysrgb&w=400`,
          hasMedicalProfile: false,
      };
      handleAuthSuccess(newUser);
      return 'success';
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      setCurrentUser(null);
      setAppointments([]);
      setHealthHistory([]);
      setCart([]);
      setView('home');
      setViewHistory(['home']);
  };

  const handleAppointmentBooked = (appointment: Appointment) => {
      setAppointments(prev => [...prev, appointment]);
  };

  const handleUpdateRating = (appointmentId: string, doctorRating: number, serviceRating: number) => {
      setAppointments(prev => prev.map(app => 
          app.id === appointmentId ? { ...app, doctorRating, serviceRating } : app
      ));
  };
  
  const handleRequestCancelAppointment = (appointmentId: string) => {
    setAppointmentToCancel(appointmentId);
  };

  const handleConfirmCancelAppointment = () => {
    if (appointmentToCancel) {
      setAppointments(prev =>
        prev.map(app =>
          app.id === appointmentToCancel ? { ...app, status: 'Cancelled' } : app
        )
      );
      setAppointmentToCancel(null);
    }
  };

  const handleRebookAppointment = (doctor: Doctor | HospitalDoctor) => {
    setSelectedDoctorForBooking(doctor);
  };

  const handleCloseOnboarding = () => {
      setIsOnboardingModalOpen(false);
      if(currentUser){
          setCurrentUser({...currentUser, hasMedicalProfile: true});
          setView('home');
      }
  }

  // Cart & Checkout Handlers
  const handleAddToCart = (medicineId: string) => {
    if (!isLoggedIn) {
        setIsAuthModalOpen(true);
        return;
    }
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.medicineId === medicineId);
      if (existingItem) {
        return prevCart.map(item =>
          item.medicineId === medicineId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { medicineId, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (medicineId: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveFromCart(medicineId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => (item.medicineId === medicineId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (medicineId: string) => {
    setCart(prevCart => prevCart.filter(item => item.medicineId !== medicineId));
  };

  const handleProceedToCheckout = () => {
      setIsCheckoutModalOpen(true);
  };

  const handlePlaceOrder = (details: DeliveryDetails, paymentMethod: 'Online Payment' | 'Cash on Delivery') => {
    const subtotal = cart.reduce((total, item) => {
        const medicine = MEDICINES_DATA.find(m => m.id === item.medicineId);
        return total + (medicine ? medicine.price * item.quantity : 0);
    }, 0);
    const deliveryFee = subtotal > 0 ? 50 : 0;
    const total = subtotal + deliveryFee;

    const newOrder: Order = {
        id: `ORD${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        items: cart,
        total,
        paymentMethod,
        ...details
    };

    setConfirmedOrder(newOrder);
    setIsCheckoutModalOpen(false);
    setIsConfirmationModalOpen(true);
    setCart([]);
  };

  const pageTitles: Record<View, string> = {
    home: 'Home',
    'find-care': 'Doctors & Hospitals',
    history: 'Your Appointments',
    dashboard: 'Your Health History',
    medicines: 'Order Medicines',
    cart: 'Shopping Cart',
  };
  
  const showHeader = !['home', 'find-care'].includes(view);

  const renderCurrentView = () => {
    if (selectedHospital) {
      return (
        <HospitalDetails 
          hospital={selectedHospital} 
          onClose={() => setSelectedHospital(null)}
          onViewDoctorProfile={(doctor) => setSelectedDoctorForProfile(doctor)}
        />
      );
    }
    
    switch (view) {
      case 'home':
        return <HeroSection onAppointmentClick={() => handleNavigate('find-care')} onMedicinesClick={() => handleNavigate('medicines')} />;
      case 'find-care':
        return (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-up">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-text-primary">Find Care</h1>
                <p className="mt-2 text-lg text-text-secondary">Select a category to begin your search.</p>
            </div>
            <div className="flex justify-center mb-8 gap-4">
                <button
                    onClick={() => setActiveCareView('doctors')}
                    className={`px-8 py-3 text-lg font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1 ${activeCareView === 'doctors' ? 'bg-gold-400 text-accent-text shadow-lg' : 'bg-card-bg text-text-primary shadow dark:bg-charcoal-light'}`}
                >
                    Doctors
                </button>
                <button
                    onClick={() => setActiveCareView('hospitals')}
                    className={`px-8 py-3 text-lg font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1 ${activeCareView === 'hospitals' ? 'bg-gold-400 text-accent-text shadow-lg' : 'bg-card-bg text-text-primary shadow dark:bg-charcoal-light'}`}
                >
                    Hospitals
                </button>
            </div>
            <div className="mt-12">
                <div className="mb-10 max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={`Search for ${activeCareView}...`}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={() => setShowSuggestions(searchTerm.length > 1)}
                            className="w-full px-5 py-4 text-lg text-gray-800 bg-white border-2 border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all dark:bg-charcoal-light dark:border-gray-600 dark:text-gray-200"
                        />
                        <SearchSuggestions 
                            suggestions={searchSuggestions}
                            show={showSuggestions}
                            onSelect={handleSuggestionSelect}
                            onClose={() => setShowSuggestions(false)}
                        />
                    </div>
                </div>
            
                {activeCareView === 'doctors' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredDoctors.map(doctor => (
                        <DoctorCard key={doctor.id} doctor={doctor} onBook={() => setSelectedDoctorForBooking(doctor)} onViewProfile={() => setSelectedDoctorForProfile(doctor)} />
                    ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredHospitals.map(hospital => (
                        <HospitalCard key={hospital.id} hospital={hospital} onSelect={() => setSelectedHospital(hospital)} />
                    ))}
                    </div>
                )}
            </div>
          </main>
        );
      case 'dashboard':
        return currentUser && <Dashboard user={currentUser} healthHistory={healthHistory} onNavigateToAppointments={() => handleNavigate('history')} />;
      case 'history':
        return <AppointmentsPage appointments={appointments} onUpdateRating={handleUpdateRating} onCancelAppointment={handleRequestCancelAppointment} onRebookAppointment={handleRebookAppointment}/>;
      case 'medicines':
        return <MedicinesPage medicines={MEDICINES_DATA} onAddToCart={handleAddToCart} />;
      case 'cart':
        return <CartPage cartItems={cart} medicines={MEDICINES_DATA} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveFromCart} onProceedToCheckout={handleProceedToCheckout} onContinueShopping={() => handleNavigate('medicines')} />;
      default:
        return null;
    }
  };

  const cartItemCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <Navbar
        onNavigate={handleNavigate}
        activeView={view}
        isLoggedIn={isLoggedIn}
        user={currentUser}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenRegisterHospital={() => setIsRegisterHospitalModalOpen(true)}
        onOpenRegisterDoctor={() => setIsRegisterDoctorModalOpen(true)}
        locations={LOCATIONS}
        selectedLocation={selectedLocation}
        onLocationFilter={handleLocationFilter}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      {/* FIX: Changed showBottomNav to isLoggedIn to correctly determine if the bottom nav is visible */}
      <main className={`flex-grow pt-20 ${isLoggedIn ? 'pb-20' : ''}`}>
        {showHeader && <PageHeader title={pageTitles[view]} onBack={handleBack} />}
        {renderCurrentView()}
      </main>

      {isLoggedIn && <BottomNav activeView={view} onNavigate={handleNavigate} cartItemCount={cartItemCount} />}

      <Footer />

      {/* Modals */}
      {selectedDoctorForBooking && <BookingModal doctor={selectedDoctorForBooking} hospitals={HOSPITALS_DATA} onClose={() => setSelectedDoctorForBooking(null)} onAppointmentBooked={handleAppointmentBooked} onNavigateToAppointments={() => handleNavigate('history')} />}
      {selectedDoctorForProfile && <DoctorProfileModal doctor={selectedDoctorForProfile} onClose={() => setSelectedDoctorForProfile(null)} onBook={(doc) => { setSelectedDoctorForProfile(null); setSelectedDoctorForBooking(doc); }} />}
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} onSignUp={handleSignUp} />}
      {isOnboardingModalOpen && currentUser && <OnboardingModal user={currentUser} onClose={handleCloseOnboarding} />}
      {isRegisterHospitalModalOpen && <RegisterHospitalModal onClose={() => setIsRegisterHospitalModalOpen(false)} />}
      {isRegisterDoctorModalOpen && <RegisterDoctorModal onClose={() => setIsRegisterDoctorModalOpen(false)} />}
      
      {isCheckoutModalOpen && <CheckoutModal
        cartItems={cart}
        medicines={MEDICINES_DATA}
        onClose={() => setIsCheckoutModalOpen(false)}
        onPlaceOrder={handlePlaceOrder}
      />}

      {isConfirmationModalOpen && confirmedOrder && <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => {
            setIsConfirmationModalOpen(false);
            setConfirmedOrder(null);
            handleNavigate('medicines');
        }}
      />}

      <ConfirmationModal
        isOpen={!!appointmentToCancel}
        onClose={() => setAppointmentToCancel(null)}
        onConfirm={handleConfirmCancelAppointment}
        title="Cancel Appointment"
        message="Are you sure you want to cancel this appointment? This action cannot be undone."
        confirmButtonText="Yes, Cancel"
      />
    </div>
  );
};

export default App;
