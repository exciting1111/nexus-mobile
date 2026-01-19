import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ActionButton = ({ title, icon, onPress }: { title: string; icon: React.ReactNode; onPress: () => void }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <View style={styles.iconContainer}>
      {icon}
    </View>
    <Text style={styles.label}>{title}</Text>
  </TouchableOpacity>
);

export const ActionButtons = () => {
  return (
    <View style={styles.container}>
      <ActionButton
        title="Deposit"
        onPress={() => {}}
        icon={
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M12 5v14M5 12l7 7 7-7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        }
      />
      <ActionButton
        title="Withdraw"
        onPress={() => {}}
        icon={
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M12 19V5M5 12l7-7 7 7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        }
      />
      <ActionButton
        title="Transfer"
        onPress={() => {}}
        icon={
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M17 1l4 4-4 4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M3 11V9a4 4 0 0 1 4-4h14" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M7 23l-4-4 4-4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M21 13v2a4 4 0 0 1-4 4H3" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        }
      />
      <ActionButton
        title="More"
        onPress={() => {}}
        icon={
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M12 12h.01M19 12h.01M5 12h.01" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  button: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  label: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '500',
  },
});
