import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../../utils/color';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/RootNavigator';

type TProfileCardProps = {
    data: {
        _id?: string;
        username: string;
        phone?: string;
        email?: string;
    };
};

export const FriendItem: React.FC<TProfileCardProps> = ({ data }) => {
    const { username, phone = '', email = '' } = data;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const onChat = () => {
        navigation.navigate('Chat', {});
    };

    return (
        <TouchableOpacity onPress={onChat}>
            <View>
                <View>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                </View>
                <View
                    style={{
                        width: 12,
                        height: 12,
                        borderRadius: 12,
                        backgroundColor: Colors.online,
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                    }}
                />
            </View>
            <Text style={{ textAlign: 'center', marginTop: 2 }}>{username}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#e0e0e0',
    },
});
