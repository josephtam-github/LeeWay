import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <View className="flex-1">
      <HomeScreen />
      <StatusBar style="auto" />
    </View>
  );
}
