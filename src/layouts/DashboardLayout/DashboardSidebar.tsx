import { Activity, List, Search, Settings } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

const menuItems = [
  {
    name: "Dashboard",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    name: "OPD",
    icon: <Activity className="h-5 w-5" />,
    hasSubmenu: true,
    subMenuItems: [
      {
        name: "Department",
        path: "/dashboard/department",
      },
    ],
  },
];

const DashboardSidebar = () => {
  const path = useLocation().pathname;
  const [expandedMenu, setExpandedMenu] = useState<string | null>(
    menuItems.find(
      (item) =>
        item.subMenuItems && item.subMenuItems.some((sub) => sub.path === path)
    )?.name || null
  );

  const toggleMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };
  return (
    <aside className="w-64 bg-gray-800 text-white overflow-y-auto">
      <div className="p-4 flex items-center space-x-2">
        <Search className="h-5 w-5" />
        <List className="h-5 w-5" />
      </div>
      <nav className="mt-2">
        {menuItems.map((item, index) => (
          <div key={index}>
            <div
              className={`flex items-center justify-between px-4 py-3 hover:bg-gray-700 cursor-pointer ${
                item.name === "Workbench" ? "bg-gray-700" : ""
              }`}
              onClick={() => item.hasSubmenu && toggleMenu(item.name)}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {item.hasSubmenu && (
                <span className="text-xs">
                  {expandedMenu === item.name ? "▼" : "►"}
                </span>
              )}
            </div>
            {item.hasSubmenu &&
              expandedMenu === item.name &&
              item.subMenuItems && (
                <div className="bg-gray-700 py-2">
                  {item.subMenuItems.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className="block pl-12 py-2 h-12"
                    >
                      {subItem.name}
                      <div
                        className={`w-8 h-0.5 bg-white mt-1 ${
                          path === subItem.path ? "block" : "hidden"
                        }`}
                      />
                    </Link>
                  ))}
                </div>
              )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
