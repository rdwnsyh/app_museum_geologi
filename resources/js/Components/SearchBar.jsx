// src/components/SearchBar.js
import React, { useState } from 'react';


function SearchBar() {

  const backgroundStyle = {
    backgroundImage: 'url(../../bg3.png)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', 
    width: '100vw',   
    display: 'flex',              
    alignItems: 'center',         
    justifyContent: 'center',
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: 'auto',
      padding: '20px',
      textAlign: 'center'
    },
    form: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px'
    },
    input: {
      width: '300px',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginRight: '10px',
      flexgrow: '1',
      fontsize: '16px'
    },
    button: {
      padding: '5px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#007BFF',
      color: '#fff',
      cursor: 'pointer',
      marginleft: '8px'
    },
    svg: {
      width: '20px',
      height: '20px',
      color: '#B8D7E9',
    },

    links: {
      marginTop: '20px'
    },
    link: {
      margin: '0 10px',
      color: '#007BFF',
      textDecoration: 'none'
    }
  };

  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
   
    console.log('Search query:', query);
  };

  return (
     <div style={backgroundStyle}>
      
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari koleksi..."
          style={styles.input}
        />
        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </form>
    
    </div>
  );
}



export default SearchBar;
