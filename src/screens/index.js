import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { StackNavigator } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

import { Styles } from '../theme';
import Api from '../apis';
import { setConfig, increaseRewarded } from '../actions/global';
import Splash from './SplashScreen';
import DomainsScreen from './DomainsScreen';
import CompaniesScreen from './CompaniesScreen';
import CompanyScreen from './CompanyScreen';
import GameScreen from './GameScreen';
import CONFIG from '../config';

const { Banner, AdRequest } = firebase.admob;

const MainNavigator = StackNavigator({
  domains: {
    screen: DomainsScreen
  },
  companies: {
    screen: CompaniesScreen
  },
  company: {
    screen: CompanyScreen
  },
  game: {
    screen: GameScreen
  }
}, {
  navigationOptions: {
    headerStyle: Styles.navigationHeader
  }
});

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      rewardedCount: props.global.rewardedCount
    };

    this.requestInterstitial();

    this.bannerRequest = new AdRequest();
    this.bannerRequest.addKeyword('banner');
  }

  async componentDidMount() {
    SplashScreen.hide();
    const config = await Api.getConfig();
    this.props.setConfig(config);
    setTimeout(() => {
      this.setState({
        isLoaded: true
      });
    }, 100);
  }

  componentWillReceiveProps(nextProps) {
    const { global } = nextProps;
    if (global.rewardedCount >= CONFIG.ADMOB.REWARDED_MAX) {
      if (this.state.rewardedCount !== global.rewardedCount) {
        this.setState({
          rewardedCount: global.rewardedCount
        });
        this.showInterstitial();
      }
    }
  }

  requestInterstitial() {
    const request = new AdRequest();
    request.addKeyword('interstitial');
    this.interstitial = firebase.admob().interstitial(CONFIG.ADMOB.SECRETS.INTERSTITIAL);
    this.interstitial.on('onAdLoaded', () => {
      console.log('loaded');
    });

    this.interstitial.on('onAdClosed', () => {
      console.log('closed');
      this.props.increaseRewarded(true);
      this.requestInterstitial();
    });
    this.interstitial.loadAd(request.build());
  }

  showInterstitial() {
    if (this.interstitial && this.interstitial.isLoaded()) {
      firebase.analytics().logEvent('interstitial', { showRewarded: true });
      this.interstitial.show();
    }
  }

  renderMain() {
    return (
      <View style={Styles.container}>
        <MainNavigator ref={(navigator) => { this.navigator = navigator; }} />
        <Banner
          key={this.props.global.rewardedCount === CONFIG.ADMOB.REWARDED_MAX}
          unitId={CONFIG.ADMOB.SECRETS.BANNER}
          request={new AdRequest().build()}
          onAdLoaded={() => {}}
        />
      </View>
    );
  }

  render() {
    const { isLoaded } = this.state;
    const { splashing } = this.props.global;
    return (
      <View style={Styles.container}>
        {isLoaded && this.renderMain()}
        {
          splashing && (
            <View style={Styles.fill}>
              <Splash />
            </View>
          )
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  global: state.get('global')
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setConfig: config => dispatch(setConfig(config)),
  increaseRewarded: initialize => dispatch(increaseRewarded(initialize))
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
