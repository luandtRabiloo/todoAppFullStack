import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Chat } from '../screen/Chat/Chat';

const Stack = createNativeStackNavigator();

export function ChatStackScreen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
    );
}
