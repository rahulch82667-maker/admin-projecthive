'use client';

import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface ProjectFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
  onClear: () => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  onClear,
}) => {
  return (
    <div className="bg-white p-4 rounded-3xl border border-stone-100 shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-amber-200 transition-all font-medium placeholder:text-stone-300"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-stone-400" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-stone-50 border-none rounded-xl py-2 pl-3 pr-8 text-xs font-bold text-stone-600 focus:ring-2 focus:ring-amber-200 transition-all appearance-none cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="scripts">Scripts</option>
            <option value="themes">Themes</option>
            <option value="plugins">Plugins</option>
            <option value="templates">Templates</option>
          </select>
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-stone-50 border-none rounded-xl py-2 pl-3 pr-8 text-xs font-bold text-stone-600 focus:ring-2 focus:ring-amber-200 transition-all appearance-none cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>

        {(search || category || status) && (
          <button
            onClick={onClear}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <X size={14} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectFilters;
