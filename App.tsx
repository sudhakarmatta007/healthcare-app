
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
import { Footer } from './components/Footer';
import { RegisterHospitalModal } from './components/RegisterHospitalModal';
import { RegisterDoctorModal } from './components/RegisterDoctorModal';
import type { Doctor, Hospital, HospitalDoctor, Appointment, User, HealthEvent } from './types';

const DOCTORS_DATA: Doctor[] = [
  { id: 1, name: 'Dr. Sudhakar', specialty: 'Cardiologist', location: 'Eluru', rating: 4.8, imageUrl: 'https://images.pexels.com/photos/5207104/pexels-photo-5207104.jpeg?auto=compress&cs=tinysrgb&w=400', qualification: 'MBBS, MD (Cardiology)', experience: 15, consultationFee: 800, bio: 'A dedicated cardiologist with 15 years of experience in treating heart conditions and promoting cardiac wellness.', satisfaction: 98, workingHours: 'Mon-Fri, 9 AM - 5 PM', contact: '+91 98765 43210', worksAt: ['Eluru Heart Center', 'City General Hospital'] },
  { id: 2, name: 'Dr. Ram', specialty: 'Dermatologist', location: 'Hanuman Junction', rating: 4.9, imageUrl: 'https://images.pexels.com/photos/5792911/pexels-photo-5792911.jpeg?auto=compress&cs=tinysrgb&w=400', qualification: 'MBBS, DNB (Dermatology)', experience: 12, consultationFee: 600, bio: 'Specializes in cosmetic and clinical dermatology, helping patients achieve healthy and radiant skin.', satisfaction: 99, workingHours: 'Tue-Sat, 10 AM - 7 PM', contact: '+91 98765 43211', worksAt: ['Hanuman Junction Skin Clinic'] },
  { id: 3, name: 'Dr. Vaseem', specialty: 'Pediatrician', location: 'Vijayawada', rating: 4.7, imageUrl: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400', qualification: 'MBBS, MD (Pediatrics)', experience: 10, consultationFee: 700, bio: 'A friendly and compassionate pediatrician committed to the health and well-being of children.', satisfaction: 97, workingHours: 'Mon-Sat, 10 AM - 6 PM', contact: '+91 98765 43212', worksAt: ["Vijayawada Children's Hospital"] },
  { id: 4, name: 'Dr. Rajesh', specialty: 'Orthopedic Surgeon', location: 'Gudivada', rating: 4.6, imageUrl: 'https://images.pexels.com/photos/4270088/pexels-photo-4270088.jpeg?auto=compress&cs=tinysrgb&w=400', qualification: 'MBBS, MS (Orthopedics)', experience: 18, consultationFee: 900, bio: 'Expert in joint replacement and sports injuries, focused on restoring mobility and quality of life.', satisfaction: 96, workingHours: 'Mon-Fri, 9 AM - 4 PM', contact: '+91 98765 43213', worksAt: ['Gudivada Bone & Joint Center'] },
  { id: 5, name: 'Dr. Priya', specialty: 'Neurologist', location: 'Hyderabad', rating: 4.9, imageUrl: 'https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=400', qualification: 'MBBS, DM (Neurology)', experience: 20, consultationFee: 1200, bio: 'Leading neurologist with extensive experience in treating complex neurological disorders.', satisfaction: 98, workingHours: 'Tue & Thu, 11 AM - 5 PM', contact: '+91 98765 43214', worksAt: ['Hyderabad Neuro Institute'] },
  { id: 6, name: 'Dr. Anil', specialty: 'Gastroenterologist', location: 'Eluru', rating: 4.5, imageUrl: 'https://images.pexels.com/photos/6234609/pexels-photo-6234609.jpeg?auto=compress&cs=tinysrgb&w=400', qualification: 'MBBS, MD (Gen Med), DM (Gastro)', experience: 14, consultationFee: 850, bio: 'Focused on digestive health, providing expert care for a wide range of gastrointestinal issues.', satisfaction: 95, workingHours: 'Mon-Sat, 9 AM - 3 PM', contact: '+91 98765 43215', worksAt: ['Eluru Digestive Care'] },
  { id: 7, name: 'Dr. Kavitha', specialty: 'Oncologist', location: 'Vijayawada', rating: 4.8, imageUrl: 'https://images.pexels.com/photos/5214995/pexels-photo-5214995.jpeg?auto=compress&cs=tinysrgb&w=400', qualification: 'MBBS, MD, DM (Oncology)', experience: 16, consultationFee: 1100, bio: 'A compassionate oncologist providing advanced cancer care and dedicated patient support.', satisfaction: 97, workingHours: 'Mon, Wed, Fri, 10 AM - 4 PM', contact: '+91 98765 43216', worksAt: ["Vijayawada Children's Hospital", 'Regional Cancer Institute'] },
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
      { id: 101, name: 'Dr