const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  // RecipeID: { type: Number, required: true, unique: true, integer: true },
  RecipeName: { type: String, required: true },
  Description: { type: String, default: "" },
  PhotoURL: { type: String, required: true },
  recipeProcedure: { type: [String], required: true },
  Score : { type: Number, required: true },
  // UserId: { type: Number, required: true },
  UserId: { type: String, required: true }, // _id field of the user
  Ingredient: { type: [String], required: true },
  Category: { type: [String], required: true },
  cookTime: { type: Number, required: true},
  prepTime: { type: Number, required: true}
});

const Recipe = mongoose.model('Recipe', RecipeSchema);


module.exports = Recipe;
