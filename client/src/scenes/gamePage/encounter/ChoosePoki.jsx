import Deck from '../../../components/deck/Deck'

const ChoosePoki = (props) => {
  const onChoosingPoki = props.onChoosingPoki
  const myChosenPoki = props.myChosenPoki
  const onPlayerEngage = props.onPlayerEngage
  const onConfirmPoki = props.onConfirmPoki

  return (
    <div className='pick-card absolute top-20 left-0 z-20 items-center'>
      <Deck onChoosingPoki={onChoosingPoki} />
      <div className='buttons-deck flex justify-start'>
        {myChosenPoki ? (
          <p className='bg-gray-200 bg-opacity-60 p-3 text-xl ml-16 rounded-xl border border-black'>
            You have chosen: {myChosenPoki[0].toUpperCase() + myChosenPoki.substring(1)}
          </p>
        ) : (
          <p className='help bg-gray-200 bg-opacity-60 p-3 text-xl ml-16 rounded-xl border border-black'>
            Click on a picture to select!
          </p>
        )}
        <button className='back-to-area ' onClick={() => onPlayerEngage(false)}>
          Back...
        </button>
        {myChosenPoki && (
          <button
            className='start-fight bg-[#5085a5] hover:bg-cyan-600 ease-in'
            onClick={() => {
              onConfirmPoki(true)
              onPlayerEngage(false)
            }}
          >
            Confirm!
          </button>
        )}
      </div>
    </div>
  )
}

export default ChoosePoki
