import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

import AiCompanionScreen from '../screens/AiCompanionScreen';
import MembershipServicesScreen from '../screens/MembershipServicesScreen';
import RealStoriesScreen from '../screens/RealStoriesScreen';
import JourneyHistoryScreen from '../screens/JourneyHistoryScreen';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';
import SecureCheckoutScreen from '../screens/SecureCheckoutScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: colors.surfaceContainer,
          borderTopColor: colors.outlineVariant + '40',
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = 'auto-awesome';
          if (route.name === 'AiCompanion') iconName = 'auto-awesome';
          else if (route.name === 'Services') iconName = 'card-membership';
          else if (route.name === 'Stories') iconName = 'explore';
          else if (route.name === 'Journey') iconName = 'history';
          else if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'SecureCheckout') iconName = 'lock';

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="AiCompanion"
        component={AiCompanionScreen}
        options={{ tabBarLabel: 'AI Companion' }}
      />
      <Tab.Screen
        name="Services"
        component={MembershipServicesScreen}
        options={{ tabBarLabel: 'Services' }}
      />
      <Tab.Screen
        name="Stories"
        component={RealStoriesScreen}
        options={{ tabBarLabel: 'Stories' }}
      />
      <Tab.Screen
        name="Journey"
        component={JourneyHistoryScreen}
        options={{ tabBarLabel: 'Journey' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileSettingsScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
      <Tab.Screen
        name="SecureCheckout"
        component={SecureCheckoutScreen}
        options={{ tabBarButton: () => null, tabBarItemStyle: { display: 'none' } }}
      />
    </Tab.Navigator>
  );
}
