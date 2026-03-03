import React, { createContext, useContext, useState, useEffect } from 'react';

import http from '@/services/http-common';
import { ManagedTeam, Team, TeamDto } from '@/types';
import { safeBooleanConverter } from '@/components/basic/Utils';

type TeamsContextType = {
    teams: Team[];
    fetchTeams: () => Promise<void>;
    addManagedTeam: (team: Team) => void;
    deleteManagedTeam: (teamId: number) => void;
    subscribeToTeam: (teamId: number) => void;
    unsubscribeFromTeam: (teamId: number) => void;
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
                isSubscribed: safeBooleanConverter(team.is_subscribed),
                isAdmin: safeBooleanConverter(team.is_admin)
            }));
            setTeams(convertedTeams);
        } catch (e) {
            console.error("Failed to fetch teams:", e);
        }
    };

    const addManagedTeam = (team: Team) => {
        // TODO add HTML-Request
        setTeams((prev) => [...prev, team]);
    };

    const deleteManagedTeam = (teamId: number) => {
        // TODO add HTML-Request
        setTeams((prev) => prev.filter(t => t.id !== teamId));
    };

    const subscribeToTeam = (teamId: number) => {
        // TODO add HTML-Request
        const team = teams.find(t => t.id === teamId);
        if (team === undefined) {
            throw "trying to subscribe to team with unknown teamId";
        }
        setTeams((prev) => [...prev, { ...team, isSubscribed: true }]);
    };

    const unsubscribeFromTeam = (teamId: number) => {
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
        <TeamsContext.Provider value={{ teams, fetchTeams, addManagedTeam, deleteManagedTeam, subscribeToTeam, unsubscribeFromTeam }}>
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
