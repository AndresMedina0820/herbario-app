import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Colors, Theme } from '../../theme/tokens';
import { useAppStore } from '../../store/useAppStore';
import { useGardenActions } from '../../features/garden/hooks/useGardenActions';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PlantImage } from '../../components/ui/PlantImage';
import { PaperBackground } from '../../components/ui/PaperBackground';
import type { Plant } from '../../store/useAppStore';

export default function GardenScreen() {
  const plants = useAppStore((state) => state.plants);
  const loadPlants = useAppStore((state) => state.loadPlants);
  const { addPlant, waterPlant } = useGardenActions();

  // Cargamos las plantas de SQLite en cuanto se monta la pantalla
  useEffect(() => {
    loadPlants();
  }, [loadPlants]);

  const handleAddTestPlant = () => {
    addPlant(
      'fern_01',
      'Helecho de Prueba',
      null, // Sin imagen remota por ahora, veremos el skeleton crema
      2 // Frecuencia: cada 2 días
    );
  };

  const handleWater = (plant: Plant) => {
    waterPlant(plant.id, plant.next_watering_date, 1, 2);
  };

  const renderPlant = ({ item }: { item: Plant }) => {
    return (
      <Card style={styles.plantCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.plantName}>{item.nickname || 'Planta Desconocida'}</Text>
          {item.next_watering_date && (
            <Text style={styles.dateText}>
              Próx. riego: {new Date(item.next_watering_date * 1000).toLocaleDateString()}
            </Text>
          )}
        </View>
        
        <PlantImage style={styles.imagePlaceholder} />
        
        <Button 
          title="Regar hoy" 
          variant="secondary" 
          onPress={() => handleWater(item)} 
          style={styles.waterButton}
        />
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <PaperBackground>
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id}
          renderItem={renderPlant}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Tu jardín está vacío.</Text>
            </View>
          }
        />
        
        <View style={styles.footer}>
          <Button title="Añadir Planta de Prueba" onPress={handleAddTestPlant} />
        </View>
      </PaperBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.paper,
  },
  container: {
    flex: 1,
  },
  listContent: {
    padding: Theme.spacing.md,
  },
  plantCard: {
    marginBottom: Theme.spacing.lg,
  },
  cardHeader: {
    marginBottom: Theme.spacing.sm,
  },
  plantName: {
    fontFamily: Theme.typography.family.serif,
    fontSize: Theme.typography.size.lg,
    color: Colors.inkDark,
    marginBottom: Theme.spacing.xs,
  },
  dateText: {
    fontFamily: Theme.typography.family.mono,
    fontSize: Theme.typography.size.sm,
    color: Colors.inkMedium,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    marginBottom: Theme.spacing.md,
  },
  waterButton: {
    marginTop: Theme.spacing.xs,
  },
  emptyContainer: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Theme.spacing.xxl,
  },
  emptyText: {
    fontFamily: Theme.typography.family.serif,
    fontSize: Theme.typography.size.md,
    color: Colors.inkMedium,
    fontStyle: 'italic',
  },
  footer: {
    padding: Theme.spacing.md,
    borderTopWidth: Theme.borders.width.thick,
    borderColor: Colors.inkDark,
    backgroundColor: Colors.paperHighlight,
  }
});
