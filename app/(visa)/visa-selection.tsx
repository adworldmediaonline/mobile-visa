import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BottomSheetModal } from '@/components/ui/modal';
import { ScreenContainer } from '@/components/ui/screen-container';
import { formatCurrency } from '@/lib/utils';
import { useVisaApplicationStore } from '@/store/visa-application-store';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

// Mock visa types data - in real app this would come from API
const VISA_TYPES = [
  {
    id: 'australia_visitor',
    name: 'Australia Visitor Visa',
    description:
      'An online visa required for visits to Australia for tourism, recreation, or short-term non-work activities.',
    validity: '1 year',
    entries: 'Multiple entry',
    governmentFee: 1241587, // INR in paisa
    features: [
      'The Australia Visitor Visa is an online visa required for visits to Australia for tourism, recreation, or short-term non-work activities.',
      'The application process is entirely online.',
      'The Australia Visitor Visa can be issued for 3, 6, or 12 months.',
      'Your application will be reviewed and submitted by our registered MARA agent: Adolph Yang (MARN0743735, Mandarin and English). See below for more details.',
    ],
  },
];

export default function VisaSelectionScreen() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedVisaDetails, setSelectedVisaDetails] = useState<
    (typeof VISA_TYPES)[0] | null
  >(null);

  const {
    travelPlan,
    selectedVisaType,
    setSelectedVisaType,
    setCurrentStep,
    saveAndExit,
    isLoading,
  } = useVisaApplicationStore();

  const handleVisaSelect = (visa: (typeof VISA_TYPES)[0]) => {
    setSelectedVisaType(visa);
  };

  const handleLearnMore = (visa: (typeof VISA_TYPES)[0]) => {
    setSelectedVisaDetails(visa);
    setShowDetails(true);
  };

  const handleContinue = () => {
    if (selectedVisaType) {
      setCurrentStep(3);
      router.push('/(visa)/trip-details');
    }
  };

  const handleSaveExit = () => {
    saveAndExit();
    router.push('/(tabs)');
  };

  if (!travelPlan) {
    router.push('/(visa)/travel-plans');
    return null;
  }

  return (
    <ScreenContainer
      title="Select an option"
      subtitle={`Passport from ${travelPlan.passportFrom} ✈️ ${travelPlan.goingTo}`}
      showProgress
      currentStep={2}
      totalSteps={12}
      onSaveExit={handleSaveExit}
    >
      <View className="mb-6">
        <Text className="text-danger-500 font-medium mb-4">
          Visa required for travel
        </Text>

        {VISA_TYPES.map(visa => (
          <Card
            key={visa.id}
            variant={selectedVisaType?.id === visa.id ? 'selected' : 'default'}
            onPress={() => handleVisaSelect(visa)}
            className="mb-4"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-secondary-900 mb-1">
                  {visa.name}
                </Text>
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={() => handleLearnMore(visa)}
                  className="self-start -ml-2"
                >
                  Learn More
                </Button>
              </View>

              <View
                className={`w-6 h-6 border-2 rounded-full items-center justify-center ${
                  selectedVisaType?.id === visa.id
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-secondary-300'
                }`}
              >
                {selectedVisaType?.id === visa.id && (
                  <View className="w-3 h-3 bg-white rounded-full" />
                )}
              </View>
            </View>
          </Card>
        ))}
      </View>

      <Button
        onPress={handleContinue}
        disabled={!selectedVisaType}
        loading={isLoading}
        className="w-full"
      >
        Save and Continue
      </Button>

      {/* Visa Details Modal */}
      <BottomSheetModal
        visible={showDetails}
        onClose={() => setShowDetails(false)}
        title={selectedVisaDetails?.name}
        height="70%"
      >
        {selectedVisaDetails && (
          <View className="py-4">
            <View className="mb-6">
              <Text className="text-lg font-semibold text-secondary-900 mb-4">
                What to Know
              </Text>

              {selectedVisaDetails.features.map((feature, index) => (
                <View key={index} className="flex-row mb-3">
                  <Text className="text-primary-500 text-lg mr-3">•</Text>
                  <Text className="text-secondary-700 flex-1 leading-6">
                    {feature}
                  </Text>
                </View>
              ))}
            </View>

            <View className="bg-primary-50 rounded-xl p-4">
              <Text className="text-sm font-medium text-primary-700 mb-2">
                Valid for {selectedVisaDetails.validity}
              </Text>
              <Text className="text-lg font-bold text-secondary-900 mb-1">
                {selectedVisaDetails.entries}
              </Text>
              <Text className="text-sm text-secondary-600">
                Government fee:{' '}
                {formatCurrency(selectedVisaDetails.governmentFee / 100)}
              </Text>
            </View>
          </View>
        )}
      </BottomSheetModal>
    </ScreenContainer>
  );
}
