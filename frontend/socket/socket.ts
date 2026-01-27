import AsyncStorage from '@react-native-async-storage/async-storage';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://192.168.10.245:5001';

export const socket: Socket = io(SOCKET_URL, {
    transports: ['websocket'],
});
