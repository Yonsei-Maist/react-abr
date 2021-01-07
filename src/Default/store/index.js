/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.01.06
 */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from './reducers';

const saga = createSagaMiddleware();

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(saga),
            window.devToolsExtension
                ? window.devToolsExtension()
                : (f) => f
        )
    );

    store.runSaga = saga.run;
    store.close = () => store.dispatch(END);

    return store;
}