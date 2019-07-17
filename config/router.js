import StartScreen from '../screen/StartScreen'
import { createStackNavigator } from 'react-navigation'; 
import CustomScreen from '../screen/CustomScreen'
import PlayerScreen from '../screen/PlayerScreen'
import GameEndScreen from '../screen/GameEndScreen'


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
        GameEndScreen: {
            screen: GameEndScreen,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'StartScreen',
    }
);