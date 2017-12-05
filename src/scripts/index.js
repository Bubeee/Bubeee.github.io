import { NewsService } from "news-service.js";

function createNewsBlock(currentChannelBlock, element) {
  let newElement = document.createElement("div");
  newElement.classList.add("item");
  newElement.classList.add("news-item");
  newElement.onclick = () => event.stopPropagation();

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

function createErrorBlock(currentChannelBlock) {
  let newElement = document.createElement("div");
  newElement.classList.add("item");
  newElement.classList.add("news-item-error");
  newElement.innerHTML = 'Sorry, there is no news for this channel or some error is occured. Try again later.'
  
  currentChannelBlock.appendChild(newElement);
}

let newsService = new NewsService();
newsService.getChannels(".container");
