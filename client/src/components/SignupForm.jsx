import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { USER_SIGNUP } from '../utils/mutations'

import Auth from '../utils/auth';


const SignupForm = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const [userSignup, { error }] = useMutation(USER_SIGNUP);

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
       // execute userSignup mutation and pass in variable data from form
      const { data } = await userSignup({
        variables: { ...formState } 
      });
      Auth.login(data.userSignup.token);
    } 
    catch (e) {
      console.error(e);
    }
  };

    return (
        // {/* <!-- Sign Up Form --> */}
        <div className="col card shadow m-5 d-grid">
            <h3 className="text-center mt-3">Sign Up</h3>
            <div className="card-body d-block">
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group mt-4">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="username" 
                            placeholder="Choose your username"
                            name='username' 
                            value={formState.username}
                            onChange={handleChange}
                            />
                        </div>
                        <label className="mt-3" htmlFor="email">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"
                            name='email'
                            value={formState.email}
                            onChange={handleChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="Ipassword">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Password" 
                            name='password'
                            value={formState.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="card-body d-grid" id="subscribe-btn">
                        <button type='submit' className="btn btn-primary">Subscribe</button>
                    </div>
                </form>
                {error && <div>Sign up failed</div>}
            </div>
        </div>
        // {/* <!-- END of Sign Up Form --> */ }
    )
}

export default SignupForm;