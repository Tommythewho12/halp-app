import { FlatList, Modal, Pressable, Text, View, Button } from "react-native";

import globalStyles from "@/assets/styles";
import { H1 } from "./basic/Containers";
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
        assignVolunteerToJob: (newUserId: string | null) => void,
        volunteers: Volunteer[]
    }) {

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <View style={{ alignItems: 'center', rowGap: 10 }}>
                    <H1 style={globalStyles.h1}>Select a volunteer</H1>
                    <Button
                        title='unassign'
                        onPress={() => {
                            assignVolunteerToJob(null);
                            setModalVisible(false);
                        }} />
                    <FlatList
                        data={volunteers}
                        renderItem={({ item }) =>
                            <Button title={item.displayName} onPress={() => {
                                assignVolunteerToJob(item.id);
                                setModalVisible(false);
                            }} />
                        }>
                    </FlatList>
                </View>
            </Modal>
        </View>
    );
}