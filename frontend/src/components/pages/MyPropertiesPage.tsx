import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../lib/config";
import { tokenAtom } from "../../lib/atoms";
import { Button } from "../ui/button";
import ListingCard from "../ListingCard";
import { Plus } from "lucide-react";

interface Listing {
    id: number;
    title: string;
    location: string;
    price: number;
    type: string;
    rooms: number;
    sqm: number;
    balcony: boolean;
    images: string[];
}

export default function MyPropertiesPage() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [token] = useAtom(tokenAtom);
    const navigate = useNavigate();

    const fetchMyListings = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/listings/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch your listings");
            }

            const data = await response.json();
            setListings(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/signin");
            return;
        }
        fetchMyListings();
    }, [token, navigate]);

    const handleEdit = (id: number) => {
        navigate(`/edit-listing/${id}`);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;

        try {
            const response = await fetch(`${API_URL}/listings/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete listing");
            }

            // Refresh the list
            fetchMyListings();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleView = (id: number) => {
        navigate(`/listing/${id}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
                    <p className="text-gray-600 mt-2">Manage and edit your property listings</p>
                </div>
                <Button onClick={() => navigate("/create-listing")} className="flex items-center gap-2">
                    <Plus size={20} />
                    Add New Property
                </Button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-md">
                    {error}
                </div>
            )}

            {listings.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties yet</h3>
                    <p className="text-gray-600 mb-6">You haven't listed any properties yet. Start by adding your first one!</p>
                    <Button onClick={() => navigate("/create-listing")} variant="outline">
                        Create your first listing
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            title={listing.title}
                            location={listing.location}
                            price={listing.price}
                            type={listing.type}
                            bedrooms={listing.rooms}
                            sqm={listing.sqm}
                            balcony={listing.balcony}
                            imageUrl={listing.images?.[0] || "https://img.yad2.co.il/Pic/202509/01/2_1/o/y2_1_05759_20250901122144.jpeg?c=6"}
                            onView={() => handleView(listing.id)}
                            onEdit={() => handleEdit(listing.id)}
                            onDelete={() => handleDelete(listing.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
