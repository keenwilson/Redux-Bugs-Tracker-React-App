import { createAction, createReducer } from "@reduxjs/toolkit"

export const bugAdded = createAction("bugAdded")
export const bugRemoved = createAction("bugRemoved")
export const bugResolved = createAction("bugResolved")
export const bugUpdated = createAction("bugUpdated")

// Reducer
let lasId = 0

// Reducer has to be a default export in ducks pattern
export default createReducer([],{
    // actions:  functions (event => event handler)
    // Redux tollkit automatically pass this function to Immer for implementing immutable update pattern
    [bugAdded.type]: (bugs, action) => {
        bugs.push({id: ++lasId,
            description: action.payload.description,
            resolved: false})
    },
    [bugResolved.type]: (bugs, action) => {
        const index = bugs.findIndex(bug => bug.id === action.payload.id)
        bugs[index].resolved = true
    },
    [bugRemoved.type]: (bugs, action) => {
        bugs.filter(bug => bug.id !== action.payload.id)
    }

})

