import { compose, createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import rootReducer from './reducers';

const middleware = [];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, {}, enhancers);

export default store;
