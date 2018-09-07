import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '../actions/actionTypes';

// import I18n from 'react-native-i18n';
// import _ from 'lodash';

export const initialState = Immutable({
  config: [],
  rewardedCount: 0
});

const setConfig = (state, action) => ({
  ...state,
  config: action.config
});


const increaseRewarded = (state, action) => ({
  ...state,
  rewardedCount: action.initialize ? 0 : state.rewardedCount + 1
});

const actionHandlers = {
  [Types.SET_CONFIG]: setConfig,
  [Types.INCREASE_REWARDED]: increaseRewarded
};

export default createReducer(initialState, actionHandlers);
