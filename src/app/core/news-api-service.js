import { config } from './';

const newsApiKey = config.newsApiKey;
const newsApiBaseAddress = config.newsApiBaseAddress;

export class NewsApiService {
  getChannels(callback) {
    fetch(`${newsApiBaseAddress}/v2/sources?apiKey=${newsApiKey}`, {
      method: 'get'
    }).then(response => {
      response.json().then(data => {
        data.sources.forEach(element => callback(element));
      });
    });
  }

  getNews(channelId, okCallback, elseCallback) {
    fetch(
      `${newsApiBaseAddress}/v1/articles?source=${channelId}&apiKey=${newsApiKey}`,
      { method: 'get' }
    )
      .then(response => {
        if (response.ok === true) {
          response.json().then(data => {
            data.articles.forEach(element => {
              okCallback(`#channel-${channelId}`, element);
            });
          });
        } else {
          elseCallback(`#channel-${channelId}`);
        }
      })
      .catch(params => {
        elseCallback(`#channel-${channelId}`);
      });
  }
}
