# Real-Time Chat with Node.js

## Description
This project is a real-time chat application built with Node.js and Socket.IO. It allows users to send and receive instant messages through a simple command-line interface.

## Features
- Real-time communication between users
- Easy-to-use command-line interface
- User identification through unique IDs
- Direct messaging between users

## Technologies Used
- Node.js
- Socket.IO
- Express.js

# Install dependencies:

  ```
npm install
  ```

# Usage

Start the server:
  ```
   npm start
  ```
# Set up environment variables:
- Create a `.env` file in the root directory
- Add the following variables:
  ```
  PORT=3000
  MONGODB_URI=mongodb://localhost:27017/chatapp
  JWT_SECRET=your_jwt_secret
  ```
- Adjust the values according to your setup

## Environment Variables
- `PORT`: The port on which the server will run (default: 3000)
- `MONGODB_URI`: The connection string for your MongoDB database

# Follow the on-screen instructions:
- Register some users at `http://localhost:3000/api/auth/login`
- Open the terminal and type `node server.js`
- Enter your user ID (username)
- Open another terminal and repeat with a different user ID.
- Enter the ID(username) of the user you want to send messages to
- Type your messages and press Enter to send
- Type "exit" to end the session

## Project Structure
- `server.js`: Main server configuration
- `socket/chatHandler.js`: Socket.IO event handling
- `test-client.js`: Test client for command-line interface

