import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import http from '@/services/http-common';
import TeamsListViewer from '@/components/TeamsListViewer';
import { TeamDto } from '@/types';
import { H1, H2, TopView } from '@/components/basic/Containers';
import { useTeams } from '@/contexts/TeamsContext';

export default function Teams() {
    const { fetchTeams, teams } = useTeams();

    useEffect(() => {
        // fetchTeams();
        console.info("what teams gives my team view: ", teams)
    }, []);

    return (
        <TopView>
            <H2>Gefolgte Teams</H2>
            <TeamsListViewer teams={teams.filter(t => t.isSubscribed)} />
            <H2>Alle Teams</H2>
            <TeamsListViewer teams={teams.filter(t => !t.isSubscribed)} />
        </TopView>
    );
}
