import mongoose from 'mongoose'
import User from './model/User.js'
import express from 'express'
import Collection from './model/Collection.js'

mongoose.connect(
  'mongodb+srv://pokeserver:rattata2@pokecluster.olee5ij.mongodb.net/pokemon-war'
)

const app = express()

app.use(express.json())

app.post('/api/user', async (req, res) => {
  const full_name = req.body.full_name
  const user_name = req.body.user_name
  const password = req.body.password
  // const pokemons_url = `/api/collection/${user_name.toLowerCase()}`
  const pokemons=[]
  const createdAt = Date.now()
  const userCheck = await User.findOne({ user_name: user_name })
  if (userCheck) {
    res.status(401).json({ reason: 'username taken' })
  } else {
    const user = new User({
      full_name,
      user_name,
      password,
      createdAt,
     pokemons
    })
    user
      .save()
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json({ success: false }))
  }
})

app.patch('/api/user/deck', async (req, res) => {
  try {
    const user_id = req.body.user_id
    const pokemons = req.body.pokemons

    const updatedUser = await User.findOneAndUpdate(
    { user_id: user_id },
    {pokemons: pokemons},
    { new: true, runValidators: true })
    console.log(updatedUser)
  } catch (error) {
    console.log(err)
    res.status(500).json({ message: 'unlucky' })
  }
})

app.delete('/api/user', async (req, res) => {
  const userName = req.body.user_name
  try {
    const result = await User.deleteOne({ userName })
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ succes: false, message: 'User not found' })
    }
    res.json({ success: true, message: `${userName} deleted` })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error deleting user' })
  }
})

app.get('/api/user/:userName', async (req, res) => {
  try {
    const userName = req.params.userName

    const user = await User.findOne({ user_name: userName })
    user.password = 'secreet'
    res.status(200).json({ status: user })
  } catch (err) {
    res.status(500).json({ status: 'invalid username' })
  }
})


app.post('/api/collection', async (req, res) => {
  try {
    const pokemons = req.body.pokemons;
    const user_id = req.body.user_id
    console.log(user_id, pokemons)

    const collection = new Collection({
      user_id: user_id,
      pokemons: pokemons,
      createdAt: new Date(),
    })
    collection.save()
  } catch (err) {
    console.error(err)
  }
})


app.listen(4444, () => console.log('Server started on port 4444'))
