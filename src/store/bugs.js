import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import moment from 'moment'
import { apiCallBegan } from './api'

// Internally createSlice will call createAction() and createReducer()
const slice = createSlice({
  name: 'bugs',
  initialState: { list: [], loading: false, lastFetch: null },
  reducers: {
    // actions => action handlers
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload)
    },
    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload
      const index = bugs.list.findIndex(bug => bug.id === bugId)
      bugs.list[index].userId = userId
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload
      bugs.loading = false
      bugs.lastFetch = Date.now()
    },
    bugsRequested: (bugs, action) => {
      bugs.loading = true
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id)
      bugs.list[index].resolved = true
    },
    bugRemoved: (bugs, action) => {
      bugs.list.filter(bug => bug.id !== action.payload.id)
    }
  }
})

// Name export actions outside of the module
export const {
  bugAdded,
  bugAssignedToUser,
  bugsReceived,
  bugRemoved,
  bugsRequested,
  bugsRequestFailed,
  bugResolved
} = slice.actions
// Reducer has to be a default export in ducks pattern
export default slice.reducer

// Action Creators
const url = '/bugs'

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')

  if (diffInMinutes < 10) return

  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type
    })
  )
}

export const addBug = bug =>
  apiCallBegan({
    url,
    method: 'post',
    data: bug,
    onSuccess: bugAdded.type
  })

// Selector

// Memoization
// Build the cache of input and output
//  f(x) => y { input : 1 , output : 2 }
// If the list of bugs is not change => get unresolved bugs from the cache
export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  state => state.entities.projects,
  (bugs, projects) => bugs.filter(bug => !bug.resolved)
)

// Instead of setting getBugsByUser to a constant,
// Set getBugsByUser to a different function
// This function takes a parameter called userId
// and returns the value that is returned from the createSelector function
export const getBugsByUser = userId =>
  createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId)
  )
