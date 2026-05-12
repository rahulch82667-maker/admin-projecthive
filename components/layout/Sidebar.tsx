"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  ShoppingBag, 
  BarChart3,
  LogOut
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Users", href: "/users", icon: Users },
    // { name: "Analytics", href: "/analytics", icon: BarChart3 },
    // { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-stone-100 flex-shrink-0 hidden lg:flex flex-col">
      <div className="flex-1 p-6">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? "bg-[#7c4a32] text-white shadow-md shadow-[#7c4a32]/20" 
                    : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                  }
                `}
              >
                <Icon size={20} className={isActive ? "text-white" : "text-stone-400"} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-stone-50">
        <div className="bg-stone-50 rounded-2xl p-4">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">System</p>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Server: Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
