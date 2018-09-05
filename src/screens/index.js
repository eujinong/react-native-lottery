import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';

const { Banner, AdRequest } = firebase.admob;
const request = new AdRequest();

class Index extends Component {
  render() {
    return (
      <View>
        <Banner
          unitId="ca-app-pub-3940256099942544/2934735716"
          request={request.build()}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
        />
      </View>
    );
  }
}

export default Index;
