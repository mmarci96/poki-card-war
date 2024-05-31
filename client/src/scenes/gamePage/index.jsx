import { useState } from 'react'
import SelectLocation from './locations/SelectLocation'
import SelectArea from './locations/SelectArea'
import NavigationBar from './header/HeaderBar'
import Area from './locations/Area'
import ChoosePoki from './encounter/ChoosePoki'
import Encounter from './encounter/Encounter'
import BattleArena from './encounter/BattleArena'
import MyDeck from '../../components/deck/MyDeck'

const GamePage = (props) => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [selectedArea, setSelectedArea] = useState(null)
  const [wildPokemon, setWildPokemon] = useState(null)
  const [myChosenPoki, setMyChosenPoki] = useState(null)
  const [isPlayerEngage, setIsPlayerEngage] = useState(false)
  const [isPokiConfirmed, setIsPokiConfirmed] = useState(false)
  const [isFightBegins, setIsFightBegins] = useState(false)
  const [showDeck, setShowDeck] = useState(false)

  return (
    <div className={`main game m-0 p-1 ${isPlayerEngage ? 'main flex' : ''}`}>
      <NavigationBar onSelectLocation={setSelectedLocation} location={selectedLocation} />
      {!isPokiConfirmed ? (
        <>
          {!selectedLocation && (
            <div className='play-location-list'>
              <SelectLocation onSelectLocation={setSelectedLocation} />
            </div>
          )}
          {selectedLocation && (
            <div className='select-area'>
              {!selectedArea ? (
                <SelectArea location={selectedLocation} onSelectArea={setSelectedArea} />
              ) : (
                <Area selectedArea={selectedArea} onGettingWildPoki={setWildPokemon} onPressReady={setIsPlayerEngage} />
              )}
            </div>
          )}

          <div className='game-deck-status ml-[10vw] mr-[10vw] relative'>
            {showDeck ? (
              <div className='absolute -top-[48px]'>
                <button
                  className='absolute z-10 -left-[10px] -top-8 rounded-full size-8 max-w-8'
                  onClick={() => setShowDeck(false)}
                >
                  X
                </button>
                <MyDeck />
              </div>
            ) : (
              <button className='absolute top-[224px] left-[36vw]' onClick={() => setShowDeck(true)}>
                Show deck
              </button>
            )}
          </div>
          {wildPokemon && (
            <div className='deck-selector-container'>
              {isPlayerEngage && (
                <ChoosePoki
                  onChoosingPoki={setMyChosenPoki}
                  myChosenPoki={myChosenPoki}
                  onPlayerEngage={setIsPlayerEngage}
                  onConfirmPoki={setIsPokiConfirmed}
                />
              )}
            </div>
          )}
        </>
      ) : !isFightBegins ? (
        <Encounter myPoki={myChosenPoki} wildPoki={wildPokemon} onStartFight={setIsFightBegins} />
      ) : (
        <BattleArena myPoki={myChosenPoki} wildPoki={wildPokemon} />
      )}
      {isPlayerEngage && <div className='absolute inset-0 backdrop-filter backdrop-blur-md z-10'></div>}
    </div>
  )
}

export default GamePage
