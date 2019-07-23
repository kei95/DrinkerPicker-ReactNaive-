import React from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback,TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av';
import FadeInView from '../component/Aminations/FadeInView'
import CustomScreen from './CustomScreen';
import partyBlowers from '../component/Sounds/partyBlowers.wav';
import partyBlowerBoomer from '../component/Sounds/partyBlowerBoomer.wav'
import PlayerScreen from './PlayerScreen';

class GameEndScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            winnerName: '',
            isResult: false,
            isBoomerDone: false,
            isGameDone: false,
            isSoundOn: false,
            isAgain: 0
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isResult: true });
            setTimeout(() => {
                this.playBoomer()
            }, 500)
        }, 3500)
        console.log(this.props.staticPlayers)
    }

    async playBoomer() {
        const { sound } = await Audio.Sound.createAsync(
            partyBlowerBoomer,
            {
                shouldPlay: true,
                isLooping: false,
            },
        );
        this.setState({ isSoundOn: true })
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
        if (this.state.isResult) {
            this.setState({ isGameDone: true })
        }
        if (this.state.isSoundOn) {
            this.sound.stopAsync();
        }
    }

    pressedYesBtn() {
        this.setState({isAgain: 1})
    }

    pressedNoBtn(){
        this.setState({isAgain: 2})
    }

    render() {

        if(this.state.isAgain == 2){
            return(
                <View style={{ flex: 1 }}>
                    <CustomScreen navigation={this.props.navigation} />
                </View>
            );
        } else if(this.state.isAgain == 1){
            return(
                <View style={{ flex: 1 }}>
                    <PlayerScreen isAfterGame={true} initialPlayer={this.props.staticPlayers[0].name} isNotFirstTurn={true} staticPlayers={this.props.staticPlayers} navigation={this.props.navigation} />
                </View>
            );
        }

        if (this.state.isGameDone) {
            return (
                <View style={styles.textWrapper}>

                    <Text style={styles.text}>Wanna play again?</Text>

                    <View style={styles.lines}>

                        <TouchableOpacity onPress={() => { this.pressedYesBtn() }} >
                            <View style={styles.borderLeft}>
                                <Text style={styles.addBtn}>Yes</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { this.pressedNoBtn() }} >
                            <View style={styles.borderRight}>
                                <Text style={styles.addBtn}>No</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            )
        }

        return (
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
    },
    borderLeft: {
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#008f68",
        borderRadius: 5
    },
    borderRight: {
        marginLeft: 10,
        borderWidth: 1,
        borderColor: "#008f68",
        borderRadius: 5
    },
    addBtn: {
        margin: 4,
        paddingHorizontal: 20,
        textAlign: "center",
        backgroundColor: "white",
        color: '#008f68',
        fontSize: 20
    },
    lines: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})