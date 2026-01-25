import mongoose from 'mongoose';

const friendReqSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        message: {
            type: String,
            maxlength: 300,
        },
    },
    {
        timestamps: true,
    },
);

friendReqSchema.index({ from: 1, to: 1 }, { unique: true });

friendReqSchema.index({ from: 1 });

friendReqSchema.index({ to: 1 });

const FriendReq = mongoose.model('FirendReq', friendReqSchema);

export default FriendReq;
