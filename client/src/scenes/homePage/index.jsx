import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='w-full h-[100vh] bg-cover bg-center flex flex-col justify-between bg-city-mist pt-[100px]'>
      <span className=' w-[80ř] ml-[10%] mr[10%] flex justify-center'>
        <h1 className='text-center max-w-[800px] text-6xl tracking-wider h-[32vh] font-bold text-emerald-950 '>
          Some Amazing Content Here!
        </h1>
      </span>
      <div className='flex justify-evenly justify-self-end'>
        <Link to='/start'>
          <button className=' text-xl w-[16vw] min-w-[110px] bg-accent bg-opacity-80 border-black border hover:bg-red-600 p-1 m-1 text-secondary h-[8vh] max-h-[64px] min-h-[36px] rounded-2xl'>
            New Game
          </button>
        </Link>

        <Link to='/play'>
          <button className=' text-xl w-[16vw] min-w-[110px] bg-accent bg-opacity-80 border-black border hover:bg-red-600 p-1 m-1 text-secondary h-[8vh] max-h-[64px] min-h-[36px] rounded-2xl'>
            Play
          </button>
        </Link>
        <Link to='/collection'>
          <button className='text-xl w-[16vw] min-w-[110px] bg-accent bg-opacity-80 border-black border hover:bg-red-600 p-1 m-1 text-secondary h-[8vh] max-h-[64px] min-h-[36px] rounded-2xl'>
            Collection
          </button>
        </Link>
        <Link to='/pokecodex'>
          <button className='text-xl w-[16vw] min-w-[110px] bg-accent bg-opacity-80 border-black border hover:bg-red-600 p-1 m-1 text-secondary h-[8vh] max-h-[64px] min-h-[36px] rounded-2xl'>
            Pokecodex
          </button>
        </Link>
        <Link to='/support'>
          <button className='text-xl w-[16vw] min-w-[110px] bg-accent bg-opacity-80 border-black border hover:bg-red-600 p-1 m-1 text-secondary h-[8vh] max-h-[64px] min-h-[36px] rounded-2xl'>
            Need help?
          </button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
