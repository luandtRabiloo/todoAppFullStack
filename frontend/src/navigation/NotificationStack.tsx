import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Notification } from '../screen/Notification/Notification';

const Stack = createNativeStackNavigator();

export function NotificationStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Notification" component={Notification} />
        </Stack.Navigator>
    );
}
