import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { FormProvider, UseFormReturn } from 'react-hook-form';

export type AppContainerProps = Readonly<{
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
    edges?: Array<Edge>;
    needInteraction?: boolean;
    form?: UseFormReturn<any>;
}>;

export function AppContainer({
    children,
    style,
    edges = ['top', 'right', 'left'],
    form,
}: AppContainerProps) {
    const renderContent = () => {
        return children;
    };

    const renderContainerBody = () => (
        <SafeAreaView
            edges={edges}
            style={[
                {
                    flex: 1,
                    justifyContent: 'flex-start',
                },
                style,
            ]}
        >
            {renderContent()}
        </SafeAreaView>
    );

    if (form) {
        return <FormProvider {...form}>{renderContainerBody()}</FormProvider>;
    }

    return renderContainerBody();
}
