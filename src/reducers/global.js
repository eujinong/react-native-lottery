import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '../actions/actionTypes';

// import I18n from 'react-native-i18n';
// import _ from 'lodash';

export const initialState = Immutable({
  domains: null,
  rewardedCount: 0
});

const setDomains = (state, action) => ({
  ...state,
  domains: action.domains
});


const increaseRewarded = (state, action) => ({
  ...state,
  rewardedCount: action.initialize ? 0 : state.rewardedCount + 1
});

const actionHandlers = {
  [Types.SET_DOMAINS]: setDomains,
  [Types.INCREASE_REWARDED]: increaseRewarded
};

export default createReducer(initialState, actionHandlers);
