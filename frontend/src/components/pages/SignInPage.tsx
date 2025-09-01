// src/pages/SignInPage.tsx
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    alert("Sign in clicked! (mock)");
  };

  return (
    <div className="flex items-start pt-24 justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Sign In
        </h1>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <Checkbox id="remember" />
            <label htmlFor="remember" className="text-gray-700 ml-2">
              Remember me
            </label>
          </div>

          <Button type="submit" variant="default" className="w-full mt-4">
            Sign In
          </Button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
