"use client";

import React from "react";
import { 
  MoreVertical, 
  ShieldCheck, 
  User as UserIcon, 
  Ban, 
  Unlock, 
  ChevronLeft, 
  ChevronRight,
  ShoppingBag,
  ExternalLink,
  ShieldAlert
} from "lucide-react";
import { User, UserRole } from "@/lib/types";

interface UserTableProps {
  users: User[];
  loading: boolean;
  page: number;
  pages: number;
  onPageChange: (newPage: number) => void;
  onRoleChange: (userId: string, newRole: UserRole) => void;
  onToggleBlock: (userId: string, isBlocked: boolean) => void;
  onViewPurchases: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  page,
  pages,
  onPageChange,
  onRoleChange,
  onToggleBlock,
  onViewPurchases,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="p-8 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="w-12 h-12 bg-stone-100 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-stone-100 rounded w-1/4" />
                <div className="h-3 bg-stone-50 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50/50">
              <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest">User</th>
              <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest">Role</th>
              <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest">Joined</th>
              <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-stone-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#7c4a32]/10 flex items-center justify-center text-[#7c4a32] font-bold">
                        {user.name?.[0].toUpperCase() || <UserIcon size={18} />}
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">{user.name}</p>
                        <p className="text-xs text-stone-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => onRoleChange(user._id, e.target.value as UserRole)}
                      className={`
                        text-xs font-bold px-3 py-1.5 rounded-xl border-none outline-none cursor-pointer appearance-none transition-all
                        ${user.role === 'admin' 
                          ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-200 hover:ring-amber-300' 
                          : 'bg-blue-50 text-blue-600 ring-1 ring-blue-200 hover:ring-blue-300'
                        }
                      `}
                    >
                      <option value="user">USER</option>
                      <option value="admin">ADMIN</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`
                      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                      ${user.isBlocked 
                        ? 'bg-red-50 text-red-600' 
                        : 'bg-green-50 text-green-600'
                      }
                    `}>
                      <div className={`w-1.5 h-1.5 rounded-full ${user.isBlocked ? 'bg-red-500' : 'bg-green-500'}`} />
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-stone-500">
                      {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onViewPurchases(user)}
                        className="p-2 hover:bg-[#7c4a32]/10 text-stone-400 hover:text-[#7c4a32] rounded-xl transition-all"
                        title="View Purchases"
                      >
                        <ShoppingBag size={18} />
                      </button>
                      <button 
                        onClick={() => onToggleBlock(user._id, !user.isBlocked)}
                        className={`
                          p-2 rounded-xl transition-all
                          ${user.isBlocked 
                            ? 'hover:bg-green-50 text-green-400 hover:text-green-600' 
                            : 'hover:bg-red-50 text-stone-400 hover:text-red-600'
                          }
                        `}
                        title={user.isBlocked ? "Unblock User" : "Block User"}
                      >
                        {user.isBlocked ? <Unlock size={18} /> : <Ban size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-stone-500 font-medium">
                  No users found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="px-6 py-4 bg-stone-50/30 border-t border-stone-50 flex items-center justify-between">
          <p className="text-sm text-stone-500 font-medium">
            Page <span className="text-stone-900 font-bold">{page}</span> of <span className="text-stone-900 font-bold">{pages}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="p-2 bg-white border border-stone-100 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1">
              {[...Array(pages)].map((_, i) => {
                const p = i + 1;
                // Simple logic to show current, first, last, and neighbors
                if (pages > 5 && (p > 1 && p < pages && Math.abs(p - page) > 1)) {
                   if (p === 2 || p === pages - 1) return <span key={p} className="px-1 text-stone-400">...</span>;
                   return null;
                }
                return (
                  <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`
                      w-10 h-10 rounded-xl text-sm font-bold transition-all
                      ${page === p 
                        ? 'bg-[#7c4a32] text-white shadow-md shadow-[#7c4a32]/20' 
                        : 'bg-white border border-stone-100 text-stone-500 hover:bg-stone-50'
                      }
                    `}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === pages}
              className="p-2 bg-white border border-stone-100 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
