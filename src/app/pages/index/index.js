import 'isomorphic-fetch';
import { NewsApiService } from '../../core/news-api-service';
import { DomService } from '../../core/dom-service';
import './index.css';

function init(containerSelector) {
  let newsService = new NewsApiService();
  let domService = new DomService();

  var channels = newsService.getChannels(element => {
    domService.createChannelItemBlock(
      '#container',
      element,
      onChannelClickEvent
    );
  });
}

function onChannelClickEvent(event, element) {
  let currentChannelBlock = document.querySelector(`#channel-${element.id}`);

  if (currentChannelBlock.hasChildNodes()) {
    while (currentChannelBlock.firstChild) {
      currentChannelBlock.removeChild(currentChannelBlock.firstChild);
    }
  } else {
    let newsService = new NewsApiService();
    let domService = new DomService();
    var news = newsService.getNews(
      element.id,
      domService.createNewsBlock,
      domService.createErrorBlock
    );
  }
}

init('#container');
