import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../utils/color';

import { HomeStackScreen } from './HomeStack';
import { ChatStackScreen } from './ChatStack';
import { UsersStackScreen } from './UsersStack';
import { NotificationStack } from './NotificationStack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="ChatTab"
        component={ChatStackScreen}
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => <Icon name="wechat" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="UsersTab"
        component={UsersStackScreen}
        options={{
          title: 'Users',
          tabBarIcon: ({ color, size }) => <Icon name="users" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="NotificationTab"
        component={NotificationStack}
        options={{
          title: 'Notify',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
