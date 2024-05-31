import { useEffect, useState } from 'react'
import Pokicard from '../poki-card/Pokicard'

const Deck = ({ onChoosingPoki, index }) => {
  const [myDeck, setMyDeck] = useState(null)

  useEffect(() => {
    //const myDeck = JSON.parse(localStorage.getItem('MY_DECK'))
    //setMyDeck(myDeck)
  }, [])

  return (
    <div
      key={index}
      className='flex overflow-y-scroll bg-white bg-opacity-40 border border-black rounded-xl -mt-2 min-w-[600px] max-w-[100%] w-[1110px]'
    >
      {myDeck &&
        myDeck.map((poki, index) => (
          <Pokicard name={poki.name} scale={1} key={index} onClickPicture={onChoosingPoki} />
        ))}
    </div>
  )
}

export default Deck
