import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './scenes/homePage'
import CollectionPage from './scenes/collectionPage'
import GamePage from './scenes/gamePage'
import PokecodexPage from './scenes/pokecodexPage'
import StartPage from './scenes/startPage'
import NavigationBar from './scenes/navigationBar/NavigationBar'
import { useEffect, useState } from 'react'
import FightSimulatorPage from './scenes/fightSimlationPage'

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(null)

  useEffect(() => {
    const loadPlayer = () => {
      const playerData = localStorage.getItem('playerLog')
      if (playerData) {
        setCurrentPlayer(JSON.parse(playerData))
      }
    }

    loadPlayer()
    window.addEventListener('storage', loadPlayer)

    return () => {
      window.removeEventListener('storage', loadPlayer)
    }
  }, [])

  return (
    <BrowserRouter>
      <div className='main h-full w-[100vw] p-0 m-0'>
        <Routes>
          <Route path='/fight-sim' element={<FightSimulatorPage />} />
          <Route path='/' element={<HomePage player={currentPlayer} />} />
          <Route path='/collection' element={<CollectionPage player={currentPlayer} />} />
          <Route path='/play' element={<GamePage player={currentPlayer} />} />
          <Route path='/pokecodex' element={<PokecodexPage />} />
          <Route path='/start' element={<StartPage player={currentPlayer} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
