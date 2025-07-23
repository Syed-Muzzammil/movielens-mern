const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Movie = require('./models/Movie');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    return insertMovies();
  })
  .catch((err) => console.error("Connection error", err));

async function insertMovies() {
  const movies = [
    {
      title: "Inception",
      trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
      actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
      description: "A skilled thief uses dream-sharing technology to steal corporate secrets.",
      genre: "Science Fiction"
    },
    {
      title: "Interstellar",
      trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
      actors: ["Matthew McConaughey", "Anne Hathaway"],
      description: "Explorers travel through a wormhole to find a new home for humanity.",
      genre: "Adventure, Drama, Sci-Fi"
    },
    {
      title: "The Dark Knight",
      trailerUrl: "https://www.youtube.com/embed/EXeTwQWrcwY",
      actors: ["Christian Bale", "Heath Ledger"],
      description: "Batman faces his greatest psychological and physical tests when he confronts the Joker.",
      genre: "Action, Crime, Drama"
    },
    {
      title: "Avengers: Endgame",
      trailerUrl: "https://www.youtube.com/embed/TcMBFSGVi1c",
      actors: ["Robert Downey Jr.", "Chris Evans"],
      description: "The Avengers assemble for a final showdown to reverse the damage caused by Thanos.",
      genre: "Action, Adventure, Sci-Fi"
    },
    {
      title: "Iron Man",
      trailerUrl: "https://www.youtube.com/embed/8ugaeA-nMTc",
      actors: ["Robert Downey Jr.", "Gwyneth Paltrow"],
      description: "A billionaire industrialist builds a high-tech suit to fight crime and terrorism.",
      genre: "Action, Sci-Fi"
    },
    {
      title: "The Matrix",
      trailerUrl: "https://www.youtube.com/embed/vKQi3bBA1y8",
      actors: ["Keanu Reeves", "Laurence Fishburne"],
      description: "A hacker discovers the truth about reality and joins a rebellion against machines.",
      genre: "Action, Sci-Fi"
    },
    {
      title: "Joker",
      trailerUrl: "https://www.youtube.com/embed/zAGVQLHvwOY",
      actors: ["Joaquin Phoenix", "Robert De Niro"],
      description: "A mentally troubled comedian embarks on a downward spiral into madness.",
      genre: "Crime, Drama, Thriller"
    },
    {
      title: "Fight Club",
      trailerUrl: "https://www.youtube.com/embed/SUXWAEX2jlg",
      actors: ["Brad Pitt", "Edward Norton"],
      description: "An insomniac forms an underground fight club that evolves into something far more.",
      genre: "Drama"
    },
    {
      title: "The Shawshank Redemption",
      trailerUrl: "https://www.youtube.com/embed/6hB3S9bIaco",
      actors: ["Tim Robbins", "Morgan Freeman"],
      description: "Two imprisoned men bond over years, finding solace and eventual redemption.",
      genre: "Drama"
    },
    {
      title: "The Godfather",
      trailerUrl: "https://www.youtube.com/embed/sY1S34973zA",
      actors: ["Marlon Brando", "Al Pacino"],
      description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
      genre: "Crime, Drama"
    }
  ];

  try {
    await Movie.deleteMany({}); // Clear existing entries (optional)
    await Movie.insertMany(movies);
    console.log("Movies inserted successfully");
  } catch (err) {
    console.error("Error inserting movies:", err);
  } finally {
    mongoose.disconnect();
  }
}
