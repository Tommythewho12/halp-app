import React, { createContext, useContext, useState, useEffect } from 'react';

import http from '@/services/http-common';
import { User, UserDto } from '@/types';

type UserContextType = {
    isLoading: boolean;
    user: User | undefined;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | undefined>(undefined);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await http.get<UserDto>("auth/user");
            setUser({
                id: String(response.data.id),
                name: response.data.display_name,
                email: response.data.email
            });
        } catch (e) {
            console.error("Failed to fetch user:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{
            isLoading: isLoading,
            user: user
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) {
        throw new Error("useUser must be used inside UserProvider");
    }
    return ctx;
};
