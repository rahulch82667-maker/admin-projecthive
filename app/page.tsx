import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header>
          <h2 className="text-2xl font-bold text-stone-900">Dashboard Overview</h2>
          <p className="text-stone-500">Welcome back to the ProjectHive admin panel.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
            <p className="text-stone-500 text-sm font-medium">Total Users</p>
            <p className="text-3xl font-bold text-[#7c4a32] mt-2">1,284</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
            <p className="text-stone-500 text-sm font-medium">Active Hives</p>
            <p className="text-3xl font-bold text-[#7c4a32] mt-2">42</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
            <p className="text-stone-500 text-sm font-medium">System Status</p>
            <p className="text-3xl font-bold text-green-600 mt-2">Healthy</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
