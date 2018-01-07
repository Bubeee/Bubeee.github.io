import { NewsApiService } from './news-api-service';
import { ChannelUpdateTimeRegistry } from '../channel-update-time-registry';
import { config } from '../';

const dayInMilliseconds = config.newsUpdatePeriodMillisec;
const hourInMilliseconds = config.channelsUpdatePeriodMillisec;
let lastChannelsLastUpdateTime;
let channels;

const channelsNewsUpdateTimeRegistry = new ChannelUpdateTimeRegistry();

// fetching real channels from service every day
export class NewsApiServiceProxy extends NewsApiService {
  getChannels(callback) {
    if (
      !lastChannelsLastUpdateTime ||
      lastChannelsLastUpdateTime + dayInMilliseconds < Date.now()
    ) {
      let fetchPromise = super.getChannels(callback);
      fetchPromise.then(sources => {
        lastChannelsLastUpdateTime = Date.now();
        channels = sources;
        channels.forEach(element => {
          callback(element);
        });
      });
    }

    return (
      channels &&
      channels.forEach(element => {
        callback(element);
      })
    );
  }

  // fetching real data from service once in an hour
  getNews(channelId, okCallback, elseCallback) {
    const currentChannelNewsLastUpdateObject = channelsNewsUpdateTimeRegistry.get(
      channelId
    );

    if (
      !currentChannelNewsLastUpdateObject ||
      !currentChannelNewsLastUpdateObject.updateTime ||
      currentChannelNewsLastUpdateObject.updateTime + hourInMilliseconds <
        Date.now()
    ) {
      let fetchPromise = super.getNews(channelId, okCallback, elseCallback);
      fetchPromise.then(articles => {
        channelsNewsUpdateTimeRegistry.addOrUpdate(channelId, {
          updateTime: Date.now(),
          data: articles
        });

        if (articles) {
          articles.forEach(element => {
            okCallback(`#channel-${channelId}`, element);
          });
        } else {
          elseCallback(`#channel-${channelId}`);
        }
      });
    } else if (!currentChannelNewsLastUpdateObject.data) {
      elseCallback(`#channel-${channelId}`);
    }

    return (
      currentChannelNewsLastUpdateObject &&
      currentChannelNewsLastUpdateObject.data &&
      currentChannelNewsLastUpdateObject.data.forEach(element => {
        okCallback(`#channel-${channelId}`, element);
      })
    );
  }
}
