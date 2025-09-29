import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types for the visa application state
export interface TravelPlan {
  passportFrom: string;
  goingTo: string;
}

export interface VisaType {
  id: string;
  name: string;
  description: string;
  validity: string;
  entries: string;
  governmentFee: number;
}

export interface TripDetails {
  arrivalDate: string;
}

export interface PersonalDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
}

export interface ResidencyDetails {
  countryOfBirth: string;
  countryOfResidence: string;
}

export interface PassportDetails {
  nationality: string;
  countryOfResidence: string;
  employmentStatus: string;
  monthlyIncome: string;
  ownAssets: boolean;
  travelHistory: string;
  previousVisaApplication: string;
  addPassportLater: boolean;
}

export interface Traveler {
  id: string;
  name: string;
  details?: PersonalDetails;
}

export interface ProcessingOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface VisaApplicationState {
  // Current step tracking
  currentStep: number;
  totalSteps: number;
  
  // Application data
  travelPlan: TravelPlan | null;
  selectedVisaType: VisaType | null;
  tripDetails: TripDetails | null;
  passportUploadCompleted: boolean;
  personalDetails: PersonalDetails | null;
  residencyDetails: ResidencyDetails | null;
  passportDetails: PassportDetails | null;
  travelers: Traveler[];
  selectedProcessingOption: ProcessingOption | null;
  
  // UI state
  isLoading: boolean;
  hasExistingApplication: boolean;
  
  // Actions
  setCurrentStep: (step: number) => void;
  setTravelPlan: (plan: TravelPlan) => void;
  setSelectedVisaType: (visaType: VisaType) => void;
  setTripDetails: (details: TripDetails) => void;
  setPassportUploadCompleted: (completed: boolean) => void;
  setPersonalDetails: (details: PersonalDetails) => void;
  setResidencyDetails: (details: ResidencyDetails) => void;
  setPassportDetails: (details: PassportDetails) => void;
  addTraveler: (traveler: Traveler) => void;
  updateTraveler: (id: string, traveler: Partial<Traveler>) => void;
  removeTraveler: (id: string) => void;
  setSelectedProcessingOption: (option: ProcessingOption) => void;
  setIsLoading: (loading: boolean) => void;
  saveAndExit: () => void;
  resetApplication: () => void;
  calculateTotalPrice: () => number;
}

const initialState = {
  currentStep: 1,
  totalSteps: 12,
  travelPlan: null,
  selectedVisaType: null,
  tripDetails: null,
  passportUploadCompleted: false,
  personalDetails: null,
  residencyDetails: null,
  passportDetails: null,
  travelers: [],
  selectedProcessingOption: null,
  isLoading: false,
  hasExistingApplication: false,
};

export const useVisaApplicationStore = create<VisaApplicationState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentStep: (step: number) => set({ currentStep: step }),

      setTravelPlan: (plan: TravelPlan) => 
        set({ 
          travelPlan: plan,
          hasExistingApplication: true 
        }),

      setSelectedVisaType: (visaType: VisaType) => 
        set({ 
          selectedVisaType: visaType,
          hasExistingApplication: true 
        }),

      setTripDetails: (details: TripDetails) => 
        set({ 
          tripDetails: details,
          hasExistingApplication: true 
        }),

      setPassportUploadCompleted: (completed: boolean) => 
        set({ 
          passportUploadCompleted: completed,
          hasExistingApplication: true 
        }),

      setPersonalDetails: (details: PersonalDetails) => 
        set({ 
          personalDetails: details,
          hasExistingApplication: true 
        }),

      setResidencyDetails: (details: ResidencyDetails) => 
        set({ 
          residencyDetails: details,
          hasExistingApplication: true 
        }),

      setPassportDetails: (details: PassportDetails) => 
        set({ 
          passportDetails: details,
          hasExistingApplication: true 
        }),

      addTraveler: (traveler: Traveler) => 
        set((state) => ({ 
          travelers: [...state.travelers, traveler],
          hasExistingApplication: true 
        })),

      updateTraveler: (id: string, updatedTraveler: Partial<Traveler>) => 
        set((state) => ({
          travelers: state.travelers.map(t => 
            t.id === id ? { ...t, ...updatedTraveler } : t
          ),
          hasExistingApplication: true
        })),

      removeTraveler: (id: string) => 
        set((state) => ({
          travelers: state.travelers.filter(t => t.id !== id),
          hasExistingApplication: true
        })),

      setSelectedProcessingOption: (option: ProcessingOption) => 
        set({ 
          selectedProcessingOption: option,
          hasExistingApplication: true 
        }),

      setIsLoading: (loading: boolean) => set({ isLoading: loading }),

      saveAndExit: () => {
        set({ hasExistingApplication: true });
        // Additional save logic can be added here
      },

      resetApplication: () => 
        set({ 
          ...initialState,
          hasExistingApplication: false 
        }),

      calculateTotalPrice: () => {
        const state = get();
        const governmentFee = state.selectedVisaType?.governmentFee || 0;
        const processingFee = state.selectedProcessingOption?.price || 0;
        const travelerCount = Math.max(1, state.travelers.length);
        
        return (governmentFee + processingFee) * travelerCount;
      },
    }),
    {
      name: 'visa-application-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        currentStep: state.currentStep,
        travelPlan: state.travelPlan,
        selectedVisaType: state.selectedVisaType,
        tripDetails: state.tripDetails,
        passportUploadCompleted: state.passportUploadCompleted,
        personalDetails: state.personalDetails,
        residencyDetails: state.residencyDetails,
        passportDetails: state.passportDetails,
        travelers: state.travelers,
        selectedProcessingOption: state.selectedProcessingOption,
        hasExistingApplication: state.hasExistingApplication,
      }),
    }
  )
);
