import { Link, Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";

const AdminLayout = () => {
  const { pathname } = useLocation();

  const links = [
    { to: "/admin", label: "📊 Dashboard" },
    { to: "/admin/users", label: "👤 Users" },
    { to: "/admin/events", label: "📅 Events" },
    { to: "/admin/leaderboard", label: "🏆 Leaderboard" },
    { to: "/admin/notifications", label: "🔔 Notifications" },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={clsx(
                "px-3 py-2 rounded hover:bg-gray-800 transition",
                pathname === link.to && "bg-gray-800 font-semibold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
