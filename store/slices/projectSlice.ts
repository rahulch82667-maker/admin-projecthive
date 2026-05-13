import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getProjects, deleteProject, getProjectById, updateProject } from '@/lib/services/projectService';

export interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  status: 'draft' | 'published' | 'archived';
  thumbnail: string;
  salesCount: number;
  createdAt: string;
  [key: string]: any; // Allow other properties like fullDescription, demoVideo etc.
}

interface ProjectState {
  projects: Project[];
  total: number;
  pages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  currentProject: Project | null;
}

const initialState: ProjectState = {
  projects: [],
  total: 0,
  pages: 1,
  currentPage: 1,
  loading: false,
  error: null,
  currentProject: null,
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

export const fetchProjectById = createAsyncThunk(
  'projects/fetchById',
  async (projectId: string) => {
    const data = await getProjectById(projectId);
    return data;
  }
);

export const updateProjectAction = createAsyncThunk(
  'projects/update',
  async ({ id, projectData }: { id: string; projectData: any }) => {
    const data = await updateProject(id, projectData);
    return data;
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all projects
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
      // Remove project
      .addCase(removeProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p._id !== action.payload);
        state.total -= 1;
      })
      // Fetch project by ID
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch project';
      })
      // Update project
      .addCase(updateProjectAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProjectAction.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
        // Optionally update the project in the list if it exists
        const index = state.projects.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProjectAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update project';
      });
  },
});

export const { setCurrentPage, clearCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
