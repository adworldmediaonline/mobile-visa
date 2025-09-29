import { cn } from '@/lib/utils';
import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Input } from './input';

interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  className?: string;
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder,
  hint,
  required = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  className,
}: FormFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Input
          label={label}
          placeholder={placeholder}
          hint={hint}
          error={error?.message}
          required={required}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          onRightIconPress={onRightIconPress}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          className={className}
        />
      )}
    />
  );
}

interface FormProps {
  children: React.ReactNode;
  className?: string;
}

export const Form: React.FC<FormProps> = ({ children, className }) => {
  return <View className={cn('space-y-4', className)}>{children}</View>;
};

interface FormErrorProps {
  message?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <View className="bg-danger-50 border border-danger-200 rounded-lg p-3 mb-4">
      <Text className="text-danger-700 text-sm font-medium">{message}</Text>
    </View>
  );
};
