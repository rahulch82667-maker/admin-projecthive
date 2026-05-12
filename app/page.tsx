"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getUsers } from "@/lib/services/userService";
import { 
  Users, 
  Hexagon, 
  Activity, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function Home() {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);

  useEffect(() => {
    getUsers(1, 1).then(data => setTotalUsers(data.total));
  }, []);

  const stats = [
    { 
      label: "Total Users", 
      value: totalUsers !== null ? totalUsers.toLocaleString() : "...", 
      change: "+12%", 
      trend: "up",
      icon: Users,
      color: "bg-blue-50 text-blue-600"
    },
    { 
      label: "Active Hives", 
      value: "42", 
      change: "+5%", 
      trend: "up",
      icon: Hexagon,
      color: "bg-amber-50 text-amber-600"
    },
    { 
      label: "Monthly Revenue", 
      value: "$12,482", 
      change: "-2%", 
      trend: "down",
      icon: DollarSign,
      color: "bg-green-50 text-green-600"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header className="space-y-1">
          <h2 className="text-3xl font-black text-stone-900 tracking-tight uppercase">Dashboard Overview</h2>
          <p className="text-stone-500 font-medium">Real-time insights and system performance.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[32px] border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
                  stat.trend === "up" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                }`}>
                  {stat.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-stone-400 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
                <p className="text-4xl font-black text-stone-900 mt-1">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white p-8 rounded-[40px] border border-stone-100 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-stone-300">
                <Activity size={32} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">System Activity</h3>
                <p className="text-sm text-stone-500 max-w-xs mt-1">Live visualization of user interactions and system health will appear here.</p>
              </div>
           </div>
           <div className="bg-[#7c4a32] p-8 rounded-[40px] shadow-2xl shadow-[#7c4a32]/20 flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-500" />
              <div className="relative z-10">
                <ShieldCheck size={40} className="text-amber-200 mb-4" />
                <h3 className="text-2xl font-bold text-white leading-tight">Security & <br/>Compliance</h3>
                <p className="text-stone-300 mt-2 text-sm max-w-xs">All administrative actions are logged and encrypted for maximum security.</p>
              </div>
              <button className="relative z-10 mt-6 w-fit px-6 py-3 bg-white text-[#7c4a32] rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-amber-50 transition-colors shadow-lg">
                View Audit Logs
              </button>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

const ShieldCheck = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
