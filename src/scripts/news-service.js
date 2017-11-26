export class NewsService {
  newsApiKey = 'd59e89ef28f2495496fadd4aceef0a34';
  newsApiBaseAddress = 'https://newsapi.org/';

  *getChannels() {
    while (true) {
      yield fetch(`${this.newsApiBaseAddress}/v2/sources?apiKey=${this.newsApiKey}`, {
        method: 'get'
      }).then(function (data) {
        var json = data.json();
        return json;
      });
    }
  }

  getNews() {

  }
} 