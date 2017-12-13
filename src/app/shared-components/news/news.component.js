import { NewsApiService } from '../../core/news-api-service';
import { DomService } from '../../core/dom-service';
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
