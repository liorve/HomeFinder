import { useEffect } from "react";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../../lib/atoms";
import { API_URL } from "../../lib/config";

export function AuthLoader({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useAtom(tokenAtom);
    const [user, setUser] = useAtom(userAtom);

    useEffect(() => {
        // If we have a token but no user, try to fetch the user
        if (token && !user) {
            fetch(`${API_URL}/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(async (res) => {
                    if (res.ok) {
                        const userData = await res.json();
                        setUser(userData);
                    } else {
                        // Token might be expired or invalid
                        console.warn("Token invalid or expired, clearing auth state");
                        setToken(null);
                        setUser(null);
                    }
                })
                .catch((err) => {
                    console.error("Error verifying credentials", err);
                });
        }
    }, [token, user, setUser, setToken]);

    return <>{children}</>;
}
