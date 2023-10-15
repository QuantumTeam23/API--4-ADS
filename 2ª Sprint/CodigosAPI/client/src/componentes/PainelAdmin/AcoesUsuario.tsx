import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from '../styles/PainelAdmin.module.css';

interface IconProps {
  onClick: () => void; 
}

export function AdicionarUsuario({ onClick }: IconProps) {
  return (
    <IconButton aria-label="Adicionar usuário" className={styles.addIcon} onClick={onClick}>
      <AddIcon />
    </IconButton>
  );
}

export function EditarUsuario({ onClick }: IconProps) {
  return (
    <IconButton aria-label="Editar usuário" color="primary" onClick={onClick}>
      <EditIcon />
    </IconButton>
  );
}

export function RemoverUsuario({ onClick }: IconProps) {
  return (
    <IconButton aria-label="Remover usuário" color="secondary" onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  );
}
