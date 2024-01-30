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
