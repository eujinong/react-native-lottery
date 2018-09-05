import Types from './actionTypes';

export const setDomains = domains => ({ type: Types.SET_DOMAINS, domains });
export const setGameParams = params => ({ type: Types.SET_GAME_PARAMS, params });
export const increaseRewarded = initialize => ({ type: Types.INCREASE_REWARDED, initialize });
