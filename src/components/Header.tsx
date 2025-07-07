import React from "react";
import { ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type HeaderProps = {
  isDark: boolean;
  user: {
    name: string;
    role: string;
  } | null;
  logout: () => void;
};

const Header: React.FC<HeaderProps> = ({ isDark, user, logout }) => {
  return (
    <header
      className={`flex justify-end items-center py-1 px-8 ${
        isDark ? "border-gray-700" : "border-gray-200 text-black"
      }`}
    >
      <div className="flex items-center space-x-2">
        {user && (
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 cursor-pointer outline-none">
                <div className="mr-2">
                  <img
                    src={`/icons/${user.role}.png`}
                    alt={user.role}
                    className="my-1 h-5 w-5 rounded-full"
                  />
                </div>
                <div className="text-sm">Hi, {user.name}</div>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={`${
                  isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <DropdownMenuItem
                  className={`${
                    isDark
                      ? "text-gray-200 hover:bg-gray-700"
                      : "text-gray-900 hover:bg-gray-100"
                  } flex items-center space-x-2`}
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
