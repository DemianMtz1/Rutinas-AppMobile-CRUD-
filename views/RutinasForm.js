import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {
    Button,
    Dialog,
    Headline,
    TextInput,
    Paragraph,
    Portal,
} from 'react-native-paper';
import { globalStyles } from '../assets/styles/global';
import axios from 'axios';


export const RutinasForm = ({ navigation, route }) => {

    // Formulario rutinas 
    const [tituloEx, setTituloEx] = useState('');
    const [descripcionEx, setDescripcionEx] = useState('');
    const [seriesEx, setSeriesEx] = useState('');
    const [repeticionesEx, setRepeticionesEx] = useState('');

    // Alerta
    const [showAlert, setShowAlert] = useState(false);
    const { setConsultarGet } = route.params;

    useEffect(() => {
        if (route.params.item) {
            const {
                tituloEx,
                descripcionEx,
                seriesEx,
                repeticionesEx,
                
            } = route.params.item;
            setTituloEx(tituloEx);
            setDescripcionEx(descripcionEx);
            setSeriesEx(seriesEx);
            setRepeticionesEx(repeticionesEx);
        }
    }, []);

    const submitFormRutina = async () => {
        // validar form
        if (tituloEx.trim() === '' ||
            descripcionEx.trim() === '' ||
            seriesEx.trim() === '' ||
            repeticionesEx.trim() === '') {
            setShowAlert(true);
            return;
        }

        // crear nueva rutina
        const newRutina = {
            tituloEx,
            descripcionEx,
            seriesEx,
            repeticionesEx
        };
        // mandarla al api
        
        if (route.params.item) {
            const { id } = route.params.item;
            const url = `http://YourAPIRoute:3000/rutinas/${id}`;
            await axios.put(url, newRutina);
        } else {
            const url = 'http://YourAPIRoute:3000/rutinas';
            await axios.post(url, newRutina);
        }

        // formatear formulario
        setTituloEx('');
        setDescripcionEx('');
        setSeriesEx('');
        setRepeticionesEx('');
        setConsultarGet(true);

        // redireccionar a inicio
        navigation.navigate('Inicio');

    }
    return (
        <View style={globalStyles.container}>
            <Headline style={globalStyles.title}>Agregar Rutinas</Headline>

            <View style={styles.inputGroup}>
                <TextInput

                    label="Nombre ejercicio"
                    placeholder="Press banca..."
                    style={styles.inputStyles}
                    underlineColor="#5a6470"
                    underlineColorAndroid="#5a6470"
                    onChangeText={text => setTituloEx(text)}
                    value={tituloEx}
                />
                <TextInput
                    label="Descripcion del ejercicio"
                    placeholder="Ejercicio para la parte superior del pecho..."
                    multiline={true}
                    style={styles.inputStyles}
                    underlineColor="#5a6470"
                    underlineColorAndroid="#5a6470"
                    onChangeText={text => setDescripcionEx(text)}
                    value={descripcionEx}
                />
                <TextInput
                    label="Series"
                    placeholder="4 Series..."
                    style={styles.inputStyles}
                    underlineColor="#5a6470"
                    underlineColorAndroid="#5a6470"
                    onChangeText={text => setSeriesEx(text)}
                    value={seriesEx}

                />
                <TextInput
                    label="Repeticiones"
                    placeholder="5 repeticiones..."
                    style={styles.inputStyles}
                    underlineColor="#5a6470"
                    underlineColorAndroid="#5a6470"
                    onChangeText={text => setRepeticionesEx(text)}
                    value={repeticionesEx}
                />
            </View>

            <Button
                color='#333d53'
                icon={route.params.item ? "pencil": "plus-circle" }
                onPress={() => submitFormRutina()}
                mode="contained"
            >
                { route.params.item ? "Actualizar rutina": "Agregar Rutina"}
            </Button>

            <Portal>
                <Dialog visible={showAlert} onDismiss={() => setShowAlert(false)}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Favor de rellenar todos los campos.</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setShowAlert(false)} >Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </View>
    )
}

const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 50
    },
    inputStyles: {
        marginBottom: 30,
        backgroundColor: 'transparent',
    }
})
