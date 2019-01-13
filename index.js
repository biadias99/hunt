/** @format */

import {AppRegistry} from 'react-native'; // registra um componente para ser o arquivo inicial da aplicação
import App from './src'; // que nem App.vue
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
