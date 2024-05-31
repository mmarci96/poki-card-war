import { useEffect, useState } from 'react'
import '../styles/location.css'

const Location = (props) => {
  const location = props.location
  const onSelectLocation = props.onSelectLocation
  const url = location.url

  const [currentLocation, setCurrentLocation] = useState(null)

  useEffect(() => {
    const getLocations = async () => {
      const response = await fetch(url)
      const data = await response.json()
      setCurrentLocation(data)
    }
    getLocations()
  }, [])

  return currentLocation ? (
    <>
      <div
        className='location-card-icon'
        type={currentLocation?.name.substring(currentLocation?.name?.indexOf('-') + 1)}
      ></div>

      <div className='base flex justify-between max-h-[6vh] min-h-[40px] static pb-2'>
        <h3 className='location text-xl mt-2 '>{currentLocation.names[1].name}</h3>
        <button
          className='visit p-0'
          onClick={() => {
            onSelectLocation(currentLocation)
          }}
        >
          Visit
        </button>
      </div>
    </>
  ) : (
    <p>loading...</p>
  )
}

export default Location
