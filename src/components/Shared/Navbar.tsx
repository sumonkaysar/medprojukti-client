import { BellIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const path = useLocation().pathname;

  const menuItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
  ];

  return (
    <header className="bg-blue-500 text-white">
      <div className="flex items-center justify-between max-w-7xl container mx-auto px-6">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold">ZKTeco</div>
          <nav className="flex">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`px-4 py-3 hover:bg-[#305E86] ${
                  item.path === path ||
                  (item.path === "/dashboard" && path.includes(item.path))
                    ? "bg-[#305E86] relative"
                    : ""
                }`}
              >
                {item.name}
                {(item.path === path ||
                  (item.path === "/dashboard" && path.includes(item.path))) && (
                  <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white mx-auto mt-1 absolute bottom-0 left-1/2 -translate-x-1/2" />
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4 mr-4">
          <div className="relative">
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
              10
            </span>
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-700">👤</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
