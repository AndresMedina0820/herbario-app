/**
 * Herbario Date Utils
 * Maneja la lógica inmutable de fechas para rachas (streaks) y riegos.
 */

// Obtiene el timestamp actual en segundos (estándar para SQLite)
export const nowSeconds = () => Math.floor(Date.now() / 1000);

// Calcula la próxima fecha de riego sumando días
export const calculateNextWatering = (wateredAt: number, frequencyDays: number): number => {
  const secondsInDay = 86400;
  return wateredAt + (frequencyDays * secondsInDay);
};

// Calcula la racha basándose en el historial inmutable
export const calculateStreak = (lastWateredAt: number | null, currentStreak: number): number => {
  if (!lastWateredAt) return 1;
  
  const now = nowSeconds();
  const secondsInDay = 86400;
  // Convertimos a días "enteros" desde la última vez (ajuste de zona horaria se manejará luego)
  const daysSinceLastWatering = Math.floor((now - lastWateredAt) / secondsInDay);

  if (daysSinceLastWatering === 0) return currentStreak; // Mismo día
  if (daysSinceLastWatering === 1) return currentStreak + 1; // Al día siguiente consecutivo
  
  return 1; // Perdió la racha
};
