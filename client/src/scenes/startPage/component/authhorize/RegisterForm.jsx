

const RegisterForm = ({ onSingUpSuccesfull, onHasAccount, isLogged }) => {
  
  const handleRegister = async (e) => {
    e.preventDefault()
    const fullName = e.target[0].value
    const userName = e.target[1].value
    const password = e.target[2].value
    const data = { full_name: fullName, user_name: userName, password: password }
    fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.reason) {
          alert(
            `Could not create account ${response.reason}. Please choose another username how about xX${userName}Xx?`
          )
        } else {
          onSingUpSuccesfull({ user_name: userName, id: response._id })
          console.log(response)
          onHasAccount(true)
        }
      })
  }

  return (
    !isLogged && 
    <form
      className='max-w-1/2 min-w-[160px] flex flex-col justify-center p-2 m-4 bg-light bg-opacity-50  h-[40vh] min-h-[420px] mt-32'
      onSubmit={handleRegister}
    >
      <p className='text-2xl font-semibold'>You have to register to play!</p>
      <div className='flex justify-center m-2 p-2'>
        <label className='p-1 m-1 text-xl'>Full Name</label>
        <input className='p-1 m-1 text-xl' type='text' required />
      </div>
      <div className='flex justify-center m-1 p-2 text-xl'>
        <label className='p-1 m-1 text-xl'>Username</label>
        <input className='p-1 m-1 text-xl' type='text' required />
      </div>
      <div className='flex justify-center m-2 p-2 text-xl'>
        <label className='p-1 m-1 text-xl'>Password</label>
        <input className='p-1 m-1 text-xl' type='password' required />
      </div>
      <div className='flex justify-center m-2 p-2'>
        <button className='btn-main h-[24px] p-1' type='submit'>
          Sign Up
        </button>
      </div>
      <p className='text-xl'>
        If you already have an account registed{' '}
        <span onClick={() => onHasAccount(true)} className='link text-indigo-800 font-semibold cursor-pointer'>
          here
        </span>
        !
      </p>
    </form>
  )
}

export default RegisterForm
