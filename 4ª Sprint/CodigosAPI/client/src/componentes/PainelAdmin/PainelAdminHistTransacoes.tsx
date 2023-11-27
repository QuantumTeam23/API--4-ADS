// HistoricoTransacoes.tsx
import React, { useState } from 'react';
import styles from '../styles/PainelLayoutGeral.module.css';
import Tabelas2 from './TabelasHistTransacoes';
import NavbarAdministrador from '../Navbars/NavbarAdministrador';
import Footer from '../Footer/Footer';

function HistoricoTransacoes() {


  return (
    <>
      <NavbarAdministrador />
      <div className={styles.containerConteudoEspecifico}>
        <div className={styles.topContent}>
          <h2>Histórico de Transações</h2>
          <div className={styles.headerActions}>
          </div>
        </div>
      </div>
      <Tabelas2 />
      <Footer />
    </>
  );
}

export default HistoricoTransacoes;
