var mongoose = require("mongoose")
var dotenv = require("dotenv")
var Movie = require("./models/Movie")
var Theater = require("./models/Theater")

dotenv.config()

var movies = [
  {
    title: "Interstellar",
    genre: ["Sci-Fi", "Adventure"],
    rating: "PG-13",
    duration: 169,
    imdb: 8.6,
    releaseDate: "2024-11-07",
    language: "English",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    status: "now_showing"
  },
  {
    title: "Dune: Part Two",
    genre: ["Sci-Fi", "Action"],
    rating: "PG-13",
    duration: 166,
    imdb: 8.5,
    releaseDate: "2024-03-01",
    language: "English",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/eeHFMFpH2Wl7n7Pj0ZMYJ5S5lYt.jpg",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    status: "now_showing"
  },
  {
    title: "Oppenheimer",
    genre: ["Drama", "History"],
    rating: "R",
    duration: 180,
    imdb: 8.9,
    releaseDate: "2024-07-21",
    language: "English",
    description: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during WWII.",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
    status: "now_showing"
  }
]

var theaters = [
  {
    name: "CineMax - Phoenix Mall",
    location: "Velachery, Chennai",
    facilities: ["Dolby Atmos", "4K", "Recliner Seats"],
    screens: 5
  },
  {
    name: "PVR - Express Avenue",
    location: "Royapettah, Chennai",
    facilities: ["IMAX", "3D", "Premium Lounge"],
    screens: 8
  },
  {
    name: "INOX - Nexus Mall",
    location: "Gomti Nagar, Chennai",
    facilities: ["Dolby Vision", "4DX", "Recliners"],
    screens: 6
  }
]

mongoose.connect(process.env.MONGO_URI)
  .then(function () {
    console.log("MongoDB connected!")
    return Movie.deleteMany({})
  })
  .then(function () {
    return Theater.deleteMany({})
  })
  .then(function () {
    return Movie.insertMany(movies)
  })
  .then(function () {
    return Theater.insertMany(theaters)
  })
  .then(function () {
    console.log("Seed data added successfully!")
    process.exit()
  })
  .catch(function (err) {
    console.log("Seed error:", err)
    process.exit(1)
  })