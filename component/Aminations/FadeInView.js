import React from 'react';
import { Animated } from 'react-native';

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
      this.startAnim()
  }

  startAnim() {
    Animated.timing(                  
      this.state.fadeAnim,            
      {
        toValue: 1,                   
        duration: 3000,             
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

export default FadeInView;
