import {
  REQUEST_CHANNELS,
  RECEIVE_CHANNELS,
  SELECT_CHANNEL
} from '../constants/channels';
import { config } from '../../..';

const newsApiKey = config.newsApiKey;
const newsApiBaseAddress = config.newsApiBaseAddress;

export function selectChannel(channel) {
  return {
    type: SELECT_CHANNEL,
    channel
  };
}

export function requestChannels() {
  return {
    type: REQUEST_CHANNELS
  };
}

export const receiveChannels = json => {
  return {
    type: RECEIVE_CHANNELS,
    channels: json.sources.map(ch => ({ channelId: ch.id, channelName: ch.name }))
  };
};

export const fetchChannels = channel => {
  return dispatch => {
    dispatch(requestChannels());

    return fetch(`${newsApiBaseAddress}/v2/sources?apiKey=${newsApiKey}`, {
      method: 'get'
    })
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json => {
        dispatch(receiveChannels(json));
      });
  };
};
