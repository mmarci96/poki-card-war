import { useEffect, useState } from 'react'
import StartNew from './component/player-start/StartNew'
import RegisterForm from './component/authhorize/RegisterForm'
import SignInForm from './component/authhorize/SignInForm'
import { Link } from 'react-router-dom'
import MyDeck from '../../components/deck/MyDeck'

const StartPage = ({ currentPlayer }) => {
  const [signedInUser, setSignedInUser] = useState(currentPlayer)
  const [hasAccount, setHasAccount] = useState(false)
  const [isDeckReady, setDeckReady] = useState(false)
  const [playerCardDeck, setPlayerCardDeck] = useState([])
  const [isDeckSaved, setDeckSaved] = useState(false)

  const savePlayerDeckOnServer = async(playerUpdate) => {
    const response = await fetch('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playerUpdate),
    })
    await response.json()
  }

  useEffect(() => {
    if (signedInUser) {
      localStorage.setItem('playerLog', JSON.stringify(signedInUser))
      window.dispatchEvent(new Event('storage'))
      setHasAccount(true)
    }
  }, [signedInUser])

  const handleSavePlayerDeck = () => {
    const reducedData = playerCardDeck.map((pokemon) => {
      return { name: pokemon.name, current_health: pokemon.hp, experience: pokemon.experience }
    })
    const updatedPlayer = {
      user_name: signedInUser.user_name,
      user_id: signedInUser.user_id,
      pokemons: [...reducedData],
    }
    savePlayerDeckOnServer(updatedPlayer)

    setDeckSaved(true)
  }

  return (
    <div className='start-game bg-city-mist w-full h-[100vh] flex flex-col bg-cover bg-center justify-center'>
      {!signedInUser ? (
        <div className='forms flex justify-center'>
          {hasAccount ? (
            <SignInForm onSignInSuccesfull={setSignedInUser} /> 
          ) : (
            <RegisterForm onSingUpSuccesfull={setSignedInUser} onHasAccount={setHasAccount} /> 
          )}
        </div>
      ) : !isDeckReady ? (
        <StartNew
          user={signedInUser}
          onAddToDeck={setPlayerCardDeck}
          onDeckReady={setDeckReady}
          addedToDeck={playerCardDeck}
        />
      ) : (
        <div className='ml-auto mr-auto flex flex-col max-h-[500px]'>
          <h2 className='text-2xl p-2 m-1 bg-base rounded-2xl text-center max-w-[45vw] ml-auto mr-auto'>
            You have your deck ready to play!
          </h2>
          <div>
            <MyDeck myDeck={playerCardDeck} onSetMyDeck={setPlayerCardDeck} /> 
          </div>
          {!isDeckSaved ? (
            <button
              onClick={() => handleSavePlayerDeck()}
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
          <button onClick={() => {
            setDeckReady(false)
            setDeckSaved(false)
            }}  className='cancel-btn text-xl w-[12vw] min-w-[72px] bg-red-400 border-black border hover:bg-red-600 p-1 m-1 text-amber-50 max-h-[40px] min-h-[36px] rounded-2xl'>
            Edit Deck
          </button>
        </div>
      )}
    </div>
  )
}

export default StartPage
