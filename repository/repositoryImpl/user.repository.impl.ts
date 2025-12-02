import User, { IUser } from "../../model/user.domain";
import { UserRepository } from "../user.repository";

class UserRepositoryImpl implements UserRepository {
  async save(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  async findById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findAll(): Promise<IUser[]> {
    return await User.find();
  }

  async deleteById(userId: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(userId);
  }

  async updateById(
    userId: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  }
}

export default new UserRepositoryImpl();
