import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Colors, Theme } from '../../theme/tokens';
import { PaperBackground } from '../../components/ui/PaperBackground';
import { Card } from '../../components/ui/Card';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <PaperBackground>
        <View style={styles.container}>
          <Text style={styles.title}>Mi Cuaderno</Text>
          
          <Card style={styles.statsCard}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Racha Actual</Text>
              <Text style={styles.statValue}>5 días</Text>
            </View>
            <View style={[styles.statRow, styles.statRowNoBorder]}>
              <Text style={styles.statLabel}>Plantas Adoptadas</Text>
              <Text style={styles.statValue}>3</Text>
            </View>
          </Card>
          
          <Text style={styles.subtitle}>Próximamente: Sincronización en la nube.</Text>
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
    padding: Theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Theme.typography.family.serif,
    fontSize: Theme.typography.size.xxl,
    color: Colors.inkDark,
    marginBottom: Theme.spacing.xxl,
  },
  statsCard: {
    width: '100%',
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: Theme.borders.width.thin,
    borderColor: Colors.inkMedium,
  },
  statRowNoBorder: {
    borderBottomWidth: 0,
  },
  statLabel: {
    fontFamily: Theme.typography.family.sans,
    fontSize: Theme.typography.size.md,
    color: Colors.inkMedium,
  },
  statValue: {
    fontFamily: Theme.typography.family.mono,
    fontSize: Theme.typography.size.lg,
    color: Colors.inkDark,
    fontWeight: Theme.typography.weight.bold,
  },
  subtitle: {
    fontFamily: Theme.typography.family.serif,
    fontSize: Theme.typography.size.sm,
    color: Colors.inkMedium,
    fontStyle: 'italic',
    textAlign: 'center',
  }
});
