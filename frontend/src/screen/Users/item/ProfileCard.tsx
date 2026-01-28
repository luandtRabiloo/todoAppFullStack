import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Colors } from '../../../utils/color';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { sendFriend } from '../../../utils/FetchApi/FetchApi';

const { width } = Dimensions.get('window');

type TProfileCardProps = {
    data: {
        _id?: string;
        username?: string;
        email?: string;
        phone?: string;
        avatarUrl?: string;
    };
};

export const ProfileCard: React.FC<TProfileCardProps> = ({ data }) => {
    const {
        username,
        email,
        phone,
        avatarUrl = 'https://i.pravatar.cc/150?img=12',
        _id = '',
    } = data;
    const onSendFriend = async () => {
        try {
            const result = await sendFriend(_id, 'Kết bạn với mình nhé');
            console.log({ result });
            Alert.alert('Thành công', result.message);
        } catch (error) {
            console.log('onSendFriend error', error);
            const message = error?.message || 'Có lỗi xảy ra';
            Alert.alert('Lỗi', message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Avatar */}
                <View style={styles.avatarContainer}>
                    <Image source={{ uri: avatarUrl }} style={styles.avatar} resizeMode="cover" />
                    <View style={styles.avatarBorder} />
                </View>

                {/* Profile Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.name} numberOfLines={1}>
                        {username}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <FontAwesome6
                            iconStyle="solid"
                            name="message"
                            size={10}
                            color={Colors.primary}
                        />
                        <Text style={styles.location} numberOfLines={1}>
                            {email}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <FontAwesome6
                            iconStyle="solid"
                            name="phone"
                            size={10}
                            color={Colors.primary}
                        />
                        <Text style={styles.location} numberOfLines={1}>
                            {phone}
                        </Text>
                    </View>
                </View>

                {/* Follow Button */}
                <TouchableOpacity
                    style={[styles.followButton]}
                    activeOpacity={0.8}
                    onPress={onSendFriend}
                >
                    <FontAwesome6
                        iconStyle="solid"
                        name="user-plus"
                        size={20}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    cardGradient: {
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: Colors.base,
        borderRadius: 24,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 14,
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
    infoContainer: {
        flex: 1,
        marginRight: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
        letterSpacing: 0.2,
    },
    location: {
        fontSize: 13,
        color: '#666',
        fontWeight: '400',
    },
    followButton: {
        overflow: 'hidden',
        shadowColor: '#29b6f6',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
    },
    followingButton: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
    },
    buttonGradient: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    followingText: {
        color: '#495057',
    },
});
