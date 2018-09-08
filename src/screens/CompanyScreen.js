import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';

import {
  Metrics, Styles
} from '../theme';
import Api from '../apis';
import { setCompanies } from '../actions/global';
import NavigationTitle from '../components/NavigationTitle';
import NavigationButton from '../components/NavigationButton';
import GameItem from '../components/GameItem';
import LoadingIndicator from '../components/LoadingIndicator';
import Separator from '../components/Separator';

const styles = {
  container: {
    paddingHorizontal: Metrics.padding.small
  }
};

class CompanyScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const company = navigation.getParam('company', {});
    return {
      headerLeft: <NavigationButton icon="arrow-left" onPress={() => { navigation.goBack(); }} />,
      headerTitle: <NavigationTitle text={company.title} logo={{ url: company.logo }} />,
      headerRight: <NavigationButton icon="globe" onPress={() => navigation.popToTop()} />
    };
  }

  constructor(props) {
    super(props);
    const {
      domain, company
    } = this.props.navigation.state.params;

    this.state = {
      isLoading: true,
      domain,
      company,
      games: []
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: true
    });
    const { domain, company } = this.state;
    const games = await Api.getCompanyGames(domain, { company_id: company.id });
    this.setState({
      isLoading: false,
      games
    });
  }

  handleGamePress(game) {
    const {
      domain,
      company
    } = this.state;

    this.props.navigation.navigate('game', {
      domain,
      company,
      game
    });
  }

  renderItem({ item }) {
    let detail = null;
    const { games } = this.state;

    if (games !== null) {
      for (let i = 0, ni = games.length; i < ni; i++) {
        const game = games[i];
        if (game.game_id === item.id) {
          detail = game;
        }
      }
    }

    const data = {
      info: item,
      detail
    };

    return (
      <GameItem data={data} onPress={this.handleGamePress.bind(this)} />
    );
  }

  render() {
    const { company, isLoading } = this.state;
    return (
      <View style={[Styles.container, Styles.bg]}>
        <FlatList
          style={styles.container}
          keyExtractor={(item, index) => (`${index}`)}
          data={company.games}
          renderItem={this.renderItem.bind(this)}
          refreshing={isLoading}
          ItemSeparatorComponent={() => <Separator />}
        />
        {isLoading && <LoadingIndicator fill />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  global: state.get('global')
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setCompanies: companies => dispatch(setCompanies(companies))
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyScreen);
