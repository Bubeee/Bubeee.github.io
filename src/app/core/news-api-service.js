const newsApiKey = 'd59e89ef28f2495496fadd4aceef0a34';
const newsApiBaseAddress = 'https://newsapi.org/';

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
