import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../utils/color';

type TAppImage = {
  styleContainer?: StyleProp<ViewStyle>;
  uri?: string;
  username?: string;
  isOnline?: boolean;
};

export function AppImage({
  styleContainer,
  uri = 'https://i.pravatar.cc/150?img=12',
  username,
  isOnline = false,
}: TAppImage) {
  return (
    <View style={[styles.avatarContainer, styleContainer]}>
      <View>
        {!username ? (
          <View>
            <Text>L</Text>
          </View>
        ) : (
          <Image source={{ uri }} style={styles.avatar} resizeMode="cover" />
        )}
        {isOnline && (
          <View
            style={{
              width: 12,
              height: 12,
              bottom: 0,
              borderRadius: 12,
              backgroundColor: Colors.online,
              position: 'absolute',
              right: 0,
            }}
          />
        )}
      </View>
      {username && (
        <Text numberOfLines={1} style={{ textAlign: 'center', marginTop: 2, width: '100%' }}>
          {username}
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  avatarContainer: {
    position: 'relative',
    width: 56,
    height: 56,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e0e0e0',
  },
  avatarBorder: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(79, 195, 247, 0.2)',
  },
});
