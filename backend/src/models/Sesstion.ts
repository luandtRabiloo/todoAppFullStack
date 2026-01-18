import mongoose from 'mongoose';

const sesstionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        refreshToken: {
            type: String,
            unique: true,
            required: true,
        },
        expiresAt: {
            type: Date,
            require: true,
        },
    },
    { timestamps: true },
);

sesstionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Session', sesstionSchema);
