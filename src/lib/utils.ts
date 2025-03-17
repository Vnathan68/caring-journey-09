import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)} at ${formatTime(date)}`
}

export function generateTimeSlots(startHour: number = 8, endHour: number = 17, intervalMinutes: number = 30): string[] {
  const timeSlots: string[] = []
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const isPM = hour >= 12
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
      const formattedMinute = minute.toString().padStart(2, '0')
      const period = isPM ? 'PM' : 'AM'
      
      timeSlots.push(`${displayHour}:${formattedMinute} ${period}`)
    }
  }
  
  return timeSlots
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Animation utilities
export const fadeIn = (delay: number = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay,
      duration: 0.5,
    },
  },
})

export const slideUp = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
})

export const staggerChildren = (staggerTime: number = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime,
    },
  },
})

// Role-based utilities
export const ROLES = {
  SECRETARY_NURSE: 'secretary_nurse',
  DOCTOR: 'doctor',
  PATIENT: 'patient',
} as const

export type UserRole = (typeof ROLES)[keyof typeof ROLES]

export function hasRequiredRole(userRole: UserRole, requiredRoles: UserRole[]): boolean {
  return requiredRoles.includes(userRole)
}
