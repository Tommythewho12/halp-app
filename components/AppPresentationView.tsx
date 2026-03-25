import { Image } from "react-native";

export default function AppPresentationView() {

    return <Image
        source={require('@/assets/images/halp.png')}
        style={{
            height: undefined,
            width: '100%',
            aspectRatio: 1,
            resizeMode: 'contain',
        }} />;
}