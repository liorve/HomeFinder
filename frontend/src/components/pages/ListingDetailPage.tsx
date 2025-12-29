// src/components/pages/ListingDetailPage.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { API_URL } from "../../lib/config";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Listing {
  id: number;
  title: string;
  location: string;
  price: number;
  type: string;
  rooms: number;
  sqm: number;
  balcony: boolean;
  ac: boolean;
  parking: boolean;
  mamad: boolean;
  furnished: boolean;
  description: string;
  images: string[];
  lat: number;
  lng: number;
}

export default function ListingDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/listings/`);

        if (!response.ok) {
          throw new Error('Failed to fetch listing');
        }

        const data = await response.json();
        const foundListing = data.find((l: Listing) => l.id === Number(id));

        if (!foundListing) {
          setError('Listing not found');
        } else {
          setListing(foundListing);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Loading listing...</p>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">{error || 'Listing not found!'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden space-y-6 p-6">
        <img
          src={listing.images?.[0] || "https://img.yad2.co.il/Pic/202509/01/2_1/o/y2_1_05759_20250901122144.jpeg?c=6"}
          alt={listing.title}
          className="w-full h-96 object-cover rounded-xl"
        />

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{listing.title}</h1>
            <span className="inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
              For {listing.type === 'rent' ? 'Rent' : 'Sale'}
            </span>
          </div>
          <span className="text-2xl font-semibold">₪{listing.price.toLocaleString()}{listing.type === 'rent' ? '/mo' : ''}</span>
        </div>

        <p className="text-gray-700">{listing.location}</p>

        <div className="flex flex-wrap gap-6 text-gray-600">
          <span>🛏 {listing.rooms} Rooms</span>
          <span>📏 {listing.sqm} m²</span>
          <span>🌿 Balcony: {listing.balcony ? "Yes" : "No"}</span>
          <span>❄️ AC: {listing.ac ? "Yes" : "No"}</span>
          <span>🚗 Parking: {listing.parking ? "Yes" : "No"}</span>
          <span>🛡 Mamad: {listing.mamad ? "Yes" : "No"}</span>
          <span>🪑 Furnished: {listing.furnished ? "Yes" : "No"}</span>
        </div>

        <div className="text-gray-800 text-lg mt-4">{listing.description}</div>

        {/* Map */}
        <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
          <MapContainer
            center={[listing.lat, listing.lng]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[listing.lat, listing.lng]} />
          </MapContainer>
        </div>

        <Button>Contact Owner</Button>
      </div>
    </div>
  );
}
