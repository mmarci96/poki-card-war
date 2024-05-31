import { useEffect, useState } from 'react'
import StartNew from './component/player-start/StartNew'
import RegisterForm from './component/authhorize/RegisterForm'
import SignInForm from './component/authhorize/SignInForm'
import { Link } from 'react-router-dom'
import MyDeck from '../../components/deck/MyDeck'

const StartPage = ({ player }) => {
  const [userDetail, setUserDetail] = useState(player)
  const [haveAccount, setHaveAccount] = useState(false)
  const [isDeckReady, setDeckReady] = useState(false)
  const [playerCardDeck, setPlayerCardDeck] = useState([])
  const [isDeckSaved, setDeckSaved] = useState(false);

  if (player) {
    console.log(player)
  }

  useEffect(() => {
    if (userDetail) {
      localStorage.setItem('playerLog', JSON.stringify(userDetail))
      window.dispatchEvent(new Event('storage'))
    }
    console.log(userDetail)
  }, [userDetail])

  const handleSavePlayerDeck = () => {
    const reducedData = playerCardDeck.map((pokemon) => {
      return
      { name: pokemon.name, { current_health: pokemon.hp, experience: pokemon.experience } }
    })

    const data = {
      user_id: userDetail.id,
      pokemons: [...reducedData],
    }
    console.log(data)
    fetch('/api/collection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        setDeckSaved(true)
        console.log(response)
      })
  }

  return (
    <div className='start-game bg-city-mist w-full h-full flex flex-col bg-cover bg-center justify-center'>
      {!isDeckReady && userDetail ? (
        <StartNew
          user={userDetail}
          onAddToDeck={setPlayerCardDeck}
          onDeckReady={setDeckReady}
          addedToDeck={playerCardDeck}
        />
      ) : (
        <div className='forms flex justify-center'>
          {!userDetail && haveAccount ? (
            <SignInForm onSignIn={setUserDetail} onHaveAccount={setHaveAccount} />
          ) : (
            <RegisterForm onSingUpSuccesfull={setUserDetail} onHaveAccount={setHaveAccount} />
          )}
        </div>
      )}
      {isDeckReady && (
        <div className='start-page-ready mt-[20vh] ml-auto mr-auto mb-auto flex-col'>
          <h2 className='text-2xl p-2 m-1 bg-base rounded-2xl text-center max-w-[45vw] ml-auto mr-auto'>
            You have your deck ready to play!
          </h2>
          <div>
            <MyDeck myDeck={playerCardDeck} onSetMyDeck={setPlayerCardDeck} />
          </div>
          {!isDeckSaved ? (
            <button
              onClick={() => handleSavePlayerDeck}
              className='savebutton text-xl w-[12vw] min-w-[72px] bg-green border-black border hover:bg-dirty-green p-1 m-1 text-amber-50 max-h-[40px] min-h-[36px] rounded-2xl'
            >
              Save Deck
            </button>
          ) : (
            <Link to='/play'>
              <button className='playbutton text-xl w-[12vw] min-w-[72px] bg-accent border-black border hover:bg-red-400 p-1 m-1 text-secondary max-h-[40px] min-h-[36px] rounded-2xl'>
                Start Game
              </button>
            </Link>
          )}
          <button className='cancel-btn text-xl w-[12vw] min-w-[72px] bg-red-400 border-black border hover:bg-red-600 p-1 m-1 text-amber-50 max-h-[40px] min-h-[36px] rounded-2xl'>
            Edit Deck
          </button>
        </div>
      )}
    </div>
  )
}

export default StartPage