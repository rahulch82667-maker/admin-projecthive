"use client";

import React from "react";
import { Search, Filter, X } from "lucide-react";

interface UserFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  role: string;
  setRole: (val: string) => void;
  isBlocked: string;
  setIsBlocked: (val: string) => void;
  onClear: () => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  search,
  setSearch,
  role,
  setRole,
  isBlocked,
  setIsBlocked,
  onClear,
}) => {
  return (
    <div className="bg-white p-4 rounded-3xl border border-stone-100 shadow-sm space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#7c4a32]/20 transition-all outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-4 py-2.5 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#7c4a32]/20 transition-all outline-none appearance-none cursor-pointer pr-10 relative"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23a8a29e\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <select
            value={isBlocked}
            onChange={(e) => setIsBlocked(e.target.value)}
            className="px-4 py-2.5 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#7c4a32]/20 transition-all outline-none appearance-none cursor-pointer pr-10 relative"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23a8a29e\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
          >
            <option value="">All Status</option>
            <option value="false">Active</option>
            <option value="true">Blocked</option>
          </select>

          {(search || role || isBlocked) && (
            <button
              onClick={onClear}
              className="flex items-center gap-2 px-4 py-2.5 text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors"
            >
              <X size={16} />
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFilters;
