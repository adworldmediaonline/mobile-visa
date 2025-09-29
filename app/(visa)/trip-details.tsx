import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ScreenContainer } from '@/components/ui/screen-container';
import { formatDate } from '@/lib/utils';
import {
  TripDetailsFormData,
  enhancedTripDetailsSchema,
} from '@/lib/validations';
import { useVisaApplicationStore } from '@/store/visa-application-store';
import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';

export default function TripDetailsScreen() {
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const selectedDate = form.watch('arrivalDate');

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      form.setValue('arrivalDate', dateString);
      form.trigger('arrivalDate');
    }
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
        <View>
          <Text className="text-secondary-700 text-sm font-medium mb-2">
            Arrival date
            <Text className="text-danger-500 ml-1">*</Text>
          </Text>

          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="flex-row items-center bg-white border-2 border-secondary-200 rounded-xl px-4 py-3"
          >
            <Text
              className={`flex-1 text-base ${
                selectedDate ? 'text-secondary-900' : 'text-secondary-400'
              }`}
            >
              {selectedDate ? formatDate(selectedDate) : 'Select date'}
            </Text>
            <Text className="text-secondary-400 text-xl">📅</Text>
          </TouchableOpacity>

          {form.formState.errors.arrivalDate && (
            <Text className="text-danger-500 text-sm mt-1">
              {form.formState.errors.arrivalDate.message}
            </Text>
          )}
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate ? new Date(selectedDate) : new Date()}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={handleDateChange}
          />
        )}
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
