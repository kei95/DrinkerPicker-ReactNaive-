import React from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Audio } from 'expo-av';
import FadeInView from '../component/Aminations/FadeInView'
import CustomScreen from './CustomScreen';
import partyBlowers from '../component/Sounds/partyBlowers.wav';
import partyBlowerBoomer from '../component/Sounds/partyBlowerBoomer.wav'

class GameEndScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            winnerName: '',
            isResult: false,
            isBoomerDone: false,
            isGameDone: false,
            isSoundOn: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isResult: true });
            setTimeout(() => {
                this.playBoomer()
            }, 500)
        }, 3500)
    }

    async playBoomer() {
        const { sound } = await Audio.Sound.createAsync(
            partyBlowerBoomer,
            {
                shouldPlay: true,
                isLooping: false,
            },
        );
        this.setState({isSoundOn: true})
        this.sound = sound;
        this.playBlower()
    }

    async playBlower() {
        const { sound } = await Audio.Sound.createAsync(
            partyBlowers,
            {
                shouldPlay: true,
                isLooping: false,
            },
        );
        this.sound = sound;
    }

    pressedScreen() {
        if(this.state.isResult){
            this.setState({isGameDone: true})
        }
        if(this.state.isSoundOn){
            this.sound.stopAsync();
        }
    }

    render() {
        if(this.state.isGameDone){
            return(
                <View style={{flex: 1}}>
                    <CustomScreen navigation={this.props.navigation} />
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