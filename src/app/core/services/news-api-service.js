import { config } from '../';

const newsApiKey = config.newsApiKey;
const newsApiBaseAddress = config.newsApiBaseAddress;

export class NewsApiService {
  getChannels(callback) {
    return fetch(`${newsApiBaseAddress}/v2/sources?apiKey=${newsApiKey}`, {
      method: 'get'
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data.sources;
      });
  }

  getNews(channelId, okCallback, elseCallback) {
    return fetch(
      `${newsApiBaseAddress}/v1/articles?source=${channelId}&apiKey=${newsApiKey}`,
      { method: 'get' }
    )
      .then(response => {
        if (response.ok === true) {
          return response.json();
        } else {
          return null;
        }
      })
      .then(data => {
        if (data != null) {
          return data.articles;
        }
      });
  }
}
