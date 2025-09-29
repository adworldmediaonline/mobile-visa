import { z } from 'zod';

// Travel Plan Schema
export const travelPlanSchema = z.object({
  passportFrom: z.string().min(1, 'Please select your passport country'),
  goingTo: z.string().min(1, 'Please select your destination country'),
});

export type TravelPlanFormData = z.infer<typeof travelPlanSchema>;

// Trip Details Schema
export const tripDetailsSchema = z.object({
  arrivalDate: z.string().min(1, 'Please select your arrival date'),
});

export type TripDetailsFormData = z.infer<typeof tripDetailsSchema>;

// Personal Details Schema
export const personalDetailsSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
});

export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;

// Residency Details Schema
export const residencyDetailsSchema = z.object({
  countryOfBirth: z.string().min(1, 'Please select your country of birth'),
  countryOfResidence: z
    .string()
    .min(1, 'Please select your country of residence'),
});

export type ResidencyDetailsFormData = z.infer<typeof residencyDetailsSchema>;

// Passport Details Schema
export const passportDetailsSchema = z.object({
  nationality: z.string().min(1, 'Please select your nationality'),
  countryOfResidence: z
    .string()
    .min(1, 'Please select your country of residence'),
  employmentStatus: z.string().min(1, 'Please select your employment status'),
  monthlyIncome: z.string().min(1, 'Please select your monthly income range'),
  ownAssets: z.boolean(),
  travelHistory: z.string().min(1, 'Please select your travel history'),
  previousVisaApplication: z
    .string()
    .min(1, 'Please answer about previous visa applications'),
  addPassportLater: z.boolean().default(false),
});

export type PassportDetailsFormData = z.infer<typeof passportDetailsSchema>;

// Email Schema for contact info
export const contactInfoSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

export type ContactInfoFormData = z.infer<typeof contactInfoSchema>;

// Validation helper functions
export const validateDateOfBirth = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  return age >= 18 && age <= 100;
};

export const validateArrivalDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  return date > today;
};

// Enhanced schemas with custom validations
export const enhancedPersonalDetailsSchema = personalDetailsSchema.refine(
  data => validateDateOfBirth(data.dateOfBirth),
  {
    message: 'You must be at least 18 years old',
    path: ['dateOfBirth'],
  }
);

export const enhancedTripDetailsSchema = tripDetailsSchema.refine(
  data => validateArrivalDate(data.arrivalDate),
  {
    message: 'Arrival date must be in the future',
    path: ['arrivalDate'],
  }
);
