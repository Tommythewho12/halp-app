import React, { createContext, useContext, useState, useEffect } from 'react';
import http from '@/services/http-common';

import { Team, TeamDto } from '@/types';
import { safeBooleanConverter } from '@/components/basic/Utils';

type TeamsContextType = {
    teams: Team[];
    fetchTeams: () => Promise<void>;
    newManagedTeam: (name: string) => Promise<void>;
    deleteManagedTeam: (teamId: string) => Promise<void>;
    subscribeToTeam: (teamId: string) => Promise<void>;
    unsubscribeFromTeam: (teamId: string) => Promise<void>;
};

const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

export const TeamsProvider = ({ children }: { children: React.ReactNode }) => {
    const [teams, setTeams] = useState<Team[]>([]);

    const fetchTeams = async () => {
        try {
            const response = await http.get<TeamDto[]>("auth/teams");
            const convertedTeams: Team[] = response.data.map(team => ({
                id: String(team.id),
                name: team.name,
                isSubscribed: safeBooleanConverter(team.is_subscribed),
                isAdmin: safeBooleanConverter(team.is_admin)
            }));
            setTeams(convertedTeams);
        } catch (e) {
            console.error("Failed to fetch teams:", e);
        }
    };

    const newManagedTeam = async (name: string) => {
        try {
            const response = await http.post(`auth/teams`, { teamName: name });
            setTeams([...teams, {
                id: response.data.id,
                name: name,
                isAdmin: true,
                isSubscribed: false
            }]);
        } catch (e) {
            console.error(e);
        }
    };

    const deleteManagedTeam = async (teamId: string) => {
        // TODO add HTML-Request
        setTeams((prev) => prev.filter(t => t.id !== teamId));
    };

    const subscribeToTeam = async (teamId: string) => {
        // TODO add HTML-Request

        setTeams(prev => prev.map(t => t.id === teamId ? t : { ...t, isSubscribed: true }));
    };

    const unsubscribeFromTeam = async (teamId: string) => {
        // TODO add HTML-Request
        const team = teams.find(t => t.id === teamId);
        if (team !== undefined) {
            setTeams((prev) => [...prev, { ...team, isSubscribed: false }]);
        }
    };

    // fetch teams initially
    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <TeamsContext.Provider value={{ teams, fetchTeams, newManagedTeam: newManagedTeam, deleteManagedTeam, subscribeToTeam, unsubscribeFromTeam }}>
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
