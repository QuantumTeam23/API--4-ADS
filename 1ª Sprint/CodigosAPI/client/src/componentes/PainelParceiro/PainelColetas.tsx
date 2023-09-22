import styles from '../styles/PainelParceiro.module.css';
import BarraPesquisa from './BarraPesquisa';
import TabelaColeta from './TabelaColeta';
import { DataFim, DataInicio } from './DataFiltro';
import Footer from '../Footer/Footer';
import NavbarParceiro from '../Navbars/NavbarParceiro';

export default function PainelParceiroColetas() {


  return (
    <>
    <NavbarParceiro />
    <div className={styles.containerConteudo}>
      <div className={styles.topContent}>
              <h2>Coletas</h2>
      <div className={styles.headerActions}>
          Estabelecimento:  <BarraPesquisa />
        </div>
        </div>
      <div className={styles.headerActions}>
        Data de: <DataInicio/> até <DataFim />
      </div>
      <TabelaColeta />
    </div>
    <Footer />
    </>
  );
}
//tete