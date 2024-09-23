# Spygram Backend

This is the backend server for the Spygram application, providing API endpoints and WebSocket connections for real-time Instagram follower monitoring.

## Features

- RESTful API for user follower information
- WebSocket server for real-time updates
- Simulated Instagram service for development and testing

## Technologies Used

- Node.js
- Fastify
- TypeScript
- WebSocket (ws)
- Pino for logging

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

git clone [https://github.com/Jeanikt/spygram-backend.git](https://github.com/Jeanikt/spygram-backend.git)

cd spygram-backend

2. Install dependencies:

npm install


3. Create a `.env` file in the root directory and add the following:

PORT=3001
CLIENT_URL=[http://localhost:3000](http://localhost:3000)
INSTAGRAM_API_BASE_URL=[https://api.instagram.com/v1](https://api.instagram.com/v1)
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here


### Running the Server

For development:

npm run dev

For production:

npm run build
npm start


The server will be running at `http://localhost:3001`.

## API Endpoints

- `GET /api/users/:username/followers`: Get followers for a specific user
- `POST /api/monitor`: Start monitoring a user
- `POST /api/stop-monitor`: Stop monitoring a user
- `GET /ws`: WebSocket endpoint for real-time updates

## Project Structure

- `src/app.ts`: Main application file
- `src/routes`: API route definitions
- `src/controllers`: Request handlers
- `src/services`: Business logic and external service integrations
- `src/config`: Configuration files

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.