import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../utils/color';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useNavigation } from '@react-navigation/native';
type THeaderProps = {
  iconLeft?: boolean;
  title?: string;
  iconRight?: boolean;
};

export function Header({
  iconLeft = false,
  title,
  iconRight = false,
}: THeaderProps) {
  const navigation = useNavigation();
  const today = new Date();
  const day = today.getDate();
  return (
    <View
      style={{
        height: 118,
        backgroundColor: Colors.sub_primary,
        paddingBottom: 4,
      }}
    >
      <View style={{ flex: 1 }} />
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {iconLeft && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome6
              name="angle-left"
              size={30}
              color={Colors.base}
              iconStyle="solid"
            />
          </TouchableOpacity>
        )}
        {title && (
          <Text style={{ fontSize: 40, fontWeight: '700', color: Colors.base }}>
            {title}
          </Text>
        )}
        {iconRight && (
          <View>
            <FontAwesome6
              name="tv"
              size={40}
              color={Colors.base}
              iconStyle="solid"
            />
            <View
              style={{
                top: -6,
                right: 0,
                left: 0,
                bottom: 0,
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontWeight: '700', color: Colors.base }}>
                {day}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
