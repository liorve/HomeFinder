// src/pages/ListingsPage.tsx
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import ListingCard from "../ListingCard";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../lib/config";

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

export default function ListingsPage() {
  const [openAdvanced, setOpenAdvanced] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/listings/`);

        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }

        const data = await response.json();
        setListings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleViewDetails = (id: number) => {
    navigation(`/listing/${id}`);
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gray-100 rounded-lg p-8 text-center flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Find Your Perfect <span className="text-primary">Home</span></h1>
        <p className="text-gray-700 max-w-xl">
          Discover amazing apartments, houses, and properties for rent or sale in your dream location.
        </p>

        {/* Search Form */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-3xl">
          <Input placeholder="Search by keyword..." className="flex-1" />

          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Rent / Buy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rent">For Rent</SelectItem>
              <SelectItem value="buy">For Sale</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tel-aviv">Tel Aviv</SelectItem>
              <SelectItem value="jerusalem">Jerusalem</SelectItem>
              <SelectItem value="haifa">Haifa</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="default">Search</Button>

          {/* Advanced Search Modal */}
          <Dialog open={openAdvanced} onOpenChange={setOpenAdvanced}>
            <DialogTrigger asChild>
              <Button variant="outline">Advanced Search</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Advanced Search</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Min Price" type="number" />
                <Input placeholder="Max Price" type="number" />
                <Input placeholder="Bedrooms" type="number" />
                <div className="flex justify-end mt-4">
                  <DialogClose asChild>
                    <Button>Close</Button>
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Listings Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Listings</h2>

        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading listings...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md">
            Error: {error}
          </div>
        )}

        {!loading && !error && listings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No listings found.</p>
          </div>
        )}

        {!loading && !error && listings.length > 0 && (
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
                onView={() => handleViewDetails(listing.id)}
              />
            ))}
          </div>
        )}

      </section>
    </div>
  );
}
