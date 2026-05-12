'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProjectTable from '@/components/projects/ProjectTable';
import ProjectFilters from '@/components/projects/ProjectFilters';
import { getProjects, deleteProject } from '@/lib/services/projectService';
import { LayoutGrid, Plus, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchProjects, removeProject, setCurrentPage } from '@/store/slices/projectSlice';

export default function ProjectsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading, total, pages, currentPage } = useSelector((state: RootState) => state.projects);

  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const fetchData = () => {
    dispatch(fetchProjects({ page: currentPage, limit: 10, search, category, status }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timer);
  }, [currentPage, search, category, status, dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(removeProject(id));
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setStatus('');
    dispatch(setCurrentPage(1));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#7c4a32]">
              <LayoutGrid size={24} strokeWidth={2.5} />
              <h2 className="text-2xl font-black tracking-tight text-stone-900 uppercase">Project Library</h2>
            </div>
            <p className="text-stone-500 font-medium">
              Manage your digital assets, scripts, and themes from one central hub.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white px-4 py-2 rounded-2xl border border-stone-100 shadow-sm flex items-center gap-3">
               <div className="flex flex-col items-end">
                 <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Total Projects</span>
                 <span className="text-xl font-black text-[#7c4a32]">{total}</span>
               </div>
               <button 
                 onClick={fetchData}
                 className="p-2 hover:bg-stone-50 rounded-xl transition-colors text-stone-400 hover:text-[#7c4a32]"
                 title="Refresh List"
               >
                 <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
               </button>
            </div>
            <Link
              href="/projects/add"
              className="px-6 py-3 bg-[#7c4a32] text-white rounded-2xl font-black uppercase tracking-wider text-xs flex items-center gap-2 hover:bg-[#5d3725] transition-all shadow-lg shadow-amber-900/20 active:scale-95"
            >
              <Plus size={18} strokeWidth={3} />
              Add Project
            </Link>
          </div>
        </header>

        <ProjectFilters
          search={search}
          setSearch={(v) => { setSearch(v); dispatch(setCurrentPage(1)); }}
          category={category}
          setCategory={(v) => { setCategory(v); dispatch(setCurrentPage(1)); }}
          status={status}
          setStatus={(v) => { setStatus(v); dispatch(setCurrentPage(1)); }}
          onClear={clearFilters}
        />

        <ProjectTable
          projects={projects}
          loading={loading}
          onDelete={handleDelete}
          page={currentPage}
          pages={pages}
          onPageChange={handlePageChange}
        />
      </div>
    </DashboardLayout>
  );
}
