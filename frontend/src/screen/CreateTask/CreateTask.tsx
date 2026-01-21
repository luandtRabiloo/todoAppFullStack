import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from '../../element/Header';
import { Colors } from '../../utils/color';
import { useState } from 'react';
import { createTodo } from '../../utils/FetchApi/FetchApi';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKey } from '../../utils/FetchApi/Querykey';
import { useNavigation } from '@react-navigation/native';

export function CreateTask() {
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const queryClient = useQueryClient();
    const navigation = useNavigation();
    const onAddTask = async () => {
        try {
            if (!title) {
                return;
            }
            await createTodo({ title, subTitle });
            queryClient.refetchQueries({ queryKey: [QueryKey.useGetListTask] });
            navigation.goBack();
            setTitle('');
            setSubTitle('');
        } catch (error) {
            console.log('onAddTask error', error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Header iconLeft={true} title={'Add task'} iconRight={false} />
            <View
                style={{
                    flex: 1,
                    padding: 16,
                    backgroundColor: Colors.base,
                    gap: 40,
                }}
            >
                <TextInput
                    value={title}
                    onChangeText={e => setTitle(e)}
                    placeholder="Title"
                    style={{
                        height: 46,
                        fontSize: 20,
                        borderBottomWidth: 1,
                    }}
                />
                <TextInput
                    value={subTitle}
                    onChangeText={e => setSubTitle(e)}
                    placeholder="Detail"
                    style={{
                        height: 46,
                        fontSize: 20,
                        borderBottomWidth: 1,
                    }}
                />
                <TouchableOpacity
                    onPress={onAddTask}
                    style={{
                        backgroundColor: Colors.sub_primary,
                        padding: 20,
                        borderRadius: 24,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            fontWeight: '700',
                            color: Colors.base,
                            fontSize: 20,
                        }}
                    >
                        ADD
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
