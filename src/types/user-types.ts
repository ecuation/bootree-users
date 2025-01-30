import mongoose from 'mongoose';

export interface UserAttributes {
    email: string;
    password: string;
}

export interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttributes): UserDoc;
}

export interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}