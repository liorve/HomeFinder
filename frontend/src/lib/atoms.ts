import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Types
export interface User {
    id: number;
    email: string;
    full_name?: string;
}

// Atoms
// Persist token in localStorage with key 'auth_token'
export const tokenAtom = atomWithStorage<string | null>("auth_token", null);

// In-memory user state
export const userAtom = atom<User | null>(null);

// Derived atom to check if authenticated
export const isAuthenticatedAtom = atom((get) => !!get(tokenAtom));
