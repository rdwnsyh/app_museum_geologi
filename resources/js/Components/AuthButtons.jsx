import React from 'react';
import { Link } from 'react-router-dom';
import './AuthButtons.css';

function AuthButtons() {
  return (
    <div className="auth-buttons">
      <Link to="/LoginPage">
        <button className="auth-button login">Login</button>
      </Link>
      <Link to="/SignUpPage">
        <button className="auth-button signup">Sign Up</button>
      </Link>
    </div>
  );
}

export default AuthButtons;
