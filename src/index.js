import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import * as Sentry from '@sentry/browser'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import LogRocket from 'logrocket'
import ReactGA from 'react-ga'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://f0118327f72d4186ace6ce17ecd278c9@sentry.io/1527426'
  })

  LogRocket.init('alex-lee/hermes-vjulr')

  ReactGA.initialize('UA-124507483-6')
  ReactGA.pageview(window.location.pathname + window.location.search)
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
