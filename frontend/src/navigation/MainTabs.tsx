import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Colors } from '../utils/color';

import { HomeStackScreen } from './HomeStack';
import { ChatStackScreen } from './ChatStack';
import { UsersStackScreen } from './UsersStack';

const Tab = createBottomTabNavigator();

export function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: '#999',
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStackScreen}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome6 name="house" size={size} color={color} iconStyle="solid" />
                    ),
                }}
            />

            <Tab.Screen
                name="ChatTab"
                component={ChatStackScreen}
                options={{
                    title: 'Chat',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome6 name="comment" size={size} color={color} iconStyle="solid" />
                    ),
                }}
            />
            <Tab.Screen
                name="UsersSTab"
                component={UsersStackScreen}
                options={{
                    title: 'Users',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome6
                            name="user-group"
                            size={size}
                            color={color}
                            iconStyle="solid"
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
