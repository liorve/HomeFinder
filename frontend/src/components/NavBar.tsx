// src/components/Navbar.tsx
import { Button } from "./ui/button";
import { MdMapsHomeWork } from "react-icons/md";
import { useLocation, Link } from "react-router-dom";

export default function Navbar() {

    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
            {/* Left: Website name */}
            <div className="flex items-center space-x-2">
            <MdMapsHomeWork size={28} className="text-gray-900" />
            <span className="font-bold text-gray-900 text-lg">HomeFinder</span>
            </div>

            {/* Center: Main navigation buttons */}
            <div className="space-x-2">
            <Link to="/listings">
                <Button
                variant="ghost"
                className={`${
                    isActive("/listings") ? "text-gray-900 font-semibold" : "text-gray-700"
                } hover:text-gray-900`}
                >
                Listings
                </Button>
            </Link>
            <Link to="/map">
                <Button
                variant="ghost"
                className={`${
                    isActive("/map") ? "text-gray-900 font-semibold" : "text-gray-700"
                } hover:text-gray-900`}
                >
                Map View
                </Button>
            </Link>
            </div>


            {/* Right: Action buttons */}
            <div className="space-x-2">
            <Button variant="default">Get Started</Button>
            <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                Sign In
            </Button>
            </div>
        </div>
        </nav>
    );
}
