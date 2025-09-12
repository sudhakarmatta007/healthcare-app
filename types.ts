export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  imageUrl: string;
  qualification: string;
  experience: number; // in years
  consultationFee: number;
  contact: string;
  bio: string;
  satisfaction: number; // percentage
  workingHours: string;
  worksAt: string[];
}

export interface HospitalDoctor {
  id: number;
  name: string;
  designation: string;
  imageUrl: string;
  qualification: string;
  experience: number; // in years
  consultationFee: number;
  contact: string;
  bio: string;
  satisfaction: number; // percentage
  workingHours: string;
  worksAt: string[];
}

export interface Hospital {
  id: number;
  name: string;
  location: string;
  address: string;
  contact: string;
  services: string[];
  facilities: string[];
  rating: number;
  imageUrl: string;
  doctors: HospitalDoctor[];
}

export interface Appointment {
  id: string;
  doctor: Doctor | HospitalDoctor;
  hospital: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  paymentStatus: 'Paid';
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePictureUrl: string;
  hasMedicalProfile: boolean;
}

export interface HealthEvent {
  id: string;
  type: 'Appointment' | 'Prescription' | 'Report';
  date: string;
  title: string;
  description: string;
  doctor?: {
    name: string;
    specialty: string;
  };
}
