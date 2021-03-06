import React from 'react';
import { Animated } from 'react-native';

class FadeOutView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(1),  // Initial value for opacity: 0
  }

  componentDidMount() {
    setTimeout(() => {
      this.startAnim()
    }, 2000)
  }

  startAnim() {
    Animated.timing(                  
      this.state.fadeAnim,            
      {
        toValue: 0,                   
        duration: 1500,             
      }
    ).start();     
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default FadeOutView;
