export interface IUserRepository {
    createUser(email: string, password: string): Promise<any>;
    findByEmail(email: string): Promise<any | null>;
    findById(id: string): Promise<any | null>;
}