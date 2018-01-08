import { REQUEST_CHANNELS, RECEIVE_CHANNELS, SELECT_CHANNEL } from '../constants/channels';

export const channels = (state = [], action) => {
  switch (action.type) {
    
    default:
      return state;
  }
};

export const selectChannel = (state = '', action) => {
  switch (action.type) {
    case SELECT_CHANNEL:
      return action.channel
    default:
      return state
  }
}