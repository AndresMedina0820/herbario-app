import { View, Text, StyleSheet } from 'react-native';
import { Colors, Theme } from '../../theme/tokens';

export default function CatalogScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Catálogo de Especies</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paper,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: Theme.typography.family.serif,
    fontSize: Theme.typography.size.xl,
    color: Colors.inkDark,
  }
});
