import {
    createAgoraRtcEngine,
    IRtcEngine,
    ChannelProfileType,
    ClientRoleType,
} from 'react-native-agora';

const appId = 'd1b00683a16f413ba685535967a94d10';

export let engine: IRtcEngine;

export const initAgora = () => {
    engine = createAgoraRtcEngine();
    engine.initialize({
        appId,
        channelProfile: ChannelProfileType.ChannelProfileCommunication,
    });

    engine.enableVideo();
};
