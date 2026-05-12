import axiosInstance from '@/utils/axiosInstance';

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
}

export const getProjects = async (
  page = 1,
  limit = 10,
  search = '',
  category = '',
  status = ''
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) params.append('search', search);
  if (category) params.append('category', category);
  if (status) params.append('status', status);

  const response = await axiosInstance.get(`/projects?${params.toString()}`);
  return response.data;
};

export const createProject = async (projectData: any) => {
  const response = await axiosInstance.post('/projects', projectData);
  return response.data.data;
};

export const updateProject = async (id: string, projectData: any) => {
  const response = await axiosInstance.put(`/projects/${id}`, projectData);
  return response.data.data;
};

export const deleteProject = async (id: string) => {
  const response = await axiosInstance.delete(`/projects/${id}`);
  return response.data;
};

export const getProjectById = async (id: string) => {
  const response = await axiosInstance.get(`/projects/${id}`);
  return response.data.data;
};
