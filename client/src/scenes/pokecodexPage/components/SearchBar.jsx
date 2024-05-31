import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import pokemonsList from '../data/pokemon.js'

const SearchBar = (props) => {
  const onSearchResult = props.onSearchResult

  const searchResult = props.searchResult
  const makingSearchList = (list) => {
    const pokemonListForSearch = []
    for (const pokemon of list) {
      pokemonListForSearch.push({ id: pokemon.id, name: pokemon.name.english })
    }
    return pokemonListForSearch
  }

  const suggestions = makingSearchList(pokemonsList)

  const handleOnSearch = (string, results) => {
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    console.log('result', result)
  }

  const handleOnSelect = (item) => {
    console.log('searcr', searchResult)
    onSearchResult(null)
    onSearchResult(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
      </>
    )
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={suggestions}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </header>
    </div>
  )
}

export default SearchBar
