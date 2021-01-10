import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { Inicio } from './views/Inicio';
import { DetallesRutina } from './views/DetallesRutina';
import { RutinasForm } from './views/RutinasForm';

const Stack = createStackNavigator();
const App: () => React$Node = () => {
  //console.log(DefaultTheme);

  const theme = {
    ...DefaultTheme,
    ownColors:{
      primary: '#0d1424'
    }
  }

  const screenOptions = {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: theme.ownColors.primary
    },
    headerTitleStyle: {
      fontSize: 19,
      color: theme.colors.surface
    },
    headerTintColor: 'white'
  }
  return (
    <>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Inicio'
            screenOptions={screenOptions}
            
          >
            <Stack.Screen
              name='Inicio'
              component={Inicio}
              options={{title:''}}
            />

            <Stack.Screen
              name='DetallesRutina'
              component={DetallesRutina}
              options={{title:''}}
            />

            <Stack.Screen
              name='RutinasForm'
              component={RutinasForm}
              options={{title:''}}

            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default App;
