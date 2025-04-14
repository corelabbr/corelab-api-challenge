import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import projectIcon from '../../assets/project-icon.png';

const Header: React.FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/?search=${encodeURIComponent(search)}`, { replace: true });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img 
          src={projectIcon} 
          alt="Project Icon" 
          className={styles.logoIcon}
        />
        <h1 className={styles.title}>CoreNotes</h1>
      </div>
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Pesquisar notas"
          className={styles.searchInput}
        />
        <button 
          onClick={handleSearch}
          className={styles.searchButton}
          disabled={!search.trim()}
        >
          <FaSearch />
        </button>
      </div>
    </header>
  );
};

export default Header;