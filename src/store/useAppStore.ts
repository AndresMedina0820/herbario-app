import { create } from 'zustand';
import { db } from './database';

export interface Plant {
  id: string;
  species_id: string;
  nickname: string | null;
  asset_url: string | null;
  added_at: number;
  next_watering_date: number | null;
}

interface AppState {
  plants: Plant[];
  isLoading: boolean;
  loadPlants: () => void;
  // Próximamente: addPlant, waterPlant (que actualizarán SQLite y el estado)
}

export const useAppStore = create<AppState>((set) => ({
  plants: [],
  isLoading: false,
  
  loadPlants: () => {
    set({ isLoading: true });
    try {
      // Uso de la API síncrona de expo-sqlite para latencia cero
      const result = db.getAllSync<Plant>('SELECT * FROM user_plants ORDER BY added_at DESC');
      set({ plants: result, isLoading: false });
    } catch (error) {
      console.error('Error loading plants:', error);
      set({ isLoading: false });
    }
  },
}));
