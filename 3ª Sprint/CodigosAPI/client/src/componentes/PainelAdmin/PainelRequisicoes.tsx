import React, { useState } from 'react';
import styles from '../styles/PainelAdmin.module.css';
import NavbarAdministrador from '../Navbars/NavbarAdministrador';
import Footer from '../Footer/Footer';
import TabelaRequisicoes from './TabelaRequisicoes';
import TabelaRequisicoesRecusadas from './TabelaRequisicoesRecusadas';

export default function PainelRequisicoes() {


  return (
    <>
    <NavbarAdministrador />
    <div className={styles.containerConteudo}>
      <div className={styles.topContent}>
        <h2>Requisições Aguardando Aprovação</h2>
      </div>
      <TabelaRequisicoes />
      <div className={styles.topContent}>
        <h2>Requisições Reprovadas</h2>
      </div>
      <TabelaRequisicoesRecusadas />
    </div>
    <Footer/>
    </>
  );
}
