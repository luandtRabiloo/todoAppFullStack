import { Platform, Alert } from 'react-native';
import {
    check,
    request,
    requestMultiple,
    PERMISSIONS,
    RESULTS,
    openSettings,
} from 'react-native-permissions';

export const requestCameraAndMicPermission = async (): Promise<boolean> => {
    try {
        if (Platform.OS === 'android') {
            const permissions = [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO];

            const statuses = await requestMultiple(permissions);

            const cameraGranted = statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED;
            const micGranted = statuses[PERMISSIONS.ANDROID.RECORD_AUDIO] === RESULTS.GRANTED;

            if (!cameraGranted || !micGranted) {
                Alert.alert('Thiếu quyền', 'Bạn cần cho phép Camera và Micro để gọi video', [
                    { text: 'Huỷ', style: 'cancel' },
                    {
                        text: 'Mở cài đặt',
                        onPress: () => openSettings(),
                    },
                ]);
                return false;
            }

            return true;
        }

        // ===== iOS =====
        const cameraStatus = await request(PERMISSIONS.IOS.CAMERA);
        const micStatus = await request(PERMISSIONS.IOS.MICROPHONE);

        const granted = cameraStatus === RESULTS.GRANTED && micStatus === RESULTS.GRANTED;

        if (!granted) {
            Alert.alert('Thiếu quyền', 'Bạn cần cho phép Camera và Micro để gọi video', [
                { text: 'Huỷ', style: 'cancel' },
                {
                    text: 'Mở cài đặt',
                    onPress: () => openSettings(),
                },
            ]);
        }

        return granted;
    } catch (error) {
        console.log('Permission error:', error);
        return false;
    }
};
