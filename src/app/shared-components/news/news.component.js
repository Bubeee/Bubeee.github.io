import { NewsApiService } from '../../core';
import { DomService } from '../../core';
import './news.component.css';

export class NewsComponent {
  create(selector) {
    let newsService = new NewsApiService();
    let domService = new DomService();

    var channels = newsService.getChannels(element => {
      domService.createChannelItemBlock(
        selector,
        element,
        this.onChannelClickEvent
      );
    });
  }

  onChannelClickEvent(event, element) {
    if (event.target.classList.value !== 'item channel-item') {
        event.stopPropagation();
        return;
    }

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
}
