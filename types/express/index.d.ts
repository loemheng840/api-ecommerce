// types/express/index.d.ts (create this file)
import { IUser } from "../../model/user.domain";

declare global {
  namespace Express {
    interface User extends IUser {}
    
    interface Request {
      userId?: string;
        user?: User;
        role?: string;
    }
  }
}

export {};