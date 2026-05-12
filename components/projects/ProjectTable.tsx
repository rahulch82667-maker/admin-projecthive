'use client';

import React from 'react';
import { Edit, Trash2, ExternalLink, Package } from 'lucide-react';
import Link from 'next/link';

interface Project {
  _id: string;
  title: string;
  category: string;
  price: number;
  status: string;
  thumbnail: string;
  salesCount: number;
}

interface ProjectTableProps {
  projects: Project[];
  loading: boolean;
  onDelete: (id: string) => void;
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  loading,
  onDelete,
  page,
  pages,
  onPageChange,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden p-12 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#7c4a32] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-stone-400 font-medium italic">Loading projects...</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-300 mb-4">
          <Package size={32} />
        </div>
        <h3 className="text-lg font-bold text-stone-900">No projects found</h3>
        <p className="text-stone-500 max-w-xs mt-1">Start by adding a new project to your library.</p>
        <Link 
          href="/projects/add"
          className="mt-6 px-6 py-2 bg-[#7c4a32] text-white rounded-xl font-bold hover:bg-[#5d3725] transition-colors shadow-md shadow-amber-900/10"
        >
          Create Project
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50/50">
              <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest border-b border-stone-100">Project</th>
              <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest border-b border-stone-100">Category</th>
              <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest border-b border-stone-100">Price</th>
              <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest border-b border-stone-100">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest border-b border-stone-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {projects.map((project) => (
              <tr key={project._id} className="hover:bg-stone-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={project.thumbnail} 
                      alt="" 
                      className="w-12 h-12 rounded-xl object-cover bg-stone-100 border border-stone-100" 
                    />
                    <div>
                      <h4 className="font-bold text-stone-900 line-clamp-1">{project.title}</h4>
                      <p className="text-xs text-stone-400 font-medium">Sales: {project.salesCount}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-stone-100 text-stone-600 text-[11px] font-bold rounded-lg uppercase tracking-wider">
                    {project.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-black text-[#7c4a32]">${project.price}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider ${
                    project.status === 'published' ? 'bg-green-50 text-green-600' :
                    project.status === 'draft' ? 'bg-amber-50 text-amber-600' :
                    'bg-stone-100 text-stone-600'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link 
                      href={`/projects/edit/${project._id}`}
                      className="p-2 text-stone-400 hover:text-[#7c4a32] hover:bg-amber-50 rounded-lg transition-all"
                    >
                      <Edit size={16} />
                    </Link>
                    <button 
                      onClick={() => onDelete(project._id)}
                      className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button className="p-2 text-stone-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="px-6 py-4 bg-stone-50/50 border-t border-stone-100 flex items-center justify-between">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
            Page {page} of {pages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border border-stone-200 rounded-lg text-stone-600 disabled:opacity-50 text-xs font-bold hover:bg-white transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === pages}
              className="px-3 py-1 border border-stone-200 rounded-lg text-stone-600 disabled:opacity-50 text-xs font-bold hover:bg-white transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;
