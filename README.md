# PopcornPass Backend 🍿

REST API for the PopcornPass movie ticket booking application built with Node.js, Express and MongoDB.

## Live API

https://movie-booking-backend-k3uc.onrender.com

## API Endpoints

### Movies
- GET /api/movies - Get all movies
- GET /api/movies/:id - Get movie by id
- POST /api/movies - Create a movie
- PUT /api/movies/:id - Update a movie
- DELETE /api/movies/:id - Delete a movie

### Bookings
- GET /api/bookings - Get all bookings
- GET /api/bookings/:id - Get booking by id
- GET /api/bookings/user/:email - Get bookings by user email
- POST /api/bookings - Create a booking
- PUT /api/bookings/cancel/:id - Cancel a booking

### Theaters
- GET /api/theaters - Get all theaters
- POST /api/theaters - Create a theater
- DELETE /api/theaters/:id - Delete a theater

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- Dotenv
- Deployed on Render

## Getting Started

### Install dependencies
npm install

### Create .env file
PORT=5000
MONGO_URI=your_mongodb_connection_string

### Run development server
npm run dev

### Run production server
npm start

### Seed database
node seed.js

## Folder Structure

movie-booking-backend/
├── models/
│   ├── Movie.js
│   ├── Booking.js
│   └── Theater.js
├── routes/
│   ├── movieRoutes.js
│   ├── bookingRoutes.js
│   └── theaterRoutes.js
├── controllers/
│   ├── movieController.js
│   ├── bookingController.js
│   └── theaterController.js
├── seed.js
└── server.js