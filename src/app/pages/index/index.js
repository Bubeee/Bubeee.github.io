import { ChannelList } from './components/channels-list/channel-list';
import reducers from '../../core/services/redux/reducers';
import { createStore } from '../../core/services/redux/store';
import {
  fetchNews,
  fetchChannels,
  selectChannel
} from '../../core/services/redux/actions';
import { NewsApiServiceProxy } from '../../core/services';

import './index.scss';
import { ChannelList } from './components/channels-list/channel-list';

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
  channels = store.getState().channels;

  var channelsList = new ChannelList();
  channelsList.renderChannels(channels);
};

export const onChannelClick = channelId => {
  store.dispatch(fetchNews(channelId)(store.dispatch));
};
