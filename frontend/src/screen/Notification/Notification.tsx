import React from 'react';
import { View } from 'react-native';
import { Header } from '../../element/Header';
import { useGetListNoti } from './modules/useGetListNoti';

export function Notification() {
    useGetListNoti();
    return (
        <View style={{ flex: 1 }}>
            <Header iconLeft={false} title={'Notification'} iconRight={false} />
        </View>
    );
}
