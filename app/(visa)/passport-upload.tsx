import { Button } from '@/components/ui/button';
import { ScreenContainer } from '@/components/ui/screen-container';
import { useVisaApplicationStore } from '@/store/visa-application-store';
import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function PassportUploadScreen() {
  const {
    passportUploadCompleted,
    setPassportUploadCompleted,
    setCurrentStep,
    saveAndExit,
    isLoading,
  } = useVisaApplicationStore();

  const handleUploadFile = () => {
    // In a real app, this would open file picker
    console.log('Upload file');
  };

  const handleTakePhoto = () => {
    // In a real app, this would open camera
    setPassportUploadCompleted(true);
    setCurrentStep(5);
    router.push('/(visa)/personal-details');
  };

  const handleSkipForNow = () => {
    setCurrentStep(5);
    router.push('/(visa)/personal-details');
  };

  const handleSaveExit = () => {
    saveAndExit();
    router.push('/(tabs)');
  };

  return (
    <ScreenContainer
      title="Upload your passport"
      showProgress
      currentStep={4}
      totalSteps={12}
      onSaveExit={handleSaveExit}
      showBackButton={false} // Custom back handling
    >
      {/* Passport Illustration */}
      <View className="items-center mb-8">
        <View className="w-48 h-64 bg-accent-100 rounded-2xl items-center justify-center mb-4">
          <View className="w-40 h-56 bg-accent-200 rounded-xl items-center justify-center">
            <Text className="text-accent-600 text-6xl">📘</Text>
            <Text className="text-accent-700 font-semibold mt-2">PASSPORT</Text>
            <View className="w-16 h-16 bg-accent-300 rounded-full mt-4" />
            <View className="w-24 h-2 bg-accent-300 rounded-full mt-2" />
            <View className="w-20 h-2 bg-accent-300 rounded-full mt-1" />
          </View>
        </View>

        <View className="bg-primary-50 rounded-lg px-4 py-2 flex-row items-center">
          <Text className="text-primary-600 mr-2">🔒</Text>
          <Text className="text-primary-700 font-medium text-sm">
            Protected by 256-bit AES encryption
          </Text>
        </View>
      </View>

      {/* Instructions */}
      <View className="mb-8">
        <View className="flex-row mb-4">
          <Text className="text-accent-500 text-lg mr-3">✓</Text>
          <Text className="text-secondary-700 flex-1 leading-6">
            Upload the page with your photo and name. If you have a US passport,
            add the signature page
          </Text>
        </View>

        <View className="flex-row">
          <Text className="text-accent-500 text-lg mr-3">✓</Text>
          <Text className="text-secondary-700 flex-1 leading-6">
            It must be clear and easy to read. Avoid fingers, glare or blur
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="space-y-4">
        <Button variant="outline" onPress={handleUploadFile} className="w-full">
          Upload file
        </Button>

        <Button
          onPress={handleTakePhoto}
          loading={isLoading}
          className="w-full"
        >
          Take photo
        </Button>
      </View>

      {/* Skip Option */}
      <View className="mt-6">
        <Button variant="ghost" onPress={handleSkipForNow} className="w-full">
          Skip for now
        </Button>
      </View>
    </ScreenContainer>
  );
}
