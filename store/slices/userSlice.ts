import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUsers, updateUserRole, toggleUserBlock } from '@/lib/services/userService';
import { User, UserRole } from '@/lib/types';

interface UserState {
  users: User[];
  total: number;
  pages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  total: 0,
  pages: 1,
  currentPage: 1,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async ({ page, limit, search, role, isBlocked }: { page: number; limit: number; search?: string; role?: string; isBlocked?: string }) => {
    const data = await getUsers(page, limit, search, role, isBlocked);
    return data;
  }
);

export const updateRole = createAsyncThunk(
  'users/updateRole',
  async ({ userId, role }: { userId: string; role: UserRole }) => {
    const updatedUser = await updateUserRole(userId, role);
    return updatedUser;
  }
);

export const toggleBlock = createAsyncThunk(
  'users/toggleBlock',
  async ({ userId, blocked }: { userId: string; blocked: boolean }) => {
    const updatedUser = await toggleUserBlock(userId, blocked);
    return updatedUser;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.total = action.payload.total;
        state.pages = action.payload.pages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(toggleBlock.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export const { setCurrentPage } = userSlice.actions;
export default userSlice.reducer;
