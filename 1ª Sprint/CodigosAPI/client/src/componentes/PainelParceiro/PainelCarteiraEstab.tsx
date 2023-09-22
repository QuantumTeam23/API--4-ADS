import styles from '../styles/PainelParceiro.module.css';
import BarraPesquisa from './BarraPesquisa';
import TabelaSaldoCredito from './TabelaCarteiraEstab';
import Footer from '../Footer/Footer';
import NavbarParceiro from '../Navbars/NavbarParceiro';


export default function PainelParceiroCarteiraEstab() {


  return (
    <>
    <NavbarParceiro />
    <div className={styles.containerConteudo}>
      <div className={styles.topContent}>
        <h2>Carteira de Estabelecimentos</h2>
        <div className={styles.headerActions}>
          <BarraPesquisa />
        </div>
      </div>
      <TabelaSaldoCredito />
    </div>
    <Footer />
    </>
  );
}
