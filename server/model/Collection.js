import mongoose from 'mongoose'
const { Schema, model } = mongoose

const collectionSchema = new Schema({
  user_id: String,
  pokemons: Array,
  createdAt: Date,
})

export default model('Collection', collectionSchema)
