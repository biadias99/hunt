// navegação por cliques em botões
import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from './pages/main';
import Product from './pages/product';

const AppNavigator = createStackNavigator({
    Home: {
      screen: Main,
    },
    Product: {
        screen: Product,
    },
  },{
      defaultNavigationOptions: {
          headerStyle: {
              backgroundColor: "#DA552F"
          },
          headerTintColor: "#FFF", // cor para os textos do header
      },
  });
  
export default createAppContainer(AppNavigator);