import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = ''
}) => {
  const getButtonStyles = () => {
    let baseStyles = 'rounded-lg items-center justify-center ';
    
    // Size styles
    switch (size) {
      case 'small':
        baseStyles += 'px-3 py-2 ';
        break;
      case 'large':
        baseStyles += 'px-6 py-4 ';
        break;
      default:
        baseStyles += 'px-4 py-3 ';
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyles += disabled ? 'bg-gray-300' : 'bg-gray-200';
        break;
      case 'outline':
        baseStyles += disabled ? 'border border-gray-300' : 'border-2 border-blue-500';
        break;
      default:
        baseStyles += disabled ? 'bg-blue-300' : 'bg-blue-500';
    }

    return baseStyles + ' ' + className;
  };

  const getTextStyles = () => {
    let textStyles = 'font-semibold ';
    
    switch (size) {
      case 'small':
        textStyles += 'text-sm ';
        break;
      case 'large':
        textStyles += 'text-lg ';
        break;
      default:
        textStyles += 'text-base ';
    }

    switch (variant) {
      case 'outline':
        textStyles += disabled ? 'text-gray-400' : 'text-blue-500';
        break;
      default:
        textStyles += disabled ? 'text-gray-500' : 'text-white';
    }

    return textStyles;
  };

  return (
    <TouchableOpacity
      className={getButtonStyles()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text className={getTextStyles()}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;