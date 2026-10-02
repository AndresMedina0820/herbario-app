import { useAppStore } from '../../../store/useAppStore';
import { db } from '../../../store/database';
import { nowSeconds, calculateNextWatering, calculateStreak } from '../../../utils/date';
import * as Crypto from 'expo-crypto';

export function useGardenActions() {
  const loadPlants = useAppStore((state: any) => state.loadPlants);

  const addPlant = (speciesId: string, nickname: string | null, assetUrl: string | null, frequencyDays: number) => {
    const id = Crypto.randomUUID();
    const addedAt = nowSeconds();
    const nextWateringDate = calculateNextWatering(addedAt, frequencyDays);

    try {
      db.runSync(
        `INSERT INTO user_plants (id, species_id, nickname, asset_url, added_at, next_watering_date, water_frequency_days) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, speciesId, nickname, assetUrl, addedAt, nextWateringDate, frequencyDays]
      );
      // Latencia cero: recargamos la lista en el store global inmediatamente
      loadPlants();
    } catch (error) {
      console.error('Error añadiendo planta:', error);
    }
  };

  const waterPlant = (plantId: string, lastWateredAt: number | null, currentStreak: number, frequencyDays: number) => {
    const wateredAt = nowSeconds();
    const newStreak = calculateStreak(lastWateredAt, currentStreak);
    const nextWateringDate = calculateNextWatering(wateredAt, frequencyDays);
    const logId = Crypto.randomUUID();

    try {
      // Transacción atómica para mantener sincronía entre ambas tablas
      db.execSync('BEGIN TRANSACTION;');
      
      db.runSync(
        'UPDATE user_plants SET next_watering_date = ? WHERE id = ?',
        [nextWateringDate, plantId]
      );

      // Guardar el log inmutable
      db.runSync(
        `INSERT INTO watering_logs (id, plant_id, watered_at, current_streak_at_log) 
         VALUES (?, ?, ?, ?)`,
        [logId, plantId, wateredAt, newStreak]
      );

      db.execSync('COMMIT;');
      loadPlants();
    } catch (error) {
      db.execSync('ROLLBACK;');
      console.error('Error regando planta:', error);
    }
  };

  return { addPlant, waterPlant };
}
