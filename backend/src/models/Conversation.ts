import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        joinedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        _id: false,
    },
);

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        createBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        _id: false,
    },
);

const lastMessageSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
        },
        content: {
            type: String,
            default: null,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        createdAt: {
            type: Date,
            default: null,
        },
    },
    {
        _id: false,
    },
);

const ConversationSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            emun: ['direct', 'group'],
            require: true,
        },
        participant: {
            type: [participantSchema],
            require: true,
        },
        group: {
            type: groupSchema,
        },
        lastMessageAt: {
            type: Date,
        },
        seenBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        lastMessage: {
            type: lastMessageSchema,
            default: null,
        },
        unReadCount: {
            type: Map,
            of: Number,
            default: {},
        },
    },
    {
        timestamps: true,
    },
);

ConversationSchema.index({ 'participant.userId': 1, lastMessageAt: -1 });

const Conversation = mongoose.model('Conversation', ConversationSchema);

export default Conversation;
