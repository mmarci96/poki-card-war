import { useEffect, useState } from 'react'

const SelectArea = (props) => {
  const [areas, setAreas] = useState([])
  const location = props.location
  const onSelectArea = props.onSelectArea

  useEffect(() => {
    const getAreas = async (url) => {
      const response = await fetch(url)
      const data = await response.json()

      setAreas((prev) => {
        if (prev[prev.length - 1]?.id !== data.id) {
          return [...prev, data]
        } else {
          return [...prev]
        }
      })
    }
    location.areas.map((area) => getAreas(area.url))
  }, [])

  return (
    <div className='location-selection' type={location.name.substring(location?.name?.indexOf('-') + 1)}>
      {areas &&
        areas.map((area, index) => {
          return (
            <div className='selection-card  max-w-[30vw]' key={index}>
              <div className='location-card-icon' type={'forest'}></div>
              <div className='base flex justify-between max-h-[6vh] min-h-[40px] static pb-2'>
                <h3 className='game-area text-xl mt-2'>{area?.names[0].name}</h3>
                <button onClick={() => onSelectArea(area)}>Go</button>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default SelectArea
