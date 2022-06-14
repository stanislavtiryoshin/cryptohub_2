import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return 'Loading...'
  }

  return (
<section className='reg-page'>

<div className="reg-content">

  <section className='heading'>
    <h1>
      Log In
    </h1>
    <p>Please authorize if you have an account</p>
  </section>

  <section className='form'>
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <input
          type='email'
          className='form-control'
          id='email'
          name='email'
          value={email}
          placeholder='Enter your email'
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          id='password'
          name='password'
          value={password}
          placeholder='Enter password'
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <button type='submit' className='btn-pink-solid'>
          Submit
        </button>
      </div>
    </form>
  </section>

</div>

<div className="reg-poster" id='log-poster'></div>


</section>
  )
}

export default Login
