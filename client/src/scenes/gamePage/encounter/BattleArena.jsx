import { useEffect, useState } from 'react'
import FightScreen from './FightScreen'

const BattleArena = (props) => {
  const url = 'https://pokeapi.co/api/v2/pokemon'

  const myPokiName = props.myPoki
  const wildPokiName = props.wildPoki.pokemon.name

  const [myPoki, setMyPoki] = useState(null)
  const [wildPoki, setWildPoki] = useState(null)
  const [isBattleOver, setIsBattleOver] = useState(false)
  const [damageDone, setDamageDone] = useState(null)
  const [healthLost, setHealthLost] = useState(null)
  const [attackAnimation, setAttackAnimation] = useState(false)

  useEffect(() => {
    const getPokiFetch = async (poki) => {
      const response = await fetch(`${url}/${poki}`)
      const pokiData = await response.json()
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
      setWildPoki(pokiObj)
    }
    if (!wildPoki) {
      getPokiFetch(wildPokiName.toLowerCase())
    }
    const myDeckData = JSON.parse(localStorage.getItem('MY_DECK'))
    console.log(myDeckData)
    const match = myDeckData.find((poki) => poki.name === myPokiName)
    console.log(match)
    setMyPoki(match)
  }, [])

  return (
    <div>
      {wildPoki && myPoki && (
        <FightScreen
          attackAnimation={attackAnimation}
          onAttackAnimation={setAttackAnimation}
          onDamageDone={setDamageDone}
          onHealthLost={setHealthLost}
          onBattleOver={setIsBattleOver}
          wildPoki={wildPoki}
          myPoki={myPoki}
          healthLost={healthLost}
          damageDone={damageDone}
          isBattleOver={isBattleOver}
        />
      )}
    </div>
  )
}

export default BattleArena
