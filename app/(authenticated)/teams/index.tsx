import TeamsView from '@/components/TeamsView';
import { H2, TopView } from '@/components/basic/Containers';
import { useTeams } from '@/contexts/TeamsContext';

export default function TeamsController() {
    const { teams } = useTeams();

    return (
        <TopView>
            <H2>Gefolgte Teams</H2>
            <TeamsView teams={teams.filter(t => t.isSubscribed)} />
            <H2>Alle Teams</H2>
            <TeamsView teams={teams.filter(t => !t.isSubscribed)} />
        </TopView>
    );
}
