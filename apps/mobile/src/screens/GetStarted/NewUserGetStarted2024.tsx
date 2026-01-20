import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View, StatusBar } from 'react-native';
import { RootNames } from '@/constant/layout';
import { keyringService, preferenceService } from '@/core/services';
import { navigateDeprecated } from '@/utils/navigation';
import { useMemoizedFn } from 'ahooks';
import { StackActions, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useAppUnlocked } from '@/hooks/useLock';
import {
  ProcDataType,
  useCreateAddressProc,
  useImportAddressProc,
} from '@/hooks/address/useNewUser';
import { resetNavigationTo, useRabbyAppNavigation } from '@/hooks/navigation';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { REPORT_TIMEOUT_ACTION_KEY } from '@/core/services/type';
import { NexusBackground } from '@/components/Nexus/NexusBackground';
import { NexusButton } from '@/components/Nexus/NexusButton';
import Svg, { Defs, RadialGradient, Stop, Circle, Path } from 'react-native-svg';

// Nexus Logo Component
const NexusLogo = ({ size }: { size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <Defs>
      <RadialGradient id="grad" cx="50" cy="50" r="50" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#3B82F6" stopOpacity="1" />
        <Stop offset="1" stopColor="#9333EA" stopOpacity="1" />
      </RadialGradient>
    </Defs>
    <Circle cx="50" cy="50" r="45" stroke="url(#grad)" strokeWidth="4" />
    <Path
      d="M50 20L80 80H20L50 20Z"
      fill="url(#grad)"
      opacity="0.8"
    />
  </Svg>
);

function GetStartedScreen2024(): JSX.Element {
  const { t } = useTranslation();

  const [getStaretd, setGetStaretd] = useState<{
    localHasAccounts: boolean;
    processedInit: boolean;
  }>({
    localHasAccounts: false,
    processedInit: false,
  });

  const handleGoToHome = useCallback(async () => {
    if (!getStaretd.processedInit) return;
    if (!keyringService.isUnlocked()) {
      navigateDeprecated(RootNames.Unlock);
      return;
    }
    navigateDeprecated(RootNames.StackRoot, { screen: RootNames.Home });
  }, [getStaretd.processedInit]);

  const { startCreateAddressProc, resetCreateAddressProc } = useCreateAddressProc();
  const { resetImportAddressProc } = useImportAddressProc();

  useFocusEffect(
    useCallback(() => {
      resetCreateAddressProc();
      resetImportAddressProc();
    }, [resetCreateAddressProc, resetImportAddressProc]),
  );

  const handleGoToCreate = useCallback(async () => {
    if (!getStaretd.processedInit) return;
    if (!keyringService.isUnlocked()) {
      navigateDeprecated(RootNames.Unlock);
      return;
    }

    startCreateAddressProc(ProcDataType.Seed, '');
    preferenceService.setReportActionTs(REPORT_TIMEOUT_ACTION_KEY.CLICK_CREATE_NEW_ADDRESS);
    navigateDeprecated(RootNames.StackAddress, {
      screen: RootNames.CreateNewAddress,
      params: { isFirstCreate: true },
    });
  }, [getStaretd.processedInit, startCreateAddressProc]);

  const handleGoToImport = useCallback(async () => {
    if (!getStaretd.processedInit) return;
    if (!keyringService.isUnlocked()) {
      navigateDeprecated(RootNames.Unlock);
      return;
    }

    preferenceService.setReportActionTs(REPORT_TIMEOUT_ACTION_KEY.CLICK_HAVE_ADDRESS);
    navigateDeprecated(RootNames.StackAddress, {
      screen: RootNames.ImportMethods,
    });
  }, [getStaretd.processedInit]);

  const handleGoToSyncExtension = useCallback(async () => {
    if (!getStaretd.processedInit) return;
    if (!keyringService.isUnlocked()) {
      navigateDeprecated(RootNames.Unlock);
      return;
    }

    navigateDeprecated(RootNames.Scanner, { syncExtension: true });
    preferenceService.setReportActionTs(REPORT_TIMEOUT_ACTION_KEY.CLICK_SCAN_SYNC_EXTENSION);
  }, [getStaretd.processedInit]);

  const navigation = useRabbyAppNavigation();

  const initAccounts = useMemoizedFn(async () => {
    setGetStaretd(prev => ({ ...prev, processedInit: false }));
    try {
      const accounts = await keyringService.getAllVisibleAccountsArray();
      setGetStaretd(prev => ({ ...prev, localHasAccounts: !!accounts.length }));
      if (accounts?.length) {
        resetNavigationTo(navigation, 'Home');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGetStaretd(prev => ({ ...prev, processedInit: true }));
    }
  });

  const { isAppUnlocked } = useAppUnlocked();
  useFocusEffect(
    useCallback(() => {
      if (isAppUnlocked) {
        initAccounts();
      }
    }, [isAppUnlocked, initAccounts]),
  );

  const { bottom, top } = useSafeAreaInsets();
  const { height } = useSafeAreaFrame();
  const { height: WHeight } = useWindowDimensions();

  const offsetAreaStyle = useMemo(() => {
    const availableHeight = Math.min(height - bottom - top, WHeight);
    return {
      flexShrink: 0,
      height: availableHeight > 700 ? Math.floor(availableHeight - 150) / 2 : 100,
    };
  }, [bottom, height, top, WHeight]);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <NexusBackground />
      
      <View style={offsetAreaStyle} />
      
      <View style={styles.contentArea}>
        <View style={styles.centerWrapper}>
          <NexusLogo size={120} />
          
          <View style={styles.titleContainer}>
            <Text style={styles.appName}>Nexus Wallet</Text>
          </View>
          
          <Text style={styles.appDesc}>
            The Next-Gen Web3 Aggregator
          </Text>
        </View>

        <View style={styles.bottomArea}>
          {!getStaretd.localHasAccounts ? (
            <View style={{ gap: 16, alignItems: 'center' }}>
              <NexusButton
                title="Create New Wallet"
                onPress={handleGoToCreate}
                disabled={!getStaretd.processedInit || getStaretd.localHasAccounts}
              />

              <NexusButton
                variant="secondary"
                title="I Already Have a Wallet"
                onPress={handleGoToImport}
                disabled={!getStaretd.processedInit || getStaretd.localHasAccounts}
              />
              
              <NexusButton
                variant="ghost"
                title="Sync from Extension"
                onPress={handleGoToSyncExtension}
                disabled={!getStaretd.processedInit || getStaretd.localHasAccounts}
              />
            </View>
          ) : (
            <NexusButton
              title="Enter Nexus"
              onPress={handleGoToHome}
              disabled={!getStaretd.processedInit || !getStaretd.localHasAccounts}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#09090B',
  },
  contentArea: {
    flex: 1,
    paddingBottom: 50,
    justifyContent: 'space-between',
  },
  centerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginTop: 24,
  },
  appName: {
    fontFamily: 'SF Pro Rounded',
    fontWeight: '800',
    color: 'white',
    fontSize: 32,
    letterSpacing: 1,
  },
  appDesc: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'SF Pro Rounded',
    fontSize: 16,
    marginTop: 12,
    fontWeight: '500',
  },
  bottomArea: {
    alignItems: 'center',
    paddingBottom: 40,
  },
});

export default GetStartedScreen2024;
