import React, { useEffect, useState } from 'react';
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
          <h2>Requisições de Crédito GreenNeat</h2>
          <div className={styles.headerActions}>
          <div style={{alignContent:"center"}}>
              <a href="../transacao-compra-credito">
                <img
                  src={require("../Imagens/icone-moedas.png")}
                  alt="Editar"
                  className="img-fluid"
                  style={{
                    width: "40px",
                    height: "40px",
                    maxWidth: "40px",
                    maxHeight: "40px",
                    marginRight: "10px",
                    marginTop:"20%"
                  }}

                  
                />
              </a>
            </div>

            <MesAno />
          </div>
        </div>
        <TabelaCreditoContratado />
        <div className={styles.topContent}>
          <h2>Crédito Cedido</h2>
          <div className={styles.headerActions}>
          <div style={{alignContent:"center"}}>
              <a href="../transacao-doacao">
                <img
                  src={require("../Imagens/icone-ceder-credito.png")}
                  alt="Editar"
                  className="img-fluid"
                  style={{
                    width: "40px",
                    height: "40px",
                    maxWidth: "40px",
                    maxHeight: "40px",
                    marginRight: "10px",
                    marginTop:"20%"
                  }}

                  
                />
              </a>
            </div>

            <MesAno />
          </div>
        </div>
        <TabelaCreditoCedido />
      </div>
      <Footer />
    </>
  );
}
