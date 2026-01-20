import React from 'react';
import { StyleSheet, View, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { NexusBackground } from '@/components/Nexus/NexusBackground';
import { NexusAssetCard } from '@/components/Nexus/NexusAssetCard';
import { useNavigation } from '@react-navigation/native';
import { TabsMultiAssets } from '../Address/components/MultiAssets/TabsMultiAssets';
import { useAccountInfo } from '../Address/components/MultiAssets/hooks';

export const NexusHome = () => {
  const navigation = useNavigation();
  const { myTop10Addresses } = useAccountInfo();

  const handleDeposit = () => {
    // TODO: Navigate to Deposit
    console.log('Deposit pressed');
  };

  const handleSend = () => {
    navigation.navigate('Send');
  };

  const handleSwap = () => {
    navigation.navigate('Swap');
  };

  const handleReceive = () => {
    navigation.navigate('Receive');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NexusBackground />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Space */}
          <View style={styles.headerSpace} />
          
          {/* Main Asset Card */}
          <NexusAssetCard
            totalUsd="$128,450.00"
            changePercent="+2.5%"
            onDeposit={handleDeposit}
            onSend={handleSend}
            onSwap={handleSwap}
            onReceive={handleReceive}
          />

          {/* Assets List */}
          <View style={styles.assetsContainer}>
            <TabsMultiAssets 
              sceneAccountList={myTop10Addresses}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  headerSpace: {
    height: 20,
  },
  assetsContainer: {
    marginTop: 10,
    flex: 1,
    minHeight: 500,
  },
});
