
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistance } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  SECRETARY_NURSE: 'secretary_nurse',
  PATIENT: 'patient',
};

// Date formatting functions
export const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatTime = (date: string | Date): string => {
  return format(new Date(date), 'h:mm a');
};

export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), 'MMM dd, yyyy h:mm a');
};

export const formatRelativeTime = (date: string | Date): string => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Generate time slots for appointment booking
export const generateTimeSlots = (startHour = 8, endHour = 17, intervalMinutes = 30): string[] => {
  const slots: string[] = [];
  const startTime = new Date();
  startTime.setHours(startHour, 0, 0, 0);
  
  const endTime = new Date();
  endTime.setHours(endHour, 0, 0, 0);
  
  while (startTime < endTime) {
    slots.push(format(startTime, 'h:mm a'));
    startTime.setMinutes(startTime.getMinutes() + intervalMinutes);
  }
  
  return slots;
};

// User role type definition
export type UserRole = 'admin' | 'doctor' | 'secretary_nurse' | 'patient';
