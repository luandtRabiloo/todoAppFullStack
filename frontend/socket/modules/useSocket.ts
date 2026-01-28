// useSocket.ts
import { useEffect, useState, useCallback } from 'react';
import { socket } from '../socket';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SocketStatus = 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';

export function useSocket() {
    const [status, setStatus] = useState<SocketStatus>('idle');
    const [socketId, setSocketId] = useState<string | null>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const connect = async () => {
            setStatus('connecting');
            const token = await AsyncStorage.getItem('accessToken');

            socket.auth = { token };
            socket.connect();
        };
        if (!socket.connected) {
            connect();
        }

        const onConnect = () => {
            setStatus('connected');
            setSocketId(socket.id || null);
            setError(null);
            console.log('Socket connected:', socket.id);
        };

        const onDisconnect = () => {
            setStatus('disconnected');
            setSocketId(null);
            console.log('Socket disconnected');
        };

        const onConnectError = (err: any) => {
            setStatus('error');
            setError(err);
            console.log('Socket connect error:', err);
        };

        const onOnlineUser = (userId: string[]) => {};

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('connect_error', onConnectError);
        socket.on('online-users', onOnlineUser);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('connect_error', onConnectError);
            socket.disconnect();
        };
    }, []);

    const sendMessage = useCallback((event: string, payload: any) => {
        if (!socket.connected) {
            console.warn('Socket is not connected, cannot emit:', event);
            return;
        }
        socket.emit(event, payload);
    }, []);

    const reconnect = useCallback(() => {
        if (!socket.connected) {
            setStatus('connecting');
            socket.connect();
        }
    }, []);

    const disconnect = useCallback(() => {
        if (socket.connected) {
            socket.disconnect();
            setStatus('disconnected');
        }
    }, []);

    const subscribe = useCallback((event: string, handler: (...args: any[]) => void) => {
        socket.on(event, handler);

        // trả về hàm unsubscribe
        return () => {
            socket.off(event, handler);
        };
    }, []);

    return {
        socket,
        status,
        connected: status === 'connected',
        socketId,
        error,

        sendMessage,
        reconnect,
        disconnect,
        subscribe,
    };
}
