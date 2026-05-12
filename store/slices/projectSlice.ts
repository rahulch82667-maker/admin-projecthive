import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getProjects, deleteProject } from '@/lib/services/projectService';

interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  status: 'draft' | 'published' | 'archived';
  thumbnail: string;
  salesCount: number;
  createdAt: string;
}

interface ProjectState {
  projects: Project[];
  total: number;
  pages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  total: 0,
  pages: 1,
  currentPage: 1,
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async ({ page, limit, search, category, status }: { page: number; limit: number; search?: string; category?: string; status?: string }) => {
    const data = await getProjects(page, limit, search, category, status);
    return data;
  }
);

export const removeProject = createAsyncThunk(
  'projects/remove',
  async (projectId: string) => {
    await deleteProject(projectId);
    return projectId;
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.data;
        state.total = action.payload.total;
        state.pages = action.payload.pages;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch projects';
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p._id !== action.payload);
        state.total -= 1;
      });
  },
});

export const { setCurrentPage } = projectSlice.actions;
export default projectSlice.reducer;
