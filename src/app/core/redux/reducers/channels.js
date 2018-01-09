import {
  REQUEST_CHANNELS,
  RECEIVE_CHANNELS,
  SELECT_CHANNEL
} from '../constants/channels';
import { REQUEST_NEWS, RECEIVE_NEWS, INVALIDATE_NEWS } from '../constants/news';

import { news } from './';

export const channels = (state = [], action) => {
  switch (action.type) {
    case SELECT_CHANNEL:
      return action.channel;
    case RECEIVE_CHANNELS:
      var channels = [];
      for (const iterator of action.channels) {
        channels.push(iterator.channel);
      }
      return Object.assign({}, state, {
        channels
      });

    case REQUEST_NEWS:
    case RECEIVE_NEWS:
      return state.map(n => newsByChannel(n, action));
    default:
      return state;
  }
};
