import React from 'react';
import Router from './config/router'
import { createAppContainer } from 'react-navigation';

const AppContainer = createAppContainer(Router);

export default class App extends React.Component  {
  someEvent() {
    // call navigate for AppNavigator here:
    this.navigator &&
      this.navigator.dispatch(
        NavigationActions.navigate({ routeName: someRouteName })
      );
  }
  render(){
    return (
      <AppContainer  
      ref={nav => {
        this.navigator = nav;
      }}/>
      );
  }
}
