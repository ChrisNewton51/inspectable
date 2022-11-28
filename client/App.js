import React from 'react';
import { AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
    // Fonts //
    let [fontsLoaded] = useFonts({
        sfprodisplay: require('./assets/fonts/SFPro-Regular.ttf'),
        roboto: require('./assets/fonts/Roboto-Regular.ttf'),
        merriweather: require('./assets/fonts/Merriweather-Regular.ttf'),
        opensans: require('./assets/fonts/OpenSans-Regular.ttf'),
        poppins: require('./assets/fonts/Poppins-Regular.ttf'),
        raleway: require('./assets/fonts/Raleway-Regular.ttf'),
        futura: require('./assets/fonts/Futura.ttf'),
        oswald: require('./assets/fonts/Oswald-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
}
registerRootComponent(App);