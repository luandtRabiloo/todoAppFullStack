import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Colors } from './src/utils/color';

// Import screens
import { Home } from './src/screen/Home/Home';
import { CreateTask } from './src/screen/CreateTask/CreateTask';
import { EditTask } from './src/screen/EditTask/EditTask';
import { Auth, Login } from './src/screen/Auth/Auth';

// Define navigation types
export type RootStackParamList = {
    Home: undefined;
    CreateTask: undefined;
    EditTask: {
        taskId: number | string;
        title: string;
        completed: boolean;
        subTitle: string;
    };
    Auth: undefined;
};
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 1000 * 60 * 5,
        },
    },
});

function App() {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    backgroundColor={Colors.sub_primary}
                />
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name="Auth" component={Auth} />
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="CreateTask" component={CreateTask} />
                        <Stack.Screen name="EditTask" component={EditTask} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </QueryClientProvider>
    );
}

export default App;
