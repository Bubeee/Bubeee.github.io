import { selectChannel } from './channels';
import { newsByChannel } from './news';

export default combineReducers({ selectChannel, newsByChannel });

const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};
