// src/components/Navbar.tsx
import { Button } from "./ui/button";
import { MdMapsHomeWork } from "react-icons/md";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAtom, useSetAtom } from "jotai";
import { userAtom, tokenAtom } from "../lib/atoms";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);
  const setUser = useSetAtom(userAtom);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            <MdMapsHomeWork size={28} className="text-primary" />
            <span className="font-bold text-gray-900 text-lg">HomeFinder</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-2">
          <Link to="/listings">
            <Button
              variant="ghost"
              className={`${isActive("/listings")
                ? "text-gray-900 font-semibold"
                : "text-gray-700"
                } hover:text-gray-900`}
            >
              Listings
            </Button>
          </Link>
          <Link to="/map">
            <Button
              variant="ghost"
              className={`${isActive("/map")
                ? "text-gray-900 font-semibold"
                : "text-gray-700"
                } hover:text-gray-900`}
            >
              Map View
            </Button>
          </Link>
        </div>

        {/* Right actions (desktop) */}
        <div className="hidden md:flex space-x-2 items-center">
          {user ? (
            <>
              <Link to="/profile">
                <Button variant="ghost" className="text-gray-900 mr-2">
                  {user.full_name || user.email}
                </Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to='/register'>
                <Button variant="default">Get Started</Button>
              </Link>
              <Link to='/signin'>
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col space-y-4 mt-6">
                <Link to="/listings">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${isActive("/listings")
                      ? "text-gray-900 font-semibold"
                      : "text-gray-700"
                      }`}
                  >
                    Listings
                  </Button>
                </Link>
                <Link to="/map">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${isActive("/map")
                      ? "text-gray-900 font-semibold"
                      : "text-gray-700"
                      }`}
                  >
                    Map View
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start">
                  Get Started
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-gray-900"
                >
                  Sign In
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav >
  );
}
