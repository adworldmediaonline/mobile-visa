import React from 'react';
import { View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { cn } from '@/lib/utils';

interface CardProps extends TouchableOpacityProps {
  variant?: 'default' | 'selected' | 'disabled';
  children: React.ReactNode;
}

const cardVariants = {
  default: 'bg-white border-2 border-secondary-200 active:border-primary-300',
  selected: 'bg-primary-50 border-2 border-primary-500',
  disabled: 'bg-secondary-50 border-2 border-secondary-200 opacity-50',
};

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className,
  ...props
}) => {
  if (props.onPress) {
    return (
      <TouchableOpacity
        className={cn(
          'rounded-xl p-4 shadow-sm',
          cardVariants[variant],
          className
        )}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      className={cn(
        'rounded-xl p-4 shadow-sm',
        cardVariants[variant],
        className
      )}
    >
      {children}
    </View>
  );
};
