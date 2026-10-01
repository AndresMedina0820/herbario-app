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
    backgroundColor: Colors.paperHighlight,
    borderWidth: Theme.borders.width.thick,
    borderColor: Colors.inkDark,
    borderRadius: Theme.borders.radius.md,
    padding: Theme.spacing.md,
    // Soft brutalism evita sombras difuminadas. Si queremos sombra, sería solida (offset sin radius), 
    // pero mantenemos el diseño limpio y físico.
  },
});
