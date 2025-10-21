import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Form } from '@/components/ui/form';
import { ScreenContainer } from '@/components/ui/screen-container';
import {
    TripDetailsFormData,
    enhancedTripDetailsSchema,
} from '@/lib/validations';
import { useVisaApplicationStore } from '@/store/visa-application-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

export default function TripDetailsScreen() {
  const {
    tripDetails,
    selectedVisaType,
    setTripDetails,
    setCurrentStep,
    saveAndExit,
    isLoading,
  } = useVisaApplicationStore();

  const form = useForm<TripDetailsFormData>({
    resolver: zodResolver(enhancedTripDetailsSchema),
    defaultValues: {
      arrivalDate: tripDetails?.arrivalDate || '',
    },
  });

  const arrivalDate = form.watch('arrivalDate');

  const handleDateChange = (dateString: string) => {
    console.log('TripDetails - handleDateChange called with:', dateString);
    console.log('TripDetails - Current form value before:', form.getValues('arrivalDate'));

    form.setValue('arrivalDate', dateString, { shouldValidate: true, shouldDirty: true });

    console.log('TripDetails - Current form value after:', form.getValues('arrivalDate'));
    console.log('TripDetails - Form errors:', form.formState.errors);
  };

  const onSubmit = (data: TripDetailsFormData) => {
    setTripDetails(data);
    setCurrentStep(4);
    router.push('/(visa)/passport-upload');
  };

  const handleSaveExit = () => {
    const currentData = form.getValues();
    if (currentData.arrivalDate) {
      setTripDetails(currentData);
    }
    saveAndExit();
    router.push('/(tabs)');
  };

  if (!selectedVisaType) {
    router.push('/(visa)/visa-selection');
    return null;
  }

  return (
    <ScreenContainer
      title="Your trip details"
      subtitle={`${selectedVisaType.name}`}
      showProgress
      currentStep={3}
      totalSteps={12}
      onSaveExit={handleSaveExit}
    >
      <Form>
        <DatePicker
          value={arrivalDate}
          onChange={handleDateChange}
          label="Arrival date"
          placeholder="Select arrival date"
          required
          minimumDate={new Date()}
          error={form.formState.errors.arrivalDate?.message}
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
