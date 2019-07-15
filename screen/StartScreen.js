import React from 'react';
import { Animated, StyleSheet, View, ImageBackground, Image } from 'react-native';
import CustomScreen from '../screen/CustomScreen'
import FadeOutView from '../component/Aminations/FadeOutView';

class StartScreen extends React.Component {
  constructor(props){
    super(props)
    this.state={
      isReady: false,
    }
    this.taggleState = this.taggleState.bind(this)
  }

    componentDidMount() {                      
      setTimeout(() => {
        this.taggleState()
      }, 3500)
    }

    taggleState() {
      this.setState({isReady: true})
    }

    render() {
      if(this.state.isReady){
        return(
        <View style={styles.container}>
          <CustomScreen navigation={this.props.navigation}/>
        </View>);
      } else {
        return (
          <FadeOutView style={styles.containerForImage}>
            <Image source={require('../Image/BackImage.jpg')} style={styles.cover}/>
          </FadeOutView>
          );
        }
    }

}

export default StartScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerForImage: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch"
  },
  cover: {
    flex: 1,
    width: null,
    height: null
}
  // inner: {
  //   width:'100%',
  //   height:'100%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'rgba(255, 255, 255, .2)'
  // }
});
