import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../styles/PainelAdmin.module.css';

export default function BarraPesquisa() {
  return (
    <div className={`${styles.barraPesquisa} ${styles.menuIcon}`}>
      <TextField
        placeholder="Pesquisar..."
        variant="filled"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}