import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const NavigationBar = ({ currentPlayer, setCurrentPlayer, onLogOut }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('playerLog')
    onLogOut(true)
    setCurrentPlayer(null)
    window.location = '/start'
  }

  const handleSignUp = () => {
    onLogOut(false)
    setCurrentPlayer(null)
    window.location = '/start'
  }

  return (
    <div className='navigation-bar-global w-[100vw] flex h-[56px] mb-[64px] bg-secondary justify-between fixed'>
      <Link to='/'>
        <div className='site-logo max-h-28 flex justify-between cursor-pointer'>
          <img src='../../icons/pokeball.png' className='max-h-[60px] p-2 ml-4' alt='Pokéball logo' />
          <p className='text-2xl font-semibold text-primary-light mt-[12px] tracking-wider'>Pokémon Wars</p>
        </div>
      </Link>
      <span className='ml-auto mr-[40px]'>
        {currentPlayer ? (
          <div className='flex justify-evenly min-w-[200px]'>
            <p className='text-xl text-primary-light p-1 m-auto mt-2'>Player: {currentPlayer.user_name}</p>
            <button onClick={handleLogout} className='btn-main h-[16px] p-1 m-auto mt-2 ml-8px'>
              Sign out
            </button>
          </div>
        ) : (
          
            <button className='btn-main h-[16px] p-1 text-l m-auto mt-2' onClick={handleSignUp}>Sign up</button>
          
        )}
      </span>
      <div className='drop-down-menu relative ml-8 m-8 mt-2'>
        <button
          className={`text-2xl text-primary-light rounded-l bg-[#212121] min-w-[128px] hover:bg-[#696969] mb-1 p-1 pt-0 pb-0 ${
            isDropdownOpen ? '' : 'cursor-pointer'
          }`}
          onClick={toggleDropdown}
        >
          Menu
        </button>
        {isDropdownOpen && (
          <div className='absolute rounded-l pl-1 pr-2 bg-emerald-400'>
            <Link to='/start'>
              <button className='text-xl rounded-l border-2 border-black bg-accent min-w-[120px] min-h-[32px] hover:bg-accent-light mt-1 ml-1'>
                New Game
              </button>
            </Link>

            <Link to='/collection'>
              <button className='text-xl rounded-l border-2 border-black bg-accent min-w-[120px] hover:bg-accent-light ml-1 mt-1'>
                Collection
              </button>
            </Link>
            <Link to='/pokecodex'>
              <button className='text-xl rounded-l border-2 border-black bg-accent min-w-[120px] hover:bg-accent-light ml-1 mt-1 mb-1'>
                Pokecodex
              </button>
            </Link>

            <Link to='/play'>
              <button className='text-xl rounded-l border-2 border-black bg-accent min-w-[120px] hover:bg-accent-light ml-1 mt-1'>
                Play
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
export default NavigationBar
