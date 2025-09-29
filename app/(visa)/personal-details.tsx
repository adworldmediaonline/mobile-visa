import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { ScreenContainer } from '@/components/ui/screen-container';
import {
  PersonalDetailsFormData,
  enhancedPersonalDetailsSchema,
} from '@/lib/validations';
import { useVisaApplicationStore } from '@/store/visa-application-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

export default function PersonalDetailsScreen() {
  const {
    personalDetails,
    selectedVisaType,
    setPersonalDetails,
    setCurrentStep,
    saveAndExit,
    isLoading,
  } = useVisaApplicationStore();

  const form = useForm<PersonalDetailsFormData>({
    resolver: zodResolver(enhancedPersonalDetailsSchema),
    defaultValues: {
      firstName: personalDetails?.firstName || '',
      middleName: personalDetails?.middleName || '',
      lastName: personalDetails?.lastName || '',
      dateOfBirth: personalDetails?.dateOfBirth || '',
    },
  });

  const onSubmit = (data: PersonalDetailsFormData) => {
    setPersonalDetails(data);
    setCurrentStep(6);
    router.push('/(visa)/residency-details');
  };

  const handleSaveExit = () => {
    const currentData = form.getValues();
    if (currentData.firstName || currentData.lastName) {
      setPersonalDetails(currentData);
    }
    saveAndExit();
    router.push('/(tabs)');
  };

  return (
    <ScreenContainer
      title="Your personal details"
      subtitle="Enter the details exactly as they appear on your passport."
      showProgress
      currentStep={5}
      totalSteps={12}
      onSaveExit={handleSaveExit}
    >
      <Form>
        <FormField
          control={form.control}
          name="firstName"
          label="First and middle name"
          placeholder="John William"
          required
          autoCapitalize="words"
        />

        <FormField
          control={form.control}
          name="lastName"
          label="Last name"
          placeholder="Smith"
          required
          autoCapitalize="words"
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          label="Date of birth"
          placeholder="YYYY-MM-DD"
          required
          rightIcon={<Text className="text-secondary-400 text-xl">📅</Text>}
        />
      </Form>

      <View className="mt-8">
        <Button
          onPress={form.handleSubmit(onSubmit)}
          loading={isLoading}
          className="w-full"
        >
          Save and Continue
        </Button>
      </View>
    </ScreenContainer>
  );
}
