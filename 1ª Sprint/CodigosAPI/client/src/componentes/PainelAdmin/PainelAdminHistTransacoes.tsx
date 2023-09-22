// HistoricoTransacoes.tsx
import React, { useState } from 'react';
import styles from '../styles/PainelAdmin.module.css';
import BarraPesquisa from './BarraPesquisa';
import Tabelas2 from './TabelasHistTransacoes';
import NavbarAdministrador from '../Navbars/NavbarAdministrador';
import Footer from '../Footer/Footer';

function HistoricoTransacoes() {


  return (
    <>
    <NavbarAdministrador />
    <div className={styles.containerConteudo}>
      <div className={styles.topContent}>
        <h2>Histórico de Transações</h2>
        <div className={styles.headerActions}>
          <BarraPesquisa />
        </div>
      </div>
      <Tabelas2 />
    </div>
    <Footer/>
    </>
  );
}

export default HistoricoTransacoes;
