import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  className,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View className={cn('w-full', className)}>
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-sm font-medium text-secondary-600">
          Step {currentStep} of {totalSteps}
        </Text>
        <Text className="text-sm font-medium text-secondary-600">
          {Math.round(progress)}%
        </Text>
      </View>
      
      <View className="h-2 bg-secondary-200 rounded-full overflow-hidden">
        <View 
          className="h-full bg-primary-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
};
