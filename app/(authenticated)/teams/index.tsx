import TeamsListViewer from '@/components/TeamsListViewer';
import { H2, TopView } from '@/components/basic/Containers';
import { useTeams } from '@/contexts/TeamsContext';

export default function Teams() {
    const { teams } = useTeams();

    return (
        <TopView>
            <H2>Gefolgte Teams</H2>
            <TeamsListViewer teams={teams.filter(t => t.isSubscribed)} />
            <H2>Alle Teams</H2>
            <TeamsListViewer teams={teams.filter(t => !t.isSubscribed)} />
        </TopView>
    );
}
