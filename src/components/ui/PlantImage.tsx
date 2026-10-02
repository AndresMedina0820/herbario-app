import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Image, ImageProps, ImageStyle } from 'expo-image';
import { Colors, Theme } from '../../theme/tokens';

interface PlantImageProps extends Omit<ImageProps, 'style'> {
  style?: ImageStyle;
}

export function PlantImage({ style, ...props }: PlantImageProps) {
  return (
    <Image
      style={[styles.image, style, { backgroundColor: Colors.skeleton }]}
      transition={300} // Fade in sutil (única animación permitida por su suavidad orgánica)
      contentFit="cover"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: Theme.borders.radius.sm,
  },
});
