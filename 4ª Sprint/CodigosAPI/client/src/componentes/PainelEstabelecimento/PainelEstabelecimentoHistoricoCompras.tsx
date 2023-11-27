import styles from '../styles/PainelLayoutGeral.module.css';
import TabelaHistoricoCompra from './TabelaHistoricoCompra';
import NavbarEstabelecimento from '../Navbars/NavbarEstabelecimento';
import Footer from '../Footer/Footer';

export default function PainelEstabelecimentoHistorico() {

  return (
    <>
    <NavbarEstabelecimento />

    <div className={styles.containerConteudo}>
      <div className={styles.topContent}>
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