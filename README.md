# SWE-team-5-project-2

## Frontend

Our application was created with ReactJS. It is a single page application that implements a react router located at App.js, with each component stored in its own directory in /frontend/src.
Material UI components are utilized in the styling of each page. Documentation can be found at https://mui.com/components/.
It is important to note that authentication for the Spotify API is actually done in the frontend. The login page of our application redirects to Spotify’s login page, which returns a unique token for the user that logs in. This token is then stored and required for all data requests made from our application to Spotify.

## Api

Our application utilizes express for its backend API. This API forwards some requests to Spotify’s API and also manages interactions with our firestore database.

### Database Layout
The database is stored in a Firebase Firestore database. Documentation for Firestore is found at https://firebase.google.com/docs/firestore.

User data not managed by Spotify is stored within the `users` collection. Forum data is stored within the `forum` collection. Direct messages between users are stored in sub-collections on those users named `dms`. The messages received by a user are stored in that user’s sub-collection. The messages posted on a forum are stored in a sub-collection on that forum called `messages`.

User profiles are linked to their corresponding Spotify profiles via the `spotifyId` field on each user. If the user’s name, profile picture, or non-SpotifyShare specific data is required then this ID must be used to make a secondary request through Spotify to retrieve that information.

### Requests
Most requests through our API, including some SpotifyShare specific functionality like requesting DMs, require an Oauth2 token from Spotify to be specified as a query parameter named `spotifyToken`. This is because our API eagerly expands IDs it encounters out into actual database objects. The upside of this is that our API is convenient to use on the frontend, but can have unexpected performance drawbacks since a single request can correspond to multiple requests on the backend.

`GET /profile`: requires a `spotifyToken` query parameter and can also accept a `firestoreId` or `spotifyId` to specify which profile to fetch. Responds with the user’s `spotifyId`, `firestoreId`, SpotifyShare profile, and spotify username.

`GET /profile/name`: gets the Spotify username of a user given their `firestoreId`.

`GET /profile/public`: gets a complete list of public profiles, and automatically fetches relevant information from Spotify 

`GET /profile/display-info`: gets displayable information for a profile from Spotify

`GET /profile/top-songs`, `GET /profile/top-artists`, and `GET /profile/liked-songs` all mirror their respective Spotify APIs, but require the token to be a query parameter.

`PUT /profile`: requires a `firestoreId` as a query parameter, and will update the user’s firestore profile with the fields given in the request body.

`GET /profile/dms`: requires the same query parameters as `GET /profile`, and returns all the incoming DMs for the specified user.

`GET /profile/dms-to`: similar to `GET /profile/dms` but gets the DMs sent by the user identified by the `selfFirestoreId` query parameter to the user identified by the remaining query parameters.

`POST /profile/dms`: sends a DM to the user identified by the query parameters. The author is specified in the body of this request.

`GET /forums`: gets a complete list of forums in the Firestore database.

`POST /forums`: adds a new forum to the Firestore database with fields provided in the body of the post request.

`GET /forums/messages`: requires a `name` query parameter to specify by name which forum to fetch. Responds with a complete list of messages for that forum in the Firestore database.

`POST /forums/messages`: requires a `name` query parameter to specify by name which forum to add to. Adds a new message to the Firestore database under the specified forum with fields provided in the body of the post request.
