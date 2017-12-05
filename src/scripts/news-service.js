export class NewsService {
  newsApiKey = 'd59e89ef28f2495496fadd4aceef0a34';
  newsApiBaseAddress = 'https://newsapi.org/';

  getChannels(selector) {
    fetch(`${newsApiBaseAddress}/v2/sources?apiKey=${newsApiKey}`, {
      method: 'get'
    }).then(function(response) {
      response.json().then(data => {
        let infoContainer = document.querySelector(selector);

        data.sources.forEach(element => {
          let subContainer = document.createElement('div');
          subContainer.classList.add('item');
          subContainer.classList.add('channel-item');
          subContainer.onclick = () => getNews(element.id);

          let channelTitle = document.createElement('p');
          channelTitle.innerText = element.name;

          let newElement = document.createElement('div');
          newElement.id = element.id;

          subContainer.appendChild(channelTitle);
          subContainer.appendChild(newElement);

          infoContainer.appendChild(subContainer);
        });
      });
    });
  }

  getNews(channelId) {
    let currentChannelBlock = document.querySelector(`#${channelId}`);

    fetchNews(currentChannelBlock, channelId);
  }

  fetchNews(currentChannelBlock, channelId) {
    if (currentChannelBlock.hasChildNodes()) {
      while (currentChannelBlock.firstChild) {
        currentChannelBlock.removeChild(currentChannelBlock.firstChild);
      }
    } else {
      fetch(
        `${newsApiBaseAddress}/v1/articles?source=${channelId}&apiKey=${
          newsApiKey
        }`,
        {
          method: 'get'
        }
      )
        .then(function(response) {
          if (response.ok === true) {
            response.json().then(data => {
              data.articles.forEach(element => {
                createNewsBlock(currentChannelBlock, element);
              });
            });
          } else {
            createErrorBlock(currentChannelBlock);
          }
        })
        .catch(function(params) {
          console.log(`Error ${params}`);
        });
    }
  }
}
