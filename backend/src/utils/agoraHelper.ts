import { RtcTokenBuilder } from 'agora-access-token';

export const generateAgoraToken = ({ channelName, uid }: { channelName: string; uid: number }) => {
    const appID = process.env.AGORA_APP_ID!;
    const appCertificate = process.env.AGORA_APP_CERT!;
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
    const ROLE_PUBLISHER = 1;
    return RtcTokenBuilder.buildTokenWithUid(
        appID,
        appCertificate,
        channelName,
        uid,
        ROLE_PUBLISHER,
        privilegeExpiredTs,
    );
};
