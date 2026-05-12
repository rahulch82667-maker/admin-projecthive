export type UserRole = "user" | "admin";

export interface User {
  _id: string;
  firebaseUid: string;
  name: string;
  email: string;
  avatar?: string;
  provider: "email" | "google";
  role: UserRole;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Purchase {
  id: string;
  userId: string;
  productName: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  createdAt: string;
}

export interface PaginatedResponse<T> {
  users: T[];
  total: number;
  page: number;
  pages: number;
}
