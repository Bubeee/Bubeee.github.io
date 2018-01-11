import { REQUEST_NEWS, RECEIVE_NEWS } from '../constants/news';
import { config } from '../../..';

const newsApiKey = config.newsApiKey;
const newsApiBaseAddress = config.newsApiBaseAddress;

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
    news: json.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage
    })),
    receivedAt: Date.now()
  };
}

export const fetchNews = channel => {
  return dispatch => {
    dispatch(requestNews(channel));
    return fetch(
      `${newsApiBaseAddress}v1/articles?source=${
        channel.channelId
      }&apiKey=${newsApiKey}`,
      { method: 'get' }
    )
      .then(response => response.json(), error => alert(error))
      .then(
        json => {
          json.articles && dispatch(receiveNews(channel, json));
        }
      );
  };
};
