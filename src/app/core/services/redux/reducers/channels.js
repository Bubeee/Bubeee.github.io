import {
  REQUEST_CHANNELS,
  RECEIVE_CHANNELS,
  SELECT_CHANNEL
} from '../constants/channels';
import { REQUEST_NEWS, RECEIVE_NEWS, INVALIDATE_NEWS } from '../constants/news';

import { news, newsByChannel } from './news';

export const channels = (state = [], action) => {
  switch (action.type) {
    case SELECT_CHANNEL:
      return action.channel;
    case RECEIVE_CHANNELS:
      return Object.assign({}, state, {
        channels: action.channels
      });

    case RECEIVE_NEWS:
      let channelIndex = state.channels.findIndex(
        el => el.channelId == action.channel.channelId
      );

      let channelState = newsByChannel(state.channels[channelIndex], action);
      state.channels[channelIndex] = channelState;
      return Object.assign({}, state, {
        channels: state.channels
      });
    default:
      return state;
  }
};
