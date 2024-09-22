import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import ClimaticSupportScreen from '../screens/ClimaticSupport/ClimaticSupport';
import FinancialMonitoringScreen from '../screens/FinancialMonitoring/FinancialMonitoringScreen';
import InputManagementScreen from '../screens/InputManagement/InputManagementScreen';
import MarketPricesScreen from '../screens/MarketPricesScreen/MarketPricesScreen';
import ProfitabilityAnalysisScreen from '../screens/ProfitabilityAnalysis/ProfitabilityAnalysisScreen';
import SupportScreen from '../screens/Support/SupportScreen';
import AddFinancialEntryScreen from '../screens/FinancialMonitoring/AddFinancialEntryScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator para Financial Monitoring
const FinancialMonitoringStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FinancialMonitoringMain"
        component={FinancialMonitoringScreen}
        options={{ title: 'Monitoramento Financeiro' }}
      />
      <Stack.Screen
        name="AddFinancialEntry"
        component={AddFinancialEntryScreen}
        options={{ title: 'Adicionar Entrada' }}
      />
    </Stack.Navigator>
  );
};

// Stack Navigator para Profitability Analysis
const ProfitabilityAnalysisStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfitabilityAnalysisMain"
        component={ProfitabilityAnalysisScreen}
        options={{ title: 'Análise de Lucratividade' }}
      />
    </Stack.Navigator>
  );
};

// Stack Navigator para Support
const SupportStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SupportMain"
        component={SupportScreen}
        options={{ title: 'Suporte' }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="ClimaticSupport"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home'; // Definir um valor de fallback válido

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'ClimaticSupport') {
              iconName = focused ? 'cloud' : 'cloud-outline';
            } else if (route.name === 'FinancialMonitoring') {
              iconName = focused ? 'cash' : 'cash-outline';
            } else if (route.name === 'MarketPrices') {
              iconName = focused ? 'pricetag' : 'pricetag-outline';
            } else if (route.name === 'ProfitabilityAnalysis') {
              iconName = focused ? 'analytics' : 'analytics-outline';
            } else if (route.name === 'Support') {
              iconName = focused ? 'help-circle' : 'help-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2288B0',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="ClimaticSupport"
          component={ClimaticSupportScreen}
          options={{ title: 'Clima' }}
        />
        <Tab.Screen
          name="FinancialMonitoring"
          component={FinancialMonitoringStack}
          options={{ title: 'Financeiro' }}
        />
        <Tab.Screen
          name="MarketPrices"
          component={MarketPricesScreen}
          options={{ title: 'Preços' }}
        />
        <Tab.Screen
          name="ProfitabilityAnalysis"
          component={ProfitabilityAnalysisStack}
          options={{ title: 'Análise' }}
        />
        <Tab.Screen
          name="Support"
          component={SupportStack}
          options={{ title: 'Suporte' }}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
