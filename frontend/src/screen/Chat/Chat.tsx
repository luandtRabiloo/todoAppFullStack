import React from 'react';
import { View } from 'react-native';
import { Header } from '../../element/Header';

export function Chat() {
    return (
        <View style={{ flex: 1 }}>
            <Header iconLeft={false} title={'Chat'} iconRight={false} />
        </View>
    );
}
