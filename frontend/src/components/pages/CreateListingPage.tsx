
import { useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { tokenAtom } from "../../lib/atoms";
import { API_URL } from "../../lib/config";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
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

function MapUpdater({ center }: { center: [number, number] }) {
    const map = useMap();
    map.setView(center, 15);
    return null;
}

export default function CreateListingPage() {

    const [token] = useAtom(tokenAtom);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        price: "",
        type: "rent",
        rooms: "",
        sqm: "",
        lat: "32.0853",
        lng: "34.7818",
        ac: false,
        mamad: false,
        parking: false,
        balcony: false,
        furnished: false,
    });

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
    const [uploadingImages, setUploadingImages] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (name: string, checked: boolean | "indeterminate") => {
        setFormData(prev => ({ ...prev, [name]: checked === true }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleUploadImages = async () => {
        if (selectedFiles.length === 0) return;

        setUploadingImages(true);
        try {
            const formData = new FormData();
            selectedFiles.forEach(file => {
                formData.append('files', file);
            });

            const response = await fetch(`${API_URL}/upload/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload images');
            }

            const urls = await response.json();
            // Prepend API_URL to make them full URLs
            const fullUrls = urls.map((url: string) => `${API_URL.replace('/api/v1', '')}${url}`);
            setUploadedImageUrls(fullUrls);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setUploadingImages(false);
        }
    };

    const geocodeAddress = async () => {
        if (!formData.location || formData.location.length < 3) return;

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(formData.location)}&format=json&limit=1`);
            const data = await response.json();

            if (data && data.length > 0) {
                setFormData(prev => ({
                    ...prev,
                    lat: data[0].lat,
                    lng: data[0].lon
                }));
            }
        } catch (error) {
            console.error("Geocoding failed:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Convert numeric strings to numbers
            const payload = {
                ...formData,
                price: parseInt(formData.price) || 0,
                rooms: parseInt(formData.rooms) || 0,
                sqm: parseInt(formData.sqm) || 0,
                lat: parseFloat(formData.lat) || 0,
                lng: parseFloat(formData.lng) || 0,
                images: uploadedImageUrls,
            };

            const response = await fetch(`${API_URL}/listings/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail || "Failed to create listing");
            }

            // Success
            navigate("/listings");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Listing</h1>

            {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-1">Title</label>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Spacious 2BR in Florentin"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Price (₪)</label>
                        <Input
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="e.g. 6000"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
                        >
                            <option value="rent">For Rent</option>
                            <option value="sale">For Sale</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-1">Location (Address)</label>
                        <Input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            onBlur={geocodeAddress}
                            placeholder="e.g. Herzl 12, Tel Aviv"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Coordinates will be fetched automatically when you leave this field.
                        </p>
                    </div>

                    <div className="md:col-span-2 grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Lat</label>
                            <Input name="lat" value={formData.lat} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Lng</label>
                            <Input name="lng" value={formData.lng} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Map Preview */}
                    <div className="md:col-span-2 h-64 w-full rounded-md overflow-hidden border border-gray-200 mt-2">
                        <MapContainer
                            center={[parseFloat(formData.lat) || 32.0853, parseFloat(formData.lng) || 34.7818]}
                            zoom={13}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[parseFloat(formData.lat) || 32.0853, parseFloat(formData.lng) || 34.7818]} />
                            <MapUpdater center={[parseFloat(formData.lat) || 32.0853, parseFloat(formData.lng) || 34.7818]} />
                        </MapContainer>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Rooms</label>
                        <Input
                            name="rooms"
                            type="number"
                            value={formData.rooms}
                            onChange={handleChange}
                            placeholder="e.g. 3"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Size (sqm)</label>
                        <Input
                            name="sqm"
                            type="number"
                            value={formData.sqm}
                            onChange={handleChange}
                            placeholder="e.g. 85"
                            required
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tell us more about the property..."
                    />
                </div>

                {/* Images */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Images</label>
                    <div className="space-y-3">
                        <Input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="cursor-pointer"
                        />
                        {selectedFiles.length > 0 && (
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-gray-600">
                                    {selectedFiles.length} file(s) selected
                                </p>
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={handleUploadImages}
                                    disabled={uploadingImages}
                                >
                                    {uploadingImages ? "Uploading..." : "Upload Images"}
                                </Button>
                            </div>
                        )}
                        {uploadedImageUrls.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-green-600">
                                    ✓ {uploadedImageUrls.length} image(s) uploaded successfully
                                </p>
                                <div className="grid grid-cols-4 gap-2">
                                    {uploadedImageUrls.map((url, idx) => (
                                        <img
                                            key={idx}
                                            src={url}
                                            alt={`Preview ${idx + 1}`}
                                            className="w-full h-20 object-cover rounded border"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Amenities */}
                <div>
                    <label className="block text-gray-700 font-medium mb-3">Amenities</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { id: 'ac', label: 'Air Conditioning' },
                            { id: 'mamad', label: 'Mamad (Safe Room)' },
                            { id: 'parking', label: 'Parking' },
                            { id: 'balcony', label: 'Balcony' },
                            { id: 'furnished', label: 'Furnished' },
                        ].map((item) => (
                            <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={item.id}
                                    checked={formData[item.id as keyof typeof formData] as boolean}
                                    onCheckedChange={(checked) => handleCheckboxChange(item.id, checked)}
                                />
                                <label htmlFor={item.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {item.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Listing"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
