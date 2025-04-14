
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  SECRETARY_NURSE: 'secretary_nurse',
  PATIENT: 'patient',
};
