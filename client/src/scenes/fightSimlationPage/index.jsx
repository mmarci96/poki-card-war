import { useEffect, useState } from 'react'
import CardForBattle from './components/CardForBattle'

const FightSimulatorPage = () => {
  const [savePokemonData, setSavePokemonData] = useState(null)

  return (
    <div className='kill-or-die w-full h-full'>
      <div className='experimantal-arena w-[72vw] h-[40vh] aspect-video bg-fight2 ml-auto  mt-auto mr-auto'>
        <div className='playerOne'>
          {' '}
          <CardForBattle name='arceus' onSavingPokemonData={setSavePokemonData} />{' '}
        </div>

        <div className='playerTwo'>
          {' '}
          <CardForBattle name='grudon' onSavingPokemonData={setSavePokemonData} />
        </div>
      </div>
    </div>
  )
}

export default FightSimulatorPage
