import styles from '../styles/PainelLayoutGeral.module.css';
import TabelaHistoricoCompra from './TabelaHistoricoCompra';
import Footer from '../Footer/Footer';
import NavbarParceiro from '../Navbars/NavbarParceiro';
import { useNavigate } from 'react-router-dom';

export default function PainelHistoricoCompra() {

  return (
    <>
    <NavbarParceiro />
    <div className={styles.containerConteudo}>
      <div className={styles.topContent}>
      <h2>Histórico de Compras</h2>
        <div className={styles.headerActions}>
        </div>
      </div>
      <TabelaHistoricoCompra />
    </div>
    <Footer />
    </>
  );
}
//tete
