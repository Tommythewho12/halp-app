import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import http from '@/services/http-common';
import TeamViewer from '@/components/TeamViewer';

export default function Team() {
    const searchParams = useLocalSearchParams();
    const teamId = searchParams.team;
    const [team, setTeam] = useState({ id: teamId, name: '', admin_name: '', is_subscribed: false, isUserAdmin: false, subscribers: [] });

    const handleSubscribe = () => {
        http.post(`auth/teams/${team.id}/subscribers`)
            .then(response => {
                // TODO update subscription status
                // setTeam({ ...team, is_subscribed: true });
            })
            .catch(e => { console.error(e) });
    }

    const handleUnsubscribe = () => {
        http.delete(`auth/teams/${team.id}/subscribers`)
            .then(response => {
                // TODO update subscription status
                // setTeam({ ...team, is_subscribed: false });
            })
            .catch(e => { console.error(e) });
    }

    useEffect(() => {
        if (teamId == null) {
            throw new Error("no teamId was provided for team view");
        }
        http.get(`auth/teams/${teamId}`)
            .then(response => {
                console.debug(`## GET /auth/teams/${teamId}`);
                setTeam(response.data);
            })
            .catch(e => { console.error(e) });

    }, [teamId]);

    return (
        <TeamViewer
            id={team.id}
            name={team.name}
            isSubscribed={team.is_subscribed}
            isAdmin={team.isUserAdmin}
            handleSubscribe={handleSubscribe}
            handleUnsubscribe={handleUnsubscribe} />
    )
}