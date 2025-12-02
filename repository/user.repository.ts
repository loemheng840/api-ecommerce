import { IUser } from "../model/user.domain";

export interface UserRepository {
  save: (userData: Partial<IUser>) => Promise<IUser>;
  findById: (userId: string) => Promise<IUser | null>;
  findByEmail: (email: string) => Promise<IUser | null>;
  findAll: () => Promise<IUser[]>;
  deleteById: (userId: string) => Promise<IUser | null>;
  updateById: (
    userId: string,
    updateData: Partial<IUser>
  ) => Promise<IUser | null>;
}
