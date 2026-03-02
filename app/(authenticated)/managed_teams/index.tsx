import ManagedTeamsListViewer from '@/components/ManagedTeamsListViewer';
import { useTeams } from '@/contexts/TeamsContext';

export default function ManagedTeams() {
    const { teams } = useTeams();

    return (
        <ManagedTeamsListViewer teams={teams} />
    );
}
