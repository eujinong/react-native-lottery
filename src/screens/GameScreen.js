import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  Metrics, Styles
} from '../theme';
import Api from '../apis';
// import { setCompanies } from '../actions/global';
import NavigationTitle from '../components/NavigationTitle';
import NavigationButton from '../components/NavigationButton';
import GameSearchBar from '../components/GameSearchBar';
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
      result: null,
      date: null
    };
  }

  componentDidMount() {
    this.handleRefresh();
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

  handleChangeDate(date) {
    this.setState({
      date
    });
    const {
      domain, game
    } = this.state;
    this.searchResult(domain, game, date);
  }

  handleRefresh() {
    const {
      domain, game, date
    } = this.state;
    this.searchResult(domain, game, date);
  }

  async searchResult(domain, game, date) {
    this.setState({
      isLoading: true
    });
    console.log(game);
    const params = {
      game_id: game.info.id
    };
    if (date) {
      params.date = moment(date).format('YYYY-MM-DD');
    }

    const result = await Api.getGame(domain, params);
    this.setState({
      isLoading: false,
      result
    });
  }

  render() {
    const { game, result, isLoading } = this.state;
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
        <GameSearchBar onChangeDate={this.handleChangeDate.bind(this)} onRefresh={this.handleRefresh.bind(this)} />
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
