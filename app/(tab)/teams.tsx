import TeamsListViewer from '@/components/TeamsListViewer';
import { Text, View } from 'react-native';

export default function Teams() {
  const staticTeams = [
    { name: 'PTSV H3' },
    { name: 'PTSV H4' },
    { name: 'PTSV D1' },
  ]

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        Teams
      </Text>
      <TeamsListViewer teams={staticTeams} />
    </View>
  );
}
