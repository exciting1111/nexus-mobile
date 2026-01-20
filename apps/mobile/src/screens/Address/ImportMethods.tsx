import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar } from 'react-native';
import { useTheme2024 } from '@/hooks/theme';
import { RootNames } from '@/constant/layout';
import SeedPhraseIcon from '@/assets2024/icons/common/seed-phrase.svg';
import PrivateKeyIcon from '@/assets2024/icons/common/private-key.svg';
import HardWareIcon from '@/assets2024/icons/common/IconHardWare.png';
import IconSyncRabby from '@/assets2024/icons/common/iconSyncExtension.svg';
import { createGlobalBottomSheetModal2024, removeGlobalBottomSheetModal2024 } from '@/components2024/GlobalBottomSheetModal';
import { MODAL_NAMES } from '@/components2024/GlobalBottomSheetModal/types';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { useSetPasswordFirst } from '@/hooks/useLock';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@/navigation-type';
import { preferenceService } from '@/core/services';
import { REPORT_TIMEOUT_ACTION_KEY } from '@/core/services/type';
import { IS_IOS } from '@/core/native/utils';
import { NexusBackground } from '@/components/Nexus/NexusBackground';
import { NexusCard } from '@/components/Nexus/NexusCard';
import { HeaderBackPressable } from '@/hooks/navigation';

type CurrentAddressProps = NativeStackScreenProps<RootStackParamsList, 'StackAddress'>;

function ImportMethods(): JSX.Element {
  const { shouldRedirectToSetPasswordBefore2024 } = useSetPasswordFirst();
  const { t } = useTranslation();
  const navigation = useNavigation<CurrentAddressProps['navigation']>();
  const route = useRoute<any>();
  const state = route.params;

  const onPressCloud = React.useCallback(() => {
    const id = createGlobalBottomSheetModal2024({
      name: MODAL_NAMES.RESTORE_FROM_CLOUD,
      shouldRedirect2SetPassword: shouldRedirectToSetPasswordBefore2024,
      onDone: () => {
        setTimeout(() => {
          removeGlobalBottomSheetModal2024(id);
        }, 0);
      },
    });
  }, [shouldRedirectToSetPasswordBefore2024]);

  const CloudImageSrc = React.useMemo(() => {
    if (IS_IOS) {
      return require('@/assets2024/icons/common/IconIcloud.png');
    }
    return require('@/assets2024/icons/common/IconGoogleDrive.png');
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NexusBackground />
      
      <View style={styles.header}>
        <HeaderBackPressable style={{ marginLeft: 16 }} />
        <Text style={styles.headerTitle}>Import Wallet</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>
          {state?.isNotNewUserProc ? t('page.nextComponent.importAddress.importTitle') : 'Select Import Method'}
        </Text>

        <NexusCard
          onPress={async () => {
            if (state?.isNotNewUserProc && (await shouldRedirectToSetPasswordBefore2024({ backScreen: RootNames.ImportMnemonic2024 }))) return;
            navigation.dispatch(StackActions.push(RootNames.StackAddress, { screen: RootNames.ImportMnemonic2024, params: {} }));
            !state?.isNotNewUserProc && preferenceService.setReportActionTs(REPORT_TIMEOUT_ACTION_KEY.CLICK_IMPORT_SEED_PHRASE);
          }}
        >
          <SeedPhraseIcon style={styles.icon} width={32} height={32} color="white" />
          <Text style={styles.cardText}>{t('page.nextComponent.importAddress.seedPhrase')}</Text>
        </NexusCard>

        <NexusCard
          onPress={async () => {
            if (state?.isNotNewUserProc && (await shouldRedirectToSetPasswordBefore2024({ backScreen: RootNames.ImportPrivateKey2024 }))) return;
            navigation.dispatch(StackActions.push(RootNames.StackAddress, { screen: RootNames.ImportPrivateKey2024, params: {} }));
            !state?.isNotNewUserProc && preferenceService.setReportActionTs(REPORT_TIMEOUT_ACTION_KEY.CLICK_IMPORT_PRIVATE_KEY);
          }}
        >
          <PrivateKeyIcon style={styles.icon} width={32} height={32} color="white" />
          <Text style={styles.cardText}>{t('page.nextComponent.importAddress.privateKey')}</Text>
        </NexusCard>

        <NexusCard onPress={onPressCloud}>
          <Image style={styles.imageIcon} source={CloudImageSrc} />
          <Text style={styles.cardText}>
            {t('page.nextComponent.importAddress.ImportCloud', { cloud: IS_IOS ? 'iCloud' : 'Google Drive' })}
          </Text>
        </NexusCard>

        {state?.isFromEmptyAddress && (
          <>
            <NexusCard
              onPress={() => {
                navigation.dispatch(StackActions.push(RootNames.StackAddress, { screen: RootNames.ImportHardwareAddress, params: {} }));
              }}
            >
              <Image source={HardWareIcon} style={styles.imageIcon} />
              <Text style={styles.cardText}>{t('page.nextComponent.addAddress.hardwareWallet')}</Text>
            </NexusCard>

            <NexusCard
              onPress={() => {
                navigation.dispatch(StackActions.push(RootNames.Scanner, { syncExtension: true }));
                preferenceService.setReportActionTs(REPORT_TIMEOUT_ACTION_KEY.CLICK_SCAN_SYNC_EXTENSION);
              }}
            >
              <IconSyncRabby style={styles.icon} width={32} height={32} color="white" />
              <Text style={styles.cardText}>{t('page.nextComponent.addAddress.syncRabbyExtension')}</Text>
            </NexusCard>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    marginTop: 44, // Safe Area Top
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SF Pro Rounded',
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  icon: {
    marginRight: 16,
  },
  imageIcon: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'SF Pro Rounded',
  },
});

export default ImportMethods;
