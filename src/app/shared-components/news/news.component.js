import { NewsApiServiceProxy } from '../../core/services';
import { DomBuilder } from '../../core/utils/dom-builder';
import './news.component.scss';

export class NewsComponent {
  create(selector) {
    let newsService = new NewsApiServiceProxy();
    let domBuilder = new DomBuilder();

    var channels = newsService.getChannels(element => {
      domBuilder.createChannelItemBlock(
        selector,
        element,
        this.onChannelClickEvent
      );
    });
  }

  onChannelClickEvent(event, element) {
    // if (event.target.classList.value !== 'channel-item') {
    //     event.stopPropagation();
    //     return;
    // }

    let currentChannelBlock = document.querySelector(`#channel-${element.id}`);
    if (currentChannelBlock.hasChildNodes()) {
      while (currentChannelBlock.firstChild) {
        currentChannelBlock.removeChild(currentChannelBlock.firstChild);
      }
    } else {
      let newsService = new NewsApiServiceProxy();
      let domBuilder = new DomBuilder();
      newsService.getNews(
        element.id,
        domBuilder.createNewsBlock,
        domBuilder.createErrorBlock
      );
    }
  }
}
