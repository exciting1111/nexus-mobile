import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import { useTranslation } from 'react-i18next';
import { apiMnemonic } from '@/core/apis';
import { activeAndPersistAccountsByMnemonics } from '@/core/apis/mnemonic';
import useAsync from 'react-use/lib/useAsync';
import { ellipsisAddress } from '@/utils/address';
import { contactService, keyringService } from '@/core/services';
import { Skeleton } from '@rneui/themed';
import { useRabbyAppNavigation } from '@/hooks/navigation';
import { StackActions, useRoute } from '@react-navigation/native';
import { replaceToFirst } from '@/utils/navigation';
import { useCreateAddressProc } from '@/hooks/address/useNewUser';
import { WalletIcon } from '@/components2024/WalletIcon/WalletIcon';
import { KEYRING_CLASS, KEYRING_TYPE } from '@rabby-wallet/keyring-utils';
import { RootNames } from '@/constant/layout';
import { NexusBackground } from '@/components/Nexus/NexusBackground';
import { NexusButton } from '@/components/Nexus/NexusButton';
import { NexusProgressBar } from '@/components/Nexus/NexusProgressBar';
import { NexusCard } from '@/components/Nexus/NexusCard';
import { HeaderBackPressable } from '@/hooks/navigation';
import LinearGradient from 'react-native-linear-gradient';

const MAX_ACCOUNT_COUNT = 50;
const PROGRESS_BAR_STEP = { ONE: 1, TWO: 2, THREE: 3 };

function CreateNewAddress(): JSX.Element {
  const { t } = useTranslation();
  const [newAddress, setNewAddress] = useState('');
  const navigation = useRabbyAppNavigation();
  const route = useRoute<any>();
  const state = route.params;

  const { value, loading } = useAsync(async () => {
    let seedPhrase = '';
    let accountsToCreate: any[] | undefined = [];
    if (state?.mnemonics) {
      seedPhrase = state?.mnemonics;
      const currentAddressArr = state?.accounts;
      const api = apiMnemonic.getKeyringByMnemonic(seedPhrase, '');
      for (let i = 0; i < MAX_ACCOUNT_COUNT; i++) {
        const res = await api?.getAddresses(i, i + 1);
        const idx = currentAddressArr?.findIndex(item => item === res?.[0].address);
        if (idx === -1) {
          accountsToCreate = res;
          break;
        }
      }
    } else {
      seedPhrase = await apiMnemonic.generatePreMnemonic();
      const Keyring = keyringService.getKeyringClassForType(KEYRING_CLASS.MNEMONIC) as any;
      const keyring = new Keyring({ mnemonic: seedPhrase, passphrase: '' });
      accountsToCreate = keyring?.getAddresses(0, 1);
    }
    const words = seedPhrase.split(' ');
    const address = accountsToCreate?.[0].address;
    setNewAddress(address);
    return { seedPhrase, words, accountsToCreate, addressIndex: accountsToCreate?.[0].index };
  });

  const { storeSeedPharse, storeAddressList } = useCreateAddressProc();
  const handleContinue = useCallback(() => {
    storeAddressList([{ address: newAddress, aliasName: '', index: value?.addressIndex }]);
    if (value?.seedPhrase) storeSeedPharse(value?.seedPhrase);

    if (state?.noSetupPassword) {
      navigation.dispatch(StackActions.push(RootNames.StackAddress, { screen: RootNames.CreateChooseBackup, params: {} }));
    } else {
      navigation.replace(RootNames.StackAddress, {
        screen: RootNames.SetPassword2024,
        params: { finishGoToScreen: RootNames.CreateChooseBackup, delaySetPassword: true, isFirstCreate: !!state?.isFirstCreate },
      });
    }
  }, [newAddress, value, navigation, state, storeSeedPharse, storeAddressList]);

  const handleDone = useCallback(async () => {
    contactService.setAlias({ address: newAddress, alias: '' });
    await activeAndPersistAccountsByMnemonics(state?.mnemonics || '', '', value?.accountsToCreate || [], false);
    replaceToFirst(RootNames.StackAddress, {
      screen: RootNames.ImportSuccess2024,
      params: {
        type: KEYRING_TYPE.HdKeyring,
        brandName: KEYRING_CLASS.MNEMONIC,
        isFirstCreate: true,
        address: [newAddress],
        mnemonics: state?.mnemonics,
        passphrase: '',
        isExistedKR: false,
        alias: ellipsisAddress(newAddress),
      },
    });
  }, [newAddress, state, value]);

  const currentProgressCount = React.useMemo(() => {
    return state?.useCurrentSeed ? PROGRESS_BAR_STEP.THREE : state?.noSetupPassword ? PROGRESS_BAR_STEP.TWO : PROGRESS_BAR_STEP.ONE;
  }, [state]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <NexusBackground />
        
        <View style={styles.header}>
          <HeaderBackPressable style={{ marginLeft: 16 }} />
          <Text style={styles.headerTitle}>Create Wallet</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.content}>
          {!!state?.isFirstCreate && (
            <NexusProgressBar step={currentProgressCount} total={3} />
          )}

          <Text style={styles.tips}>
            {t('page.nextComponent.createNewAddress.addressTopTips')}
          </Text>

          <NexusCard style={styles.addressCard}>
            <View style={styles.addressContent}>
              <WalletIcon style={styles.icon} address={newAddress} width={66} height={66} />
              {loading ? (
                <Skeleton circle width={200} height={30} animation="wave" LinearGradientComponent={LinearGradient} style={{ marginTop: 16 }} />
              ) : (
                <Text style={styles.addressText}>{ellipsisAddress(newAddress)}</Text>
              )}
            </View>
          </NexusCard>

          <View style={styles.footer}>
            <NexusButton
              disabled={loading}
              title={t('page.nextComponent.createNewAddress.Continue')}
              onPress={state?.useCurrentSeed ? handleDone : handleContinue}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    marginTop: 44,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SF Pro Rounded',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  tips: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'SF Pro Rounded',
  },
  addressCard: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 30,
  },
  addressContent: {
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    borderRadius: 20,
  },
  addressText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 16,
    fontFamily: 'SF Pro Rounded',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
});

export default CreateNewAddress;
