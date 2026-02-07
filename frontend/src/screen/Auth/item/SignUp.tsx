import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Colors } from '../../../utils/color';
import { signUp } from '../../../utils/FetchApi/FetchApi';
import { TLoginProps } from './Login';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export function SignUp({ setIsLogin }: TLoginProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    const isInvalid = !username || !email || !phone || !password || !confirmPassword;

    if (isInvalid) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu không khớp');
      return;
    }

    try {
      setLoading(true);
      const result = await signUp({
        username,
        email,
        password,
        phone,
      });
      if (!result.success) {
        return;
      }
      Alert.alert('Thành công', 'Đăng ký tài khoản thành công', [
        {
          text: 'OK',
          onPress: () => setIsLogin(true),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Lỗi', error.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ gap: 30, width: '100%', paddingHorizontal: 60 }}>
      <Text style={{ fontSize: 32, fontWeight: '700' }}>Sign Up</Text>

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.base,
          borderRadius: 10,
          padding: 10,
          gap: 10,
        }}
      >
        <FontAwesome name="user" size={20} color={Colors.primary} />
        <TextInput
          placeholder="Name"
          value={username}
          onChangeText={setUsername}
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
        <FontAwesome name="envelope" size={20} color={Colors.primary} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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
        <FontAwesome name="phone" size={20} color={Colors.primary} />
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
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
        <FontAwesome name="lock" size={20} color={Colors.primary} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
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
        <FontAwesome name="lock" size={20} color={Colors.primary} />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={{ padding: 4, flex: 1 }}
        />
      </View>

      <TouchableOpacity
        style={{ backgroundColor: Colors.base, padding: 10, borderRadius: 10 }}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '500' }}>
          {loading ? 'ĐANG XỬ LÝ...' : 'SIGN UP'}
        </Text>
      </TouchableOpacity>

      <Text style={{ textAlign: 'center' }}>
        {`Already have an account ? `}
        <Text
          style={{
            textDecorationLine: 'underline',
            textDecorationColor: Colors.base,
            color: Colors.base,
          }}
          onPress={() => {
            setIsLogin(true);
          }}
        >
          Login
        </Text>
      </Text>
    </View>
  );
}
