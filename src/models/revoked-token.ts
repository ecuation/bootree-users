import mongoose from 'mongoose';

interface RevokedTokenAttributes {
    token: string;
    revokedAt: Date;
}

interface RevokedTokenModel extends mongoose.Model<RevokedTokenDoc> {
    build(attrs: RevokedTokenAttributes): RevokedTokenDoc;
}

interface RevokedTokenDoc extends mongoose.Document {
    token: string;
    revokedAt: Date;
}

const revokedTokenScheema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true,
        },
        revokedAt: {
            type: Date,
            required: true,
            default: Date.now
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
);

const RevokedToken = mongoose.model<RevokedTokenDoc, RevokedTokenModel>('RevokedToken', revokedTokenScheema);
export { RevokedToken }