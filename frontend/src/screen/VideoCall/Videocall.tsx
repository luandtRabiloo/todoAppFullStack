import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { RtcSurfaceView, ClientRoleType, type IRtcEngineEventHandler } from 'react-native-agora';
import { useJoin } from './modules/useJoin';
import { engine } from '../../utils/agora/agora';
import { Header } from '../../element/Header';

export function VideoCall() {
    const { mutate: join } = useJoin();
    const [localUid, setLocalUid] = useState<number | null>(null);
    const [remoteUid, setRemoteUid] = useState<number | null>(null);

    const rtcEventHandler: IRtcEngineEventHandler = {
        onUserJoined: (_connection, uid) => {
            setRemoteUid(uid);
        },
        onUserOffline: () => {
            setRemoteUid(null);
        },
    };

    useEffect(() => {
        engine.registerEventHandler(rtcEventHandler);

        return () => {
            engine.leaveChannel();
            engine.unregisterEventHandler(rtcEventHandler);
        };
    }, []);

    const onJoinCall = () => {
        join(undefined, {
            onSuccess: ({ token, uid, channelName }) => {
                setLocalUid(uid);

                engine.enableVideo();
                engine.startPreview();

                engine.joinChannel(token, channelName, uid, {
                    clientRoleType: ClientRoleType.ClientRoleBroadcaster,
                });
            },
        });
    };

    useEffect(() => {
        onJoinCall();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Header iconLeft title="Video Call" />

            {/* {localUid !== null && <RtcSurfaceView style={{ flex: 1 }} canvas={{ uid: localUid }} />} */}

            {remoteUid !== null && (
                <RtcSurfaceView style={{ flex: 1 }} canvas={{ uid: remoteUid }} />
            )}
        </View>
    );
}
