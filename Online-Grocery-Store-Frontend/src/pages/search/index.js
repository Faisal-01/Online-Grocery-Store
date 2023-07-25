import React from 'react';
import styles from '../../styles/Search.module.css';
import SearchIcon from "@mui/icons-material/Search";

export default function SearchDefault() {
  return (
    <div className={styles.container}>
        <SearchIcon className={styles.icon}/>
      <p>Try searching eggs, bread, jam, onion etc.</p>
    </div>
  );
}
