import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Asset, AppLoading } from 'expo'

class ExplainScreen extends React.Component {
    constructor(props){
        super(props),
        this.state={
            isAsyncReady: false,
            pic: '',
            pressed: 0,
        }
    this.renderPic = this.renderPic.bind(this)
    }


    async _cacheResourcesAsync() {
        return Asset.loadAsync(
            require('../Image/chatting.png'),
            require('../Image/phoneIcon.png')
        )
    }

    onRightPressed() {
        this.setState({pressed: this.state.pressed + 1})
    }

    onLeftPressed() {
        if(this.state.pressed > 0){
            this.setState({pressed: this.state.pressed - 1})
        }
    }

    renderText(){
        switch(this.state.pressed) {
            case 0:
                return "Welcome to Drinker Picker!"
                break;
            case 1:
                return `In this page, you can get \n the idea of this game`
                break;
            case 2:
                return `First of all, this app only needs this phone itself`
                break;
        }
    }

    renderPic() {
        switch(this.state.pressed) {
            case 0:
                return require('../Image/chatting.png')
            case 1:
                return require('../Image/chatting.png')
            case 2:
                return require('../Image/phoneIcon.png')
        }
    }

    render() {
        // let pic = this.state.pressed <= 1  ? require('../Image/chatting.png') : require('../Image/phoneIcon.png')

        if (!this.state.isAsyncReady) {
            return (
                <AppLoading
                    startAsync={() => this._cacheResourcesAsync()}
                    onFinish={() => this.setState({ isAsyncReady: true })}
                    onError={console.warn}
                />
            );
        }

        return(
        <View style={styles.container}>
            <View style={styles.containerInner}>
                <View style={styles.top}>
                    <Text style={styles.text}>
                        {this.renderText()}
                    </Text>
                </View>
                    <Image style={styles.image} source={this.renderPic()} />
                    <View style={styles.bottomView} >
                        <View style={styles.lines}>
                            <TouchableOpacity onPress={()=> this.onLeftPressed()}> 
                            <Text style={styles.text}>{"<"}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=> this.onRightPressed()}> 
                            <Text style={styles.BtnText}>OK</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=> this.onRightPressed()}> 
                            <Text style={styles.text}>{">"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </View>);
    }
}

export default ExplainScreen

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
        height: 200,
        position: 'absolute'
    },    
    bottomView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    text: {
        alignItems: 'center',
        fontSize: 30,
        color: '#008f68',
    },
    BtnText: {
        margin: 2,
        textAlign: "center",
        color: '#008f68',
        fontSize: 25,
        marginHorizontal: 50
        },
        lines: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        top: {
            marginTop: 110,
            marginBottom: 0,
            top: 0,
            position: 'absolute'
        },
})