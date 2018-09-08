import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { StackNavigator } from 'react-navigation';


import { Styles } from '../theme';
import Api from '../apis';
import { setConfig } from '../actions/global';
import SplashScreen from './SplashScreen';
import DomainsScreen from './DomainsScreen';
import CompaniesScreen from './CompaniesScreen';
import CompanyScreen from './CompanyScreen';
import GameScreen from './GameScreen';

const { Banner, AdRequest } = firebase.admob;
const request = new AdRequest();

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
      isLoaded: false
    };
  }

  async componentDidMount() {
    const config = await Api.getConfig();
    this.props.setConfig(config);
    setTimeout(() => {
      this.setState({
        isLoaded: true
      });
    }, 100);
  }

  renderMain() {
    return (
      <View style={Styles.container}>
        <MainNavigator ref={(navigator) => { this.navigator = navigator; }} />
        <Banner
          unitId="ca-app-pub-3940256099942544/2934735716"
          request={request.build()}
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
              <SplashScreen />
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
  setConfig: config => dispatch(setConfig(config))
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
