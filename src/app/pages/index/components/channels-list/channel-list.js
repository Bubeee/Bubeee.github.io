import { ChannelComponent } from './channel';
import '../news-list/news/news.component.scss';
import { fetchNews } from '../../../../core/services/redux/actions';
import { NewsComponent } from '../news-list/news';

export class ChannelList {
  constructor(store) {
    this.store = store;
  }

  renderChannels(channels) {
    let container = document.querySelector('#container');
    if (container.hasChildNodes()) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    }

    channels &&
      channels.forEach(channel => {
        let channelBlock = new ChannelComponent(
          channel.channelId,
          channel.channelName
        );

        let parentContainer = document.querySelector('#container');
        parentContainer.insertAdjacentHTML('beforeend', channelBlock.getHtml());

        let channelBlockOnAPage = document.querySelector(
          `#channel-${channel.channelId}`
        ).parentElement;
        channelBlockOnAPage.onclick = event =>
          this.onChannelClickEvent(event, channel);
      });
  }

  renderNews(channelId, news) {
    let container = document.querySelector(`#channel-${channelId}`);
    if (container.hasChildNodes()) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    }

    news &&
      news.forEach(n => {
        let newsBlock = new NewsComponent(
          n.title,
          n.description,
          n.url,
          n.urlToImage
        );

        container.insertAdjacentHTML('beforeend', newsBlock.getHtml());
      });
  }

  onChannelClickEvent(event, channel) {
    // if (event.target.classList.value !== 'channel-item') {
    //     event.stopPropagation();
    //     return;
    // }

    let currentChannelBlock = document.getElementById(
      `channel-${channel.channelId}`
    );
    if (currentChannelBlock.hasChildNodes()) {
      while (currentChannelBlock.firstChild) {
        currentChannelBlock.removeChild(currentChannelBlock.firstChild);
      }
    } else {
      this.store.dispatch(fetchNews(channel)(this.store.dispatch));
    }
  }
}
