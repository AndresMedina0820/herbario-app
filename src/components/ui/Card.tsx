import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Colors, Theme } from '../../theme/tokens';

export function Card({ style, children, ...props }: ViewProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    borderWidth: Theme.borders.width.thin,
    borderColor: Colors.inkDark,
    borderRadius: Theme.borders.radius.lg,
    padding: Theme.spacing.sm,
  },
});
