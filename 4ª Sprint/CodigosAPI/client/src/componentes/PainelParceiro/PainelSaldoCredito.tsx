import React, { useEffect, useState } from 'react';
import styles from '../styles/PainelLayoutGeral.module.css';
import { TabelaCreditoCedido, TabelaCreditoContratado } from './TabelaSaldoCredito';
import Footer from '../Footer/Footer';
import NavbarParceiro from '../Navbars/NavbarParceiro';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function PainelParceiroSaldoCredito() {
  const [saldoVisivel, setSaldoVisivel] = useState(false);
  const [saldoValor, setSaldoValor] = useState(0);
  const id = localStorage.getItem('idParceiro');


  //buscar dados do parceiro logado e setar o valor do saldo
  useEffect(() => {
    fetch(`http://localhost:3001/Parceiro/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSaldoValor(data[0].parceiro_saldo);
      })
      .catch((error) => console.log(error));
  }, []);
  //buscar dados do parceiro logado e setar o valor do saldo

  const toggleSaldoVisivel = () => {
    setSaldoVisivel(!saldoVisivel);
  };

  return (
    <>
      <NavbarParceiro />
      <div className={styles.containerConteudoEspecifico}>
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
        <h2>Requisições de Crédito GreenNeat</h2>
      </div>
        <TabelaCreditoContratado />
        <div className={styles.containerConteudoEspecifico}>
          <br /><br /><br />
          <h2>Créditos Cedidos</h2>
        </div>
        <TabelaCreditoCedido />
      <Footer />
    </>
  );
}
