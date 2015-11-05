import {
  INVALIDATE_TOPICLIST,
  REQUEST_TOPICLIST,
  RECEIVE_TOPICLIST
} from '../constants/ActionTypes';

export default function topicList(state = {
  isFetching: false,
  didInvalidate: false,
  list: [],
  hasMore: false,
  page: 0
}, action) {
  switch (action.type) {
    case INVALIDATE_TOPICLIST:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_TOPICLIST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_TOPICLIST:
      if (action.topicList.page !== 1) {
        action.topicList.list = state.list.concat(action.topicList.list);
      }

      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        list: action.topicList.list,
        hasMore: action.topicList.has_next,
        page: action.topicList.page
      });
    default:
      return state;
  }
}