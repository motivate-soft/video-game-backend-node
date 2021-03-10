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
      { title: "Yoga - 1", description: "Game description - 1", releaseDate: moment().toJSON(), contentRating:2, numberOfPlayer: 1,
        size: 100, platform: "Desktop", author: "Someone", source: "Some link", instruction: "Press any key or touch screen to start",
        controller: ['controller1', 'controller2'],
        downloads: 100, playtime: 30, loves: 5, likes: 10, dislikes: 4, videos: ["video1", "video2"], scores: ["field1", "field2"], reviews: ['review1', 'reivew2'] },
      { title: "Yoga - 2", description: "Game description - 2", releaseDate: moment().toJSON(), contentRating:2, numberOfPlayer: 1,
        size: 200, platform: "Desktop", author: "Someone", source: "Some link", instruction: "Press any key or touch screen to start",
        controller: ['controller1', 'controller2'],
        downloads: 50, playtime: 30, loves: 5, likes: 10, dislikes: 4, videos: ["video1", "video2"], scores: ["field1", "field2"], reviews: ['review1', 'reivew2'] },
      { title: "Yoga - 3", description: "Game description - 3", releaseDate: moment().toJSON(), contentRating:2, numberOfPlayer: 1,
        size: 60, platform: "Desktop", author: "Someone", source: "Some link", instruction: "Press any key or touch screen to start",
        controller: ['controller1', 'controller2'],
        downloads: 10, playtime: 10, loves: 2, likes: 10, dislikes: 0, videos: ["video1", "video2"], scores: ["field1", "field2"], reviews: ['review1', 'reivew2'] },
    ]
  },
  {
    name: "Slimming",
    type: "fitness",
    games: [
      { title: "slimming - 1", description: "Game description - slimming1", releaseDate: moment().toJSON(), contentRating:2, numberOfPlayer: 1,
        size: 100, platform: "Desktop", author: "Someone", source: "Some link", instruction: "Press any key or touch screen to start",
        controller: ['controller1', 'controller2'],
        downloads: 2010, playtime: 30, loves: 200, likes: 1010, dislikes: 4, videos: ["video1", "video2"], scores: ["field1", "field2"], reviews: ['review1', 'reivew2'] },
    ]
  },
  {
    name: "park",
    type: "social",
    games: [
      { title: "park - 1", description: "Game description - park1", releaseDate: moment().toJSON(), contentRating:2, numberOfPlayer: 1,
        size: 300, platform: "Desktop", author: "Someone", source: "Some link", instruction: "Press any key or touch screen to start",
        controller: ['controller1', 'controller2'],
        downloads: 1, playtime: 60, loves: 0, likes: 0, dislikes: 0, videos: ["video1", "video2"], scores: ["field1", "field2"], reviews: ['review1', 'reivew2'] },
    ]
  },
  {
    name: "battle tank",
    type: "game",
    games: [
      { title: "battle-tank", description: "Game description - battle tank", releaseDate: moment().toJSON(), contentRating:2, numberOfPlayer: 1,
        size: 10, platform: "Desktop", author: "Someone", source: "Some link", instruction: "Press any key or touch screen to start",
        controller: ['controller1', 'controller2'],
        downloads: 10, playtime: 300, loves: 50, likes: 15, dislikes: 11, videos: ["video1", "video2"], scores: ["field1", "field2"], reviews: ['review1', 'reivew2'] },
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
