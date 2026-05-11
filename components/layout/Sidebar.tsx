"use client";

import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-stone-100 flex-shrink-0 hidden lg:flex flex-col">
      <div className="flex-1 p-6">
        <div className="space-y-4">
          {/* Sidebar content will go here */}
          <div className="h-4 w-full bg-stone-50 rounded-lg animate-pulse" />
          <div className="h-4 w-[80%] bg-stone-50 rounded-lg animate-pulse" />
          <div className="h-4 w-[90%] bg-stone-50 rounded-lg animate-pulse" />
        </div>
      </div>
      
    </aside>
  );
};

export default Sidebar;
