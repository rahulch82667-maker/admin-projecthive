'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchProjectById, updateProjectAction, clearCurrentProject } from '@/store/slices/projectSlice';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProjectForm, { ProjectFormValues } from '@/components/projects/ProjectForm';
import { Package } from 'lucide-react';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const dispatch = useDispatch<AppDispatch>();
  const [submitting, setSubmitting] = useState(false);

  const { currentProject, loading } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
    }
    return () => {
      dispatch(clearCurrentProject());
    };
  }, [id, dispatch]);

  const handleSubmit = async (values: ProjectFormValues) => {
    setSubmitting(true);
    try {
      await dispatch(updateProjectAction({ id, projectData: values })).unwrap();
      router.push('/projects');
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !currentProject) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-[#7c4a32] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-stone-400 font-medium italic">Loading project details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!loading && !currentProject) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden p-12 flex flex-col items-center justify-center text-center mt-8">
          <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-300 mb-4">
            <Package size={32} />
          </div>
          <h3 className="text-lg font-bold text-stone-900">Project not found</h3>
          <p className="text-stone-500 max-w-xs mt-1">The project you are looking for does not exist or has been deleted.</p>
          <button 
            onClick={() => router.push('/projects')}
            className="mt-6 px-6 py-2 bg-[#7c4a32] text-white rounded-xl font-bold hover:bg-[#5d3725] transition-colors shadow-md shadow-amber-900/10"
          >
            Back to Projects
          </button>
        </div>
      </DashboardLayout>
    );
  }

  if (!currentProject) return null;

  // Map the currentProject to ProjectFormValues
  const initialValues: ProjectFormValues = {
    title: currentProject.title || '',
    shortDescription: currentProject.shortDescription || '',
    fullDescription: currentProject.fullDescription || '',
    price: currentProject.price || 0,
    discountPrice: currentProject.discountPrice || 0,
    discountPercentage: currentProject.discountPercentage || 0,
    category: currentProject.category || 'scripts',
    tags: currentProject.tags || [],
    thumbnail: currentProject.thumbnail || '',
    images: currentProject.images || [],
    demoVideo: currentProject.demoVideo || '',
    liveDemoLink: currentProject.liveDemoLink || '',
    technologies: currentProject.technologies || [],
    isFeatured: currentProject.isFeatured || false,
    isPublished: currentProject.isPublished || false,
    status: currentProject.status || 'draft',
    stock: currentProject.stock !== undefined ? currentProject.stock : -1,
    faq: currentProject.faq?.length > 0 ? currentProject.faq : [{ question: '', answer: '' }],
    requirements: currentProject.requirements?.length > 0 ? currentProject.requirements : [''],
    fileSize: currentProject.fileSize || '',
    version: currentProject.version || '1.0.0',
    changelog: currentProject.changelog?.length > 0 ? currentProject.changelog : [{ version: '1.0.0', notes: '', date: new Date().toISOString().split('T')[0] }],
    salesCount: currentProject.salesCount || 0,
    rating: currentProject.rating || 0,
    totalReviews: currentProject.totalReviews || 0,
    favoritesCount: currentProject.favoritesCount || 0,
    cartCount: currentProject.cartCount || 0,
  };

  return (
    <DashboardLayout>
      <ProjectForm 
        initialValues={initialValues} 
        onSubmit={handleSubmit} 
        loading={submitting} 
        isEdit={true} 
      />
    </DashboardLayout>
  );
}
