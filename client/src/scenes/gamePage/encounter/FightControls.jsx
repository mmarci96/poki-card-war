const FightControls = (props) => {
  const attackAnimation = props.attackAnimation
  const onAttack = props.onAttack
  const onBattleOver = props.onBattleOver
  return (
    <div className='fight-controls absolute right-[18%] w-[40%] top-[90%]'>
      {!attackAnimation ? (
        <button className='attack-button bg-red-600 hover:bg-red-400  animate-wiggle p-2 text-xl' onClick={onAttack}>
          ATTACK
        </button>
      ) : (
        <button className='attacking cursor-default bg-slate-500  p-2 text-xl'>Waiting...</button>
      )}
      <button className='p-2 text-xl' onClick={() => onBattleOver(true)}>
        LEAVE
      </button>
    </div>
  )
}

export default FightControls
