import { useEffect, useState } from 'react'
import Pokicard from '../../../../components/poki-card/Pokicard'

const strongerPokemon = ['Charmander', 'Bulbasaur', 'Squirtle']

const beginnerPokemon = [
  'Pikachu',
  'Weedle',
  'Pidgey',
  'Rattata',
  'Spearow',
  'Zubat',
  'Magikarp',
  'Sentret',
  'Hoothoot',
  'Ledyba',
  'Spinarak',
  'Pichu',
  'Wurmple',
  'Zigzagoon',
  'Lotad',
  'Seedot',
  'Bidoof',
  'Starly',
  'Kricketot',
  'Burmy',
]

const MakeDeck = ({ onAddToCollection, collection, user }) => {
  const [offerStronger, setOfferStronger] = useState(null)

  const handleAdd = (pokemon) => {
    if (!collection.includes(pokemon)) {
      onAddToCollection((prev) => [...prev, pokemon])
    }
  }
  useEffect(() => {
    if (collection.length >= 4) {
      setOfferStronger(strongerPokemon)
    }
  }, [collection])

  const handleRemove = (pokemon) => {
    const updatedCollection = collection.filter((poki) => {
      return poki !== pokemon
    })
    onAddToCollection(updatedCollection)
  }

  return (
    <div className='m-8'>
      <div className='home-title-container bg-gradient-to-r from-yellow-300 to-pink-200 via-transparent rounded-2xl p-4 m-2 ml-[10vw] mr-[10vw]'>
        <h1 className='text-3xl font-bold'>Let's find some Pokemons!</h1>
        <h2 className='text-xl p-1 mt-8 mb-8'>
          Hi {user}! Lets set up your starter deck! Choose 4 common pokemon to start building. Last you will offered
          stronger on to be the ace of your deck!
        </h2>
      </div>
      <div className='flex flex-wrap flex-col w-[100vw] h-[80vh] max-h-[1000px] overflow-y-scroll mt-[120px] '>
        {offerStronger &&
          strongerPokemon.map((poki, index) => {
            return (
              <div className='flex flex-col items-center' key={index}>
                <Pokicard name={poki.toLowerCase()} />
                {collection && !collection?.includes(poki) ? (
                  <button
                    className='collection-btw ml-auto mr-auto w-[112px] max-h-[60px] rounded-xl shadow-sm bg-accent hover:bg-accent-dark'
                    onClick={() => handleAdd(poki)}
                  >
                    Add to Deck
                  </button>
                ) : (
                  <button onClick={() => handleRemove(poki)}>Remove</button>
                )}
              </div>
            )
          })}
        {!offerStronger &&
          beginnerPokemon.map((poki, index) => (
            <div className='flex flex-col justify-around' key={index}>
              <Pokicard name={poki.toLowerCase()} />
              {collection && !collection?.includes(poki) ? (
                <button
                  className='collection-btw ml-auto mr-auto w-[112px] max-h-[60px] rounded-xl shadow-sm bg-accent hover:bg-accent-dark'
                  onClick={() => handleAdd(poki)}
                >
                  Add to Deck
                </button>
              ) : (
                <button
                  className='collection-btw ml-auto mr-auto w-[112px] max-h-[60px] rounded-xl shadow-sm bg-accent hover:bg-accent-dark'
                  onClick={() => handleRemove(poki)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default MakeDeck
