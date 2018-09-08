import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

import {
  Metrics, Styles
} from '../theme';
import Api from '../apis';
import { setCompanies } from '../actions/global';
import NavigationTitle from '../components/NavigationTitle';
import NavigationButton from '../components/NavigationButton';
import CompanyItem from '../components/CompanyItem';
import LoadingIndicator from '../components/LoadingIndicator';

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
  static navigationOptions = ({ navigation }) => {
    const domain = navigation.getParam('domain', {});
    return {
      headerLeft: <NavigationButton icon="arrow-left" onPress={() => { navigation.goBack(); }} />,
      headerTitle: <NavigationTitle text={domain.country} />,
      headerRight: <NavigationButton icon="globe" onPress={() => navigation.popToTop()} />
    };
  }

  constructor(props) {
    super(props);
    const { domain } = props.navigation.state.params;
    this.state = {
      domain,
      companies: null,
      isLoading: true
    };
  }

  async componentDidMount() {
    const { domain } = this.state;

    this.setState({
      isLoading: true
    });
    const companies = await Api.getCompanies(domain);
    this.props.setCompanies(companies);
    this.setState({
      isLoading: false,
      companies
    });
  }

  handleCompanyItemPress(company) {
    const { domain } = this.state;
    this.props.navigation.navigate('company', {
      domain, company
    });
  }

  render() {
    const { companies, isLoading } = this.state;

    return (
      <View style={[Styles.container, Styles.bg]}>
        <ScrollView style={Styles.container}>
          <View style={styles.list}>
            {
              companies && companies.companies && companies.companies.map((company, index) => (
                <View style={styles.listItem} key={`${index}`}>
                  <CompanyItem data={company} onPress={this.handleCompanyItemPress.bind(this)} />
                </View>
              ))
            }
          </View>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesScreen);
