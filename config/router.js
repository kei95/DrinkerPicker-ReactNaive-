import StartScreen from '../screen/StartScreen'
import { createStackNavigator } from 'react-navigation'; 
import CustomScreen from '../screen/CustomScreen'
import PlayerScreen from '../screen/PlayerScreen'
import ExplainScreen from '../screen/ExplainScreen';


export default Navigator = createStackNavigator(
    {
        StartScreen: { 
            screen: StartScreen,
            navigationOptions: {
                header: null
            }
        },
        CustomScreen: {
            screen: CustomScreen,
            navigationOptions: {
                header: null
            }
        },
        PlayerScreen: {
            screen: PlayerScreen,
            navigationOptions: {
                header: null
            }
        },
        ExplainScreen: {
            screen: ExplainScreen,
            navigationOptions: {
                title: 'Rule',
            }
        }
    },
    {
        initialRouteName: 'StartScreen',
    }
);