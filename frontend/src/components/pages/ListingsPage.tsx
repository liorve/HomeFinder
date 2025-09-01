// src/pages/ListingsPage.tsx
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

const sampleListings = [
  { id: 1, title: "Cozy Apartment", location: "Tel Aviv", price: "$1200/mo" },
  { id: 2, title: "Modern Loft", location: "Jerusalem", price: "$1500/mo" },
  { id: 3, title: "Beach House", location: "Haifa", price: "$2000/mo" },
];

export default function ListingsPage() {
  return (
    <div className="space-y-12">

      {/* Hero Section */}
      <section className="bg-gray-100 rounded-lg p-8 text-center flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Find Your Perfect Home</h1>
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
        </div>
      </section>

      {/* Listings Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Listings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleListings.map((listing) => (
            <Card key={listing.id}>
              <CardHeader>
                <CardTitle>{listing.title}</CardTitle>
                <CardDescription>{listing.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-900 font-bold">{listing.price}</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="default">View</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
