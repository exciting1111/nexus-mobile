import React, { useCallback } from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';
import { NexusBackground } from '@/components/Nexus/NexusBackground';
import { NexusAssetCard } from '@/components/Nexus/NexusAssetCard';
import { useNavigation } from '@react-navigation/native';
import { TabsMultiAssets } from '../Address/components/MultiAssets/TabsMultiAssets';
import { useAccountInfo } from '../Address/components/MultiAssets/hooks';

export const NexusHome = () => {
  const navigation = useNavigation();
  const { myTop10Addresses } = useAccountInfo();

  const handleDeposit = () => {
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

  // This component will be rendered inside the Tabs header
  const HeaderComponent = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerSpace} />
        <NexusAssetCard
          totalUsd="$128,450.00"
          changePercent="+2.5%"
          onDeposit={handleDeposit}
          onSend={handleSend}
          onSwap={handleSwap}
          onReceive={handleReceive}
        />
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NexusBackground />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <TabsMultiAssets 
            onIndexChange={() => {}}
            OverViewComponent={HeaderComponent}
          />
        </View>
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
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    paddingBottom: 20,
  },
  headerSpace: {
    height: 20,
  },
});
