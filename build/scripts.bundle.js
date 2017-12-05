"use strict";

var _newsService = require("news-service.js");

function createNewsBlock(currentChannelBlock, element) {
  var newElement = document.createElement("div");
  newElement.classList.add("item");
  newElement.classList.add("news-item");
  newElement.onclick = function () {
    return event.stopPropagation();
  };

  var title = document.createElement("a");
  title.innerHTML = element.title;
  title.href = element.url;
  title.classList.add("news-title");

  var paragraph = document.createElement("p");
  paragraph.innerHTML = element.description;
  paragraph.classList.add("news-paragraph");

  var image = document.createElement("img");
  image.setAttribute('src', element.urlToImage);
  image.onclick = function () {
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
  var newElement = document.createElement("div");
  newElement.classList.add("item");
  newElement.classList.add("news-item-error");
  newElement.innerHTML = 'Sorry, there is no news for this channel or some error is occured. Try again later.';

  currentChannelBlock.appendChild(newElement);
}

var newsService = new _newsService.NewsService();
newsService.getChannels(".container");
