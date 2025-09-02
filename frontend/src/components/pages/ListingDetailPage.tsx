// src/components/pages/ListingDetailPage.tsx
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";

export default function ListingDetailPage({ listings }: { listings: any[] }) {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === Number(id));

  if (!listing) return <div className="p-8">Listing not found!</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden space-y-6 p-6">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-96 object-cover rounded-xl"
        />

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{listing.title}</h1>
          <span className="text-2xl font-semibold">{listing.price}</span>
        </div>

        <p className="text-gray-700">{listing.location}</p>

        <div className="flex flex-wrap gap-6 text-gray-600">
          <span>🛏 {listing.bedrooms} Bedrooms</span>
          <span>🛁 {listing.bathrooms} Bathrooms</span>
          <span>📏 {listing.sqm} m²</span>
          <span>🌿 Balcony: {listing.balcony ? "Yes" : "No"}</span>
          <span>❄️ AC: {listing.ac ? "Yes" : "No"}</span>
          <span>🚗 Parking: {listing.parking ? "Yes" : "No"}</span>
          <span>🛡 Mamad: {listing.mamad ? "Yes" : "No"}</span>
        </div>

        <div className="text-gray-800 text-lg mt-4">{listing.description}</div>

        {/* Reserved map area */}
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          Map will go here
        </div>

        <Button>Contact Owner</Button>
      </div>
    </div>
  );
}
