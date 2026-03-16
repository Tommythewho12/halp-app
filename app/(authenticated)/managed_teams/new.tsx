import { useRouter } from 'expo-router';

import { useTeams } from '@/contexts/TeamsContext';
import ManagedTeamCreateView from '@/components/ManagedTeamCreateView';

export default function NewManagedTeamController() {
    const router = useRouter();
    const { addManagedTeam } = useTeams();

    const handleCreateTeam = async (name: string) => {
        if (name) return;
        const response = await addManagedTeam(name);
        router.replace({ pathname: '/(authenticated)/managed_teams/[team_id]', params: { team_id: response } });
    }

    return <ManagedTeamCreateView handleCreateTeam={handleCreateTeam} />;
}