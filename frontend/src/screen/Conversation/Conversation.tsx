import React from 'react';
import { FlatList, View } from 'react-native';
import { Header } from '../../element/Header';
import { Colors } from '../../utils/color';
import { ConversationItem } from './item/ConversationItem';
import { useGetLitsConversation } from './modules/useGetLitsConversation';
import { useGetLitChat } from './modules/useGetlistChat';
import { FriendItem } from './item/FriendItem';

export function Conversation() {
  const { friends } = useGetLitChat();
  const { conversations } = useGetLitsConversation();
  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
      <Header iconLeft={false} title={'Chat'} iconRight={false} />
      <FlatList
        style={{ height: 56, maxHeight: 80, paddingHorizontal: 20, marginTop: 20 }}
        contentContainerStyle={{ gap: 16, height: 56 }}
        horizontal
        data={friends}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return <FriendItem data={item} />;
        }}
      />
      <FlatList
        data={conversations}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return <ConversationItem data={item} />;
        }}
      />
    </View>
  );
}
