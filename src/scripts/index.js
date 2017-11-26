const newsApiKey = "d59e89ef28f2495496fadd4aceef0a34";
const newsApiBaseAddress = "https://newsapi.org";

function getChannels(selector) {
  fetch(`${newsApiBaseAddress}/v2/sources?apiKey=${newsApiKey}`, {
    method: "get"
  }).then(function(response) {    
    response.json().then((data) => {
      let infoContainer = document.querySelector(selector);

      data.sources.forEach(element => {
        var newElement = document.createElement('div');
        newElement.innerHTML = element.name;
        newElement.id = element.id;
        newElement.classList.add('channel-item');
        infoContainer.appendChild(newElement);
      });
    });
  });
}

function getNews(channelId) {
  fetch(`${newsApiBaseAddress}/v1/articles?source=${channelId}&apiKey=${newsApiKey}`, {
    method: "get"
  }).then(function(response) {    
    response.json().then((data) => {
      let currentBlock = document.querySelector(channelId);

      data.sources.forEach(element => {
        var newElement = document.createElement('div');
        newElement.innerHTML = element.name;
        newElement.id = element.id;
        newElement.classList.add('channel-item');
        currentBlock.appendChild(newElement);
      });
    });
  });
}

getChannels('.container')
