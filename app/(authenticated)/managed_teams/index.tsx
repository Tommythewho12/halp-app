import ManagedTeamsView from '@/components/ManagedTeamsView';
import { useTeams } from '@/contexts/TeamsContext';

export default function ManagedTeamsController() {
    const { teams } = useTeams();

    return (
        <ManagedTeamsView teams={teams.filter(t => t.isAdmin)} />
    );
}
