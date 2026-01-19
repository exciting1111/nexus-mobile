import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MarketItem } from '@/components/Nexus/MarketItem';
import { useThemeColors } from '@/hooks/theme';

// Mock data generator
const generateData = (startPrice: number) => {
  let price = startPrice;
  return Array.from({ length: 20 }).map((_, i) => {
    price = price * (1 + (Math.random() - 0.5) * 0.1);
    return { timestamp: i, value: price };
  });
};

const MARKET_DATA = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', price: '42,350.00', change: 2.5, data: generateData(42000) },
  { id: '2', symbol: 'ETH', name: 'Ethereum', price: '2,250.00', change: -1.2, data: generateData(2300) },
  { id: '3', symbol: 'SOL', name: 'Solana', price: '98.50', change: 5.8, data: generateData(92) },
  { id: '4', symbol: 'BNB', name: 'Binance Coin', price: '310.00', change: 0.5, data: generateData(308) },
  { id: '5', symbol: 'XRP', name: 'Ripple', price: '0.55', change: -0.8, data: generateData(0.56) },
];

export const NexusMarket = () => {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: '#09090B' }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Market</Text>
      </View>
      
      <FlatList
        data={MARKET_DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <MarketItem
            symbol={item.symbol}
            name={item.name}
            price={item.price}
            change={item.change}
            data={item.data}
            onPress={() => {}}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // Status bar space
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
});
