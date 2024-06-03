import mongoose from 'mongoose'
import User from './model/User.js'
import express from 'express'

mongoose.connect('mongodb+srv://pokeserver:rattata2@pokecluster.olee5ij.mongodb.net/pokemon-war')

const app = express()

app.use(express.json())

app.post('/api/user', async (req, res) => {
  const full_name = req.body.full_name
  const user_name = req.body.user_name
  const password = req.body.password
  const pokemons = []
  const createdAt = Date.now()

  try {
    const userCheck = await User.findOne({ user_name: user_name })
    if (userCheck) {
      res.status(401).json({ reason: 'username taken' })
    } else {
      const user = new User({
        full_name,
        user_name,
        password,
        createdAt,
        pokemons,
      })
      const savedUser = await user.save()
      res.status(200).json({ success: savedUser })
    }
  } catch (error) {
    res.status(400).json({ success: false })
  }
})

app.patch('/api/user', async (req, res) => {
  try {
    const user_id = req.body.user_id
    const pokemons = req.body.pokemons
    const filter = { _id: user_id }
    const update = { pokemons: [...pokemons] }
    await User.findOneAndUpdate(filter, update)
    const doc = await User.findOne({ _id: user_id })

    res.status(200).json({success:doc})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'unlucky' })
  }
})

app.delete('/api/user', async (req, res) => {
  const userName = req.body.user_name
  try {
    const result = await User.deleteOne({ userName })
    if (result.deletedCount === 0) {
      return res.status(404).json({ succes: false, message: 'User not found' })
    }
    res.json({ success: true, message: `${userName} deleted` })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting user' })
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


app.listen(4444, () => console.log('Server started on port 4444'))
