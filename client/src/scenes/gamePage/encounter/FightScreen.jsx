import HealthBars from './HealthBars'
import FightControls from './FightControls'
import { useEffect, useState } from 'react'
import CatchPoki from './CatchPoki'

const FightScreen = (props) => {
  const onAttackAnimation = props.onAttackAnimation
  const onDamageDone = props.onDamageDone
  const onHealthLost = props.onHealthLost
  const attackAnimation = props.attackAnimation
  const onBattleOver = props.onBattleOver
  const myPoki = props.myPoki
  const wildPoki = props.wildPoki
  const healthLost = props.healthLost
  const damageDone = props.damageDone
  const isBattleOver = props.isBattleOver
  const [myPokiHp, setMyPokiHp] = useState(myPoki.hp)
  const [wildPokiHp, setWildPokiHp] = useState(wildPoki.hp)
  const [defenseAnimation, setDefenseAnimation] = useState(false)
  const myPokiSpeed = myPoki.speed
  const wildPokiSpeed = wildPoki.speed
  const myAttackDuration = parseInt(128000 / myPokiSpeed)
  const enemyAttackDuration = parseInt(128000 / wildPokiSpeed) + parseInt(myAttackDuration)

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const calcDamage = (attack, defense) => {
    const B = attack
    const D = defense
    const Z = getRandomNumber(217, 255)
    const result = ((((2 / 5 + 2) * B * 60) / D / 50 + 2) * Z) / 255
    return result
  }
  const handleAttack = () => {
    onAttackAnimation(true)
    onHealthLost(null)
    onDamageDone(null)
    const myPokiD = myPoki.defense
    const myPokiA = myPoki.attack
    const wildPokiA = wildPoki.attack
    const wildPokiD = wildPoki.defense

    const hpLoss = calcDamage(wildPokiA, myPokiD)
    const dmgDone = calcDamage(myPokiA, wildPokiD)
    setTimeout(() => {
      onDamageDone(parseFloat(dmgDone).toFixed(0))
      setWildPokiHp((prev) => prev - dmgDone)
    }, 300)

    setTimeout(() => {
      onHealthLost(parseFloat(hpLoss).toFixed(0))
      setMyPokiHp((prev) => prev - hpLoss)
      onAttackAnimation(false)
      setDefenseAnimation(true)
    }, myAttackDuration)

    setTimeout(() => {
      setDefenseAnimation(false)
    }, enemyAttackDuration)
  }

  useEffect(() => {
    if (myPokiHp < 1 || wildPokiHp < 1) {
      onBattleOver(true)
    }
    console.log(myPoki)
  }, [myPokiHp, wildPokiHp])

  const [idleAttck, setIdleAttack] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      handleIdleAttack()
      setIdleAttack((prev) => prev + 1)
    }, 8000)

    const handleIdleAttack = () => {
      const wildPokiA = wildPoki.attack
      const myPokiD = myPoki.defense
      const hpLoss = calcDamage(wildPokiA, myPokiD) / 2
      onHealthLost(parseFloat(hpLoss).toFixed(0))
      setMyPokiHp((prev) => prev - hpLoss)
    }
  }, [idleAttck])

  return !isBattleOver ? (
    <div className='fight-container bg-fight bg-cover bg-center max-w-[1444px] p-2 pl-0 pr-0 m-8 ml-[5%] mr-[5%] max-h-[750px] h-[80vh] relative rounded-xl border-2 border-green-950'>
      <div className='fighters z-10 h-[80vh] max-h-[750px]'>
        <div className='my-poki-fighter'>
          <img className='fighter-pic absolute scale-150 top-[58%] left-[28%]' src={myPoki.pictureBack}></img>
        </div>
        <div className='wild-poki-fighter'>
          <img className='fighter-pic absolute scale-150 top-[45%] right-[35%]' src={wildPoki.picture}></img>
        </div>
      </div>
      <HealthBars
        healthLost={healthLost}
        myPoki={myPoki}
        wildPoki={wildPoki}
        damageDone={damageDone}
        myPokiHp={myPokiHp}
        wildPokiHp={wildPokiHp}
        attackAnimation={attackAnimation}
        defenseAnimation={defenseAnimation}
      />
      <FightControls
        attackAnimation={attackAnimation}
        defenseAnimation={defenseAnimation}
        onBattleOver={onBattleOver}
        onAttack={handleAttack}
      />
    </div>
  ) : (
    <CatchPoki myPoki={myPoki} wildPoki={wildPoki} myPokiHp={myPokiHp} wildPokiHp={wildPokiHp} />
  )
}

export default FightScreen
