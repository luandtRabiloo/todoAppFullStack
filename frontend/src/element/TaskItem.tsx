import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../utils/color';
import { useNavigation } from '@react-navigation/native';
import { deleteTodo, updateTodo } from '../utils/FetchApi/FetchApi';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKey } from '../utils/FetchApi/QueryKey';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

export type TTodoItemCardProps = {
    data: {
        _id: string;
        title: string;
        status: 'active';
        complete: boolean;
        subTitle: string;
    };
};

export default function TodoItemCard({ data }: TTodoItemCardProps) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const queryClient = useQueryClient();
    const [check, setCheck] = useState(data.complete);
    const onDeleteTask = async () => {
        try {
            await deleteTodo(data._id);
            queryClient.refetchQueries({ queryKey: [QueryKey.useGetListTask] });
        } catch (error) {
            console.log('onDeleteTask error', error);
        }
    };
    const onUpdateComplete = async () => {
        try {
            await updateTodo({ id: data._id, completed: !check });
            await queryClient.refetchQueries({
                queryKey: [QueryKey.useGetListTask],
            });
            setCheck(!check);
        } catch (error) {
            console.log('onUpdateTask error', error);
        }
    };
    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{data?.title}</Text>
                    <Text style={styles.subtitle}>{data?.subTitle}</Text>
                </View>

                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate('EditTask', {
                                title: data.title,
                                completed: data.complete,
                                taskId: data._id,
                                subTitle: data.subTitle,
                            });
                        }}
                    >
                        <FontAwesome6
                            name="pencil"
                            size={20}
                            color={Colors.primary}
                            iconStyle="solid"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onDeleteTask}>
                        <FontAwesome6
                            name="trash"
                            size={20}
                            color={Colors.primary}
                            iconStyle="solid"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onUpdateComplete}>
                        <FontAwesome6
                            name="check"
                            size={20}
                            color={check ? Colors.primary : '#d8d5d5ff'}
                            iconStyle="solid"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.base,
        borderRadius: 24,
        padding: 20,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    textContainer: {
        flex: 1,
        marginRight: 16,
    },
    title: {
        fontSize: 11,
        fontWeight: '600',
        color: '#6B7280',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2563EB',
        textDecorationLine: 'underline',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    button: {
        padding: 8,
        borderRadius: 20,
    },
});
