"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserTable from "@/components/users/UserTable";
import UserFilters from "@/components/users/UserFilters";
import PurchaseModal from "@/components/users/PurchaseModal";
import { User, UserRole } from "@/lib/types";
import { getUsers, updateUserRole, toggleUserBlock } from "@/lib/services/userService";
import { Users as UsersIcon, RefreshCcw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchUsers, updateRole, toggleBlock, setCurrentPage } from "@/store/slices/userSlice";

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, total, pages, currentPage } = useSelector((state: RootState) => state.users);

  // Filters
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [isBlocked, setIsBlocked] = useState("");

  // Modal
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = () => {
    dispatch(fetchUsers({ page: currentPage, limit: 10, search, role, isBlocked }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [currentPage, search, role, isBlocked, dispatch]);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    dispatch(updateRole({ userId, role: newRole }));
  };

  const handleToggleBlock = async (userId: string, blocked: boolean) => {
    dispatch(toggleBlock({ userId, blocked }));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleViewPurchases = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setSearch("");
    setRole("");
    setIsBlocked("");
    setPage(1);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#7c4a32]">
              <UsersIcon size={24} strokeWidth={2.5} />
              <h2 className="text-2xl font-black tracking-tight text-stone-900 uppercase">User Management</h2>
            </div>
            <p className="text-stone-500 font-medium">
              Manage accounts, roles, and view activity across the platform.
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl border border-stone-100 shadow-sm flex items-center gap-3">
             <div className="flex flex-col items-end">
               <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Total Users</span>
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
        </header>

        <UserFilters
          search={search}
          setSearch={(v) => { setSearch(v); dispatch(setCurrentPage(1)); }}
          role={role}
          setRole={(v) => { setRole(v); dispatch(setCurrentPage(1)); }}
          isBlocked={isBlocked}
          setIsBlocked={(v) => { setIsBlocked(v); dispatch(setCurrentPage(1)); }}
          onClear={clearFilters}
        />

        <UserTable
          users={users}
          loading={loading}
          page={currentPage}
          pages={pages}
          onPageChange={handlePageChange}
          onRoleChange={handleRoleChange}
          onToggleBlock={handleToggleBlock}
          onViewPurchases={handleViewPurchases}
        />

        <PurchaseModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
