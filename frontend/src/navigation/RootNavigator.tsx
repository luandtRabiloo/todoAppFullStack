import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Auth } from '../screen/Auth/Auth';
import { MainTabs } from './MainTabs';
import { Chat } from '../screen/Chat/Chat';

export type RootStackParamList = {
    Auth: undefined;
    MainTabs: undefined;
    Home: undefined;
    CreateTask: undefined;
    EditTask: {
        taskId: number | string;
        title: string;
        completed: boolean;
        subTitle: string;
    };
    Chat: {
        id?: string;
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="Chat" component={Chat} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
