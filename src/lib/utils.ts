
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

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  return formatDate(date);
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

export function calculateWeeksBetween(startDate: Date, endDate: Date): number {
  const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.floor(diffTime / oneWeek);
}

export function calculateGestationalAge(dueDate: Date): number {
  const fullTerm = 40; // Full term pregnancy in weeks
  const today = new Date();
  const weeksRemaining = calculateWeeksBetween(today, dueDate);
  return fullTerm - weeksRemaining;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function groupByDate<T>(items: T[], dateSelector: (item: T) => Date): Record<string, T[]> {
  const groups: Record<string, T[]> = {};
  
  items.forEach(item => {
    const date = dateSelector(item);
    const dateKey = date.toISOString().split('T')[0];
    
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    
    groups[dateKey].push(item);
  });
  
  return groups;
}

export function sortByDate<T>(items: T[], dateSelector: (item: T) => Date, ascending: boolean = false): T[] {
  return [...items].sort((a, b) => {
    const dateA = dateSelector(a).getTime();
    const dateB = dateSelector(b).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
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
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  SECRETARY_NURSE: 'secretary_nurse',
  PATIENT: 'patient',
} as const

export type UserRole = (typeof ROLES)[keyof typeof ROLES]

export function hasRequiredRole(userRole: UserRole, requiredRoles: UserRole[]): boolean {
  return requiredRoles.includes(userRole)
}

// Pregnancy utilities
export const TRIMESTERS = {
  FIRST: { name: 'First Trimester', range: [1, 13] },
  SECOND: { name: 'Second Trimester', range: [14, 26] },
  THIRD: { name: 'Third Trimester', range: [27, 40] },
} as const

export function getTrimesterByWeek(week: number): string {
  if (week <= TRIMESTERS.FIRST.range[1]) return TRIMESTERS.FIRST.name;
  if (week <= TRIMESTERS.SECOND.range[1]) return TRIMESTERS.SECOND.name;
  return TRIMESTERS.THIRD.name;
}

export function getPregnancyProgress(gestationalAge: number): number {
  const fullTerm = 40; // Full term pregnancy in weeks
  return (gestationalAge / fullTerm) * 100;
}

// Returns a day-by-day description of what happens for each week of a pregnancy
export function getPregnancyMilestones(): Record<number, string> {
  return {
    4: 'Embryo implants in uterus',
    6: 'Heartbeat can be detected',
    8: 'All essential organs begin to form',
    12: 'End of first trimester, baby is fully formed',
    16: 'Baby's gender may be visible on ultrasound',
    18: 'Baby begins to hear sounds',
    20: 'Detailed anatomy scan typically performed',
    24: 'Baby is viable outside the womb with medical support',
    28: 'Third trimester begins, baby opens eyes',
    32: 'Baby practices breathing movements',
    36: 'Baby gains weight rapidly',
    37: 'Baby is considered full term',
    40: 'Due date!'
  };
}
