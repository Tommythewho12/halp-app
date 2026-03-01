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
        marginBottom: 10,
    },

    h2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
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
});

export default globalStyles;