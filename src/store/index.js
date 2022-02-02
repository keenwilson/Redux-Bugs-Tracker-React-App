import configureStore from './configureStore'
import * as actions from './api'

const store = configureStore()
console.log(store.getState())

// Actions that indicate API calls
store.dispatch(
  actions.apiCallBegan({
    url: '/bugs',
    onSuccess: 'bugsReceived',
    onError: 'apiRequestFailed'
  })
)
