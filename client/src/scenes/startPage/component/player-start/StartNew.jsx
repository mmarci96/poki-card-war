import React, { useState, useEffect } from 'react'
import MakeDeck from './MakeDeck'
const url = 'https://pokeapi.co/api/v2/pokemon'

const StartNew = ({ user, onAddToDeck, onDeckReady }) => {
  const [myCardNow, setMyCardNow] = useState([])
  const [completePokiData, setCompletePokiData] = useState([])

  useEffect(() => {
    const getPokiDetails = async (poki) => {
      const response = await fetch(`${url}/${poki}`)
      const data = await response.json()
      setCompletePokiData((prev) => [...prev, data])
    }
    if (myCardNow && myCardNow.length === 5) {
      myCardNow.map((pokiName) => getPokiDetails(pokiName.toLowerCase()))
    }
  }, [myCardNow])

  useEffect(() => {
    if (completePokiData.length === 5) {
      const saveData = completePokiData.map((pokiData) => {
        const pokiObj = {
          name: pokiData.name,
          id: pokiData.id,
          hp: pokiData.stats[0]['base_stat'],
          attack: pokiData.stats[1]['base_stat'],
          defense: pokiData.stats[2]['base_stat'],
          specialAttack: pokiData.stats[3]['base_stat'],
          specialDefense: pokiData.stats[4]['base_stat'],
          speed: pokiData.stats[5]['base_stat'],
          types: pokiData.types,
          abilities: pokiData.abilities,
          experience: pokiData.base_experience,
          forms: pokiData.forms,
          picture: pokiData.sprites.other.showdown['front_default'],
          pictureBack: pokiData.sprites.other.showdown['back_default'],
          pictureShiny: pokiData.sprites.other.showdown['front_shiny'],
          officialPicture: pokiData.sprites.other['official-artwork']['front_default'],
          height: pokiData.height,
          weight: pokiData.weight,
          cries: pokiData.cries,
          heldItems: pokiData.held_items,
          moves: pokiData.moves,
        }
        return pokiObj
      })
      onAddToDeck(saveData)
      onDeckReady(true)
    }
  }, [completePokiData])

  return <MakeDeck onAddToCollection={setMyCardNow} collection={myCardNow} user={user.player} />
}

export default StartNew
