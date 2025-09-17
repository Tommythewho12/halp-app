import React, { createContext, useContext, useState, useEffect } from 'react';

import http from '@/http-common';
import { Team } from '@/types';

type TeamsContextType = {
    teams: Team[];
    fetchTeams: () => Promise<void>;
    addTeam: (team: Team) => void;
};

const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

export const TeamsProvider = ({ children }: { children: React.ReactNode }) => {
    const [teams, setTeams] = useState<Team[]>([]);

    const fetchTeams = async () => {
        try {
            const response = await http.get<Team[]>("auth/teams");
            setTeams(response.data);
        } catch (e) {
            console.error("Failed to fetch teams:", e);
        }
    };

    const addTeam = (team: Team) => {
        setTeams((prev) => [...prev, team]);
    };

    // fetch teams initially
    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <TeamsContext.Provider value={{ teams, fetchTeams, addTeam }}>
            {children}
        </TeamsContext.Provider>
    );
};

export const useTeams = () => {
    const ctx = useContext(TeamsContext);
    if (!ctx) {
        throw new Error("useTeams must be used inside TeamsProvider");
    }
    return ctx;
};
