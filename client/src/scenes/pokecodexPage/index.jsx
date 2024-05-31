import { useState, useEffect } from 'react'
import PokemonThumbnail from './components/PokemonThumbnail'
import SearchPoki from './components/SearchPoki'
import Pokicard from '../../components/poki-card/Pokicard'

function PokecodexPage() {
  const [allPokemons, setAllPokemons] = useState([])
  const [loadPoke, setLoadPoke] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  const [searchResult, setSearchResult] = useState(null)
  const getAllPokemons = async () => {
    const res = await fetch(loadPoke)
    const data = await res.json()
    setLoadPoke(data.next)

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()
        setAllPokemons((currentList) => [...currentList, data])
      })
    }
    createPokemonObject(data.results)
    console.log(allPokemons)
  }
  useEffect(() => {
    getAllPokemons()
  }, [])

  return (
    <div className='app-container'>
      <h1 className='text-center text-3xl bg-teal-400 p-2'>Pokemon Kingdom .</h1>
      <SearchPoki onSearchResult={setSearchResult} searchResult={searchResult} />
      {searchResult ? <Pokicard name={searchResult.name.toLowerCase()} /> : <p>Loading..</p>}

      <div className='pokemon-container'>
        <div className='all-container grid grid-cols-4 divide-x divide-white'>
          {allPokemons.map((pokemon, index) => (
            <PokemonThumbnail
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={index}
              height={pokemon.height}
              weight={pokemon.weight}
              stat1={pokemon.stats[0].stat.name}
              stat2={pokemon.stats[1].stat.name}
              stat3={pokemon.stats[2].stat.name}
              stat4={pokemon.stats[3].stat.name}
              stat5={pokemon.stats[4].stat.name}
              stat6={pokemon.stats[5].stat.name}
              bs1={pokemon.stats[0].base_stat}
              bs2={pokemon.stats[1].base_stat}
              bs3={pokemon.stats[2].base_stat}
              bs4={pokemon.stats[3].base_stat}
              bs5={pokemon.stats[4].base_stat}
              bs6={pokemon.stats[5].base_stat}
            />
          ))}
        </div>
        <button className='load-more' onClick={() => getAllPokemons()}>
          More Pokemons
        </button>
      </div>
    </div>
  )
}

export default PokecodexPage
