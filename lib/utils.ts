import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  // Use dayjs for consistent date formatting
  return dayjs(date).format('MMMM D, YYYY');
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
