import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';

interface MarketItemProps {
  symbol: string;
  name: string;
  price: string;
  change: number;
  data: { timestamp: number; value: number }[];
  onPress: () => void;
}

export const MarketItem: React.FC<MarketItemProps> = ({ symbol, name, price, change, data, onPress }) => {
  const isPositive = change >= 0;
  const color = isPositive ? '#10B981' : '#EF4444';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        <View style={styles.iconPlaceholder} />
        <View>
          <Text style={styles.symbol}>{symbol}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>

      <View style={styles.chart}>
        <LineChart.Provider data={data}>
          <LineChart width={80} height={30}>
            <LineChart.Path color={color} width={2} />
          </LineChart>
        </LineChart.Provider>
      </View>

      <View style={styles.right}>
        <Text style={styles.price}>${price}</Text>
        <Text style={[styles.change, { color }]}>
          {isPositive ? '+' : ''}{change}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  iconPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 12,
  },
  symbol: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  name: {
    color: '#6B7280',
    fontSize: 12,
  },
  chart: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    width: 80,
    alignItems: 'flex-end',
  },
  price: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  change: {
    fontSize: 12,
    marginTop: 4,
  },
});
