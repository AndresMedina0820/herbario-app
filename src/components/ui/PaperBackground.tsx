import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Pattern, Circle, Rect } from 'react-native-svg';
import { Colors } from '../../theme/tokens';

export function PaperBackground({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      {/* Capa base con la textura de puntos SVG */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Svg width="100%" height="100%">
          <Pattern
            id="dotPattern"
            x="0"
            y="0"
            width="24" // Espaciado horizontal de los puntos
            height="24" // Espaciado vertical de los puntos
            patternUnits="userSpaceOnUse"
          >
            {/* El punto sutil de tinta */}
            <Circle cx="12" cy="12" r="1.2" fill={Colors.inkMedium} opacity="0.3" />
          </Pattern>
          {/* Rectángulo que cubre toda la pantalla usando el patrón */}
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#dotPattern)" />
        </Svg>
      </View>
      
      {/* Contenido principal por encima de la textura */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paper, // El color crema base
  },
  content: {
    flex: 1,
  }
});
