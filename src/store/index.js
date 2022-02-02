import configureStore from './configureStore'
import { addBug, loadBugs, resolveBug, assignBugToUser } from './bugs'

const store = configureStore()

// Actions that indicate API calls
store.dispatch(loadBugs())

setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000)
setTimeout(() => store.dispatch(resolveBug(1)), 2000)
