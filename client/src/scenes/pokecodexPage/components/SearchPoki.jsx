import SearchBar from './SearchBar'
import { useState } from 'react'

const SearchPoki = (props) => {
  const onSearchResult = props.onSearchResult
  const searchResult = props.searchResult
  const [pokemons, setPokemons] = useState([{ name: 'pikachu' }])

  function handleSubmit(event) {
    event.preventDefault()
    const pokemonName = event.target[0].value.toLowerCase()
    if (Object.values(pokemons).includes(pokemonName)) {
      return <div> Sorry, wrong choose, try again!</div>
    } else {
      setPokemons((prev) => [...prev, { name: pokemonName }])
    }
  }

  const handlePick = (e) => {
    console.log(e.target.textContent)
    const pickFromSuggested = e.target.textContent.toLowerCase()
    setPokemons((prev) => [...prev, { name: pickFromSuggested }])
  }

  return (
    <div className='search-result'>
      <form className='find-poki' onSubmit={(event) => handleSubmit(event)}>
        <h3 className='text-xl p-2'>
          Here are some top picks to choose today:
          <span className='p-1 m-1 bg-orange-300 hover:bg-orange-100 cursor-pointer' onClick={(e) => handlePick(e)}>
            Charizard
          </span>
          <span className='p-1 m-1 bg-orange-300 hover:bg-orange-100 cursor-pointer' onClick={(e) => handlePick(e)}>
            Dragonite
          </span>
          <span className='p-1 m-1 bg-orange-300 hover:bg-orange-100 cursor-pointer' onClick={(e) => handlePick(e)}>
            Gardevoir
          </span>
          <span className='p-1 m-1 bg-orange-300 hover:bg-orange-100 cursor-pointer' onClick={(e) => handlePick(e)}>
            Vaporeon
          </span>
          <span className='p-1 m-1 bg-orange-300 hover:bg-orange-100 cursor-pointer' onClick={(e) => handlePick(e)}>
            Espeon
          </span>
          <span className='p-1 m-1 bg-orange-300 hover:bg-orange-100 cursor-pointer' onClick={(e) => handlePick(e)}>
            Gyarados
          </span>
          <span className='p-1 m-1 bg-orange-300 hover:bg-orange-100 cursor-pointer' onClick={(e) => handlePick(e)}>
            Lucario
          </span>
          <span className='p-1 m-1 bg-orange-300 hover:bg-orange-100 cursor-pointer' onClick={(e) => handlePick(e)}>
            Mew
          </span>
          !
        </h3>
        <div className='search-wrapper flex justify-center'>
          <SearchBar onSearchResult={onSearchResult} searchResult={searchResult}></SearchBar>
          <button type='submit'> Submit</button>
        </div>
      </form>
    </div>
  )
}

export default SearchPoki
