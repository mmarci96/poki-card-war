import { useEffect, useState } from 'react'
import Pokicard from '../../../components/poki-card/Pokicard'
import { Link } from 'react-router-dom'

const CatchPoki = (props) => {
  const myPoki = props.myPoki
  const myPokiHp = props.myPokiHp
  const wildPoki = props.wildPoki
  const wildPokiHp = props.wildPokiHp
  const [myDeck, setMyDeck] = useState(null)
  const [isEncounterOver, setEncounterOver] = useState(false)

  useEffect(() => {
    const myDeckData = JSON.parse(localStorage.getItem('MY_DECK'))
    setMyDeck(myDeckData)
  }, [])

  useEffect(() => {
    if (myDeck && myDeck.length > 0) {
      const updatedList = myDeck.map((pokemon) => {
        if (pokemon.name === myPoki.name) {
          const newExperience = pokemon.experience + Math.round(wildPoki.hp * 0.42)
          return {
            ...pokemon,
            hp: myPokiHp,
            experience: newExperience,
          }
        }
        return pokemon
      })

      setTimeout(() => {
        localStorage.setItem('MY_DECK', JSON.stringify(updatedList))
      }, 100)
    }
  }, [myDeck])

  const handleCatch = async () => {
    setMyDeck((prev) => [...prev, wildPoki])
    const upDatedList = myDeck.map((pokemon) => {
      if (pokemon.name === myPoki.name) {
        pokemon.hp = myPokiHp
        pokemon.experience += parseFloat(wildPoki.hp * 0.42).toFixed(0)
        return pokemon
      } else {
        return pokemon
      }
    })
    localStorage.setItem('MY_DECK', JSON.stringify(upDatedList))
    setEncounterOver(true)
  }

  return !isEncounterOver ? (
    <div className='game-catch-pokemon relative'>
      {myPokiHp > wildPokiHp ? (
        <div className='catch-me-hah flex justify-evenly flex-wrap relative'>
          <div className='card-wrapper-catch p-6 w-[40%] m-12 ml-8'>
            <Pokicard name={wildPoki.name} scale={1.4} />
          </div>
          <h2 className='catch-pokemon-message text-2xl bg-gray-200 bg-opacity-60 p-6 m-4 w-[40%] static rounded-xl'>
            Congratulation on the fight! {myPoki.name[0].toUpperCase() + myPoki.name.substring(1)}
            has won this fight! You have gained some XP and on top of it you may try to catch {wildPoki.name}, and use
            it as yours from now on!
            <img className='my-poki-posing h-[160px] w-[160px] p-4 m-4 ml-[12vw]' src={myPoki.pictureShiny}></img>
            <br></br>
            <div className='flex justify-evenly'>
              <p className='xp-gain bg-amber-200 p-2 rounded-xl bg-opacity-60'>
                Xp gained: {parseFloat(wildPoki.hp * 0.69).toFixed(0)}
              </p>
              <br></br>
              <p className='lost-hp bg-red-400 p-2 rounded-xl bg-opacity-60'>
                Hp lost: {parseFloat(myPoki.hp - myPokiHp).toFixed(0)}{' '}
              </p>
            </div>
          </h2>
          <span className='spam w-[20vw] static'>
            <button
              className='save p-2 bg-green absolute left-0 translate-x-24 min-w-[180px]'
              onClick={() => {
                handleCatch()
              }}
            >
              Add to collection
            </button>
          </span>
        </div>
      ) : (
        <div>
          <h2 className='catch-pokemon-message text-2xl bg-gray-200 bg-opacity-60 p-6 m-4 w-[40%] static rounded-xl'>
            Better luck next time... After the fight {myPoki.name} needs to rest and heal up, or you may use potions.
          </h2>
          <img className='my-poki-posing' src={myPoki.pictureShiny}></img>
        </div>
      )}
    </div>
  ) : (
    <div className='wrapper-catcher flex flex-col justify-self-center'>
      <h2 className='text-2xl p-4 m-2 text-center bg-gray-400 bg-opacity-40 border rounded-xl max-w-[45%] ml-[25%] mr-[25%]'>
        You have captured the wild pokemon!
      </h2>
      <div className='flex flex-col justify-center w-[30vw] ml-[30vw] mr-[30vw]'>
        <Link to='/play'>
          <button>Back to locations</button>
        </Link>
        <Link to='/collection'>
          <button>Go to collection</button>
        </Link>
        <Link to='/'>
          <button>Home</button>
        </Link>
      </div>
    </div>
  )
}

export default CatchPoki
