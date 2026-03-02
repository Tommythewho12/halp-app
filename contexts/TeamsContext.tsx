import React, { createContext, useContext, useState, useEffect } from 'react';

import http from '@/services/http-common';
import { ManagedTeam, Team, TeamDto } from '@/types';

type TeamsContextType = {
    teams: Team[];
    fetchTeams: () => Promise<void>;
    addManagedTeam: (team: Team) => void;
    deleteManagedTeam: (teamId: string) => void;
};

const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

export const TeamsProvider = ({ children }: { children: React.ReactNode }) => {
    const [teams, setTeams] = useState<Team[]>([]);

    const fetchTeams = async () => {
        try {
            const response = await http.get<TeamDto[]>("auth/teams");
            const convertedTeams: Team[] = response.data.map(team => ({
                id: team.id,
                name: team.name,
                isSubscribed: team.is_subscribed,
                isAdmin: team.is_admin
            }));
            setTeams(convertedTeams);
        } catch (e) {
            console.error("Failed to fetch teams:", e);
        }
    };

    const addManagedTeam = (team: Team) => {
        setTeams((prev) => [...prev, team]);
    };

    const deleteManagedTeam = (teamId: string) => {
        setTeams((prev) => prev.filter(t => t.id !== teamId));
    };

    // fetch teams initially
    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <TeamsContext.Provider value={{ teams, fetchTeams, addManagedTeam, deleteManagedTeam }}>
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
