# Bugs Tracker Application using Redux

Using `react-redux` library to connecting React app to Redux store

## React UI

- A text box for entering information about a bug we just discover
- The users can:
  - Add this bug to the list
  - Remove a bug
  - Mark a bug as resolved
  - Change the status to in progress
  - Filter the list of bugs
  - Sort the list of bugs
  - Assign a bug to a team member
  - Get the list of bugs assigned to a team member

## Redux

- Subscribe to Redux store to get the data
- Dispatch Redux action to trigger updates

### Design the store

```shell
{
  bugs: [
    {
      id: 1,
      description: "",
      resolved: false
    }
  ],
  currentUser: {}
}
```

### Define the actions

`Action` is a plain JavaScript describing what just happened. `type` is the only property that redux expects. You can use any `type` that are serializable. In this project, we used `string` because, unlike number, string is descriptive.

`payload` is an object that contains all data about the action. `payload` only contains the minimum information we need for the action to update the system.

- Add a bug

```
export const bugAdded = description => ({
    type: BUG_ADDED,
    payload: {
        description
    }
})
```

```

- Mark as Resolved

```
export const bugResolved = id => ({
    type: BUG_ADDED,
    payload: {
        id
    }
})
```



### Create a Reducer

`Reducer` is a function that takes two parameters - the current state and the action. The job of the `Reducer` is to return a new state based on the action.

`Reducer` is a pure function -- if it is called multiple time, given the same argument , it always return the same result. It's free of side effects. It will not touch DOM elements, not touch global states, not make API calls because all these operations can change the state of our system as a whole.

```
// Reducer
let lasId = 0

// Reducer has to be a default export in ducks pattern
export default function reducer(state = [], action) {
    switch (action.type) {
        case bugAdded.type:
            return [
                ...state,
                {id: ++lasId,
                description: action.payload.description,
                resolved: false}
            ]
        case bugRemoved.type:
            return state.filter(bug => bug.id !== action.payload.id)
        case bugResolved.type:
            // Update an existing bug object
            return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, resolved: true})
        default:
            return state
    }
}
```
