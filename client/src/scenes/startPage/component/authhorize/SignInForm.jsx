import { useState, useEffect } from 'react'

const SignInForm = ({ onSignIn }) => {
  const [wrongLog, setWrongLog] = useState(false)
  const [userName, setUserName] = useState(null)

  const handleLogIn = (e) => {
    e.preventDefault()
    setUserName(e.target[0].value)
  }

  useEffect(() => {
    const getUserId = async (url) => {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      if (data) {
        setWrongLog(false)
        onSignIn({ user_name: userName, id: data._id })
      } else {
        setWrongLog(true)
      }
    }
    if (userName) {
      getUserId(`/api/user/${userName}`)
    }
  }, [userName])

  return (
    <form
      className='max-w-1/2 min-w-[256px] flex flex-col justify-center p-2 m-4 bg-light bg-opacity-50  h-[40vh] min-h-[380px] mt-32'
      onSubmit={handleLogIn}
    >
      <p className='text-2xl font-semibold'>You have to register to play!</p>
      <div className='flex justify-center m-1 p-2 text-xl'>
        <label htmlFor='username-input' className='p-1 m-1 text-xl'>
          Username
        </label>
        <input id='username-input' className='p-1 m-1 text-xl' type='text' required />
      </div>
      <div className='flex justify-center m-2 p-2 text-xl'>
        <label htmlFor='password-input' className='p-1 m-1 text-xl'>
          Password
        </label>
        <input id='password-input' className='p-1 m-1 text-xl' type='password' required />
      </div>
      <div className='flex justify-center m-2 p-2'>
        {wrongLog && (
          <p>
            Wrong details, if you forgot your passwork{' '}
            <span onClick={() => alert('Try to remember... no contact to send details')}>click here</span>!
          </p>
        )}
        <label className='mt-2'>Keep me signed in</label>
        <input className='p-1 m-1' type='checkbox'></input>
        <button className='btn-main h-[24px] p-1' type='submit'>
          Log In
        </button>
      </div>
    </form>
  )
}

export default SignInForm
