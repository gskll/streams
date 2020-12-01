# Streams - React - Redux

Twitch clone using React, Redux and React-Router

Live deployment: 

## Goals

- Implement a CRUD style app with React/Redux
- Use React-Router for SPA navigation
- Use Google OAuth for authentication



## Authentication

- Uses Google Auth API
- Create GoogleAuth component to fetch AuthInstance and display login/out button in header
  - Set up listener for auth change 
- Redux store for sign-in status and user id
- Click sign in button -> Google Auth sign in -> listener triggers SIGN_IN action to update state