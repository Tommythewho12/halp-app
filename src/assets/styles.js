import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },

    h1: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
    },

    h2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 11,
        marginBottom: 8,
    },

    h3: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 3,
    },

    baseText: {
        fontSize: 18,
        color: '#333',
    },

    card: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },

    pressableListItem: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#ddd',
        borderRadius: 8,
        elevation: 2,
    },

    pressableListItem_pressed: {
        backgroundColor: '#fff',
    },

    pressableButton: {
        padding: 14,
        marginVertical: 8,
        backgroundColor: '#4f46e5',
        borderRadius: 10,
        elevation: 2,
        alignItems: 'center',
    },

    pressableButton_pressed: {
        backgroundColor: '#fff',
    },

    pressableButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },

    pressableButtonInverted: {
        padding: 14,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
        alignItems: 'center',
    },

    pressableButtonInverted_pressed: {
        backgroundColor: '#cbc9e7',
    },

    pressableButtonInvertedText: {
        color: '#4f46e5',
        fontSize: 18,
        fontWeight: '500',
    },
});

export default globalStyles;