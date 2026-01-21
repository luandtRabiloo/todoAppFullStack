import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../utils/color';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Login } from './item/Login';
import { SignUp } from './item/SignUp';

export function Auth() {
    const { top, bottom } = useSafeAreaInsets();
    const [isLogin, setIsLogin] = useState(true);
    return (
        <View
            style={{
                flex: 1,
                paddingTop: top,
                paddingBottom: bottom,
                backgroundColor: Colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {isLogin ? <Login setIsLogin={setIsLogin} /> : <SignUp setIsLogin={setIsLogin} />}
        </View>
    );
}
