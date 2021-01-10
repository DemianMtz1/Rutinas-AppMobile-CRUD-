import {
    StyleSheet,
} from 'react-native';

export const globalStyles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: '2.5%',
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    header: {
        marginBottom: 20,
        width: '100%',
        height: 200,
        overflow: 'hidden',
    },
    opcionesWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100,

    },
    fab:{
        backgroundColor: '#333d53',
        bottom: 20,
        position: 'absolute',
        margin: 20,
        right: 0,
    }
})