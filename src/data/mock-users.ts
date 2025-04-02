
import { ROLES } from '@/lib/utils';

// Mock user data for demonstration
export const MOCK_USERS = [
  {
    id: "admin-1",
    email: "admin@example.com",
    password: "password123",
    name: "Admin User",
    role: ROLES.ADMIN,
    twoFactorEnabled: false,
  },
  {
    id: "doctor-1",
    email: "doctor@example.com",
    password: "password123",
    name: "Dr. Maria Santos",
    role: ROLES.DOCTOR,
    specialty: "Obstetrics and Gynecology",
    twoFactorEnabled: false,
  },
  {
    id: "secretary-1",
    email: "secretary@example.com",
    password: "password123",
    name: "Ana Ramirez",
    role: ROLES.SECRETARY_NURSE,
    twoFactorEnabled: false,
  },
  {
    id: "patient-1",
    email: "patient@example.com",
    password: "password123",
    name: "Patient User",
    role: ROLES.PATIENT,
    twoFactorEnabled: false,
    pregnancyStatus: {
      isPregnant: true,
      gestationalAge: 22,
      dueDate: new Date('2023-09-15')
    }
  },
];
