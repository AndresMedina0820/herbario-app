import { Platform } from 'react-native';

export const Colors = {
  // Fondos estilo papel antiguo
  paper: '#F5F2EB', // Crema claro base
  paperHighlight: '#FFFDF7', // Para tarjetas sobre el fondo base
  paperDark: '#E8E4D9', // Para estados presionados (press in)
  
  // Tintas para texto y bordes
  inkDark: '#1A1C19', // Casi negro, para textos principales y bordes
  inkMedium: '#4A4C48', // Para textos secundarios
  inkGreen: '#2B4C30', // Verde oscuro monolínea para acentos e ilustraciones
  
  // Utilidades
  transparent: 'transparent',
  skeleton: '#EAE6D8', // Color del bloque mientras carga la imagen
};

export const Typography = {
  // Familias (se pueden ajustar tras cargar fuentes personalizadas con expo-font)
  family: {
    serif: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }), // Ideal para títulos de plantas
    sans: Platform.select({ ios: 'System', android: 'sans-serif', default: 'sans-serif' }), // Limpio para ui secundaria
    mono: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }), // Datos precisos
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
  }
};

export const Borders = {
  width: {
    thin: 1,
    thick: 2, // Soft brutalism suele usar bordes marcados
  },
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 16, // Redondeos sutiles, pero con borde marcado
  }
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Theme = {
  colors: Colors,
  typography: Typography,
  borders: Borders,
  spacing: Spacing,
};
