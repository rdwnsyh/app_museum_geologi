import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SearchBar from '../Components/SearchBar';
import AuthButtons from '../Components/AuthButtons';
import LoginPage from '../Components/LoginPage';
import SignUpPage from '../Components/SignUpPage';
import './App.css';

function Welcome() {

  return (   

        <div className="full-background">
          <BrowserRouter>
            <div className="App-content">
              <AuthButtons />
              <Routes>
                
                <Route path="/" element={<SearchBar />} />
                <Route path="/LoginPage" element={<LoginPage />} />
                <Route path="/SignUpPage" element={<SignUpPage />} />
                
              </Routes>
            </div>
          </BrowserRouter>
        </div>

    
  );
}


export default Welcome;