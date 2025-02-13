import { UserRepository } from "../../database/repositories/user-repository";
const userRepo = new UserRepository();

const createUser = async (email: string, password: string) => {
    const user = userRepo.createUser(email, password);
    return user
};

export { createUser };