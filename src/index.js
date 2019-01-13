import React from 'react';
import Routes from './routes';
import './config/StatusBarConfig';

// Arrow function
const App = () => <Routes />; 
// essa linha acima é igual isso abaixo
/* 
class App extends Component {
    render() {
        return <Routes />
    }
}
*/

export default App;