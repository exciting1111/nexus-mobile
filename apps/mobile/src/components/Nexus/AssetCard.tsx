import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

interface AssetCardProps {
  balance: string;
  change: string;
  address: string;
}

export const AssetCard: React.FC<AssetCardProps> = ({ balance, change, address }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.header}>
          <Text style={styles.label}>Total Balance</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{address.slice(0, 6)}...{address.slice(-4)}</Text>
          </View>
        </View>

        <Text style={styles.balance}>${balance}</Text>
        
        <View style={styles.footer}>
          <Text style={[styles.change, { color: change.startsWith('+') ? '#10B981' : '#EF4444' }]}>
            {change} (24h)
          </Text>
          <Svg width="100" height="40" viewBox="0 0 100 40">
            <Defs>
              <SvgLinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#8B5CF6" stopOpacity="0.5" />
                <Stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
              </SvgLinearGradient>
            </Defs>
            <Path
              d="M0 30 Q 25 10 50 25 T 100 15 V 40 H 0 Z"
              fill="url(#grad)"
            />
            <Path
              d="M0 30 Q 25 10 50 25 T 100 15"
              stroke="#8B5CF6"
              strokeWidth="2"
              fill="none"
            />
          </Svg>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  card: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  addressContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  address: {
    color: '#6B7280',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(139, 92, 246, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  change: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
});
