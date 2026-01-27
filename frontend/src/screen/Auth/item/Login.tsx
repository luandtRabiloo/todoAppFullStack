import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Colors } from '../../../utils/color';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { signIn } from '../../../utils/FetchApi/FetchApi';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/RootNavigator';

export type TLoginProps = {
    setIsLogin: (value: boolean) => void;
};

export function Login({ setIsLogin }: TLoginProps) {
    const [username, setUsername] = useState('luandt');
    const [password, setPassword] = useState('admin123');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleLogin = async () => {
        // Validate
        if (!username || !password) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
            return;
        }

        try {
            setLoading(true);
            const result = await signIn({
                username,
                password,
            });
            console.log({ result });
            await AsyncStorage.setItem('accessToken', result.accessToken);
            await AsyncStorage.setItem('refreshToken', result.refreshToken);
            Alert.alert('Thành công', result.message || 'Đăng nhập thành công');

            navigation.replace('MainTabs');
        } catch (error: any) {
            console.log('=== LOGIN ERROR ===', error);
            Alert.alert('Lỗi', error.message || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ gap: 30, width: '100%', paddingHorizontal: 60 }}>
            <Text style={{ fontSize: 32, fontWeight: '700' }}>Login</Text>

            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: Colors.base,
                    borderRadius: 10,
                    padding: 10,
                    gap: 10,
                }}
            >
                <FontAwesome6 name="user" size={20} color={Colors.primary} iconStyle="solid" />
                <TextInput
                    placeholder="Name"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    style={{ padding: 4, flex: 1 }}
                />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: Colors.base,
                    borderRadius: 10,
                    padding: 10,
                    gap: 10,
                }}
            >
                <FontAwesome6 name="lock" size={20} color={Colors.primary} iconStyle="solid" />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={{ padding: 4, flex: 1 }}
                />
            </View>

            <TouchableOpacity
                style={{ backgroundColor: Colors.base, padding: 10, borderRadius: 10 }}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '500' }}>
                    {loading ? 'ĐANG XỬ LÝ...' : 'LOGIN'}
                </Text>
            </TouchableOpacity>

            <Text style={{ textAlign: 'center' }}>
                {`Don't have an account ? `}
                <Text
                    style={{
                        textDecorationLine: 'underline',
                        textDecorationColor: Colors.base,
                        color: Colors.base,
                    }}
                    onPress={() => {
                        setIsLogin(false);
                    }}
                >
                    Sign Up
                </Text>
            </Text>
        </View>
    );
}
