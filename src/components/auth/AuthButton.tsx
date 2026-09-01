import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { AuthColors } from '@/constants/theme';

interface AuthButtonProps {
  label: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  shadowColor?: string;
  loading?: boolean;
  style?: ViewStyle;
}

export function AuthButton({
  label,
  onPress,
  backgroundColor = AuthColors.accentMagenta,
  textColor = '#FFFFFF',
  shadowColor = AuthColors.dark,
  loading = false,
  style,
}: AuthButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          shadowColor,
          borderColor: AuthColors.border,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 17,
    borderRadius: 4,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    // Hard offset shadow for bold graphic feel
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
