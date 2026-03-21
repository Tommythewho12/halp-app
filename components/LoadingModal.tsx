import { Modal, View, Image } from "react-native";

import { MyText } from "./basic/Containers";

export function LoadingModal() {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={true}>
            <View style={{ height: '100%', backgroundColor: 'black', opacity: 0.5 }} />
            <View style={{ position: 'absolute', height: '100%', justifyContent: 'center' }}>
                <View style={{
                    margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    paddingVertical: 15,
                    paddingHorizontal: 35,
                    alignItems: 'center',
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5
                }}>
                    <Image
                        source={require('@/assets/icons/noun-hourglass-922712.svg')} />
                    <MyText style={{ margin: 20 }}>Loading ...</MyText>
                </View>
            </View>
        </Modal>
    )
};