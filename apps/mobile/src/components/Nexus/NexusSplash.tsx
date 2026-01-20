import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  runOnJS,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import Svg, { Path, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface NexusSplashProps {
  onFinish: () => void;
}

export const NexusSplash = ({ onFinish }: NexusSplashProps) => {
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    // Animation Sequence
    progress.value = withSequence(
      // Phase 1: Gather energy (0 -> 0.5)
      withTiming(0.5, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      // Phase 2: Quantum Burst (0.5 -> 1)
      withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) }, (finished) => {
        if (finished) {
          runOnJS(onFinish)();
        }
      })
    );

    // Scale effect for the burst
    scale.value = withSequence(
      withTiming(0.8, { duration: 1000 }), // Contract
      withSpring(20, { damping: 20, stiffness: 100 }) // Explode
    );

    // Fade out at the end
    opacity.value = withSequence(
      withTiming(1, { duration: 1500 }),
      withTiming(0, { duration: 300 })
    );
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const logoStyle = useAnimatedStyle(() => {
    const rotate = interpolate(progress.value, [0, 1], [0, 360]);
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotate}deg` }
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <View style={styles.background}>
        <Animated.View style={logoStyle}>
          <NexusLogo size={120} />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

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

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#09090B',
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
