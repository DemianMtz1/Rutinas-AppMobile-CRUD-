import React from 'react';
import {
    Alert,
    Image,
    StyleSheet,
    View,
} from 'react-native';

import {
    Button,
    Card,
    FAB,
    Headline,
    Title,
    Paragraph,
} from 'react-native-paper';
import { globalStyles } from '../assets/styles/global';
import axios from 'axios';

export const DetallesRutina = ({ navigation, route }) => {
    const {
        id,
        tituloEx,
        repeticionesEx,
        seriesEx,
        descripcionEx,
    } = route.params.item;

    const { setConsultarGet, item } = route.params;
    const handleDeleteRutina = async () => {

        // borrando de la bd la rutina
        const url = `http://YourAPIRoute:3000/rutinas/${id}`;
        await axios.delete(url);

        // setteando la consulta de la bd
        setConsultarGet(true);

        // redireccionando a inicio
        navigation.navigate('Inicio');
    }

    const showAlert = () => {
        Alert.alert(
            'Estas seguro de eliminar la rutina?',
            'Una vez eliminada sera imposible de recuperar...',
            [
                {
                    text: 'Entiendo, eliminar.',
                    onPress: () => handleDeleteRutina()
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    }
    return (
        <View style={globalStyles.container}>
            <Image
                source={require('../assets/img/gym-blackboard.png')}
                style={globalStyles.header}
            />

            <Card>
                <Headline style={globalStyles.title}>Detalles de la rutina</Headline>
                <Card.Content>
                    <Title>Titulo: <Title style={styles.title}>{tituloEx}</Title></Title>
                    <Paragraph style={styles.label}>Descripcion del ejercicio: <Paragraph style={styles.response}>{descripcionEx}</Paragraph></Paragraph>
                    <Paragraph style={styles.label}>Series: <Paragraph style={styles.response}>{seriesEx}</Paragraph></Paragraph>
                    <Paragraph style={styles.label}>Repeticiones: <Paragraph style={styles.response}>{repeticionesEx}</Paragraph></Paragraph>
                </Card.Content>
            </Card>

            <Button
                color="red"
                icon="cancel"
                mode="contained"
                style={styles.eliminarBtn}
                onPress={() => showAlert()}
            >
                Eliminar Rutina
            </Button>

            <FAB
                icon='pencil'
                style={globalStyles.fab}
                onPress={() => navigation.navigate('RutinasForm', { setConsultarGet, item })}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        marginTop: 20
    },
    response: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 16
    },
    title: {
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    eliminarBtn: {
        marginTop: 40
    }
})
