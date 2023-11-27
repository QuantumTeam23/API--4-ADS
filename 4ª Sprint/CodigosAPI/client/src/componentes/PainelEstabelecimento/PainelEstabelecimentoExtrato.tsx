import React, { useEffect, useState } from 'react';
import styles from '../styles/PainelLayoutGeral.module.css';
import TabelaSaldoCreditoExtrato from './TabelaSaldoCreditoExtrato';
import Footer from '../Footer/Footer';
import NavbarEstabelecimento from '../Navbars/NavbarEstabelecimento';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function PainelEstabelecimentoExtrato() {
  const [saldoVisivel, setSaldoVisivel] = useState(false);
  const [saldoValor, setSaldoValor] = useState(0);
  const [totalOleoDoado, settotalOleoDoado] = useState(0);
  const id = localStorage.getItem('idEstabelecimento');

  useEffect(() => {
    fetch(`http://localhost:3001/Estabelecimento/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        settotalOleoDoado(data[0].estabelecimento_volume_comercializado_mes);
      })
      .catch((error) => console.log(error));
  }, []);

  //buscar dados do estabelecimento logado e setar o valor do saldo
  useEffect(() => {
    fetch(`http://localhost:3001/Estabelecimento/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSaldoValor(data[0].estabelecimento_saldo);
      })
      .catch((error) => console.log(error));
  }, []);
  //buscar dados do estabelecimento logado e setar o valor do saldo


  const toggleSaldoVisivel = () => {
    setSaldoVisivel(!saldoVisivel);
  };

  return (
    <>
      <NavbarEstabelecimento />

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
        <div className={styles.topContent}>
          <h1>
            Total de óleo doado: {' '}
            <span className={styles.saldoAtual}>{totalOleoDoado}</span> litros
          </h1>
        </div>
        <br />
        <h2>Extrato</h2>
      </div>
      <TabelaSaldoCreditoExtrato />
      <Footer />
    </>
  );
}
