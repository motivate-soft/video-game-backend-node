const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Game = mongoose.model('Games', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  image: {
    type:[String]
  },
  genre: { 
    type: [genreSchema],  
    required: true
  },
  description: {
    type: String,
    required: true
  },
  releaseDate: { 
    type: Date, 
    required: true
  },
  contentRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  numberOfPlayer: {
    type: Number,
    min: 0,
    max: 5, 
    default: 1
  },

  size: {
    type: String,
    get: v => v + "MB",
  },
  platform: {
    type: String,
    enum: ['Desktop', 'iPhone', 'mobile']
    // TODO: agree with client ( chinese or english)
  },
  author: {
    type: String,
    // TODO: when add user model replace this part
  },
  source: {
    type: String
  },
  instrunction: {
    type: String
  },
  controller: {
    type: [String]
  },

  downloads: {
    type: Number
  },
  playtime: {
    type: String
  },
  loves: {
    type: Number
  },
  likes: {
    type: Number
  },
  dislikes: {
    type: Number
  },
  videos: {
    type: [String]
  },
  scores: {
    type: [String]
  },
  reviews: {
    type: [String]
  },
}));

function validateGame(game) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    description: Joi.string().required(),
    releaseDate: Joi.string().required()
    // Todos: more validation
  };

  return Joi.validate(game, schema);
}

exports.Game = Game; 
exports.validate = validateGame;