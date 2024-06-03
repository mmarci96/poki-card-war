import MyPokiCard from '../poki-card/MyPokiCard'

const MyDeck = ({ onChoosingPoki, onSetMyDeck, myDeck }) => {
  const handleDelete = (poki) => {
    const removePoki = myDeck.filter((pokemon) => pokemon.name != poki)
    onSetMyDeck(removePoki)
  }
  return (
    <div className='flex overflow-y-scroll bg-white bg-opacity-40 border h-[320px] border-black rounded-xl min-w-[600px] max-w-[70vw]'>
      {myDeck &&
        myDeck.map((poki, index) => (
          <div key={index}>
            <MyPokiCard data={poki}  onClickPicture={onChoosingPoki} />
            <button onClick={() => handleDelete(poki.name)}></button>
          </div>
        ))}
    </div>
  )
}

export default MyDeck
