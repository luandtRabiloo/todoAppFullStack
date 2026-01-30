import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema(
    {
        userA: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        userB: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
    },
    {
        timestamps: true,
    },
);

friendSchema.pre('save', function (next) {
    const a = this.userA.toString();
    const b = this.userB.toString();

    // Chuẩn hoá thứ tự để tránh trùng (A,B) và (B,A)
    if (a > b) {
        const temp = this.userA;
        this.userA = this.userB;
        this.userB = temp;
    }

    next();
});

friendSchema.index({ userA: 1, userB: 1 }, { unique: true });

const Friend = mongoose.model('Friend', friendSchema);

export default Friend;
