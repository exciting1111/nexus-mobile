import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { BlurView } from '@react-native-community/blur';

interface NexusCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export const NexusCard = ({ children, onPress, style }: NexusCardProps) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container 
      onPress={onPress} 
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={20}
        reducedTransparencyFallbackColor="#0F172A"
      />
      <View style={styles.content}>
        {children}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(15, 23, 42, 0.6)', // Web Token: --card
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.2)', // Web Token: --border
    marginBottom: 12,
  },
  content: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
