import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Select, SelectOption } from './select';

interface FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  options: SelectOption[];
  leftIcon?: React.ReactNode;
  className?: string;
}

export function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder,
  hint,
  required = false,
  options,
  leftIcon,
  className,
}: FormSelectProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Select
          label={label}
          placeholder={placeholder}
          hint={hint}
          error={error?.message}
          required={required}
          options={options}
          value={value}
          onSelect={onChange}
          leftIcon={leftIcon}
          className={className}
        />
      )}
    />
  );
}
