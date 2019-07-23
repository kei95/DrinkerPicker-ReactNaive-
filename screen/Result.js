import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Audio } from 'expo-av';
import ResultRoll from '../component/Sounds/ResultRoll.wav';
import Crash from '../component/Sounds/Crash.wav';
import RemainScreen from './RemainScreen';

class Result extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isSoundOn: false,
            isRollOn: false,
            isCrashed: false,
            isResult: false,
            moveToRemain: false,
            isFirstToched: false,
            isTouchedResult: false,
            RemainScreen: false
        }
    }

    componentDidMount() {
        if (this.state.isRollOn == false) {
            this.playRoll();
        }
        setTimeout(() => {
            if (!this.state.isCrashed) {
                this.playCrash(),
                    this.setState({ isResult: true });
            }
        }, 3500)
        console.log(this.props.playersLeft)
    }

    async playRoll() {
        const { sound } = await Audio.Sound.createAsync(
            ResultRoll,
            {
                shouldPlay: true,
                isLooping: false,
            },
        );
        this.sound = sound;
        this.setState({ isRollOn: true });
    }

    async playCrash() {
        const { sound } = await Audio.Sound.createAsync(
            Crash,
            {
                shouldPlay: true,
                isLooping: false,
            },
        );
        this.sound = sound;
        this.setState({ isCrashed: true });
    }

    async _rollPauseRecording() {
        if (this.sound != null) {
            if (this.state.isRollOn == true) {
                await this.sound.pauseAsync();
                this.setState({ isRollOn: false })
            }
        }
    }

    onScreenToched() {
        if (!this.state.isCrashed) {
            this.sound.stopAsync();
            this.playCrash();
            this.setState({ isCrashed: true, isResult: true })
        }
    }

    onFirstToched() {
        this.setState({ isFirstToched: true });
    }

    onTouchedResult() {
        if (!this.state.moveToRemain) {
            this.setState({ isTouchedResult: true, moveToRemain: true });
        } else {
            this.setState({ RemainScreen: true });
        }
    }

    getGap() {
        if (this.props.gap < 0) {
            return "the answer was smaller than chosen"
        } else {
            return "the answer was greater than chosen"
        }
    }

    setOpacityTp(value) {
        this.refs[CHILD_REF].setNativeProps({
            opacity: value
        });
    }

    render() {
        if (this.state.RemainScreen) {
            return (
                <View style={styles.containerRemain}>
                    <RemainScreen staticPlayers={this.props.staticPlayers} navigation={this.props.navigation} answer={this.props.answer} players={this.props.players} playersLeft={this.props.playersLeft} />
                </View>);
        }
        if (this.state.isFirstToched) {
            return (
                <TouchableWithoutFeedback ref="touch" onPress={() => this.onTouchedResult()} style={styles.container} >
                    <View style={styles.container}>
                        <Text style={styles.text}>The number was: {this.props.winnersNum}</Text>
                        {this.state.isTouchedResult ?
                            <Text style={styles.text}>{this.getGap()}</Text> :
                            null
                        }
                    </View>
                </TouchableWithoutFeedback >
            );
        } else {
            return (
                <View style={styles.container}>
                    {!this.state.isResult ?
                        <TouchableWithoutFeedback ref="touch" onPress={() => this.onScreenToched()} style={styles.container}>
                            <View style={styles.container}>
                                <Text style={styles.text}>The closest one was...</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        :
                        <TouchableWithoutFeedback ref="touch" style={styles.container}
                            onPress={() => this.onFirstToched()}>
                            <View style={styles.container}>
                                <Text style={styles.text}>{this.props.winner.getName()}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                </View>
            );
        }
    }
}

export default Result

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    inner: {
        flex: 1,
        alignItems: 'center'
    },
    containerRemain: {
        flex: 1,
    },
    Wrapper: {
        flex: 1,
    },
    screenBtn: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        fontSize: 30,
        color: '#008f68',
        textAlign: 'center',
    },
})