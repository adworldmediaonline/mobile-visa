import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  ActivityIndicator, 
  TouchableOpacityProps 
} from 'react-native';
import { cn } from '@/lib/utils';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const buttonVariants = {
  primary: 'bg-primary-500 active:bg-primary-600',
  secondary: 'bg-secondary-500 active:bg-secondary-600',
  outline: 'border-2 border-primary-500 bg-transparent active:bg-primary-50',
  ghost: 'bg-transparent active:bg-primary-50',
  danger: 'bg-danger-500 active:bg-danger-600',
};

const buttonSizes = {
  sm: 'px-4 py-2 min-h-[40px]',
  md: 'px-6 py-3 min-h-[48px]',
  lg: 'px-8 py-4 min-h-[56px]',
};

const textVariants = {
  primary: 'text-white font-semibold',
  secondary: 'text-white font-semibold',
  outline: 'text-primary-500 font-semibold',
  ghost: 'text-primary-500 font-semibold',
  danger: 'text-white font-semibold',
};

const textSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={cn(
        'rounded-xl items-center justify-center flex-row',
        buttonVariants[variant],
        buttonSizes[size],
        isDisabled && 'opacity-50',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'ghost' ? '#1e8ec2' : '#fff'} 
          className="mr-2"
        />
      )}
      <Text 
        className={cn(
          textVariants[variant],
          textSizes[size],
          loading && 'ml-2'
        )}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
