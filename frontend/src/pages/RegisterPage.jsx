import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'

import astronaut from '../images/reg-astronaut.png'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

 
  return (
    <section className='reg-page'>

      <div className="reg-content">

        <section className='heading'>
          <h1>
            Register
          </h1>
          <p>Please create an account</p>
        </section>

        <section className='form'>
          <form>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={name}
                placeholder='Enter your name'
                
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={email}
                placeholder='Enter your email'
                
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
                
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                id='password2'
                name='password2'
                value={password2}
                placeholder='Confirm password'
                
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

      <div className="reg-poster">
        <div className="reg-img-wrap">
          <img src={astronaut} alt="poster" className='reg-img' />
        </div>
      </div>
      

    </section>
  )
}

export default Register
