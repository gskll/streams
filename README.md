# Streams - React - Redux

Demo: https://youtu.be/tEunvHBvizg

Twitch clone allowing user to login wit h Google, create, edit and delete their own streams and view other users' streams

- React

- React-Router

- Redux, Redux-Form, Redux-Thunk

- Google OAuth API for authentication

- json-server package to serve stream data (name etc.)

- node-media-server to serve the stream videos

- Styling with semantic-ui

  

## Goals

- Implement a CRUD style app with React and Redux
  - API server with json-server package
  - Follows strict REST protocol
- Use React-Router for intentional and programmatic navigation
  - Custom history object with plain `Router` 
- Use Google OAuth for authentication
- Use Redux-Form for form handling
- Use React Portals for modals



## Main Architecture

- **rtmpserver/index.js** default node-media-server config copied from https://github.com/illuspas/Node-Media-Server#readme

  - run with `node index.js`

- **api/db.json** JSON 'database' that stores all our stream data for access with `json-server`

  - run with `json-server -p 3001 -w db.json`

  

```
client/src
├── actions
│   ├── index.js
│   └── types.js
├── apis
│   └── streams.js
├── components
│   ├── App.js 
│   ├── GoogleAuth.js
│   ├── Header.js
│   ├── Modal.js
│   └── streams
│       ├── StreamCreate.js
│       ├── StreamDelete.js
│       ├── StreamEdit.js
│       ├── StreamForm.js
│       ├── StreamList.js
│       └── StreamShow.js
├── history.js
├── index.js
└── reducers
    ├── authReducer.js
    ├── index.js
    ├── streamListOptionsReducer.js
    └── streamReducer.js
```

- **./index.js** project root used to attach `<App>` to DOM and set-up redux

- **./history.js** custom history object used with react-router <Router> for programmatic navigation

- **apis/streams.js** sets axios object to send REST requests to the json-server database



- **actions/types** defines types for actions/reducers to simplify debugging in case of typos

- **actions/index.js** defines actions for logging in/out, CRUD operations and setting the list options



- **reducers/index.js** combines reducers: custom and redux-form's `formReducer`

- **reducers/authReducer.js** handles sign in and sign out

- **reducers/streamListOptionsReducer.js** handles the root stream list's option: show all streams or just logged in users

- **reducers/streamReducer.js** handles main CRUD for the streams: fetch one, fetch all, create, edit, delete



- **components/App.js** root component handling react-router intentional navigation and displays the header

- **components/Header.js** always displays main nabber with links and sign-in button

- **components/Modal.js** re-usable modal component using a react portal

- **components/GoogleAuth.js** uses GoogleAuth API to handle authentication and display button in `<Header>`
   - sets up listener for change in authentication status
   - triggers SIGN_IN action to update state/re-render component on authentication change

 - **components/streams/StreamList.js** shows either all streams or just logged in user's streams

    - logged out: just stream list
    - logged in:
       - Option of seeing all streams or just your own
       - Shows admin (Edit/Delete) buttons on your own strings
       - Shows `Create Stream` button

 - **components/streams/StreamForm.js** re-usable redux-form component with client-side validation

 - **components/streams/StreamCreate.js** calls `<StreamForm>` with `onSubmit` of calling `createStream` action

 - **components/streams/StreamEdit.js** calls `<StreamForm>` with `onSubmit` of calling `editStream` action

    - current stream title and description passed down as initial values
    - works in isolation with `fetchStream` action

 - **components/streams/StreamDelete.js** calls `<Modal>` to display modal with option of deleting selected stream

 - **components/streams/StreamShow.js** displays stream information and `flv.js` video player with stream if live

   

## Issues/Fixes

- Attach listener to change in authentication to update state/trigger re-render on log-in/log-out

  - Fix: built-in GoogleAuth method
    - https://developers.google.com/identity/sign-in/web/reference#googleauthissignedinlistenlistener

- React-Router displaying `<StreamShow>` under `<StreamCreate>` when creating new stream

  - Path for `<StreamCreate>`: `/streams/new`
  - Path for `<StreamShow>`: `/streams/:id`
    - Router considering the `new` path as `:id` variable
  - Fix: wrap `<Route>` components in a `<Switch>` tag to enforce only showing one at a time
    - https://reactrouter.com/core/api/Switch

- Edit stream bug: would remove the `stream.userId` property

- ```json
  {
    "title": "My Stream",
    "description": "This is a great stream",
    "userId": "123",
    "id": 1
  },
  ```

- Became

  ```json
  {
    "title": "My Stream - edited",
    "description": "This is a great stream - edited",
    "id": 1
  },
  ```

- Fix: `editStream` action calling `PUT` request: strict REST `PUT` updates all properties apart from a few protected ones like `id`

  - `editStream` action submitting `formValues` of `title` and `description` only
  - Change `PUT` request to `PATCH` request to only update the changed values
