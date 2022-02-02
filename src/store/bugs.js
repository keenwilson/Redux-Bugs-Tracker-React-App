// Action types
const BUG_ADDED = "bugAdded"
const BUG_REMOVED = "bugRemoved"
const BUG_RESOLVED = "bugResolved"

// Action creators
export const bugAdded = description => ({
    type: BUG_ADDED,
    payload: {
        description
    }
})

export const bugResolved = id => ({
    type: BUG_ADDED,
    payload: {
        id
    }
})

// Reducers
let lasId = 0

// reducer has to be a default export in ducks pattern
export default function reducer(state = [], action) {
    switch (action.type) {
        case BUG_ADDED:
            return [
                ...state,
                {id: ++lasId,
                description: action.payload.description,
                resolved: false}
            ]
        case BUG_REMOVED:
            return state.filter(bug => bug.id !== action.payload.id)
        case BUG_RESOLVED:
            // Update an existing bug object
            return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, resolved: true})
        default:
            return state
    }
}