// src/components/Navbar.tsx
import { Button } from "./ui/button";
import { MdMapsHomeWork } from "react-icons/md";
import { useLocation, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <MdMapsHomeWork size={28} className="text-gray-900" />
          <span className="font-bold text-gray-900 text-lg">HomeFinder</span>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-2">
          <Link to="/listings">
            <Button
              variant="ghost"
              className={`${
                isActive("/listings")
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
              className={`${
                isActive("/map")
                  ? "text-gray-900 font-semibold"
                  : "text-gray-700"
              } hover:text-gray-900`}
            >
              Map View
            </Button>
          </Link>
        </div>

        {/* Right actions (desktop) */}
        <div className="hidden md:flex space-x-2">
          <Button variant="default">Get Started</Button>
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
            Sign In
          </Button>
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
                    className={`w-full justify-start ${
                      isActive("/listings")
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
                    className={`w-full justify-start ${
                      isActive("/map")
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
    </nav>
  );
}
