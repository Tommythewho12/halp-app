import { FlatList, Modal, Pressable, Text, View, Button } from "react-native";

import globalStyles from "@/assets/styles";
import { H1, MyText } from "./basic/Containers";
import { Volunteer } from "@/types";
import { red } from "react-native-reanimated/lib/typescript/Colors";

export default function VolunteerPicker(
    {
        modalVisible,
        setModalVisible,
        assignVolunteerToJob,
        volunteers
    }: {
        modalVisible: boolean,
        setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
        assignVolunteerToJob: (userId: string | undefined) => void,
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
                            assignVolunteerToJob(undefined);
                            setModalVisible(false);
                        }} />
                    <FlatList
                        style={{ backgroundColor: 'yellow' }}
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

/*
                            <Pressable
                                style={{ backgroundColor: 'blue', width: 'auto' }}
                                onPress={() => {
                                    assignVolunteerToJob(item.id);
                                    setModalVisible(false);
                                }}>
                                <View>
                                    <MyText style={[globalStyles.h1, { backgroundColor: 'red', width: 'auto' }]}>{item.display_name}</MyText>
                                </View>
                            </Pressable>
                            */