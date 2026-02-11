import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { AppImage } from '../../../element/AppImage';

type TProfileCardProps = {
  data: {
    _id?: string;
    username: string;
    phone?: string;
    email?: string;
  };
};

export const FriendItem: React.FC<TProfileCardProps> = ({ data }) => {
  const { username, _id = '' } = data;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const onChat = () => {
    navigation.navigate('Chat', { memberIds: [_id], username });
  };

  return (
    <TouchableOpacity onPress={onChat}>
      <AppImage isOnline username={username} text={username[0]} />
    </TouchableOpacity>
  );
};
