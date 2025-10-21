import { cn } from '@/lib/utils';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressBar } from './progress-bar';

interface ScreenContainerProps {
  title: string;
  subtitle?: string;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
  showBackButton?: boolean;
  showSaveExit?: boolean;
  onSaveExit?: () => void;
  onBack?: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  title,
  subtitle,
  showProgress = false,
  currentStep = 1,
  totalSteps = 12,
  showBackButton = true,
  showSaveExit = true,
  onSaveExit,
  onBack,
  children,
  footer,
  className,
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary-50" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-secondary-100">
        <View className="flex-row items-center justify-between mb-4">
          {showBackButton && (
            <TouchableOpacity
              onPress={handleBack}
              className="w-10 h-10 items-center justify-center"
            >
              <Text className="text-secondary-600 text-xl">←</Text>
            </TouchableOpacity>
          )}

          <View className="flex-1" />

          {showSaveExit && (
            <TouchableOpacity onPress={onSaveExit}>
              <Text className="text-primary-500 font-semibold">
                Save and Exit
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {showProgress && (
          <ProgressBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            className="mb-4"
          />
        )}
      </View>

      {/* Content */}
      <ScrollView
        className={cn('flex-1', className)}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-6 py-6">
          <Text className="text-2xl font-bold text-secondary-900 mb-2">
            {title}
          </Text>

          {subtitle && (
            <Text className="text-secondary-600 text-base mb-6">
              {subtitle}
            </Text>
          )}

          {children}
        </View>
      </ScrollView>

      {/* Footer */}
      {footer && (
        <View className="bg-white px-6 py-4 border-t border-secondary-100">
          {footer}
        </View>
      )}
    </SafeAreaView>
  );
};
