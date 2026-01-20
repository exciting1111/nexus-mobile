import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';

const { width, height } = Dimensions.get('window');

export const NexusBackground = () => {
  const blob1Scale = useSharedValue(1);
  const blob1Opacity = useSharedValue(0.3);
  const blob2X = useSharedValue(0);
  const blob2Y = useSharedValue(0);

  useEffect(() => {
    blob1Scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 8000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    blob1Opacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 8000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    blob2X.value = withRepeat(
      withSequence(
        withTiming(50, { duration: 10000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 10000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    blob2Y.value = withRepeat(
      withSequence(
        withTiming(30, { duration: 10000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 10000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const blob1Style = useAnimatedStyle(() => ({
    transform: [{ scale: blob1Scale.value }],
    opacity: blob1Opacity.value,
  }));

  const blob2Style = useAnimatedStyle(() => ({
    transform: [{ translateX: blob2X.value }, { translateY: blob2Y.value }],
  }));

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={styles.backgroundContainer}>
        {/* Top Right Blob - Primary Color */}
        <Animated.View
          style={[
            styles.blob,
            styles.blob1,
            blob1Style,
          ]}
        />
        
        {/* Bottom Left Blob - Secondary Color */}
        <Animated.View
          style={[
            styles.blob,
            styles.blob2,
            blob2Style,
          ]}
        />
        
        {/* Middle Blob - Accent Color */}
        <View style={[styles.blob, styles.blob3]} />
      </View>
      
      {/* Blur Overlay to create the diffuse effect */}
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={60}
        reducedTransparencyFallbackColor="black"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#0F172A', // Web Design Token: oklch(0.12 0.03 260)
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
  },
  blob1: {
    top: -height * 0.1,
    right: -width * 0.1,
    width: 500,
    height: 500,
    backgroundColor: 'rgba(56, 189, 248, 0.4)', // Electric Blue
  },
  blob2: {
    bottom: -height * 0.1,
    left: -width * 0.1,
    width: 400,
    height: 400,
    backgroundColor: 'rgba(147, 51, 234, 0.3)', // Purple-600
    opacity: 0.3,
  },
  blob3: {
    top: height * 0.2,
    left: width * 0.1,
    width: 200,
    height: 200,
    backgroundColor: 'rgba(236, 72, 153, 0.2)', // Pink-500
    opacity: 0.2,
  },
});
