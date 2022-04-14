import React from 'react';
import useAPI from '../../hooks/useAPI';
import './login.scss';

const Login = () => {
  const { loginInputs, handleLoginInputChange, handleLoginSubmit } = useAPI();
  return (
    <div className="login-page">
      <div className="form-wrapper">
        <h5 className="header-title">LOGIN</h5>
        <form>
          <div className="label-input-wrapper">
            <label htmlFor="email">Email</label>
            <div className="login-input-wrapper">
              <input
                type="email"
                name="email"
                value={loginInputs.email}
                onChange={({ target: { value } }) => handleLoginInputChange('email', value)}
                placeholder="Enter Email Address"
              />
            </div>
          </div>
          <div className="label-input-wrapper">
            <label htmlFor="password">Password</label>
            <div className="login-input-wrapper">
              <input
                type="password"
                name="password"
                value={loginInputs.password}
                onChange={({ target: { value } }) => handleLoginInputChange('password', value)}
                placeholder="Enter Password"
              />
            </div>
          </div>
          <div className="button-wrapper">
            <button type="button" onClick={handleLoginSubmit}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
