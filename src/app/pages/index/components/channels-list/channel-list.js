import { ChannelComponent } from './channel';
import '../news-list/news/news.component.scss';

export class ChannelList {
  renderChannels(channels) {
    let container = document.querySelector('#container');
    if (container.hasChildNodes()) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    }

    channels &&
      channels.forEach(element => {
        let channelBlock = new ChannelComponent(
          element,
          element
        );
        let parentContainer = document.querySelector('#container');
        parentContainer.insertAdjacentHTML('beforeend', channelBlock.getHtml());

        // TODO: something wrong with this

        // let channelBlockOnAPage = parentContainer.querySelector(`#channel-${element.id}`).parentElement;
        // channelBlockOnAPage.onclick = event => actionOnClick(event, element);
      });
  };

  // TODO: reimplement
  onChannelClickEvent (event, element) {
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
      // let newsService = new NewsApiServiceProxy();
      // let domBuilder = new DomBuilder();
      // newsService.getNews(
      //   element.id,
      //   domBuilder.createNewsBlock,
      //   domBuilder.createErrorBlock
      // );
    }
  };
}
