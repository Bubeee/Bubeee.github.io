import { channels } from './channels';
import { newsByChannel } from './news';

const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

// export default combineReducers({ channels, newsByChannel });
export default channels;
