import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Picker, Button } from 'react-native'
import FadeInView from '../component/Aminations/FadeInView'
class GameEndScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            winnerName: '',
            isResult: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isResult: true });
        }, 2500)
    }

    render() {
        return(
            <View style={styles.container}>
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