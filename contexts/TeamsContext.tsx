import React, { createContext, useContext, useState, useEffect } from 'react';
import http from '@/services/http-common';

import { Team, TeamDto } from '@/types';
import { is2XXStatus, safeBooleanConverter } from '@/components/basic/Utils';

type TeamsContextType = {
    teams: Team[];
    fetchTeams: () => Promise<void>;
    newManagedTeam: (name: string) => Promise<void>;
    deleteManagedTeam: (teamId: string) => Promise<void>;
    subscribeToTeam: (teamId: string) => Promise<boolean>;
    unsubscribeFromTeam: (teamId: string) => Promise<boolean>;
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
        const response = await http.post(`auth/teams/${teamId}/subscribers`) // TODO create DTO
        if (is2XXStatus(response.status)) {
            setTeams(prev => prev.map(t => t.id === teamId ? { ...t, isSubscribed: true } : t));
            return true;
        }
        console.error('process failed with status: ', response.status);
        return false;
    };

    const unsubscribeFromTeam = async (teamId: string) => {
        const response = await http.delete(`auth/teams/${teamId}/subscribers`) // TODO create DTO
        if (is2XXStatus(response.status)) {
            setTeams(prev => prev.map(t => t.id === teamId ? { ...t, isSubscribed: false } : t));
            return true;
        }
        console.error('process failed with status: ', response.status);
        return false;
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
