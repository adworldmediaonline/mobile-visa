import DateTimePicker from '@react-native-community/datetimepicker';
import * as Haptics from 'expo-haptics';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Modal,
    Platform,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minimumDate,
  maximumDate,
  label,
  placeholder = 'Select date',
  required = false,
  error,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  // Parse the value into a Date object (handle YYYY-MM-DD format properly)
  const parseValueToDate = (dateString?: string): Date | null => {
    if (!dateString) return null;
    try {
      // Parse YYYY-MM-DD format without timezone issues
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    } catch (e) {
      console.log('DatePicker - Error parsing date:', e);
      return null;
    }
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    parseValueToDate(value)
  );

  // Update selectedDate when value prop changes (form synchronization)
  useEffect(() => {
    console.log('DatePicker - Value prop changed to:', value);
    const newDate = parseValueToDate(value);
    console.log('DatePicker - Parsed to date:', newDate);
    setSelectedDate(newDate);
  }, [value]);

  // Format display value
  const displayValue = selectedDate
    ? selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const handleDateChange = useCallback(
    (event: any, date?: Date) => {
      console.log('DatePicker - Native onChange called');
      console.log('DatePicker - Event type:', event?.type);
      console.log('DatePicker - Date received:', date);

      if (Platform.OS === 'android') {
        setShowPicker(false);
        setIsOpen(false);
      }

      // Only process if user selected a date (not dismissed)
      if (event?.type === 'set' && date) {
        console.log('DatePicker - Processing date selection');

        setSelectedDate(date);

        // Format as YYYY-MM-DD
        const formattedDate = date.toISOString().split('T')[0];
        console.log('DatePicker - Formatted date:', formattedDate);

        // Call onChange
        onChange(formattedDate);
        console.log('DatePicker - onChange called with:', formattedDate);

        // Haptic feedback
        try {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } catch (e) {
          // Haptics not available
        }
      } else if (event?.type === 'dismissed') {
        console.log('DatePicker - User dismissed picker');
      }
    },
    [onChange]
  );

  const handleOpenPicker = useCallback(() => {
    if (!disabled) {
      console.log('DatePicker - Opening picker');

      // Haptic feedback
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (e) {
        // Haptics not available
      }

      setIsOpen(true);

      if (Platform.OS === 'android') {
        setShowPicker(true);
      }
    }
  }, [disabled]);

  const handleClose = useCallback(() => {
    console.log('DatePicker - Closing picker');

    // Haptic feedback
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {
      // Haptics not available
    }

    setIsOpen(false);
    setShowPicker(false);
  }, []);

  return (
    <View>
      {label && (
        <Text className="text-secondary-700 text-sm font-medium mb-2">
          {label}
          {required && <Text className="text-danger-500 ml-1">*</Text>}
        </Text>
      )}

      <View>
        <TouchableOpacity
          onPress={handleOpenPicker}
          disabled={disabled}
          className={`flex-row items-center bg-white border-2 rounded-xl px-4 py-3 ${
            error
              ? 'border-danger-500'
              : disabled
                ? 'border-secondary-100 bg-secondary-50'
                : 'border-secondary-200'
          }`}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={
            displayValue ? `Selected date: ${displayValue}` : placeholder
          }
          accessibilityHint="Double tap to open calendar"
        >
          <Text
            className={`flex-1 text-base ${
              displayValue
                ? 'text-secondary-900 font-semibold'
                : disabled
                  ? 'text-secondary-300'
                  : 'text-secondary-400'
            }`}
          >
            {displayValue || placeholder}
          </Text>
          <Text className="text-secondary-400 text-xl">📅</Text>
        </TouchableOpacity>
      </View>

      {error && <Text className="text-danger-500 text-sm mt-1">{error}</Text>}

      {/* iOS Modal */}
      {Platform.OS === 'ios' && (
        <Modal
          visible={isOpen}
          transparent
          animationType="slide"
          onRequestClose={handleClose}
          statusBarTranslucent
        >
          <View className="flex-1 bg-black/50">
            <Pressable
              onPress={handleClose}
              className="flex-1"
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Close calendar"
            />
          </View>

          <View className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-2xl">
            {/* Handle */}
            <View className="w-12 h-1 bg-secondary-300 rounded-full mx-auto mt-3 mb-4" />

            {/* Header */}
            <View className="px-6 pb-4 border-b border-secondary-100">
              <Text className="text-secondary-900 text-lg font-semibold text-center">
                Select Date
              </Text>
            </View>

            {/* Date Picker */}
            <View className="py-4">
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                textColor="#1F2937"
                style={{ height: 200 }}
              />
            </View>

            {/* Actions */}
            <View className="px-6 py-4 border-t border-secondary-100">
              <TouchableOpacity
                onPress={handleClose}
                className="bg-primary-500 rounded-xl py-3 items-center active:bg-primary-600"
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Done"
              >
                <Text className="text-white font-semibold text-base">
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Android Picker */}
      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};
