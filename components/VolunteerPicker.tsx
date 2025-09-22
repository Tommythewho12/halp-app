import { useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";

export default function VolunteerPicker({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: React.Dispatch<React.SetStateAction<boolean>> }) {

    const testList = ['Peter', 'Ralph'];

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View>
                    <Text>Select a volunteer</Text>
                    <FlatList
                        data={testList}
                        renderItem={({ item }) =>
                            <Pressable
                                onPress={() => setModalVisible(false)}>
                                <Text>{item}</Text>
                            </Pressable>
                        }>
                    </FlatList>
                </View>
            </Modal>
        </View>
    );
}