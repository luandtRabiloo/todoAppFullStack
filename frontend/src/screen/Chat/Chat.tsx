import React, { useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from '../../element/Header';
import { Colors } from '../../utils/color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { createConversation, sendDirectMessage } from '../../utils/FetchApi/FetchApi';
import { useSocket } from '../../../socket/modules/useSocket';

export function Chat() {
    const { bottom } = useSafeAreaInsets();
    const route = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
    const [comment, setComment] = useState('');
    const { sendMessage } = useSocket();
    const { memberIds, username } = route.params;
    const onSend = async () => {
        try {
            if (!comment) {
                return;
            }

            const { conversation } = await createConversation({
                type: 'direct',
                memberIds,
                name: username,
            });

            await sendDirectMessage({
                recipientId: memberIds?.[0] || '',
                content: comment,
                conversationId: conversation._id || '',
            });

            sendMessage('sendMessage', comment);
        } catch (error) {
            console.log('onSend error', error);
        } finally {
            setComment('');
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Header iconLeft={true} title={username} iconRight={true} />
            <FlatList
                horizontal
                style={{ padding: 20 }}
                contentContainerStyle={{ gap: 16, height: 56 }}
                data={[]}
                renderItem={({ item }) => {
                    return <></>;
                }}
            />
            <View
                style={{
                    paddingBottom: bottom,
                    paddingHorizontal: 16,
                    borderRadius: 10,
                    flexDirection: 'row',
                    gap: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <TextInput
                    value={comment}
                    onChangeText={e => setComment(e)}
                    style={{
                        padding: 10,
                        height: 40,
                        borderRadius: 16,
                        backgroundColor: Colors.base,
                        flex: 1,
                    }}
                />
                <TouchableOpacity onPress={onSend}>
                    <FontAwesome6 name="play" iconStyle="solid" size={30} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
