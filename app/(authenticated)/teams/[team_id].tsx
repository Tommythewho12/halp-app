import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import http from '@/services/http-common';
import TeamViewer from '@/components/TeamViewer';

export default function Team() {
    const { team_id } = useLocalSearchParams();
    const [team, setTeam] = useState({ id: team_id, name: '', admin_name: '', is_subscribed: false, isUserAdmin: false, subscribers: [] });

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
        if (team_id == null) {
            throw new Error("no team_id was provided for team view");
        }
        http.get(`auth/teams/${team_id}`)
            .then(response => {
                console.debug(`## GET /auth/teams/${team_id}`);
                setTeam(response.data);
            })
            .catch(e => { console.error(e) });

    }, [team_id]);

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