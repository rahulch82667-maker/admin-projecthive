'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProjectForm, { ProjectFormValues } from '@/components/projects/ProjectForm';
import { createProject } from '@/lib/services/projectService';

export default function AddProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues: ProjectFormValues = {
    title: '',
    shortDescription: '',
    fullDescription: '',
    price: 0,
    discountPrice: 0,
    discountPercentage: 0,
    category: 'scripts',
    tags: [],
    thumbnail: '',
    images: [],
    demoVideo: '',
    liveDemoLink: '',
    technologies: [],
    isFeatured: false,
    isPublished: false,
    status: 'draft',
    stock: -1,
    faq: [{ question: '', answer: '' }],
    requirements: [''],
    fileSize: '',
    version: '1.0.0',
    changelog: [{ version: '1.0.0', notes: '', date: new Date().toISOString().split('T')[0] }],
    salesCount: 0,
    rating: 0,
    totalReviews: 0,
    favoritesCount: 0,
    cartCount: 0,
  };

  const handleSubmit = async (values: ProjectFormValues) => {
    setLoading(true);
    try {
      await createProject(values);
      router.push('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <ProjectForm 
        initialValues={initialValues} 
        onSubmit={handleSubmit} 
        loading={loading} 
        isEdit={false} 
      />
    </DashboardLayout>
  );
}
