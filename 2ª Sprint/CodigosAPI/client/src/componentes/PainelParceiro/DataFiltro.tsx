import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EventIcon from '@mui/icons-material/Event';
import styles from '../styles/PainelParceiro.module.css';

// Componente DataInicio
export function DataInicio() {
  return (
    <div className={`${styles.componenteData} ${styles.menuIcon}`}>
      <TextField
        placeholder="Data de início"
        variant="filled"
        sx={{
          '& .MuiFilledInput-root': {
            backgroundColor: 'transparent', // Remova o fundo preenchido
          },
          '& .MuiInputBase-input': {
            fontSize: '14px', // Ajuste o tamanho da fonte
            color: '#333', // Ajuste a cor do texto
            paddingRight: '0', // Remova o espaço à direita do texto
          },
          '& .MuiInputAdornment-positionStart': {
            marginTop: '0', // Levante o ícone
            color: '#888', // Altere a cor do ícone para cinza
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EventIcon /> {/* Ícone de calendário */}
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

// Componente DataFim
export function DataFim() {
  return (
    <div className={`${styles.componenteData} ${styles.menuIcon}`}>
      <TextField
        placeholder="Data de fim"
        variant="filled"
        sx={{
          '& .MuiFilledInput-root': {
            backgroundColor: 'transparent', // Remova o fundo preenchido
          },
          '& .MuiInputBase-input': {
            fontSize: '14px', // Ajuste o tamanho da fonte
            color: '#333', // Ajuste a cor do texto
            paddingRight: '0', // Remova o espaço à direita do texto
          },
          '& .MuiInputAdornment-positionStart': {
            marginTop: '0', // Levante o ícone
            color: '#888', // Altere a cor do ícone para cinza
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EventIcon /> {/* Ícone de calendário */}
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
