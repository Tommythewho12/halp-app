import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { useEffect, useState } from 'react';

import http from '@/services/http-common';
import TeamViewer from '@/components/TeamViewer';
import { Team } from '@/types';
import { useTeams } from '@/contexts/TeamsContext';
import { isNumber } from '@/components/basic/Utils';

export default function TeamView() {
    const { team_id } = useLocalSearchParams();
    const { teams } = useTeams();

    const team = teams.find(t => t.id === team_id);

    return (
        <>
            {team ? (
                <TeamViewer team={team} />
            ) : (
                <Text>object does not exist {team}</Text>
            )}
        </>
    )
}