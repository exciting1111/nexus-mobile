import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceholderScreen = ({ title }: { title: string }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>
    <Text style={styles.subtext}>Coming Soon</Text>
  </View>
);

export const MarketScreen = () => <PlaceholderScreen title="Market" />;
export const DiscoverScreen = () => <PlaceholderScreen title="Discover" />;
export const ProfileScreen = () => <PlaceholderScreen title="Profile" />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#00f0ff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtext: {
    color: '#6b7280',
    fontSize: 16,
  },
});
