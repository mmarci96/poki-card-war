import { useEffect } from 'react'

const HealthBars = (props) => {
  const healthLost = props.healthLost
  const myPoki = props.myPoki
  const wildPoki = props.wildPoki
  const damageDone = props.damageDone
  const myPokiHp = props.myPokiHp
  const wildPokiHp = props.wildPokiHp
  const attackAnimation = props.attackAnimation
  const defenseAnimation = props.defenseAnimation

  return (
    <div className='health-bars flex justify-between relative -translate-y-[160px]'>
      {myPoki && (
        <div className='battle-pokemon-stats bg-gradient-green p-4 border-1 border-gray-700 rounded-xl rounded-tl-none'>
          <h3 className='fight-poki-name text-4xl font-semi-bold ml-1'>
            {myPoki.name[0].toUpperCase() + myPoki.name.substring(1)}
          </h3>
          <label htmlFor='progress' className='health text-3xl font-bold p-1'>
            HP:
          </label>
          <progress id='progress' className='hp-bar text-2xl' max={200} value={myPokiHp}></progress>
          <br></br>
          <p className='health text-4xl font-semi-bold'>
            <span className='xdd text-3xl p-1 pb-2 mt-[20px]'>{parseFloat(myPokiHp).toFixed(0)}</span>
            /200
          </p>

          <div className='effect-div relative'>
            {defenseAnimation && healthLost ? (
              <p className='health-loss text-red-600 absolute text-4xl animate-ping bottom-[8vh] left-[12vw]'>
                -{healthLost} ❤️
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}

      <div className='battle-pokemon-stats bg-gradient-reverse-green p-4 border-1 border-gray-700 rounded-xl rounded-tr-none'>
        <h3 className='fight-poki-name text-4xl font-semi-bold ml-1 text-right'>
          {wildPoki.name[0].toUpperCase() + wildPoki.name.substring(1)}
        </h3>
        <label htmlFor='progress' className='health text-3xl font-bold p-1'>
          HP:
        </label>
        <progress id='hp-mark' className='hp-bar text-2xl text-right' max={200} value={wildPokiHp}></progress>
        <br></br>
        <p className='health text-4xl font-semi-bold text-right'>
          <span className='xdd text-3xl p-1 pb-2 mt-[20px] text-right'>{parseFloat(wildPokiHp).toFixed(0)}</span>
          /200
        </p>
        <div className='effect-div relative'>
          {damageDone && attackAnimation ? (
            <p className='health-loss text-blue-400 absolute text-4xl animate-ping bottom-[8vh] right-[12vw]'>
              {damageDone} ⚔️
            </p>
          ) : (
            <p> </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default HealthBars
