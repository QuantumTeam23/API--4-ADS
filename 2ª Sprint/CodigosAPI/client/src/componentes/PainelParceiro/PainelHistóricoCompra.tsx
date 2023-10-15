import styles from '../styles/PainelParceiro.module.css';
import TabelaHistoricoCompra from './TabelaHistoricoCompra';
import MesAno from './MesAno';
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
          <MesAno />
        </div>
      </div>
      <TabelaHistoricoCompra />
    </div>
    <Footer />
    </>
  );
}
//tete
