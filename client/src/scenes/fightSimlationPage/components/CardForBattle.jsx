import { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

const CardForBattle = ({ pokemonName, onSavePokemonData }) => {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const { ok, status } = response;
        if (!ok) throw new Error(`Network response was not ok, status: ${status}`);
        const pokemonData = await response.json();
        setPokemon(pokemonData);
        onSavePokemonData(pokemonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (pokemonName) {
      fetchPokemonData();
    }
  }, [pokemonName, onSavePokemonData]);

  if (isLoading) {
    return <div className='card-pokemon-card'>Loading...</div>;
  }

  if (error) {
    return <div className='card-pokemon-card'>Error loading data</div>;
  }

  return (
    <div className='card-pokemon-card' type={pokemon?.types[0]?.type.name}>
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
  );
};

CardForBattle.propTypes = {
  name: PropTypes.string.isRequired,
  onSavingPokemonData: PropTypes.func,
}

export default CardForBattle
