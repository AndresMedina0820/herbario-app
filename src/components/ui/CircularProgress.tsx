import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/tokens';

interface CircularProgressProps {
  percentage: number;
  icon?: keyof typeof Ionicons.glyphMap;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
}

export function CircularProgress({ 
  percentage, 
  icon = 'water', 
  size = 24, 
  strokeWidth = 2,
  color = Colors.inkDark,
  backgroundColor = Colors.paper
}: CircularProgressProps) {
  const radius = (size / 2) - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Circle 
          cx={size / 2} cy={size / 2} r={radius} 
          stroke={Colors.paperDark} 
          strokeWidth={strokeWidth} fill="none" 
        />
        <Circle 
          cx={size / 2} cy={size / 2} r={radius} 
          stroke={color} 
          strokeWidth={strokeWidth} 
          fill="none" 
          strokeDasharray={circumference} 
          strokeDashoffset={strokeDashoffset} 
          strokeLinecap="round"
          rotation="-90" 
          origin={`${size / 2}, ${size / 2}`} 
        />
      </Svg>
      {icon && <Ionicons name={icon} size={size * 0.45} color={color} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  }
});
