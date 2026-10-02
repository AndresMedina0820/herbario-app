import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Colors, Theme } from '../../theme/tokens';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.inkDark,
        tabBarInactiveTintColor: Colors.inkMedium,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
        // En iOS, el headerShadowVisible controla la sombra, en Android es elevation
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Herbario',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          title: 'Catálogo',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.paper,
    borderBottomWidth: Theme.borders.width.thick,
    borderBottomColor: Colors.inkDark,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: {
    fontFamily: Theme.typography.family.serif,
    fontSize: Theme.typography.size.lg,
    color: Colors.inkDark,
  },
  tabBar: {
    backgroundColor: Colors.paper,
    borderTopWidth: Theme.borders.width.thick,
    borderTopColor: Colors.inkDark,
    elevation: 0,
    shadowOpacity: 0,
    paddingBottom: Theme.spacing.sm,
    height: 60,
  },
  tabBarLabel: {
    fontFamily: Theme.typography.family.sans,
    fontSize: Theme.typography.size.xs,
    fontWeight: Theme.typography.weight.medium,
  }
});
