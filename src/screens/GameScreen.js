import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import {
  Metrics, Styles
} from '../theme';
import Api from '../apis';
// import { setCompanies } from '../actions/global';
import NavigationTitle from '../components/NavigationTitle';
import NavigationButton from '../components/NavigationButton';
import GameItem from '../components/GameItem';
import GamePrevious from '../components/GamePrevious';
import GameGraph from '../components/GameGraph';
import LoadingIndicator from '../components/LoadingIndicator';
import Separator from '../components/Separator';
import AppHelper from '../helpers/AppHelper';

const styles = {
  container: {
    width: '100%',
    paddingHorizontal: Metrics.padding.small
  }
};

class GameScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const game = navigation.getParam('game', {});
    return {
      headerLeft: <NavigationButton icon="arrow-left" onPress={() => { navigation.goBack(); }} />,
      headerTitle: <NavigationTitle text={game.info.title} logo={null} />,
      headerRight: <NavigationButton icon="globe" onPress={() => navigation.popToTop()} />
    };
  }

  constructor(props) {
    super(props);
    const {
      domain, game
    } = this.props.navigation.state.params;

    this.state = {
      isLoading: true,
      domain,
      game,
      result: null
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: true
    });
    const { domain, game } = this.state;
    const result = await Api.getGame(domain, { game_id: game.detail.game_id });
    this.setState({
      isLoading: false,
      result
    });
  }

  handleGamePress(game) {
    const {
      domain
    } = this.state;

    this.props.navigation.navigate('game', {
      domain,
      game
    });
  }

  render() {
    const { game, result, isLoading } = this.state;
    console.log(game);
    return (
      <ScrollView style={[Styles.container, Styles.bg, styles.container]}>
        <GameItem data={game} onPress={this.handleGamePress.bind(this)} />
        {
          (game && game.detail && game.detail.stats) ? (
            <View>
              <Separator />
              <GameGraph data={AppHelper.convertChartData(game.detail.stats)} />
            </View>
          ) : null
        }
        {
          (result && result.sessions && result.sessions.length > 0) && (
            <View>
              <Separator />
              <GamePrevious data={result.sessions} />
            </View>
          )
        }
        {isLoading && <LoadingIndicator fill />}
        
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  global: state.get('global')
});

const mapDispatchToProps = dispatch => ({
  dispatch
  // setCompanies: companies => dispatch(setCompanies(companies))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
