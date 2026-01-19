import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useThemeColors } from '@/hooks/theme';
import { AssetCard } from '@/components/Nexus/AssetCard';
import { ActionButtons } from '@/components/Nexus/ActionButtons';
import { TabsMultiAssets } from '../Address/components/MultiAssets/TabsMultiAssets';
import { useMyAccounts } from '@/hooks/account';
import { useSortAddressList } from '../Address/useSortAddressList';
import { useAccountInfo } from '../Address/components/MultiAssets/hooks';

export const NexusHome = () => {
  const colors = useThemeColors();
  const { accounts } = useMyAccounts({ disableAutoFetch: true });
  const sortedAccounts = useSortAddressList(accounts);
  const { myTop10Addresses } = useAccountInfo();

  // Mock data for now, will connect to real data later
  const totalBalance = "12,345.67";
  const change = "+5.24%";
  const currentAddress = sortedAccounts[0]?.address || "0x0000...0000";

  return (
    <View style={[styles.container, { backgroundColor: '#09090B' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AssetCard 
          balance={totalBalance}
          change={change}
          address={currentAddress}
        />
        
        <ActionButtons />

        <View style={styles.assetsContainer}>
          <TabsMultiAssets 
            sceneAccountList={myTop10Addresses}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for TabBar
  },
  assetsContainer: {
    marginTop: 32,
    flex: 1,
    minHeight: 500,
  },
});
