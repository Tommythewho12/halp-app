import React, { createContext, useContext, useState, useEffect } from 'react';
import http from '@/services/http-common';

import { Team, TeamDto } from '@/types';
import { is2XXStatus, safeBooleanConverter } from '@/utils/Utils';
import { router } from 'expo-router';
import { useUser } from './UserContext';

type TeamsContextType = {
    isLoading: boolean;
    teams: Team[];
    fetchTeams: () => Promise<void>;
    addManagedTeam: (name: string) => Promise<string>;
    deleteManagedTeam: (teamId: string) => Promise<void>;
    subscribeToTeam: (teamId: string) => Promise<boolean>;
    unsubscribeFromTeam: (teamId: string) => Promise<boolean>;
    getTeamName: (teamId: string) => string;
};

const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

export const TeamsProvider = ({ children }: { children: React.ReactNode }) => {
    const userContext = useUser();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [teams, setTeams] = useState<Team[]>([]);

    const fetchTeams = async () => {
        setLoading(true);
        try {
            const response = await http.get<TeamDto[]>('auth/teams');
            const convertedTeams: Team[] = response.data.map(team => ({
                id: String(team.id),
                name: team.name,
                isSubscribed: safeBooleanConverter(team.isSubscribed),
                isAdmin: safeBooleanConverter(team.isAdmin)
            }));
            setTeams(convertedTeams);
        } catch (e) {
            console.error('Failed to fetch teams:', e);
        } finally {
            setLoading(false);
        }
    };

    const addManagedTeam = async (name: string): Promise<string> => {
        try {
            // TODO add DTO
            const response = await http.post(`auth/teams`, { teamName: name });
            setTeams(prev => [...prev, {
                id: response.data.id,
                name: name,
                isAdmin: true,
                isSubscribed: false
            }]);
            return String(response.data.id);
        } catch (e) {
            console.error(e);
            return '';
        }
    };

    const deleteManagedTeam = async (teamId: string) => {
        try {
            const response = await http.delete(`auth/teams/${teamId}`);
            if (is2XXStatus(response.status)) {
                setTeams((prev) => prev.filter(t => t.id !== teamId));
                router.back();
            } else {
                console.error('deletion failed: ', response.data);
            }
        } catch (e) {
            console.error(e);
        }
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

    // TODO Check why this is called twice
    const getTeamName = (teamId: string) => {
        if (teams.length == 0) return 'unknown';
        const r = teams.find(t => t.id == teamId);
        if (r != undefined) {
            return r.name;
        }
        console.error('unable to find team with id: ', teamId);
        return 'unknown';
    };

    // fetch teams initially
    useEffect(() => {
        if (!userContext || userContext.isLoading) {
            return;
        }

        fetchTeams();
    }, [userContext.isLoading]);

    return (
        <TeamsContext.Provider value={{
            isLoading,
            teams,
            fetchTeams,
            addManagedTeam,
            deleteManagedTeam,
            subscribeToTeam,
            unsubscribeFromTeam,
            getTeamName
        }}>
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
