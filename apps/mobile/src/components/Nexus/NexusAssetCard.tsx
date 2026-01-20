import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

// Icons
const ArrowUpRight = ({ size = 24, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M7 7h10v10" />
    <Path d="M7 17L17 7" />
  </Svg>
);

const Download = ({ size = 24, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <Path d="M7 10l5 5 5-5" />
    <Path d="M12 15V3" />
  </Svg>
);

const ArrowRightLeft = ({ size = 24, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M8 3 4 7l4 4" />
    <Path d="M4 7h16" />
    <Path d="M16 21l4-4-4-4" />
    <Path d="M20 17H4" />
  </Svg>
);

const Zap = ({ size = 24, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </Svg>
);

const Wallet = ({ size = 24, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <Path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <Path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </Svg>
);

interface NexusAssetCardProps {
  totalUsd: string;
  changePercent: string;
  onDeposit: () => void;
  onSend: () => void;
  onSwap: () => void;
  onReceive: () => void;
}

export const NexusAssetCard = ({ 
  totalUsd = "$0.00", 
  changePercent = "+0.00%",
  onDeposit,
  onSend,
  onSwap,
  onReceive
}: NexusAssetCardProps) => {
  return (
    <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.container}>
      <View style={styles.glowContainer}>
        <LinearGradient
          colors={['rgba(59, 130, 246, 0.5)', 'rgba(147, 51, 234, 0.5)', 'rgba(59, 130, 246, 0.5)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.glow}
        />
      </View>
      
      <View style={styles.cardWrapper}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="white"
        />
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
          style={styles.cardContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.label}>TOTAL ASSETS</Text>
            <View style={styles.badge}>
              <ArrowUpRight size={12} color="#10B981" />
              <Text style={styles.badgeText}>{changePercent}</Text>
            </View>
          </View>

          {/* Balance */}
          <View style={styles.balanceContainer}>
            <Text style={styles.balance}>{totalUsd}</Text>
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <ActionButton icon={Download} label="Deposit" onPress={onDeposit} />
            <ActionButton icon={ArrowRightLeft} label="Transfer" onPress={onSend} />
            <ActionButton icon={Zap} label="Flash" onPress={onSwap} />
            <ActionButton icon={Wallet} label="Receive" onPress={onReceive} />
          </View>
        </LinearGradient>
      </View>
    </Animated.View>
  );
};

const ActionButton = ({ icon: Icon, label, onPress }: { icon: any, label: string, onPress: () => void }) => (
  <TouchableOpacity style={styles.actionBtn} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.iconWrapper}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.iconGradient}
      >
        <Icon size={20} color="white" />
      </LinearGradient>
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  glowContainer: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 26,
    opacity: 0.5,
  },
  glow: {
    flex: 1,
    borderRadius: 26,
  },
  cardWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardContent: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '700',
  },
  balanceContainer: {
    marginBottom: 32,
  },
  balance: {
    color: 'white',
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: -1,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    alignItems: 'center',
    gap: 8,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    fontWeight: '500',
  },
});
