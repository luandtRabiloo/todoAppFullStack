export type TCreateConversation = {
    type: 'direct' | 'group';
    name?: string;
    memberIds?: string[];
};
export type TSendDirectMessage = {
    recipientId: string;
    content: string;
    conversationId: string[];
};
