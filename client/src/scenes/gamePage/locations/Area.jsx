import { useEffect, useState } from 'react'
import Pokicard from '../../../components/poki-card/Pokicard'

const Area = (props) => {
  const area = props.selectedArea
  const onGettingWildPoki = props.onGettingWildPoki
  const onFight = props.onPressReady
  const onSelectArea = props.onSelectArea
  const [wildPokemon, setWildPokemon] = useState(null)
  const [wildPokiShowdown, setWildPokiShowdown] = useState(null)

  useEffect(() => {
    if (area.pokemon_encounters) {
      const max = area.pokemon_encounters.length
      const index = Math.floor(Math.random() * max)
      onGettingWildPoki(area.pokemon_encounters[index])
      setWildPokemon(area.pokemon_encounters[index].pokemon.name)
    }
  }, [])

  return (
    <div className='area content-center'>
      <div className='area-header bg-base rounded-lg m-2 p-2 border-black border'>
        <h2 className='area-title text-center text-2xl font-bold'>{area.names[0].name}</h2>
      </div>

      {wildPokemon && (
        <div className='game-incoming-wild flex  justify-center'>
          <Pokicard name={wildPokemon} onShowDown={setWildPokiShowdown} />
          <div className='wild-poki-alert'>
            <div className='alert-wrapper text-xl bg-gray-200 bg-opacity-60 p-2 border-gray-800 border rounded-xl mt-2'>
              <p>You have encountered a wild Pokemon!</p>
            </div>
            <button
              className='action-button encounter-wild-poki min-w-[120px] w-72 bg-red-500'
              onClick={() => onFight(true)}
            >
              Fight!
            </button>
            <button className='leave-encounter min-w-[120px] w-72' onClick={() => onSelectArea(null)}>
              Leave{' '}
            </button>
          </div>
          {wildPokiShowdown && (
            <div className='wild-poki-showdown absolute bottom-32 left-1/2 scale-[1.8]'>
              <img
                className='wild-poki-showdown-img animate-bounce'
                src={wildPokiShowdown.sprites?.other.showdown.front_default}
              ></img>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Area
