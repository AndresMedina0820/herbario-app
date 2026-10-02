import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Alert } from 'react-native';
import { Colors, Theme } from '../../theme/tokens';
import { PaperBackground } from '../../components/ui/PaperBackground';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PlantImage } from '../../components/ui/PlantImage';
import { useGardenActions } from '../../features/garden/hooks/useGardenActions';
import { MockImages } from '../../utils/assets';

const MOCK_CATALOG = [
  { id: 'c1', species_id: 'monsquera', name: 'Costilla de Adán', scientific: 'Monstera deliciosa', frequencyDays: 7 },
  { id: 'c2', species_id: 'helecho', name: 'Helecho Espada', scientific: 'Nephrolepis exaltata', frequencyDays: 2 },
  { id: 'c3', species_id: 'potos', name: 'Pothos', scientific: 'Epipremnum aureum', frequencyDays: 5 },
  { id: 'c4', species_id: 'palo_de_agua', name: 'Palo de Agua', scientific: 'Dracaena fragrans', frequencyDays: 10 },
];

export default function CatalogScreen() {
  const { addPlant } = useGardenActions();

  const handleAdd = (item: typeof MOCK_CATALOG[0]) => {
    // Usamos el species_id como el assetUrl para mapear la imagen
    addPlant(item.species_id, item.name, item.species_id, item.frequencyDays);
    // Retroalimentación visual sutil
    Alert.alert("¡Planta adoptada!", `Tu ${item.name} ha sido añadida a tu jardín local.`);
  };

  const renderItem = ({ item }: { item: typeof MOCK_CATALOG[0] }) => (
    <Card style={styles.card}>
      <PlantImage source={MockImages[item.species_id]} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.scientific}>{item.scientific}</Text>
      <View style={styles.footer}>
        <Button 
          title="Añadir a mi jardín" 
          variant="primary" 
          style={styles.addButton} 
          onPress={() => handleAdd(item)}
        />
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <PaperBackground>
        <FlatList
          data={MOCK_CATALOG}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
        />
      </PaperBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.paper },
  listContent: { padding: Theme.spacing.md },
  columnWrapper: { justifyContent: 'space-between' },
  card: {
    width: '48%',
    marginBottom: Theme.spacing.md,
    padding: Theme.spacing.sm,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: Theme.spacing.sm,
  },
  name: {
    fontFamily: Theme.typography.family.serif,
    fontSize: Theme.typography.size.md,
    color: Colors.inkDark,
    marginBottom: 2,
  },
  scientific: {
    fontFamily: Theme.typography.family.mono,
    fontSize: Theme.typography.size.xs,
    color: Colors.inkMedium,
    fontStyle: 'italic',
  },
  footer: {
    marginTop: Theme.spacing.md,
  },
  addButton: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.xs,
  }
});
