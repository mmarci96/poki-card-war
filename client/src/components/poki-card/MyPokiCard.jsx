import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const MyPokiCard = ({ data, scale = 1, onClickPicture = () => {} }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (data) {
      setPokemon(data);
    }
  }, [data]);

  if (!pokemon) {
    return null;
  }

  const handlePictureClick = () => {
    if (onClickPicture && pokemon.name) {
      onClickPicture(pokemon.name);
    }
  };

  return (
    <div className='card-pokemon-card' type={pokemon.types?.[0]?.type?.name} style={{ transform: `scale(${scale})` }}>
      <div className='card-type-name-wrapper'>
        <h4 className='card-type-name'>{pokemon.types?.[0]?.type?.name}</h4>
        <h4 className='card-base-hp'>HP: {parseFloat(pokemon.hp).toFixed(0)}</h4>
      </div>
      <div>
        <div className='card-poki-splash-art'>
          <img
            className='card-poki-art cursor-pointer'
            src={pokemon.officialPicture}
            onClick={handleClick}
            alt={pokemon.name}
          ></img>
          <h3 className='card-poki-name'>{pokemon.name}</h3>
        </div>
      </div>
      <div className='card-stats-wrapper'>
        <div className='card-base-stat-element'>
          <p>{pokemon.attack}</p>
          <h4>Attack</h4>
        </div>
        <div className='card-base-stat-element'>
          <p>{pokemon.defense}</p>
          <h4>Defense</h4>
        </div>
        <div className='card-base-stat-element'>
          <p>{pokemon.speed}</p>
          <h4>Speed</h4>
        </div>
      </div>
    </div>
  );
};
MyPokiCard.propTypes = {
  data: PropTypes.object.isRequired,
  scale: PropTypes.number,
  onClickPicture: PropTypes.func,
  index: PropTypes.number,
}

export default MyPokiCard
