import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('react-native-intl-phone-field-example', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('react-native-intl-phone-field-example', { rootTag });
}
