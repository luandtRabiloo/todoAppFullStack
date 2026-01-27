import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Chat } from '../screen/Chat/Chat';
import { Users } from '../screen/Users/Users';

const Stack = createNativeStackNavigator();

export function UsersStackScreen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Chat" component={Users} />
        </Stack.Navigator>
    );
}
