import { Link } from 'react-router-dom'

const NavigationBar = (props) => {
  const onSelectLocation = props.onSelectLocation
  const selectedLocation = props.location

  return (
    <div className='location-navigation flex justify-evenly bg-slate-50 bg-opacity-20 p-3 rounded-xl'>
      <div className='power-button'>
        <Link to='/'>
          <button>Exit</button>
        </Link>
      </div>

      <div className='area-header bg-base rounded-lg p-2 border-black border'>
        <h2 className='area-title text-center text-xl font-bold'>
          {selectedLocation ? selectedLocation.names[1].name : 'Sinnoh'}
        </h2>
      </div>

      <div className='back-button'>
        {selectedLocation ? (
          <button onClick={() => onSelectLocation(null)}>Back</button>
        ) : (
          <button className='regions'>Regions</button>
        )}
      </div>
    </div>
  )
}

export default NavigationBar
