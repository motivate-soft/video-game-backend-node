const { Genre } = require("./models/genre");
const { Game } = require("./models/game");
const mongoose = require("mongoose");
const config = require("config");
const moment = require("moment");

const data = [
  {
    name: "Yoga",
    type: "fitness",
    games: [
      { title: "Yoga - 1", description: "Game description - 1", releaseDate: moment().toJSON() },
      { title: "Yoga - 2", description: "Game description - 2", releaseDate: moment().toJSON() },
      { title: "Yoga - 3", description: "Game description - 3", releaseDate: moment().toJSON() },
    ]
  },
  {
    name: "Slimming",
    type: "fitness",
    games: [
      { title: "slimming - 1", description: "Game description - slimming1", releaseDate: moment().toJSON() },
    ]
  },
  {
    name: "park",
    type: "social",
    games: [
      { title: "park - 1", description: "Game description - park1", releaseDate: moment().toJSON() },
    ]
  },
  {
    name: "battle tank",
    type: "game",
    games: [
      { title: "battle-tank", description: "Game description - battle tank", releaseDate: moment().toJSON() },
    ]
  }
];

async function seed() {
  await mongoose.connect(config.get("db"));

  await Game.deleteMany({});
  await Genre.deleteMany({});

  for (let genre of data) {
    const { _id: genreId } = await new Genre({ name: genre.name, type: genre.type }).save();
    const games = genre.games.map(game => ({
      ...game,
      genre: { _id: genreId, name: genre.name, type: genre.type }
    }));
    await Game.insertMany(games);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
