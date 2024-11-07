// user interfaces

import type { UserRole } from "App/types/enums";

export interface IUser {
  UserID?: number;
  Username: string;
  Email: string;
  Telephone?: string;
  Password: string;
  Role: UserRole;
  thumbnail: string;
  createdAt?: Date;
  updatedAt?: Date;

}
