import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "Partners", path: "/partners" },
  { name: "Documents", path: "/documents" },
  { name: "Scrutiny", path: "/scrutiny" },
  { name: "Compliance", path: "/compliance" },
  { name: "Alerts", path: "/alerts" },
  { name: "Reports", path: "/reports" },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      
      {/* Logo */}
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex items-center gap-3">
          
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
            CRY
          </div>

          <div>
            <h1 className="text-sm font-bold text-slate-900">
              CRY Compliance
            </h1>

            <p className="text-xs text-slate-500">
              Partner Management
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5">
        
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-200 p-4">
        
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-sm font-semibold text-slate-800">
            Compliance Officer
          </p>

          <p className="mt-1 text-xs text-slate-500">
            CRY Workspace
          </p>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;