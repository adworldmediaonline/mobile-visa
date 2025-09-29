import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { FormSelect } from '@/components/ui/form-select';
import { ScreenContainer } from '@/components/ui/screen-container';
import { COUNTRIES, POPULAR_DESTINATIONS } from '@/constants/countries';
import { TravelPlanFormData, travelPlanSchema } from '@/lib/validations';
import { useVisaApplicationStore } from '@/store/visa-application-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

export default function TravelPlansScreen() {
  const { travelPlan, setTravelPlan, setCurrentStep, saveAndExit, isLoading } =
    useVisaApplicationStore();

  const form = useForm<TravelPlanFormData>({
    resolver: zodResolver(travelPlanSchema),
    defaultValues: {
      passportFrom: travelPlan?.passportFrom || '',
      goingTo: travelPlan?.goingTo || '',
    },
  });

  const countryOptions = COUNTRIES.map(country => ({
    label: country.label,
    value: country.value,
    icon: <Text className="text-lg">{country.flag}</Text>,
  }));

  const onSubmit = (data: TravelPlanFormData) => {
    setTravelPlan(data);
    setCurrentStep(2);
    router.push('/(visa)/visa-selection');
  };

  const handleSaveExit = () => {
    const currentData = form.getValues();
    if (currentData.passportFrom || currentData.goingTo) {
      setTravelPlan(currentData);
    }
    saveAndExit();
    router.push('/(tabs)');
  };

  return (
    <ScreenContainer
      title="What are your travel plans?"
      showProgress
      currentStep={1}
      totalSteps={12}
      onSaveExit={handleSaveExit}
    >
      <Form>
        <FormSelect
          control={form.control}
          name="passportFrom"
          label="My passport is from"
          placeholder="Select country"
          options={countryOptions}
          required
        />

        <FormSelect
          control={form.control}
          name="goingTo"
          label="I'm going to"
          placeholder="Select destination"
          options={countryOptions}
          required
        />

        {POPULAR_DESTINATIONS.length > 0 && (
          <View className="mt-6">
            <Text className="text-secondary-500 text-sm font-medium mb-4 uppercase tracking-wider">
              Popular Destinations
            </Text>

            <View className="space-y-3">
              {POPULAR_DESTINATIONS.map(destination => (
                <Card
                  key={destination.value}
                  variant={
                    form.watch('goingTo') === destination.value
                      ? 'selected'
                      : 'default'
                  }
                  onPress={() => {
                    form.setValue('goingTo', destination.value);
                    form.trigger('goingTo');
                  }}
                >
                  <View className="flex-row items-center">
                    <Text className="text-xl mr-3">{destination.flag}</Text>
                    <Text className="text-secondary-900 font-medium flex-1">
                      {destination.label}
                    </Text>
                  </View>
                </Card>
              ))}
            </View>
          </View>
        )}
      </Form>

      <View className="mt-8">
        <Button
          onPress={form.handleSubmit(onSubmit)}
          loading={isLoading}
          className="w-full"
        >
          Get Started!
        </Button>
      </View>
    </ScreenContainer>
  );
}
