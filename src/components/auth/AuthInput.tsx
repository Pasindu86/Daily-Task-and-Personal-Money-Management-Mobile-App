import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { AuthColors } from '@/constants/theme';

interface AuthInputProps extends TextInputProps {
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
}

export function AuthInput({
  label,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  ...props
}: AuthInputProps) {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, leftIcon ? styles.inputWithLeft : null]}
          placeholderTextColor={AuthColors.placeholder}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity
            style={styles.iconRight}
            onPress={onRightIconPress}
            activeOpacity={0.7}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: AuthColors.dark,
    textTransform: 'uppercase',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AuthColors.inputBg,
    borderWidth: 2.5,
    borderColor: AuthColors.border,
    borderRadius: 4,
    // offset shadow
    shadowColor: AuthColors.border,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: AuthColors.dark,
  },
  inputWithLeft: {
    paddingLeft: 6,
  },
  iconLeft: {
    paddingLeft: 14,
  },
  iconRight: {
    paddingHorizontal: 14,
  },
});
