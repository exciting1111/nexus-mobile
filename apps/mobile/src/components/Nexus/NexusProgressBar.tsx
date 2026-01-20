import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface NexusProgressBarProps {
  step: number;
  total: number;
}

export const NexusProgressBar = ({ step, total }: NexusProgressBarProps) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index < step;
        return (
          <View key={index} style={styles.stepContainer}>
            {isActive ? (
              <LinearGradient
                colors={['#38BDF8', '#818CF8']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.activeStep}
              />
            ) : (
              <View style={styles.inactiveStep} />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 40,
  },
  stepContainer: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  activeStep: {
    flex: 1,
  },
  inactiveStep: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
