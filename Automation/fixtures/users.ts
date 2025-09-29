import { config } from "../helpers/config";

export type UserRole = "admin" | "member";

export interface User {
  role: UserRole;
  email: string;
  password: string;
}

export const users: Record<UserRole, User> = {
  admin: {
    role: "admin",
    email: config.adminEmail,
    password: config.adminPassword,
  },
  member: {
    role: "member",
    email: config.memberEmail,
    password: config.memberPassword,
  },
};

export const getUser = (role: UserRole): User => {
  const user = users[role];
  if (!user) {
    throw new Error(`User role "${role}" is not defined in fixtures`);
  }
  return user;
};

export const getAllUsers = (): User[] => Object.values(users);

