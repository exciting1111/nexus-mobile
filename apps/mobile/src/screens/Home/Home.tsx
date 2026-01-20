import React from 'react';
import { View } from 'react-native';
import { NexusHome } from './NexusHome';
import HomeHeaderArea from './HeaderArea';
import { SingleHomeRightArea } from './SingleHomeRightArea';
import { useTheme2024 } from '@/hooks/theme';
import { createGetStyles2024 } from '@/utils/styles';
import { HeaderBackPressable } from '@/hooks/navigation';

// Keep the original Header component structure to avoid breaking navigation
function HomeHeader() {
  const { styles } = useTheme2024({ getStyle: getHomeHeaderStyle });

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <HeaderBackPressable style={{ marginRight: 8 }} />
        <HomeHeaderArea />
      </View>
      <View style={styles.containerRight}>
        <SingleHomeRightArea />
      </View>
    </View>
  );
}

const getHomeHeaderStyle = createGetStyles2024(
  ({ colors2024, safeAreaInsets }) => {
    return {
      container: {
        marginTop: safeAreaInsets.top,
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: 'transparent',
        width: '100%',
        zIndex: 10,
      },
      containerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        flexShrink: 1,
      },
      containerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexShrink: 0,
      },
    };
  },
);

function SingleAddressHome(): JSX.Element {
  return <NexusHome />;
}

SingleAddressHome.Header = HomeHeader;

export default SingleAddressHome;
