const { Genre } = require("./models/genre");
const { Game } = require("./models/game");
const mongoose = require("mongoose");
const config = require("config");
const moment = require("moment");

const genres = [
  {
    name: "Yoga",
    type: "fitness"
  },
  {
    name: "Slimming",
    type: "fitness",
  },
  {
    name: "park",
    type: "social",
  },
  {
    name: "battle tank",
    type: "game",
  }
];
const games = [
  {
    image: "images/2.png", title: "Yoga - 1", description: "Game description - 1", releaseDate: moment().toJSON(), contentRating: 2, numberOfPlayer: 1,
    size: 100, platform: "Desktop", author: "Someone", source: "Some link", instruction: "Press any key or touch screen to start",
    controller: ['controller1', 'controller2'],
    downloads: 100, playtime: 30, loves: 5, likes: 10, dislikes: 4, videos: ["videos/1.mp4", "videos/2.mp4", "videos/3.mp4", ], scores: ["field1", "field2"], reviews: ['review1', 'reivew2']
  },
  {
    image: "images/3.png", title: "Yoga - 2", description: "Game description - 2", releaseDate: moment().toJSON(), contentRating: 2, numberOfPlayer: 1,
    size: 200, platform: "Desktop", author: "Someone", source: "Some link", instruction: "Press any key or touch screen to start",
    controller: ['controller1', 'controller2'],
    downloads: 50, playtime: 30, loves: 5, likes: 10, dislikes: 4, videos: ["videos/1.mp4" ], scores: ["field1", "field2"], reviews: ['review1', 'reivew2']
  },
  {
    image: "images/4.png", title: "Yoga - 3", description: "Game description - 3", releaseDate: moment().toJSON(), contentRating: 2, numberOfPlayer: 1,
    size: 60, platform: "Desktop", author: "Someone", source: "Some link", instruction: "Press any key or touch screen to start",
    controller: ['controller1', 'controller2'],
    downloads: 10, playtime: 10, loves: 2, likes: 10, dislikes: 0, videos: ["videos/2.mp4", ], scores: ["field1", "field2"], reviews: ['review1', 'reivew2']
  },
  {
    image: "images/5.png", title: "slimming - 1", description: "Game description - slimming1", releaseDate: moment().toJSON(), contentRating: 2, numberOfPlayer: 1,
    size: 100, platform: "Desktop", author: "Someone", source: "Some link", instruction: "Press any key or touch screen to start",
    controller: ['controller1', 'controller2'],
    downloads: 2010, playtime: 30, loves: 200, likes: 1010, dislikes: 4, videos: [ "videos/2.mp4", "videos/3.mp4", ], scores: ["field1", "field2"], reviews: ['review1', 'reivew2']
  },
  {
    image: "images/3.png", title: "park - 1", description: "Game description - park1", releaseDate: moment().toJSON(), contentRating: 2, numberOfPlayer: 1,
    size: 300, platform: "Desktop", author: "Someone", source: "Some link", instruction: "Press any key or touch screen to start",
    controller: ['controller1', 'controller2'],
    downloads: 1, playtime: 60, loves: 0, likes: 0, dislikes: 0, videos: [ "videos/3.mp4", "videos/4.mp4", ], scores: ["field1", "field2"], reviews: ['review1', 'reivew2']
  },
  {
    image: "images/4.png", title: "battle-tank", description: "Game description - battle tank", releaseDate: moment().toJSON(), contentRating: 2, numberOfPlayer: 1,
    size: 10, platform: "Desktop", author: "Someone", source: "Some link", instruction: "Press any key or touch screen to start",
    controller: ['controller1', 'controller2'],
    downloads: 10, playtime: 300, loves: 50, likes: 15, dislikes: 11, videos: ["videos/1.mp4", "videos/3.mp4", "videos/4.mp4", ], scores: ["field1", "field2"], reviews: ['review1', 'reivew2']
  },
]
async function seed() {
  await mongoose.connect(config.get("db"));

  await Game.deleteMany({});
  await Genre.deleteMany({});

  let createdGenres = [];
  for (let genre of genres) {
    const newGenre = await new Genre({ name: genre.name, type: genre.type }).save();
    createdGenres.push(newGenre);
  }

  for(let game of games) {
    let randomGenres = [];
    let num = Math.ceil(3 * Math.random());
    for(let i=0; i<3; i++){
      randomGenres = getRandom(createdGenres, num)
    }

    await new Game({...game, genre: randomGenres}).save();
  }

  mongoose.disconnect();

  console.info("Done!");
}

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

seed();
