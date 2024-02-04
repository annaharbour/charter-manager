# Install dependencies

npm install

# Set up the database

npm run setup-db

# Start the server

npm start

# Routes

- Endpoint: /api/commanders/:id
  Method: GET
  Description: Retrieve information about a specific commander by their ID.

- Endpoint: /api/commanders/:id
  Method: PUT
  Description: Update details of a commander identified by their ID.

- Endpoint: /api/commanders/:id
  Method: DELETE
  Description: Remove a commander from the system based on their ID.

- Endpoint: /api/commanders/charter/:charterId
  Method: GET
  Description: Retrieve a list of commanders associated with a specific charter.
  Charter Routes (/api/charters)

- Endpoint: /api/charters/:charterId
  Method: GET
  Description: Retrieve information about a specific charter by its ID.

- Endpoint: /api/charters
  Method: GET
  Description: Retrieve a list of all charters.

- Endpoint: /api/charters
  Method: POST
  Description: Create a new charter.

- Endpoint: /api/auth/signup
  Method: POST
  Description: Creates a new user.

- Endpoint: /api/auth/signin
  Method: POST
  Description: Signs in a user.

- Endpoint: /api/auth/signout
  Method: POST
  Description: Signs out a user.

- Endpoint: /api/auth
  Method: GET
  Description: Gets users.

- Endpoint: /api/auth/:id
  Method: GET
  Description: Gets user by id.

- Endpoint: /api/auth/:id
  Method: PUT
  Description: Updates user by id.

- Endpoint: /api/auth/:id
  Method: DELETE
  Description: Deletes user by id.
