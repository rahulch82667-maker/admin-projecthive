import axiosInstance from "@/utils/axiosInstance";
import { PaginatedResponse, Purchase, User, UserRole } from "../types";
import { mockPurchases } from "../mocks/purchases";

export const getUsers = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  role: string = "",
  isBlocked: string = ""
): Promise<PaginatedResponse<User>> => {
  const response = await axiosInstance.get("/users", {
    params: { page, limit, search, role, isBlocked },
  });
  return response.data;
};

export const updateUserRole = async (userId: string, role: UserRole): Promise<User> => {
  const response = await axiosInstance.patch(`/users/${userId}/role`, { role });
  return response.data.user;
};

export const toggleUserBlock = async (userId: string, isBlocked: boolean): Promise<User> => {
  const response = await axiosInstance.patch(`/users/${userId}/block`, { isBlocked });
  return response.data.user;
};

export const getUserPurchases = async (userId: string): Promise<Purchase[]> => {
  // Simulating an API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      // For now, we return the same mock data for any user
      // but we could filter it if we had userId in the mock data
      resolve(mockPurchases);
    }, 500);
  });
};
