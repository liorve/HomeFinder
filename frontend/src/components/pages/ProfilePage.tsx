
import { useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { userAtom, tokenAtom } from "../../lib/atoms";
import { API_URL } from "../../lib/config";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ProfilePage() {
    const [user, setUser] = useAtom(userAtom);
    const [token] = useAtom(tokenAtom);
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState(user?.full_name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    if (!user) {
        return <div className="p-8 text-center">Please logging in to view this page.</div>;
    }

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch(`${API_URL}/users/me`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    full_name: fullName,
                    email: email
                    // Password update can be added here later
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            setIsEditing(false);
            setMessage({ type: 'success', text: "Profile updated successfully!" });
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: "Failed to update profile. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                <Button onClick={() => navigate("/create-listing")}>
                    Create New Listing
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow p-6 max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    {!isEditing && (
                        <Button variant="ghost" onClick={() => setIsEditing(true)}>
                            Edit
                        </Button>
                    )}
                </div>

                {message && (
                    <div className={`p-4 rounded-md mb-4 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <Input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Your full name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                                type="email"
                            />
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <Button type="submit" disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => {
                                    setIsEditing(false);
                                    setFullName(user.full_name || "");
                                    setEmail(user.email);
                                    setMessage(null);
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Full Name</label>
                            <div className="mt-1 text-gray-900">{user.full_name || "Not set"}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Email</label>
                            <div className="mt-1 text-gray-900">{user.email}</div>
                        </div>
                        <div className="pt-4 border-t border-gray-100">
                            <div className="text-sm text-gray-500">
                                User ID: {user.id}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
