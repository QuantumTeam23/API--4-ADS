import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import styles from '../styles/PainelAdmin.module.css';

interface AdicionarEstabelecimentoProps {
  onClick: () => void;
}


export function VincularEstabelecimento({ onClick }: AdicionarEstabelecimentoProps) {
  return (
    <IconButton className={styles.addIcon} onClick={onClick}>
      <AddBusinessIcon />
    </IconButton>
  );
}

