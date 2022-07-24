import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../utils/mutations';

import Auth from '../utils/auth';

const LoginForm = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const [userLogin, { error }] = useMutation(USER_LOGIN);
  
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await userLogin({
        variables: { ...formState }
      });
  
      Auth.login(data.userLogin.token);
    } 
    catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
    return (
        // {/* <!-- Login Form--> */}
        <div className="col card m-5 shadow d-grid">
          <h3 className="text-center mt-3">login</h3>
          <div className="card-body d-block">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group mt-4">
              <div className="form-group">
                <label htmlFor="formGroupExampleInput">Email</label>
                <input 
                type='email'
                name='email'
                className="form-control" 
                id="formGroupExampleInput" 
                placeholder="Enter your email"
                value={formState.email}
                onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="InputPassword2">Password</label>
              <input 
              type="password" 
              name='password'
              className="form-control" 
              id="InputPassword2" 
              placeholder="Password"
              value={formState.password}
              onChange={handleChange}
              />
            </div>
            <div className="card-body d-grid mt-3" id="login-btn">
              <button type="submit"  className="btn btn-danger">Login</button>
            </div>
          </form>
          {error && <div>Login failed</div>}
          </div>
        </div>

    //   {/* <!-- END of Login Form --> */}
    )
}

export default LoginForm;