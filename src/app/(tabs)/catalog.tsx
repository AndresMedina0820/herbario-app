import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/ui/Card';
import { PaperBackground } from '../../components/ui/PaperBackground';
import { PlantImage } from '../../components/ui/PlantImage';
import { PromptModal } from '../../components/ui/PromptModal';
import { useGardenActions } from '../../features/garden/hooks/useGardenActions';
import { Colors, Theme } from '../../theme/tokens';
import { MockImages } from '../../utils/assets';

const MOCK_CATALOG = [
  { id: 'c1', species_id: 'monsquera', name: 'Costilla de Adán', scientific: 'Monstera deliciosa', frequencyDays: 7 },
  { id: 'c2', species_id: 'helecho', name: 'Helecho Espada', scientific: 'Nephrolepis exaltata', frequencyDays: 2 },
  { id: 'c3', species_id: 'potos', name: 'Pothos', scientific: 'Epipremnum aureum', frequencyDays: 5 },
  { id: 'c4', species_id: 'palo_de_agua', name: 'Palo de Agua', scientific: 'Dracaena fragrans', frequencyDays: 10 },
];

export default function CatalogScreen() {
  const { addPlant } = useGardenActions();
  const [selectedPlant, setSelectedPlant] = useState<typeof MOCK_CATALOG[0] | null>(null);
  const [nickname, setNickname] = useState('');

  const promptAddPlant = (item: typeof MOCK_CATALOG[0]) => {
    setSelectedPlant(item);
    setNickname(''); // Limpiar para nueva entrada
  };

  const confirmAddPlant = () => {
    if (!selectedPlant) return;
    
    addPlant(
      selectedPlant.species_id, 
      nickname.trim() || '', 
      selectedPlant.species_id, 
      selectedPlant.frequencyDays
    );
    
    Alert.alert("¡Adoptada!", `Tu nueva planta ha sido añadida a tu herbario.`);
    setSelectedPlant(null);
  };

  const renderItem = ({ item }: { item: typeof MOCK_CATALOG[0] }) => (
    <Card style={styles.card}>
      <PlantImage source={MockImages[item.species_id as keyof typeof MockImages]} style={styles.image} />
      
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.scientific}>{item.scientific}</Text>
        
        <TouchableOpacity style={styles.addButton} onPress={() => promptAddPlant(item)}>
          <Text style={styles.addButtonText}>Añadir</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <PaperBackground>
        <View style={styles.headerContainer}>
          <Text style={styles.mainTitle}>Índice Botánico</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={Colors.inkMedium} />
            <TextInput 
              placeholder="Buscar especies..." 
              placeholderTextColor={Colors.inkMedium}
              style={styles.searchInput}
            />
          </View>
        </View>

        <FlatList
          data={MOCK_CATALOG}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
        />

        <PromptModal
          visible={!!selectedPlant}
          title="Nombrar Planta"
          subtitle={`Escribe un apodo para identificar tu ${selectedPlant?.name}. Si lo dejas vacío, usaremos su nombre real.`}
          placeholder="Ej. Señor Espinas"
          value={nickname}
          onChangeText={setNickname}
          onCancel={() => setSelectedPlant(null)}
          onConfirm={confirmAddPlant}
          maxLength={18}
        />

      </PaperBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.paper },
  headerContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
  },
  mainTitle: {
    fontFamily: Theme.typography.family.serif,
    fontSize: Theme.typography.size.xxl,
    color: Colors.inkDark,
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.inkDark,
    backgroundColor: Colors.paperHighlight,
    paddingHorizontal: Theme.spacing.sm,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
    fontFamily: Theme.typography.family.sans,
    fontSize: 14,
    color: Colors.inkDark,
  },
  listContent: { 
    padding: Theme.spacing.md,
    paddingBottom: Theme.spacing.xxl,
  },
  columnWrapper: { justifyContent: 'space-between' },
  card: {
    width: '48%',
    marginBottom: Theme.spacing.md,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: Theme.spacing.sm,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: Theme.typography.family.serif,
    fontSize: 16,
    color: Colors.inkDark,
    textAlign: 'center',
    marginBottom: 2,
  },
  scientific: {
    fontFamily: Theme.typography.family.mono,
    fontSize: 13,
    color: Colors.inkMedium,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
  },
  addButton: {
    borderWidth: 1,
    borderColor: Colors.inkDark,
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: Theme.typography.family.mono,
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.inkDark,
  }
});
