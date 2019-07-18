import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Picker, Button } from 'react-native'
import { Asset, AppLoading } from 'expo'
import Player from '../component/Player'
import Result from '../screen/Result'
import GameEndScreen from '../screen/GameEndScreen';

class PlayerScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: 0,
            isAnswerDecided: false,
            numOfPlayer: 0,
            remainedNumOfPlayer: 0,
            isHanded: false,
            nameInput: '',
            players: [],
            selectedNum: 0,
            currentNum: 0,
            isResult: false,
            WinnersGap: 0,
            WinnersNum: 0,
            result: Object,
            isFirstPlayer: true,
            isLastPerson: false,
            isAsyncReady: false
        }
        this.onChange = this.onChange.bind(this);
        this.addBtnPressed = this.addBtnPressed.bind(this);
        this.okBtnPressed = this.okBtnPressed.bind(this);
        this.winnerPicker = this.winnerPicker.bind(this);
        this.removeWinner = this.removeWinner.bind(this);
    }

    componentDidMount() {
        if (!this.props.isNotFirstTurn) {
            // const { navigation } = this.props;
            // const playerNum = navigation.getParam('playerNum', 'something')
            this.setState({ numOfPlayer: this.props.playerNum, remainedNumOfPlayer: this.props.playerNum })
        } else {
            this.setState({ numOfPlayer: this.props.numOfplayer, remainedNumOfPlayer: 0, players: this.props.players })
        }
    }

    onChange(currentNum) {
        this.setState({ currentNum, selectedNum: currentNum })
    }

    removeWinner(winner) {
        const remain = this.state.players.filter((player) => {
            return player.name !== winner.name
        })
        this.setState({ players: remain, numOfPlayer: remain.length });
    }

    winnerPicker() {
        const answer = this.state.answer;
        const players = this.state.players;
        let winner = players[0];
        let WinnersGap = 0;
        let absGap = 0;
        let winnersNum = 0;
        //setting a gap
        for (i = 0; i < players.length; i++) {
            absGap = Math.abs(answer - players[i].getNum())
            players[i].setGap(absGap)
        }
        //compare players
        for (i = 0; i < players.length; i++) {
            const player = players[i]
            if (winner.getGap() > player.getGap()) {
                winner = player
            }
        }
        WinnersGap = answer - winner.getNum();
        winnersNum = winner.getNum();
        this.setState({ WinnersGap: WinnersGap, result: winner, WinnersNum: winnersNum })
        this.removeWinner(winner)
        console.log("Answer: ", this.state.answer, "Name: ", winner.getName(), "gap: ", WinnersGap)
    }

    okBtnPressed() {
        if (this.props.isNotFirstTurn) {
            this.setState({ answer: this.props.answer, isFirstPlayer: false });
            if (this.state.isLastPerson) {
                this.winnerPicker();
                this.setState({ isResult: true });
            } else {
                this.setState({ isHanded: true });
            }

        } else {

            if (!this.state.isAnswerDecided) {
                var randomAnswer = Math.floor(Math.random() * 101);
                this.setState({ isAnswerDecided: true, answer: randomAnswer });
            }
            if (this.state.isLastPerson) {
                this.winnerPicker()
                this.setState({ isResult: true });
            } else {
                this.setState({ isHanded: true });
            }

        }
    }

    addBtnPressed() {
        if (this.props.isNotFirstTurn) {
            player = this.state.players[this.state.remainedNumOfPlayer];
            player.setNum(this.state.selectedNum);
            {
                this.state.numOfPlayer === (this.state.remainedNumOfPlayer + 1) ?
                this.setState({ isLastPerson: true, currentNum: 0, selectedNum: 0, isHanded: false, nameInput: '', remainedNumOfPlayer: this.state.remainedNumOfPlayer + 1 }) :
                this.setState({ currentNum: 0, selectedNum: 0, isHanded: false, nameInput: '', remainedNumOfPlayer: this.state.remainedNumOfPlayer + 1 })
            }
        } else {
            if (this.state.remainedNumOfPlayer > 1) {
                player = new Player(this.state.nameInput, this.state.selectedNum, 0)
                this.state.players.push(player)
                this.setState({ currentNum: 0, selectedNum: 0, isHanded: false, nameInput: '', remainedNumOfPlayer: this.state.remainedNumOfPlayer - 1 })
            } else {
                player = new Player(this.state.nameInput, this.state.selectedNum, 0)
                this.state.players.push(player)
                this.setState({ isLastPerson: true, currentNum: 0, selectedNum: 0, isHanded: false, nameInput: '', remainedNumOfPlayer: this.state.remainedNumOfPlayer - 1 })
            }
        }
    }

    async _cacheResourcesAsync() {
        console.log("chached")
        return Asset.loadAsync(
            require('../Image/phoneIcon.png'),
        )
    }

    render() {
        const nums = Array.from(Array(101).keys())

        if (!this.state.isAsyncReady) {
            return (
                <AppLoading
                    startAsync={() => this._cacheResourcesAsync()}
                    onFinish={() => this.setState({ isAsyncReady: true })}
                    onError={console.warn}
                />
            );
        }






        if (this.state.isResult && this.state.numOfPlayer === 1
        ) {
            return (
                <View style={styles.containerResult}>
                    <GameEndScreen navigation={this.props.navigation} answer={this.state.answer} loser={this.state.players[0].name} winner={this.state.result.name} winnersNum={this.state.WinnersNum} />
                </View>
            );
        }

        if (this.state.isLastPerson && !this.state.isResult) {
            return (
                <View style={styles.containerInner}>
                    <Text style={styles.text}>
                        Put the device on the table...
                    </Text>
                    <Image style={styles.image} source={require('../Image/phoneIcon.png')} />
                    <TouchableOpacity style={styles.bottomView} onPress={() => this.okBtnPressed()}>
                        <View >
                            <Text style={styles.addBtn}>OK</Text>
                        </View>
                    </TouchableOpacity>
                </View>);
        }

        if (this.props.isNotFirstTurn && this.state.isResult) {
            return (
                <View style={styles.containerResult}>
                    <Result navigation={this.props.navigation} answer={this.state.answer} players={this.state.players} playersLeft={this.state.numOfPlayer} winner={this.state.result} gap={this.state.WinnersGap} winnersNum={this.state.WinnersNum} />
                </View>);
        } else if (this.props.isNotFirstTurn) {
            return (
                <View style={styles.container}>
                    {!this.state.isHanded ?
                        <View style={styles.containerInner}>
                            <Text style={styles.text}>
                                {!this.state.isFirstPlayer ?
                                    `Pass the device on to \n${this.state.players[this.state.remainedNumOfPlayer].name}...` :
                                    `Pass the device on to \n${this.props.initialPlayer}...`}
                            </Text>
                            <Image style={styles.image} source={require('../Image/phoneIcon.png')} />
                            <TouchableOpacity style={styles.bottomView} onPress={() => this.okBtnPressed()}>
                                <View >
                                    <Text style={styles.addBtn}>OK</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.containerPlayer}>
                            <Text style={styles.text}>
                                Player: {this.state.players[this.state.remainedNumOfPlayer].name}
                            </Text>
                            <Text style={styles.text}>
                                Your number: {this.state.selectedNum}
                            </Text>
                            <Picker
                                style={{ marginTop: 10 }}
                                onValueChange={(currentNum) => this.onChange(currentNum)}
                                selectedValue={this.state.currentNum}
                            >
                                {nums.map((item, index) => {
                                    return (<Picker.Item label={item} value={index} key={index} />);
                                })}
                            </Picker>
                            <TouchableOpacity onPress={() => this.addBtnPressed()} style={styles.containerForBtn}>
                                <View style={styles.border}>
                                    <Text style={styles.addBtn}>Add</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            );
        }

        if (!this.state.isResult) {
            return (
                <View style={styles.container}>
                    {!this.state.isHanded ?
                        <View style={styles.containerInner}>
                            <Text style={styles.text}>
                                {`Pass the device on to \nnext person...`}
                            </Text>
                            <Image style={styles.image} source={require('../Image/phoneIcon.png')} />
                            <TouchableOpacity style={styles.bottomView} onPress={() => this.okBtnPressed()}>
                                <View >
                                    <Text style={styles.addBtn}>OK</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.containerPlayer}>
                            <Text style={styles.text}>
                                Type your name
                        </Text>
                            <Text style={styles.text}>
                                Your number: {this.state.selectedNum}
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(nameInput) => this.setState({ nameInput })}
                                value={this.state.nameInput}
                                placeholder='Enter text...'
                                maxLength={22}
                                clearButtonMode='always'
                            />
                            <Picker
                                onValueChange={(currentNum) => this.onChange(currentNum)}
                                selectedValue={this.state.currentNum}
                            >
                                {nums.map((item, index) => {
                                    return (<Picker.Item label={item} value={index} key={index} />);
                                })}
                            </Picker>
                            <TouchableOpacity onPress={() => this.addBtnPressed()} style={styles.containerForBtn}>
                                <View style={styles.border}>
                                    <Text style={styles.addBtn}>Add</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            );
        } else {
            return (
                <View style={styles.containerResult}>
                    <Result navigation={this.props.navigation} answer={this.state.answer} players={this.state.players} playersLeft={this.state.numOfPlayer} winner={this.state.result} gap={this.state.WinnersGap} winnersNum={this.state.WinnersNum} />
                </View>);
        }
    }
}


export default PlayerScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    containerInner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerPlayer: {
        flex: 1,
        justifyContent: 'center',
    },
    containerResult: {
        flex: 1,
        justifyContent: 'center',
    },
    containerForBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    image: {
        alignItems: 'center',
        marginTop: 120,
        marginBottom: 100,
        width: 200,
        height: 200
    },
    text: {
        alignItems: 'center',
        fontSize: 30,
        color: '#008f68',
    },
    bottomView: {
        width: '100%',
        height: 50,
        backgroundColor: '#FF9800',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    border: {
        borderWidth: 1,
        borderColor: "#008f68",
        borderRadius: 5
    },
    addBtn: {
        margin: 2,
        textAlign: "center",
        color: '#008f68',
        fontSize: 25,
        paddingHorizontal: 5
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        margin: 10,
        borderRadius: 20,
    }
});