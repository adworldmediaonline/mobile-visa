import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { useVisaApplicationStore } from '@/store/visa-application-store';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const {
    hasExistingApplication,
    currentStep,
    totalSteps,
    travelPlan,
    selectedVisaType,
    resetApplication,
  } = useVisaApplicationStore();

  const handleStartNewApplication = () => {
    resetApplication();
    router.push('/(visa)/travel-plans');
  };

  const handleContinueApplication = () => {
    // Navigate to the current step
    switch (currentStep) {
      case 1:
        router.push('/(visa)/travel-plans');
        break;
      case 2:
        router.push('/(visa)/visa-selection');
        break;
      case 3:
        router.push('/(visa)/trip-details');
        break;
      case 4:
        router.push('/(visa)/passport-upload');
        break;
      case 5:
        router.push('/(visa)/personal-details');
        break;
      default:
        router.push('/(visa)/travel-plans');
        break;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Hero Section */}
        <View className="bg-gradient-to-br from-primary-500 to-primary-700 px-6 pt-12 pb-8">
          {/* Logo */}
          <View className="flex-row items-center justify-center mb-8">
            <Text className="text-white text-3xl font-bold mr-2">✈️</Text>
            <Text className="text-white text-3xl font-bold">IVISA</Text>
          </View>

          {/* Hero Illustration */}
          <View className="items-center mb-8">
            <View className="relative">
              {/* Background Elements */}
              <View className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />
              <View className="absolute -bottom-2 -right-2 w-12 h-12 bg-white/10 rounded-full" />
              <View className="absolute top-8 -right-8 w-8 h-8 bg-white/10 rounded-full" />

              {/* Main Passport Icon */}
              <View className="w-32 h-40 bg-accent-500 rounded-xl items-center justify-center shadow-lg">
                <Text className="text-white text-4xl mb-2">🌍</Text>
                <Text className="text-white font-bold text-lg">PASSPORT</Text>
                <Text className="text-accent-200 text-xs">📷</Text>
              </View>

              {/* Floating Elements */}
              <View className="absolute -top-6 right-4 transform rotate-12">
                <Text className="text-white text-2xl">✈️</Text>
              </View>
              <View className="absolute -bottom-4 left-2 transform -rotate-12">
                <Text className="text-white text-xl">🎯</Text>
              </View>
            </View>
          </View>

          {/* Trustpilot Badge */}
          <View className="bg-white/20 rounded-full px-4 py-2 self-center flex-row items-center">
            <Text className="text-white mr-2">⭐</Text>
            <Text className="text-white font-semibold">Trustpilot</Text>
            <Text className="text-white ml-2">4.6/5 stars</Text>
            <Text className="text-white ml-2">👥</Text>
          </View>
        </View>

        {/* Main Content */}
        <View className="px-6 pt-8 pb-6">
          <Text className="text-3xl font-bold text-secondary-900 text-center mb-2">
            Unlock the World
          </Text>
          <Text className="text-secondary-600 text-center mb-8 text-lg">
            The easiest way to get your travel visa
          </Text>

          {/* Existing Application Card */}
          {hasExistingApplication && (
            <Card className="mb-6 bg-primary-50 border-primary-200">
              <View className="mb-4">
                <Text className="text-lg font-semibold text-secondary-900 mb-2">
                  Continue Your Application
                </Text>
                {travelPlan && (
                  <Text className="text-secondary-600 mb-3">
                    {travelPlan.passportFrom} → {travelPlan.goingTo}
                  </Text>
                )}
                {selectedVisaType && (
                  <Text className="text-secondary-600 mb-3">
                    {selectedVisaType.name}
                  </Text>
                )}
                <ProgressBar
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                  className="mb-4"
                />
              </View>
              <Button
                onPress={handleContinueApplication}
                className="w-full mb-3"
              >
                Continue with Order
              </Button>
            </Card>
          )}

          {/* Action Buttons */}
          <View className="space-y-4">
            <Button
              onPress={handleStartNewApplication}
              className="w-full"
              variant={hasExistingApplication ? 'outline' : 'primary'}
            >
              Start a New Application
            </Button>
          </View>

          {/* Features Section */}
          <View className="mt-12">
            <Text className="text-xl font-bold text-secondary-900 mb-6 text-center">
              Why Choose iVisa?
            </Text>

            <View className="space-y-4">
              <View className="flex-row items-start">
                <Text className="text-2xl mr-4">🚀</Text>
                <View className="flex-1">
                  <Text className="font-semibold text-secondary-900 mb-1">
                    Fast & Simple
                  </Text>
                  <Text className="text-secondary-600">
                    Complete your application in minutes, not hours
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <Text className="text-2xl mr-4">🔒</Text>
                <View className="flex-1">
                  <Text className="font-semibold text-secondary-900 mb-1">
                    Secure & Safe
                  </Text>
                  <Text className="text-secondary-600">
                    Your data is protected with bank-level security
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <Text className="text-2xl mr-4">✅</Text>
                <View className="flex-1">
                  <Text className="font-semibold text-secondary-900 mb-1">
                    Expert Review
                  </Text>
                  <Text className="text-secondary-600">
                    Every application is reviewed by visa experts
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <Text className="text-2xl mr-4">🌍</Text>
                <View className="flex-1">
                  <Text className="font-semibold text-secondary-900 mb-1">
                    Global Coverage
                  </Text>
                  <Text className="text-secondary-600">
                    Visa services for 100+ countries worldwide
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar Spacer */}
      <View style={{ height: 83 }} />
    </SafeAreaView>
  );
}
