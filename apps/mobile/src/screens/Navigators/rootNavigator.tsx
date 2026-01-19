import 'react-native-gesture-handler';

import { useThemeColors } from '@/hooks/theme';
import { DEFAULT_NAVBAR_FONT_SIZE, RootNames } from '@/constant/layout';
import React, { useLayoutEffect } from 'react';
import WebViewControlPreload from '@/components/WebView/WebViewControlPreload';
import ApprovalTokenDetailSheetModalStub from '@/components/TokenDetailPopup/ApprovalTokenDetailSheetModalStub';
import BiometricsStubModal from '@/components/AuthenticationModal/BiometricsStubModal';
import { NexusHome } from '@/screens/Home/NexusHome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { preloadSettingsScreen } from '@/perfs/preloads';
import { NexusTabBar } from '@/components/NexusTabBar';
import { ProfileScreen } from '@/screens/Nexus/PlaceholderScreens';
import { NexusDiscover } from '@/screens/Nexus/NexusDiscover';
import { NexusMarket } from '@/screens/Nexus/NexusMarket';

// Define the params list for the new tab navigator
export type NexusTabParamList = {
  Home: undefined;
  Market: undefined;
  Discover: undefined;
  Profile: undefined;
};

const NexusTabStack = createBottomTabNavigator<NexusTabParamList>();

export function HomeScreenNavigator() {
  const colors = useThemeColors();

  if (__DEV__) {
    console.debug('[NexusTabNavigator] Render');
  }

  useLayoutEffect(() => {
    const timer = setTimeout(() => preloadSettingsScreen(), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <NexusTabStack.Navigator
        tabBar={(props) => <NexusTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors['neutral-title-1'],
          headerTitleStyle: {
            color: colors['neutral-title-1'],
            fontWeight: '500',
            fontSize: DEFAULT_NAVBAR_FONT_SIZE,
          },
        }}>
        
        <NexusTabStack.Screen
          name="Home"
          component={NexusHome}
          options={{
            tabBarLabel: 'Home',
          }}
        />

        <NexusTabStack.Screen
          name="Market"
          component={NexusMarket}
          options={{
            tabBarLabel: 'Market',
          }}
        />

        <NexusTabStack.Screen
          name="Discover"
          component={NexusDiscover}
          options={{
            tabBarLabel: 'Discover',
          }}
        />

        <NexusTabStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
          }}
        />

      </NexusTabStack.Navigator>

      <BiometricsStubModal />
      <ApprovalTokenDetailSheetModalStub />
      <WebViewControlPreload />
    </>
  );
}
