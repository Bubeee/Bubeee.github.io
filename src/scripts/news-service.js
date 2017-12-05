const newsApiKey = 'd59e89ef28f2495496fadd4aceef0a34';
const newsApiBaseAddress = 'https://newsapi.org/';

export class NewsService {
  getChannels(selector) {
    fetch(`${newsApiBaseAddress}/v2/sources?apiKey=${newsApiKey}`, {
      method: 'get'
    }).then((response) => {
      response.json().then(data => {
        let infoContainer = document.querySelector(selector);

        data.sources.forEach(element => {
          let subContainer = document.createElement('div');
          subContainer.classList.add('item');
          subContainer.classList.add('channel-item');
          subContainer.onclick = (event) => this.getNews(element.id);

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

    this.fetchNews(currentChannelBlock, channelId);
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
        .then((response) => {
          if (response.ok === true) {
            response.json().then(data => {
              data.articles.forEach(element => {
                this.createNewsBlock(currentChannelBlock, element);
              });
            });
          } else {
            this.createErrorBlock(currentChannelBlock);
          }
        })
        .catch((params) => {
          console.log(`Error ${params}`);
        });
    }
  }

  createNewsBlock(currentChannelBlock, element) {
    let newElement = document.createElement("div");
    newElement.classList.add("item");
    newElement.classList.add("news-item");
    newElement.onclick = (event) => event.stopPropagation();
  
    let title = document.createElement("a");
    title.innerHTML = element.title;
    title.href = element.url;
    title.classList.add("news-title");
  
    let paragraph = document.createElement("p");
    paragraph.innerHTML = element.description;
    paragraph.classList.add("news-paragraph");
  
    let image = document.createElement("img");
    image.setAttribute('src', element.urlToImage);
    image.onclick = () => {
      event.stopPropagation();
      location.href = element.url;
    };
  
    image.classList.add("news-image");
  
    newElement.appendChild(title);
    newElement.appendChild(paragraph);
    newElement.appendChild(image);
    currentChannelBlock.appendChild(newElement);
  }
  
  createErrorBlock(currentChannelBlock) {
    let newElement = document.createElement("div");
    newElement.classList.add("item");
    newElement.classList.add("news-item-error");
    newElement.innerHTML = 'Sorry, there is no news for this channel or some error is occured. Try again later.'
    
    currentChannelBlock.appendChild(newElement);
  }
}
