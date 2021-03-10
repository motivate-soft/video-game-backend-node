const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  type: {
    type: String,
    required: true,
    enum: ['fitness', 'game', 'social']    
  }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    type: Joi.string().enum(['fitness', 'game', 'social'])
  };

  return Joi.validate(genre, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre; 
exports.validate = validateGenre;