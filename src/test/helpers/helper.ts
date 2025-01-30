import { User } from "../../models/user";

const createUser = async (email: string, password: string) => {
    const user = User.build({ email, password });
    await user.save();
    return user
};

export { createUser };