import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './styles/pokicard.css'

function Pokicard(props) {
  const { name, scale = 1, onShowDown = () => {}, onClickPicture = () => {}, index } = props

  const url = 'https://pokeapi.co/api/v2/pokemon'
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getPokiDetails = async (poki) => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${url}/${poki}`)
        if (!response.ok) throw new Error('Network response was not ok')
        const pokiData = await response.json()
        setPokemon(pokiData)
        onShowDown(pokiData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (name) {
      getPokiDetails(name)
    }
  }, [])

  if (loading) {
    return <div className='card-pokemon-card'>Loading...</div>
  }

  if (error) {
    return <div className='card-pokemon-card'>Error loading data</div>
  }

  return (
    <div key={index} className='card-pokemon-card' type={pokemon?.types[0]?.type.name} style={{ transform: `scale(${scale})` }}>
      <div className='card-type-name-wrapper'>
        <h4 className='card-type-name'>
          {pokemon?.types[0]?.type.name[0].toUpperCase() + pokemon?.types[0]?.type.name.substring(1)}
        </h4>
        <h4 className='card-base-hp'>HP: {pokemon?.stats[0]?.base_stat}</h4>
      </div>
      <div>
        <div className='card-poki-splash-art'>
          <img
            className='card-poki-art cursor-pointer'
            src={pokemon?.sprites.other['official-artwork'].front_default}
            alt={`${pokemon?.name} artwork`}
            onClick={() => onClickPicture(pokemon?.name)}
          />
          <h3 className='card-poki-name'>{pokemon?.name[0].toUpperCase() + pokemon?.name.substring(1)}</h3>
        </div>
      </div>
      <div className='card-stats-wrapper'>
        <div className='card-base-stat-element'>
          <p>{pokemon?.stats[1]?.base_stat}</p>
          <h4>Attack</h4>
        </div>
        <div className='card-base-stat-element'>
          <p>{pokemon?.stats[2]?.base_stat}</p>
          <h4>Defense</h4>
        </div>
        <div className='card-base-stat-element'>
          <p>{pokemon?.stats[5]?.base_stat}</p>
          <h4>Speed</h4>
        </div>
      </div>
    </div>
  )
}

Pokicard.propTypes = {
  name: PropTypes.string.isRequired,
  scale: PropTypes.number,
  onSavingPokemonData: PropTypes.func,
  onShowDown: PropTypes.func,
  onClickPicture: PropTypes.func,
}

export default Pokicard
