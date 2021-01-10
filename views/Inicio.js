import React, { useEffect, useState } from 'react';
import {
    View,
    Image
} from 'react-native';
import {
    Avatar,
    Button,
    Card,
    FAB,
    List,
} from 'react-native-paper';
import { globalStyles } from '../assets/styles/global';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';

const LeftContent = props => <Avatar.Icon {...props} icon="dumbbell" style={{ backgroundColor: '#0d1424' }} />

export const Inicio = ({ navigation, route }) => {

    const [consultarGet, setConsultarGet] = useState(true);
    const [rutinas, setRutinas] = useState([]);

    useEffect(() => {

        const getRutinas = async () => {
            const url = 'http://YourAPIRoute:3000/rutinas';
            try {
                const response = await axios.get(url);
                const dataRutinas = response.data;
                setRutinas(dataRutinas);
                setConsultarGet(false);
            } catch (error) {
                console.log(error);
            }
        }
        getRutinas();
    }, [consultarGet]);

    return (
        <View style={globalStyles.container}>
            <Image
                source={require('../assets/img/gym-blackboard.jpg')}
                style={globalStyles.header}
            />
            <View style={globalStyles.opcionesWrapper}>
                <View style={{ width: '100%' }}>
                    <Button
                        color='#0d1424'
                        icon="plus-circle"
                        onPress={() => navigation.navigate('RutinasForm', { setConsultarGet })}

                    >
                        Agregar rutinas
                    </Button>
                </View>
            </View>

            <Card>
                <Card.Title
                    title={rutinas.length === 0 ? "Sin rutinas" : "Rutinas actuales"}
                    subtitle={rutinas.length === 0 ? "Agrega rutinas para visualizarlas" : "Presionalas para modificarlas"}
                    left={LeftContent}
                />
                <FlatList
                    data={rutinas}
                    keyExtractor={item => (item.id).toString() }
                    renderItem={({ item }) => (
                        <List.Item
                            title={item.tituloEx}
                            description={item.descripcionEx}
                            onPress={() => navigation.navigate('DetallesRutina', { item, setConsultarGet })}
                            style={{ borderBottomWidth: .1 }}
                        />)}
                />
            </Card>

            <FAB
                icon='plus'
                style={globalStyles.fab}
                onPress={()=>  navigation.navigate('RutinasForm', { setConsultarGet }) }
            />
        </View>
    )
}
