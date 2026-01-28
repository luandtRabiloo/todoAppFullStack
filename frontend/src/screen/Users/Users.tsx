import React from 'react';
import { FlatList, Image, View } from 'react-native';
import { useGetAllUsers } from './modules/useGetAllUsers';
import { ProfileCard } from './item/ProfileCard';
import { Colors } from '../../utils/color';
import { Header } from '../../element/Header';

export function Users() {
    const { users } = useGetAllUsers();
    return (
        <View style={{ flex: 1 }}>
            <Header iconLeft={false} title={'Users'} iconRight={false} />
            <FlatList
                style={{ backgroundColor: Colors.primary, paddingTop: 20 }}
                data={users}
                renderItem={({ item }) => {
                    return <ProfileCard data={item} />;
                }}
            />
        </View>
    );
}
