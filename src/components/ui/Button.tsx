import React from 'react';
import { Pressable, Text, StyleSheet, PressableProps, ViewStyle } from 'react-native';
import { Colors, Theme } from '../../theme/tokens';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle | ((state: { pressed: boolean }) => ViewStyle);
}

export function Button({ title, variant = 'primary', style, ...props }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variant === 'primary' ? styles.primary : styles.secondary,
        pressed && (variant === 'secondary' ? styles.pressedSecondary : styles.pressedPrimary),
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
      {...props}
    >
      <Text style={[styles.text, variant === 'primary' ? styles.textPrimary : styles.textSecondary]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    borderWidth: Theme.borders.width.thick,
    borderColor: Colors.inkDark,
    borderRadius: Theme.borders.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.inkDark,
  },
  secondary: {
    backgroundColor: Colors.paper,
  },
  pressedPrimary: {
    backgroundColor: Colors.inkMedium,
  },
  pressedSecondary: {
    backgroundColor: Colors.paperDark,
  },
  text: {
    fontFamily: Theme.typography.family.serif,
    fontSize: Theme.typography.size.md,
    fontWeight: Theme.typography.weight.bold,
  },
  textPrimary: {
    color: Colors.paper,
  },
  textSecondary: {
    color: Colors.inkDark,
  },
});
