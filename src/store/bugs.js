import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

let lastId = 0

// Internally createSlice will call createAction() and createReducer()
const slice = createSlice({
  name: 'bugs',
  initialState: [],
  reducers: {
    // actions => action handlers
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false
      })
    },
    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload
      const index = bugs.findIndex(bug => bug.id === bugId)
      bugs[index].userId = userId
    },
    bugResolved: (bugs, action) => {
      const index = bugs.findIndex(bug => bug.id === action.payload.id)
      bugs[index].resolved = true
    },
    bugRemoved: (bugs, action) => {
      bugs.filter(bug => bug.id !== action.payload.id)
    }
  }
})

// Name export actions outside of the module
export const { bugAdded, bugAssignedToUser, bugResolved, bugRemoved } =
  slice.actions
// Reducer has to be a default export in ducks pattern
export default slice.reducer

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
