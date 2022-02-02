import { createSlice } from "@reduxjs/toolkit"


let lastId = 0

// Internally createSlice will call createAction() and createReducer()
const slice = createSlice({
    name: "bugs",
    initialState: [],
    reducers: {
        // actions => action handlers
        bugAdded: (bugs, action) => {
            bugs.push({id: ++lastId,
                description: action.payload.description,
                resolved: false})
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
export const {bugAdded, bugResolved, bugRemoved} = slice.actions
// Reducer has to be a default export in ducks pattern
export default slice.reducer