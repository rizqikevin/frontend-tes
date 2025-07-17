import { ChevronDown, ChevronRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  hasSubmenu?: boolean;
  expanded?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  to?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active = false,
  hasSubmenu = false,
  expanded = false,
  onClick,
  children,
  to,
}) => {
  const location = useLocation();
  const isActive = to && location.pathname === to;

  const baseClass = `flex items-center px-4 py-2 text-sm rounded-md cursor-pointer`;
  const activeClass = `bg-gray-700 text-white`;
  const inactiveClass = `text-gray-300 hover:bg-gray-700 hover:text-white`;

  return (
    <div className="mb-1">
      {to ? (
        <NavLink
          to={to}
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
          onClick={onClick}
        >
          <span className="mr-3">{icon}</span>
          <span className="flex-1">{text}</span>
          {hasSubmenu && (
            <span className="ml-auto">
              {expanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </span>
          )}
        </NavLink>
      ) : (
        <div
          className={`${baseClass} ${active ? activeClass : inactiveClass}`}
          onClick={onClick}
        >
          <span className="mr-3">{icon}</span>
          <span className="flex-1">{text}</span>
          {hasSubmenu && (
            <span className="ml-auto">
              {expanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </span>
          )}
        </div>
      )}
      {expanded && children && (
        <div className="ml-6 mt-1 space-y-1">{children}</div>
      )}
    </div>
  );
};

export default SidebarItem;
