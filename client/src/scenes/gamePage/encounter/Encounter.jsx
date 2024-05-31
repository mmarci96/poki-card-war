import Pokicard from '../../../components/poki-card/Pokicard'

const Encounter = (props) => {
  const myPoki = props.myPoki
  const wildPoki = props.wildPoki.pokemon.name
  const onStartFight = props.onStartFight

  return (
    <div className='game-battle-cry scale-80'>
      <div className='flex justify-center'>
        <span className='my-card absolute left-[60%]'>
          <Pokicard name={myPoki} />
        </span>
        <p className='vs-text absolute top-32 text-8xl z-20 -rotate-2 text-red-600 font-extrabold '>VS</p>
        <p className='vs-text absolute top-32 text-8xl z-10 -rotate-2 text-black-600 font-extrabold p-2'>VS</p>
        <span className='wild-card absolute right-[60%] '>
          <Pokicard name={wildPoki} />
        </span>
        <button
          className='fight-start-now absolute top-96 min-w-[200px] p-2 text-2xl bg-red-600 hover:bg-red-300 transition-colors font-semibold text-yellow-50 border-4'
          onClick={() => onStartFight(true)}
        >
          Let's Fight!
        </button>
      </div>
    </div>
  )
}

export default Encounter
