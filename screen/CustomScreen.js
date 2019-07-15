import React from 'react'
import { View, StyleSheet, Text, Animated, TouchableOpacity } from 'react-native';
import PlayerScreen from '../screen/PlayerScreen'

class CustomScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      count: 1,
      numOfPlayer: 1,
      fadeIn: new Animated.Value(0),
      moveToNext: false
    }
  }

  componentDidUpdate() {
  //   if (this.state.moveToNext){
  //   this.props.navigation.navigate("PlayerScreen",{
  //     playerNum: this.state.numOfPlayer
  //   })
  // }
  }

  componentWillMount() {
    this.setState({moveToNext: false})
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeIn, {
      toValue: 1,
      duration: 10000,
    }).start();
  }

  incrementCount = () =>  {
    this.setState({ count: this.state.count + 1 })
    if(this.state.moveToNext){
      this.setState({moveToNext: false})
    }
  }

  decrementCount = () => {
    if (this.state.count > 1) {
      this.setState({ count: this.state.count - 1 })
    }
    if(this.state.moveToNext){
      this.setState({moveToNext: false})
    }
  }

  pressedAddBtn = () =>  {
    this.setState({numOfPlayer: this.state.count, moveToNext: true});
  }

  render() {
    let {fadeIn} = this.state.fadeIn
    if(this.state.moveToNext){
      return(
        <View style={styles.container}>
          <PlayerScreen playerNum={this.state.numOfPlayer}/>
        </View>
      );
    }
    return (
      <View style={styles.inner}>
        <Animated.View style={{alignItems: 'center', opacity: fadeIn}}>
        <Text style={styles.text}>How many people are going to play?</Text>
        </Animated.View>
        <View style={styles.lines}>

          <TouchableOpacity onPress={() => this.decrementCount()} >
            <View style={styles.myButtonLeft}>
              <Text style={styles.btnText}>-</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.count}>{this.state.count}</Text>

          <TouchableOpacity onPress={() => this.incrementCount()} >
            <View style={styles.myButtonRight}>
              <Text style={styles.btnText}>+</Text>
            </View>
          </TouchableOpacity>

        </View>

        <View style={styles.lines}>
          <TouchableOpacity onPress={() => {this.pressedAddBtn()}} >
            <View style={styles.border}>
              <Text style={styles.addBtn}>Add</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default CustomScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  inner: {
    width: '100%',
    height: '100%',
    paddingTop: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  lines: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  myButtonLeft: {
    borderWidth: 1,
    marginRight: 30,
    height: 40,
    width: 40,  //The Width must be the same as the height
    borderRadius: 80, //Then Make the Border Radius twice the size of width or Height   
    borderColor: '#d6d7da',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myButtonRight: {
    borderWidth: 1,
    marginLeft: 30,
    height: 40,
    width: 40,  //The Width must be the same as the height
    borderRadius: 80, //Then Make the Border Radius twice the size of width or Height      
    borderColor: '#d6d7da',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 25,
    color: '#008f68',
  },
  text: {
    fontSize: 30,
    color: '#008f68',
  },
  count: {
    fontSize: 30,
  },
  border: {
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
  }
});