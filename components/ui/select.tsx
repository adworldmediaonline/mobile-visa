import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetModal } from './modal';

export interface SelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  options: SelectOption[];
  onSelect: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Select an option',
  value,
  options,
  onSelect,
  error,
  hint,
  required = false,
  leftIcon,
  className,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    setIsModalVisible(false);
  };

  const renderOption = ({ item }: { item: SelectOption }) => (
    <TouchableOpacity
      className={cn(
        'flex-row items-center py-4 px-6 border-b border-secondary-100',
        item.disabled && 'opacity-50'
      )}
      onPress={() => !item.disabled && handleSelect(item.value)}
      disabled={item.disabled}
    >
      {item.icon && <View className="mr-3">{item.icon}</View>}
      <Text className="text-secondary-900 text-base flex-1">{item.label}</Text>
      {value === item.value && (
        <View className="w-5 h-5 bg-primary-500 rounded-full items-center justify-center">
          <View className="w-2 h-2 bg-white rounded-full" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View className={cn('w-full', className)}>
      {label && (
        <Text className="text-secondary-700 text-sm font-medium mb-2">
          {label}
          {required && <Text className="text-danger-500 ml-1">*</Text>}
        </Text>
      )}

      <TouchableOpacity
        className={cn(
          'flex-row items-center bg-white border-2 rounded-xl px-4 py-3',
          error ? 'border-danger-500' : 'border-secondary-200',
          'active:border-primary-500'
        )}
        onPress={() => setIsModalVisible(true)}
      >
        {leftIcon && <View className="mr-3">{leftIcon}</View>}

        <Text
          className={cn(
            'flex-1 text-base',
            selectedOption ? 'text-secondary-900' : 'text-secondary-400'
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>

        <View className="ml-3">
          <Text className="text-secondary-400 text-lg">▼</Text>
        </View>
      </TouchableOpacity>

      {error && <Text className="text-danger-500 text-sm mt-1">{error}</Text>}

      {hint && !error && (
        <Text className="text-secondary-500 text-sm mt-1">{hint}</Text>
      )}

      <BottomSheetModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title={label || 'Select an option'}
        height="60%"
      >
        <FlatList
          data={options}
          keyExtractor={item => item.value}
          renderItem={renderOption}
          showsVerticalScrollIndicator={false}
        />
      </BottomSheetModal>
    </View>
  );
};
