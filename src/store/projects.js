import { createSlice } from "@reduxjs/toolkit"

let lastId = 0

const slice = createSlice({
    name: "projects",
    initialState: [],
    reducers: {
        // actions => action handlers
        projectAdded: (projects, action) => {
            projects.push({id: ++lastId,
                name: action.payload.name})
        },
        

    }
})

// Name export actions outside of the module
export const {projectAdded} = slice.actions
// Reducer has to be a default export in ducks pattern
export default slice.reducer