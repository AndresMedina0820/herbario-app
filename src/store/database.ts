import * as SQLite from 'expo-sqlite';

// Inicializa la base de datos (Expo SQLite 50+ usa API síncrona por defecto para open)
export const db = SQLite.openDatabaseSync('herbario.db');

export const initializeDatabase = () => {
  try {
    // Configuración de PRAGMAs para optimización y consistencia
    db.execSync(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;
    `);

    // Crear tabla de user_plants (Jardín del usuario)
    db.execSync(`
      CREATE TABLE IF NOT EXISTS user_plants (
        id TEXT PRIMARY KEY,
        species_id TEXT NOT NULL,
        nickname TEXT,
        asset_url TEXT,
        added_at INTEGER DEFAULT (cast(strftime('%s','now') as int)),
        next_watering_date INTEGER
      );
    `);

    // Crear tabla de watering_logs (Gamificación / Rachas)
    // current_streak_at_log guarda el estado inmutable de la racha en ese momento
    db.execSync(`
      CREATE TABLE IF NOT EXISTS watering_logs (
        id TEXT PRIMARY KEY,
        plant_id TEXT NOT NULL,
        watered_at INTEGER DEFAULT (cast(strftime('%s','now') as int)),
        current_streak_at_log INTEGER DEFAULT 1,
        FOREIGN KEY (plant_id) REFERENCES user_plants(id) ON DELETE CASCADE
      );
    `);
    
    console.log('Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
};
