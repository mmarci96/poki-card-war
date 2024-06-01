import { useState } from 'react'
import SelectLocation from './locations/SelectLocation'
import SelectArea from './locations/SelectArea'
import NavigationBar from './header/HeaderBar'
import Area from './locations/Area'
import ChoosePoki from './encounter/ChoosePoki'
import Encounter from './encounter/Encounter'
import BattleArena from './encounter/BattleArena'
import MyDeck from '../../components/deck/MyDeck'

const GamePage = ({ onSelectLocation }) => {
  const [state, setState] = useState({
    selectedLocation: null,
    selectedArea: null,
    wildPokemon: null,
    chosenPokemon: null,
    isPlayerEngaged: false,
    isPokemonConfirmed: false,
    isFightStarted: false,
    isDeckVisible: false,
  });

  const { selectedLocation, selectedArea, wildPokemon, chosenPokemon, isPlayerEngaged, isPokemonConfirmed, isFightStarted, isDeckVisible } = state;

  const setStateValue = (key, value) => setState(prevState => ({ ...prevState, [key]: value }));

  return (
    <div className={`main game m-0 p-1 ${isPlayerEngaged ? 'main flex' : ''}`}>
      <NavigationBar onSelectLocation={onSelectLocation} location={selectedLocation} />
      {!isPokemonConfirmed ? (
        <>
          {!selectedLocation && (
            <div className='play-location-list'>
              <SelectLocation onSelectLocation={setStateValue.bind(null, 'selectedLocation')} />
            </div>
          )}
          {selectedLocation && (
            <div className='select-area'>
              {!selectedArea ? (
                <SelectArea location={selectedLocation} onSelectArea={setStateValue.bind(null, 'selectedArea')} />
              ) : (
                <Area selectedArea={selectedArea} onGettingWildPokemon={setStateValue.bind(null, 'wildPokemon')} onPressReady={setStateValue.bind(null, 'isPlayerEngaged', true)} />
              )}
            </div>
          )}

          <div className='game-deck-status ml-[10vw] mr-[10vw] relative'>
            {isDeckVisible ? (
              <div className='absolute -top-[48px]'>
                <button className='absolute z-10 -left-[10px] -top-8 rounded-full size-8 max-w-8' onClick={() => setStateValue('isDeckVisible', false)}>
                  X
                </button>
                <MyDeck />
              </div>
            ) : (
              <button className='absolute top-[224px] left-[36vw]' onClick={() => setStateValue('isDeckVisible', true)}>
                Show deck
              </button>
            )}
          </div>
          {wildPokemon && (
            <div className='deck-selector-container'>
              {isPlayerEngaged && (
                <ChoosePoki
                  onChoosingPokemon={setStateValue.bind(null, 'chosenPokemon')}
                  chosenPokemon={chosenPokemon}
                  onPlayerEngage={setStateValue.bind(null, 'isPlayerEngaged', false)}
                  onConfirmPokemon={setStateValue.bind(null, 'isPokemonConfirmed', true)}
                />
              )}
            </div>
          )}
        </>
      ) : !isFightStarted ? (
        <Encounter myPokemon={chosenPokemon} wildPokemon={wildPokemon} onStartFight={setStateValue.bind(null, 'isFightStarted', true)} />
      ) : (
        <BattleArena myPokemon={chosenPokemon} wildPokemon={wildPokemon} />
      )}
      {isPlayerEngaged && <div className='absolute inset-0 backdrop-filter backdrop-blur-md z-10'></div>}
    </div>
  );
};

export default GamePage
