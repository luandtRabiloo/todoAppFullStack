import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Colors } from './src/utils/color';
import { RootNavigator } from './src/navigation/RootNavigator';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 1000 * 60 * 5,
        },
    },
});

export default function App() {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    backgroundColor={Colors.sub_primary}
                />
                <RootNavigator />
            </SafeAreaProvider>
        </QueryClientProvider>
    );
}
