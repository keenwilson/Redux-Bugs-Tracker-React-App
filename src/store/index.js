import configureStore from './configureStore'
import { addBug, loadBugs } from './bugs'

const store = configureStore()
console.log(store.getState())

// Actions that indicate API calls
store.dispatch(loadBugs())
