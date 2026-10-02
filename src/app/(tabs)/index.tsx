import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/ui/Card';
import { CircularProgress } from '../../components/ui/CircularProgress';
import { PaperBackground } from '../../components/ui/PaperBackground';
import { PlantImage } from '../../components/ui/PlantImage';
import { useGardenActions } from '../../features/garden/hooks/useGardenActions';
import type { Plant } from '../../store/useAppStore';
import { useAppStore } from '../../store/useAppStore';
import { Colors, Theme } from '../../theme/tokens';
import { getPlantImage } from '../../utils/assets';

export default function GardenScreen() {
  const plants = useAppStore((state) => state.plants);
  const loadPlants = useAppStore((state) => state.loadPlants);
  const { waterPlant } = useGardenActions();

  useEffect(() => {
    loadPlants();
  }, [loadPlants]);

  // Ordenar plantas para que las urgentes (menor next_watering_date) salgan primero
  const sortedPlants = [...plants].sort((a, b) => {
    const aNext = a.species_id === 'palo_de_agua' ? 0 : (a.next_watering_date || 0);
    const bNext = b.species_id === 'palo_de_agua' ? 0 : (b.next_watering_date || 0);
    return aNext - bNext;
  });

  const handleWater = (plant: Plant) => {
    waterPlant(plant.id, plant.next_watering_date, 1, 2);
  };

  const renderPlant = ({ item }: { item: Plant }) => {
    const now = Math.floor(Date.now() / 1000);
    const nextWatering = item.next_watering_date || now;
    let daysUntilWatering = Math.ceil((nextWatering - now) / (60 * 60 * 24));
    const frequency = item.water_frequency_days || 1;
    
    // TODO: Forzar PRUEBA: Palo de agua siempre necesita agua hoy
    if (item.species_id === 'palo_de_agua') {
      daysUntilWatering = 0;
    }
    
    // 0% = Needs water, 100% = Full water
    let percentage = frequency > 0 ? (daysUntilWatering / frequency) * 100 : 0;
    percentage = Math.max(0, Math.min(100, percentage));


    const isUrgent = daysUntilWatering <= 0;

    return (
      <Card style={[styles.plantCard, isUrgent && styles.urgentCard]}>
        {isUrgent && (
          <View style={styles.urgentBadge}>
            <Ionicons name="water" size={20} color={Colors.inkDark} />
          </View>
        )}
        {/* Progreso Circular Flotante Arriba Izquierda (Oculto si es urgente) */}
        {!isUrgent && (
          <View style={styles.topLeftProgress}>
            <CircularProgress 
              percentage={percentage} 
              icon={percentage === 0 ? "water" : "water-outline"} 
              size={24}
              strokeWidth={2}
            />
          </View>
        )}

        <PlantImage source={getPlantImage(item.asset_url)} style={styles.imagePlaceholder} />
        
        <View style={styles.cardContent}>
          <Text style={styles.plantName}>{item.nickname || item.species_id.replace(/_/g, ' ')}</Text>
          
          <TouchableOpacity style={styles.statusRow} onPress={() => handleWater(item)}>
            {isUrgent ? (
              <Text style={styles.urgentStatusText}>¡Regar Hoy!</Text>
            ) : (
              <Text style={styles.normalStatusText}>
                Prox. riego: <Text style={styles.boldText}>{daysUntilWatering} días</Text>
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <PaperBackground>
        {/* Custom Header Wireframe */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTopRow}>
            <View style={styles.headerRightIcons}>
              <Ionicons name="search-outline" size={24} color={Colors.inkDark} />
              <Ionicons name="filter-outline" size={24} color={Colors.inkDark} style={styles.iconMargin} />
            </View>
          </View>
          <Text style={styles.mainTitle}>Mi Herbario</Text>
        </View>

        <FlatList
          data={sortedPlants}
          keyExtractor={(item) => item.id}
          renderItem={renderPlant}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Tu herbario está vacío. Ve al catálogo para añadir tu primera planta.</Text>
            </View>
          }
        />
      </PaperBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.paper,
  },
  headerContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  headerRightIcons: {
    flexDirection: 'row',
  },
  iconMargin: {
    marginLeft: Theme.spacing.md,
  },
  mainTitle: {
    fontFamily: Theme.typography.family.serif,
    fontSize: Theme.typography.size.xxl,
    color: Colors.inkDark,
    textAlign: 'center',
    lineHeight: 36,
  },
  listContent: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.spacing.xxl,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  plantCard: {
    width: '48%',
    marginBottom: Theme.spacing.md,
    justifyContent: 'space-between',
  },
  urgentCard: {
    borderWidth: 2,
    borderColor: Colors.inkDark,
    transform: [{ rotate: '-2deg' }],
  },
  urgentBadge: {
    position: 'absolute',
    top: -12,
    right: -12,
    zIndex: 20,
    backgroundColor: Colors.paper,
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.inkDark,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1, // Cuadrado perfecto
    marginBottom: Theme.spacing.sm,
  },
  cardContent: {
    alignItems: 'center',
  },
  plantName: {
    fontFamily: Theme.typography.family.serif,
    fontSize: 16,
    color: Colors.inkDark,
    textAlign: 'center',
    marginBottom: 0,
  },
  topLeftProgress: {
    position: 'absolute',
    top: Theme.spacing.sm,
    left: Theme.spacing.sm,
    zIndex: 10,
  },
  speciesText: {
    fontFamily: Theme.typography.family.sans,
    fontSize: 10,
    color: Colors.inkMedium,
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 0,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  normalStatusText: {
    fontFamily: Theme.typography.family.mono,
    fontStyle: 'italic',
    fontSize: 13,
    color: Colors.inkDark,
  },
  urgentStatusText: {
    fontFamily: Theme.typography.family.sans,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: Colors.inkDark,
    color: Colors.paperHighlight,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    overflow: 'hidden', // Necesario para que recortes de fondo en Text funcionen bien en iOS
  },
  boldText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 15,
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
    textAlign: 'center',
  }
});
