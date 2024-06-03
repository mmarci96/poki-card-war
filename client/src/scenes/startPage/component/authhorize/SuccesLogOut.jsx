import { Link } from "react-router-dom"

const SuccesLogOut = ({ isJustLoggedOut }) => {
  return (
    <div className='text-center bg-secondary-light bg-opacity-60 m-1 p-1 ml-auto mr-auto'>
      <h1 className='text-3xl font-bold m-t-2 p-2' m-auto>Succesfully logged out! Hope we see you again!</h1>

      <span className='flex'>
        <Link to='/' className='btn-main mt-2'>
          <button className='btn-main mt-2'>Back to home</button>
        </Link>
        <button className='btn-main mt-2' onClick={() => isJustLoggedOut(false)}>
          Back to login
        </button>
      </span>
    </div>
  ) 
}

export default SuccesLogOut