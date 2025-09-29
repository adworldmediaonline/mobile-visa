import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  TextInputProps 
} from 'react-native';
import { cn } from '@/lib/utils';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  onRightIconPress,
  required = false,
  className,
  ...props
}) => {
  return (
    <View className="w-full">
      {label && (
        <Text className="text-secondary-700 text-sm font-medium mb-2">
          {label}
          {required && <Text className="text-danger-500 ml-1">*</Text>}
        </Text>
      )}
      
      <View className={cn(
        'flex-row items-center bg-white border-2 rounded-xl px-4 py-3',
        error ? 'border-danger-500' : 'border-secondary-200',
        'focus:border-primary-500',
        className
      )}>
        {leftIcon && (
          <View className="mr-3">
            {leftIcon}
          </View>
        )}
        
        <TextInput
          className="flex-1 text-secondary-900 text-base"
          placeholderTextColor="#94a3b8"
          {...props}
        />
        
        {rightIcon && (
          <TouchableOpacity 
            onPress={onRightIconPress}
            className="ml-3"
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text className="text-danger-500 text-sm mt-1">
          {error}
        </Text>
      )}
      
      {hint && !error && (
        <Text className="text-secondary-500 text-sm mt-1">
          {hint}
        </Text>
      )}
    </View>
  );
};
