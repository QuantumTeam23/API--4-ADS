import React, { useEffect, useState } from 'react';
import styles from '../styles/PainelParceiro.module.css';
import BarraPesquisa from './BarraPesquisa';
import TabelaColeta from './TabelaColeta';
import { DataFim, DataInicio } from './DataFiltro';
import Footer from '../Footer/Footer';
import NavbarParceiro from '../Navbars/NavbarParceiro';

export default function PainelParceiroColetas() {
  const [totalOleoColetado, settotalOleoColetado] = useState(0);
  const id = localStorage.getItem('idParceiro');



  
  useEffect(() => {
    fetch(`http://localhost:3001/Parceiro/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        settotalOleoColetado(data[0].parceiro_volume_coleta_mes);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <NavbarParceiro />
      <div className={styles.containerConteudo}>
        <div className={styles.topContent}>
          <h1>
            Total de óleo coletado: {' '} 
            <span className={styles.saldoAtual}>{totalOleoColetado}</span> litros
          </h1>
        </div>
        <div className={styles.topContent}>
          <h2>Coletas</h2>
          <div className={styles.headerActions}>
            Estabelecimento:  <BarraPesquisa />
          </div>
        </div>
        <div className={styles.headerActions}>
          Data de: <DataInicio /> até <DataFim />
        </div>
        <TabelaColeta />
      </div>
      <Footer />
    </>
  );
}
//tete