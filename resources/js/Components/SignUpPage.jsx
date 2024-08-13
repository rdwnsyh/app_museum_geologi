import React, { useState } from 'react';
import './AuthPage.css';

function SignUpPage() {
  const [nama, setNama] = useState('');
  const [asal, setAsal] = useState('');
  const [email, setEmail] = useState('');
  const [no_hp, setNo_hp] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    
    alert(`Sign Up with ${email}`);
  };

  return (
    <div className="full-background">
      <div className="auth-page-signup">
        <form onSubmit={handleSignUp} className="auth-form">
          <input
            type="text"
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Asal Perguruan Tinggi"
            value={asal}
            onChange={(e) => setAsal(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
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
          <button type="submit" className="auth-button">Sign Up</button>
          
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
