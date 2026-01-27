import { FlatList, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Header } from '../../element/Header';
import TodoItemCard from '../../element/TaskItem';
import { Colors } from '../../utils/color';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { signOut } from '../../utils/FetchApi/FetchApi';
import { useState } from 'react';
import { useGetListTask } from './modules/useGetListTask';
import { useSocket } from '../../../socket/modules/useSocket';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

export function Home() {
    const { list } = useGetListTask();
    useSocket();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [loading, setLoading] = useState(false);

    const handleSignOut = async () => {
        Alert.alert('Xác nhận', 'Bạn có chắc muốn đăng xuất?', [
            {
                text: 'Hủy',
                style: 'cancel',
            },
            {
                text: 'Đăng xuất',
                style: 'destructive',
                onPress: async () => {
                    try {
                        setLoading(true);
                        await signOut();
                        Alert.alert('Thành công', 'Đăng xuất thành công');

                        // Navigate về màn hình Auth
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Auth' }],
                        });
                    } catch (error: any) {
                        Alert.alert('Lỗi', error.message || 'Đăng xuất thất bại');

                        // Vẫn navigate về Auth nếu có lỗi (token đã bị xóa)
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Auth' }],
                        });
                    } finally {
                        setLoading(false);
                    }
                },
            },
        ]);
    };

    return (
        <View style={{ flex: 1 }}>
            <Header iconLeft={false} title={'TodoApp'} iconRight={true} />
            <View
                style={{
                    flex: 1,
                    padding: 16,
                    backgroundColor: Colors.primary,
                }}
            >
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item._id}
                    data={list}
                    renderItem={({ item }) => <TodoItemCard data={item} />}
                    ListFooterComponent={() => {
                        return (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingTop: 30,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('CreateTask')}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 70,
                                        backgroundColor: Colors.sub_primary,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'flex-end',
                                        marginBottom: 60,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            color: Colors.base,
                                            shadowColor: '#000',
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                        }}
                                    >
                                        +
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleSignOut}
                                    disabled={loading}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 70,
                                        backgroundColor: loading ? Colors.base : Colors.sub_primary,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'flex-end',
                                        marginBottom: 60,
                                        opacity: loading ? 0.5 : 1,
                                    }}
                                >
                                    <FontAwesome6
                                        name="arrow-right-from-bracket"
                                        size={20}
                                        color={Colors.base}
                                        iconStyle="solid"
                                    />
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
}
