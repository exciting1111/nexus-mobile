import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useThemeColors } from '@/hooks/theme';
import Svg, { Path } from 'react-native-svg';

// Icons (Simplified for now, will replace with proper SVGs later)
const HomeIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const MarketIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M18 20V10M12 20V4M6 20v-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const DiscoverIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6 6 0 0 1-6 6z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 8v4l3 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ProfileIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const NexusTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const colors = useThemeColors();
  
  return (
    <View style={[styles.container, { backgroundColor: 'rgba(9, 9, 11, 0.95)', borderTopColor: 'rgba(255, 255, 255, 0.1)' }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const color = isFocused ? '#00f0ff' : '#6b7280'; // Neon Blue for active

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabButton}
          >
            <View style={[styles.iconContainer, isFocused && styles.activeIconContainer]}>
              {label === 'Home' && <HomeIcon color={color} />}
              {label === 'Market' && <MarketIcon color={color} />}
              {label === 'Discover' && <DiscoverIcon color={color} />}
              {label === 'Profile' && <ProfileIcon color={color} />}
            </View>
            <Text style={[styles.label, { color }]}>
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    paddingBottom: 20,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: 8,
    borderRadius: 12,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(0, 240, 255, 0.1)', // Neon glow effect
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});
