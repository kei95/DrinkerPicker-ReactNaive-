import React from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback, Image, TextInput, Picker, Button } from 'react-native'
import FadeInView from '../component/Aminations/FadeInView'
import CustomScreen from './CustomScreen';
class GameEndScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            winnerName: '',
            isResult: false,
            isGameDone: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isResult: true });
        }, 2500)
    }

    pressedScreen() {
        if(this.state.isResult){
            this.setState({isGameDone: true})
        }
    }

    render() {
        if(this.state.isGameDone){
            return(
                <View style={{flex: 1}}>
                    <CustomScreen />
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => this.pressedScreen()}>
                <View style={styles.inner}>
                <View style={styles.top}>
                    <Text style={styles.text}>Loser is...</Text>
                </View>
                <View style={styles.textWrapper}>
                {this.state.isResult ? 
                    <FadeInView>
                        <Text style={styles.loserName}>{this.props.loser}</Text>
                    </FadeInView> : null}
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
} export default GameEndScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    inner: {
        flex: 1,
        alignItems: 'center',
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    top: {
        marginTop: 110,
        marginBottom: 0,
        top: 0,
        position: 'absolute'
    },
    text: {
        alignItems: 'center',
        fontSize: 30,
        color: '#008f68',
    },
    loserName: {
        
        width: '100%',
        fontSize: 80,
        textAlign: 'center',
        color: '#008f68',
    }
})