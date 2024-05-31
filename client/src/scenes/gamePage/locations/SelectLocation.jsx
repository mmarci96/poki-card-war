import { useEffect, useState } from 'react'
import Location from './Location'

const SelectLocation = (props) => {
  const onSelectLocation = props.onSelectLocation
  const [locationsList, setLocationList] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)

  useEffect(() => {
    const getLocations = async (offSet, limit) => {
      try {
        setLocationList(null)
        const response = await fetch(`https://pokeapi.co/api/v2/location?offset=${offSet}&limit=${limit}`)
        const data = await response.json()
        setLocationList(data.results)
      } catch (error) {
        console.log(error)
      }
    }
    const offSet = (pageIndex - 1) * 20
    const limit = 20
    getLocations(offSet, limit)
  }, [pageIndex])

  return (
    <div className='location-selection'>
      {locationsList &&
        locationsList.map((location, index) => (
          <div className='selection-card' key={index}>
            <Location location={location} onSelectLocation={onSelectLocation} />
          </div>
        ))}
    </div>
  )
}

export default SelectLocation
