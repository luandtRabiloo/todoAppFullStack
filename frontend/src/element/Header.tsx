import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../utils/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { JSX } from 'react';
type THeaderProps = {
  iconLeft?: boolean;
  title?: string;
  iconRight?: boolean;
  renderRightICon?: JSX.Element;
};

export function Header({
  iconLeft = false,
  title,
  iconRight = false,
  renderRightICon,
}: THeaderProps) {
  const navigation = useNavigation();
  const today = new Date();
  const day = today.getDate();

  const renderRight = () => {
    if (iconRight) {
      return (
        <View>
          <FontAwesome name="calendar-o" size={40} color={Colors.base} />
          <View
            style={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 0,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontWeight: '700', color: Colors.base }}>{day}</Text>
          </View>
        </View>
      );
    }
    return renderRightICon;
  };

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
            <FontAwesome name="angle-left" size={30} color={Colors.base} />
          </TouchableOpacity>
        )}
        {title && (
          <Text style={{ fontSize: 40, fontWeight: '700', color: Colors.base }}>{title}</Text>
        )}
        {renderRight()}
      </View>
    </View>
  );
}
