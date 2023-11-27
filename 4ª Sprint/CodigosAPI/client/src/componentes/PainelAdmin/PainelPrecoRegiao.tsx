// HistoricoTransacoes.tsx
import React, { useState } from 'react';
import styles from '../styles/PainelLayoutGeral.module.css';
import NavbarAdministrador from '../Navbars/NavbarAdministrador';
import Footer from '../Footer/Footer';
import TabelaPrecoRegiao from './TabelaPrecoRegiao';

export default function PainelPrecoPorRegiao() {


  return (
    <>
    <NavbarAdministrador />
    <div className={styles.containerConteudo}>
      <div className={styles.topContent}>
        <h2>Preço por Região</h2>
      </div>
      <TabelaPrecoRegiao />
    </div>
    <Footer/>
    </>
  );
}
