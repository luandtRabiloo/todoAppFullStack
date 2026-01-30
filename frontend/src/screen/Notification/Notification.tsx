import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Header } from '../../element/Header';
import { useGetListNoti } from './modules/useGetListNoti';
import { Colors } from '../../utils/color';
import { NotiItem } from './item/NotiItem';

export function Notification() {
    const { received } = useGetListNoti();
    return (
        <View style={{ flex: 1 }}>
            <Header iconLeft={false} title={'Notification'} iconRight={false} />
            <FlatList
                style={{ backgroundColor: Colors.primary, paddingTop: 20 }}
                data={received}
                renderItem={({ item }) => {
                    return <NotiItem data={item} />;
                }}
            />
        </View>
    );
}
