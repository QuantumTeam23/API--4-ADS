import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import styles from '../styles/PainelParceiro.module.css';

export default function MesAno() {
  const [mesAno, setMesAno] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMesAno(event.target.value);
  };

  const mesesAnosDisponiveis = [
    'Janeiro/2023',
    'Fevereiro/2023',
    'Março/2023',
    'Abril/2023',
    'Maio/2023',
    'Junho/2023',
    'Julho/2023',
    'Agosto/2023',
    'Setembro/2023',
    'Outubro/2023',
    'Novembro/2023',
    'Dezembro/2023',
  ];  

  return (
    <div className={`${styles.componenteMesAno} ${styles.menuIcon}`}>
      <TextField
        select
        variant="filled"
        value={mesAno}
        onChange={handleChange}
        label="Mês/Ano"
        style={{ minWidth: '200px', fontSize: '16px' }} // Ajuste o minWidth e a fonte conforme necessário
      >
        {mesesAnosDisponiveis.map((opcao) => (
          <MenuItem key={opcao} value={opcao}>
            {opcao}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
