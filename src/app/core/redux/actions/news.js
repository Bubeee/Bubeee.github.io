import { REQUEST_NEWS, RECEIVE_NEWS } from '../constants/news';
import { config } from '../..';

export function requestNews(channel) {
  return {
    type: REQUEST_NEWS,
    channel
  };
}

export function receiveNews(channel, json) {
  return {
    type: RECEIVE_NEWS,
    channel,
    news: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

export const fetchNews = channel => {
  return dispatch => {
    dispatch(requestNews(channel));

    return fetch(
      `${newsApiBaseAddress}/v1/articles?source=${channel}&apiKey=${newsApiKey}`,
      { method: 'get' }
    )
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json => {
        dispatch(receiveNews(channel, json));
      });
  };
};
