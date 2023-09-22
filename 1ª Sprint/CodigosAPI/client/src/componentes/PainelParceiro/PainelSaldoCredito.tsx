import React, { useState } from 'react';
import styles from '../styles/PainelParceiro.module.css';
import MesAno from './MesAno';
import { TabelaCreditoCedido, TabelaCreditoContratado } from './TabelaSaldoCredito';
import Footer from '../Footer/Footer';
import NavbarParceiro from '../Navbars/NavbarParceiro';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function PainelParceiroSaldoCredito() {
  const [saldoVisivel, setSaldoVisivel] = useState(false);
  const [saldoValor, setSaldoValor] = useState(0);

  const toggleSaldoVisivel = () => {
    setSaldoVisivel(!saldoVisivel);
  };

  return (
    <>
      <NavbarParceiro />
      <div className={styles.containerConteudo}>
        <div className={styles.topContent}>
          <h1>
            Saldo de crédito: {' '}
            <span className={styles.saldoValue}>
              {saldoVisivel ? (
                <span className={styles.saldoAtual}>{saldoValor}</span>
              ) : (
                <span className={styles.saldoPlaceholder}>XXXXXX</span>
              )}
              {saldoVisivel ? (
                <VisibilityOffIcon onClick={toggleSaldoVisivel} style={{ cursor: 'pointer' }} />
              ) : (
                <VisibilityIcon onClick={toggleSaldoVisivel} style={{ cursor: 'pointer' }} />
              )}
              
            </span>
          </h1>
        </div>
        <div className={styles.topContent}>
          <h2>Crédito Contratado</h2>
          <div className={styles.headerActions}>
            <MesAno />
          </div>
        </div>
        <TabelaCreditoContratado />
        <div className={styles.topContent}>
          <h2>Crédito Cedido</h2>
          <div className={styles.headerActions}>
            <MesAno />
          </div>
        </div>
        <TabelaCreditoCedido />
      </div>
      <Footer />
    </>
  );
}
