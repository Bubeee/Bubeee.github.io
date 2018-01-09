import { NewsComponent } from '../../shared-components/news/news.component';
import { ChannelComponent } from '../../shared-components/channel/channel.component';
import { DomBuilder, $ } from '../../core/utils';
import reducers from '../../core/redux/reducers';
import { createStore } from '../../core/redux/store';
import {
  fetchNews,
  fetchChannels,
  selectChannel,
  requestChannels
} from '../../core/redux/actions';
import { NewsApiServiceProxy } from '../../core/services';

import './index.scss';
import '../../shared-components/news/news.component.scss';

const store = createStore(reducers);

let channels = [];

export const init = containerSelector => {
  store.subscribe(onChannelsReceived);
  store.dispatch(fetchChannels()(store.dispatch));
  // store.dispatch(selectChannel('abc-news-au'));
  // store.dispatch(fetchNews('abc-news-au')(store.dispatch));

  let buttonContainerBlock = document.querySelector(containerSelector);

  if (buttonContainerBlock.childElementCount !== 0) {
    while (buttonContainerBlock.firstChild) {
      buttonContainerBlock.removeChild(buttonContainerBlock.firstChild);
    }
    return;
  }
};

const onChannelsReceived = () => {
  let domBuilder = new DomBuilder();
  channels = store.getState().channels;

  renderChannels(channels);
};

const renderChannels = () => {
  let container = $('#container');
  if (container.hasChildNodes()) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  channels && channels.forEach(element => {
    let channelBlock = new ChannelComponent(element, element);

    let parentContainer = $('#container');
    parentContainer.insertAdjacentHTML('beforeend', channelBlock.getHtml());
    // let channelBlockOnAPage = $(`#channel-${element}`).parentElement;
    // channelBlockOnAPage.onclick = event => actionOnClick(event, element);
  });
};

const create = selector => {
  let newsService = new NewsApiServiceProxy();
  let domBuilder = new DomBuilder();
  var channels = newsService.getChannels(element => {
    domBuilder.createChannelItemBlock(
      selector,
      element,
      this.onChannelClickEvent
    );
  });
};

const onChannelClickEvent = (event, element) => {
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
};
