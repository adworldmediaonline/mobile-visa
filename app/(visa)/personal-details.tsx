import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
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

  const dateOfBirth = form.watch('dateOfBirth');

  const handleDateChange = (dateString: string) => {
    console.log('PersonalDetails - handleDateChange called with:', dateString);
    console.log('PersonalDetails - Current form value before:', form.getValues('dateOfBirth'));

    form.setValue('dateOfBirth', dateString, { shouldValidate: true, shouldDirty: true });

    console.log('PersonalDetails - Current form value after:', form.getValues('dateOfBirth'));
    console.log('PersonalDetails - Form errors:', form.formState.errors);
  };

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

        <DatePicker
          value={dateOfBirth}
          onChange={handleDateChange}
          label="Date of birth"
          placeholder="Select your date of birth"
          required
          maximumDate={new Date()}
          minimumDate={new Date(new Date().getFullYear() - 100, 0, 1)}
          error={form.formState.errors.dateOfBirth?.message}
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
