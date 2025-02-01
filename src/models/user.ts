import mongoose from 'mongoose';
import { Password } from '../actions/password';
import { UserAttributes, UserDoc, UserModel } from '../types/user-types';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            }
        }
    }
);

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hash = await Password.toHash(this.get('password'));
        this.set('password', hash);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttributes) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
