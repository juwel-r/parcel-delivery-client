export type TRole = "ADMIN" | "SENDER" | "RECEIVER";
export type TIsActive = "ACTIVE" | "INACTIVE" | "BLOCK";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
  isActive: TIsActive;
  isVerified: boolean;
  isDeleted: boolean;
  authProvider: AuthProvider[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthProvider {
  provider: string;
  providerId: string;
}
