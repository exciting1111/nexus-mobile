import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import Animated, { useAnimatedStyle, withSpring, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Path, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Icons
const HomeIcon = ({ color, focused }: { color: string; focused: boolean }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={color} strokeWidth={focused ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const MarketIcon = ({ color, focused }: { color: string; focused: boolean }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M18 20V10M12 20V4M6 20v-6" stroke={color} strokeWidth={focused ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const DiscoverIcon = ({ color, focused }: { color: string; focused: boolean }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={focused ? 2.5 : 2} />
    <Path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" stroke={color} strokeWidth={focused ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ProfileIcon = ({ color, focused }: { color: string; focused: boolean }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={color} strokeWidth={focused ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={focused ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const TabButton = ({ 
  isFocused, 
  onPress, 
  icon: Icon 
}: { 
  isFocused: boolean; 
  onPress: () => void; 
  icon: any 
}) => {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withSpring(isFocused ? 1.2 : 1, { damping: 10, stiffness: 100 });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.tabButton}
      activeOpacity={0.7}
    >
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        <Icon 
          color={isFocused ? '#3B82F6' : 'rgba(255, 255, 255, 0.5)'} 
          focused={isFocused} 
        />
        {isFocused && <View style={styles.activeDot} />}
      </Animated.View>
    </TouchableOpacity>
  );
};

export const NexusTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.blurContainer}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={30}
          reducedTransparencyFallbackColor="black"
        />
        <View style={styles.contentContainer}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel || options.title || route.name;
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

            let Icon = HomeIcon;
            if (label === 'Market') Icon = MarketIcon;
            if (label === 'Discover') Icon = DiscoverIcon;
            if (label === 'Profile') Icon = ProfileIcon;

            return (
              <TabButton
                key={index}
                isFocused={isFocused}
                onPress={onPress}
                icon={Icon}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  blurContainer: {
    width: '100%',
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    backgroundColor: 'rgba(20, 20, 25, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    position: 'absolute',
    bottom: -12,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3B82F6',
  },
});
