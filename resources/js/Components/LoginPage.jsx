import React, { useState } from 'react';
import './AuthPage.css';

function LoginPage() {

      
  const [no_hp, setNo_hp] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login with ${no_hp}`);
  };

  return (
    <div className="full-background">
      <div className="auth-page-login">
        
        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="no_hp"
            placeholder="Nomor Handphone"
            value={no_hp}
            onChange={(e) => setNo_hp(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
