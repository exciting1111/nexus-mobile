import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { BrowserSearchEntry } from '../Browser/components/BrowserSearchEntry';
import { useThemeColors } from '@/hooks/theme';

const DAppCard = ({ title, desc, color }: { title: string; desc: string; color: string }) => (
  <TouchableOpacity style={styles.dappCard}>
    <View style={[styles.dappIcon, { backgroundColor: color }]} />
    <View>
      <Text style={styles.dappTitle}>{title}</Text>
      <Text style={styles.dappDesc}>{desc}</Text>
    </View>
  </TouchableOpacity>
);

const Banner = () => (
  <View style={styles.banner}>
    <Text style={styles.bannerTitle}>Explore Web3</Text>
    <Text style={styles.bannerSubtitle}>Discover the best DApps on Nexus</Text>
  </View>
);

export const NexusDiscover = () => {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: '#09090B' }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
      </View>

      <View style={styles.searchContainer}>
        {/* Reusing Rabby's search entry logic but wrapping it in our style */}
        <BrowserSearchEntry />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Banner />

        <Text style={styles.sectionTitle}>Recommended</Text>
        <View style={styles.grid}>
          <DAppCard title="Uniswap" desc="Swap tokens" color="#FF007A" />
          <DAppCard title="Aave" desc="Lending protocol" color="#B6509E" />
          <DAppCard title="OpenSea" desc="NFT Marketplace" color="#2081E2" />
          <DAppCard title="Curve" desc="Stablecoin exchange" color="#FF0000" />
        </View>

        <Text style={styles.sectionTitle}>Games</Text>
        <View style={styles.grid}>
          <DAppCard title="Axie Infinity" desc="Play to earn" color="#0055D5" />
          <DAppCard title="Decentraland" desc="Virtual world" color="#FF2D55" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  banner: {
    height: 160,
    backgroundColor: '#1F2937',
    borderRadius: 24,
    padding: 24,
    justifyContent: 'flex-end',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8,
  },
  grid: {
    gap: 16,
  },
  dappCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  dappIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 16,
  },
  dappTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  dappDesc: {
    color: '#6B7280',
    fontSize: 14,
  },
});
