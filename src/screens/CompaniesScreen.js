import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

import {
  Metrics, Styles
} from '../theme';
import Api from '../apis';

import DomainItem from '../components/DomainItem';
import NavigationTitle from '../components/NavigationTitle';
import NavigationButton from '../components/NavigationButton';

const styles = {
  list: {
    flexDirection: 'row',
    padding: Metrics.padding.tiny,
    flexWrap: 'wrap'
  },
  listItem: {
    width: (Metrics.dimension.width) / 2 - Metrics.padding.tiny,
    padding: Metrics.padding.tiny
  }
};

class CompaniesScreen extends Component {
  static navigationOptions = navigation => ({
    headerLeft: <NavigationButton icon="bars" />,
    headerTitle: <NavigationTitle text="Loterias" />,
    headerRight: <NavigationButton icon="globe" />
  })

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDomainItemPress(domain) {
    Api.saveDomain(domain);
  }

  render() {
    const { props } = this;
    const { config } = props.global;

    return (
      <ScrollView style={[Styles.container, Styles.bg]}>
        <View style={styles.list}>
          {
            config && config.domains && config.domains.map((domain, index) => (
              <View style={styles.listItem} key={`${index}`}>
                <DomainItem data={domain} />
              </View>
            ))
          }
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  global: state.get('global')
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesScreen);
