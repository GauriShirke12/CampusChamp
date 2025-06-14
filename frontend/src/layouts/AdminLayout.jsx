import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col gap-2">
          <Link to="/admin">📊 Dashboard</Link>
          <Link to="/admin/users">👤 Users</Link>
          <Link to="/admin/events">📅 Events</Link>
          <Link to="/admin/leaderboard">🏆 Leaderboard</Link>
          <Link to="/admin/notifications">🔔 Notifications</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
