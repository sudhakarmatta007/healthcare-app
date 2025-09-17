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
  doctorRating?: number;
  serviceRating?: number;
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

export interface Medicine {
  id: string;
  name: string;
  category: 'Pain Relief' | 'Vitamins & Supplements' | 'Cold & Flu' | 'Digestive Health' | 'First Aid';
  description: string;
  price: number;
  imageUrl: string;
  requiresPrescription: boolean;
}

export interface CartItem {
  medicineId: string;
  quantity: number;
}

export interface DeliveryDetails {
  name: string;
  address: string;
  contact: string;
}

export interface Order extends DeliveryDetails {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: 'Online Payment' | 'Cash on Delivery';
}
