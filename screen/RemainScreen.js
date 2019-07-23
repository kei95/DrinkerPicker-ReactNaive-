import React from 'react';
import { Audio } from 'expo-av';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import SoundEF from '../component/Sounds/ResultSound.wav';
import FadeInView from '../component/Aminations/FadeInView';
import PlayerScreen from '../screen/PlayerScreen'

class RemainScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            toNextScreen: false,
            isNotFirstTurn: false,
            isTouchable: false
        }
    }

    componentDidMount() {
        this.playResultSound();
        setTimeout(() => {
            this.setState({isTouchable: true})
        }, 3000)
    }

    async playResultSound() {
        const { sound } = await Audio.Sound.createAsync(
            SoundEF,
            {
                shouldPlay: true,
                isLooping: false,
            },
            this._updateScreenForSoundStatus,
        );
        this.sound = sound;
    }

    screenPressed() {
        this.setState({ toNextScreen: true, isNotFirstTurn: true })
    }

    render() {
        if (!this.state.toNextScreen) {
            return (
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={ () => {this.state.isTouchable ? this.screenPressed(): null}}>
                        <View style={styles.inner}>
                        <View style={styles.top}>
                            <Text style={styles.textRemain}>Players left are</Text>
                        </View>
                        <FadeInView>
                            <View style={{ top: 50 }}>
                                <Text style={styles.remainNum}>{this.props.playersLeft}</Text>
                            </View>
                        </FadeInView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );
        } else {
            return (
                <View style={styles.nextWrapper}>
                    <PlayerScreen staticPlayers={this.props.staticPlayers} navigation={this.props.navigation} answer={this.props.answer} initialPlayer={this.props.players[0].name} isNotFirstTurn={this.state.isNotFirstTurn} players={this.props.players} numOfplayer={this.props.playersLeft}/>
                </View>);
        }
    }
}

export default RemainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    nextWrapper: {
        flex: 1,
    },
    inner: {
        flex: 1,
        alignItems: 'center',
    },
    top: {
        marginTop: 45,
        marginBottom: 0,
        top: 0,
    },
    textRemain: {
        fontSize: 30,
        color: '#008f68',
        textAlign: 'center',
    },
    remainNum: {
        width: '100%',
        fontSize: 200,
        textAlign: 'center',
        color: '#008f68',
    }
})