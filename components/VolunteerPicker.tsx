import { FlatList, Modal, Pressable, Text, View } from "react-native";

import { Volunteer } from "@/types";

export default function VolunteerPicker(
    {
        modalVisible,
        setModalVisible,
        assignVolunteerToJob,
        volunteers
    }: {
        modalVisible: boolean,
        setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
        assignVolunteerToJob: (userId: string | null) => void,
        volunteers: Volunteer[]
    }) {

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    console.debug('onRequestClose in VolunteerPicker triggered');
                    assignVolunteerToJob(null);
                    setModalVisible(false);
                }}>
                <View>
                    <Text>Select a volunteer</Text>
                    <FlatList
                        data={volunteers}
                        renderItem={({ item }) =>
                            <Pressable
                                onPress={() => {
                                    assignVolunteerToJob(item.id);
                                    setModalVisible(false);
                                }}>
                                <Text>{item.display_name}</Text>
                            </Pressable>
                        }>
                    </FlatList>
                </View>
            </Modal>
        </View>
    );
}