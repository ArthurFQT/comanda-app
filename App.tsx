import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import { OrdersProvider } from './src/context/OrdersContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <OrdersProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Novo Pedido" component={HomeScreen} />
          <Tab.Screen name="Pedidos" component={OrdersScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </OrdersProvider>
  );
}
