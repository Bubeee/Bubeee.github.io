import { REQUEST_NEWS, RECEIVE_NEWS, INVALIDATE_NEWS } from "../constants/news";

export const news = (
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case INVALIDATE_NEWS:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_NEWS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_NEWS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.news,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

export const newsByChannel = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_NEWS:
    case RECEIVE_NEWS:
    case REQUEST_NEWS:
      return Object.assign({}, state, {
        [action.channel]: news(state[action.channel], action)
      });
    default:
      return state;
  }
}
