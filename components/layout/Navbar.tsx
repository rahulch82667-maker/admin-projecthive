"use client";

import React from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { LogOut, User as UserIcon, Bell, ChevronDown } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 1. Firebase Sign Out
      await signOut(auth);
      
      // 2. Backend Logout (Clear Cookie)
      await axiosInstance.post("/auth/logout");
      
      // 3. Redux Logout
      dispatch(logout());
      
      // 4. Redirect
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="h-20 bg-white border-b border-stone-100 px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      {/* Left: Logo */}
<div className="flex items-center gap-3 ml-8">
  <div className="relative w-16 h-16">
    <Image
      src="/images/Hive_logo.png"
      alt="Logo"
      fill
      className="object-contain scale-215"
    />
  </div>
</div>
      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-6">


        {/* User Profile Dropdown */}
        <div className="flex items-center gap-4 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-stone-900 leading-tight">
              {user?.name || "Admin User"}
            </p>
            <p className="text-xs font-medium text-stone-500 capitalize">
              {user?.role || "Administrator"}
            </p>
          </div>
          
          <div className="relative group">
            <button className="flex items-center gap-2 p-1 rounded-full border-2 border-stone-50 hover:border-amber-100 transition-all">
              <div className="w-10 h-10 rounded-full bg-[#7c4a32] flex items-center justify-center text-white font-bold">
                {user?.name?.[0].toUpperCase() || <UserIcon size={20} />}
              </div>
              <ChevronDown size={16} className="text-stone-400 group-hover:text-stone-600 transition-all" />
            </button>

            {/* Simple Hover Dropdown */}
            <div className="absolute right-0 mt-2 w-56 bg-white border border-stone-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                >
                  <LogOut size={18} />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
