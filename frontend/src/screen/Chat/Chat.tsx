import React from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from '../../element/Header';
import { Colors } from '../../utils/color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

export function Chat() {
    const { bottom } = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Header iconLeft={true} title={'Chat'} iconRight={true} />
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
                    style={{
                        padding: 10,
                        height: 40,
                        borderRadius: 16,
                        backgroundColor: Colors.base,
                        flex: 1,
                    }}
                />
                <TouchableOpacity>
                    <FontAwesome6 name="play" iconStyle="solid" size={30} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
