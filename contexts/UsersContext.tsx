import React, { createContext, useContext, useState, useEffect } from 'react';

import http from '@/services/http-common';
import { UserDto } from '@/types';

type UserContextType = {
    id: string | undefined;
    name: string | undefined;
    email: string | undefined;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserContextType | undefined>(undefined);

    const fetchUser = async () => {
        try {
            const response = await http.get<UserDto>("auth/user");
            setUser({
                id: response.data.id,
                name: response.data.display_name,
                email: response.data.email
            });
        } catch (e) {
            console.error("Failed to fetch user:", e);
        }
    };

    // fetch teams initially
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ id: user?.id, name: user?.name, email: user?.email }}>
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
