import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screen/Home/Home';
import { CreateTask } from '../screen/CreateTask/CreateTask';
import { EditTask } from '../screen/EditTask/EditTask';

const Stack = createNativeStackNavigator();

export function HomeStackScreen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CreateTask" component={CreateTask} />
            <Stack.Screen name="EditTask" component={EditTask} />
        </Stack.Navigator>
    );
}
