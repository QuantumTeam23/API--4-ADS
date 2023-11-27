import React, { useState } from 'react';
import styles from '../styles/PainelLayoutGeral.module.css';
import TabelaSaldoCredito from './TabelaCarteiraEstab';
import Footer from '../Footer/Footer';
import NavbarParceiro from '../Navbars/NavbarParceiro';
import VincularEstabelecimento from './VincularEstabelecimentoPopup';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import IconButton from '@mui/material/IconButton';

export default function PainelParceiroCarteiraEstab() {
  const [popupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <NavbarParceiro />
      <div className={styles.containerConteudoEspecifico}>
        <div className={styles.topContent}>
          <h2>Carteira de Estabelecimentos</h2>
          <div className={styles.headerActions}>
            <IconButton color="primary" onClick={handleOpenPopup}>
              <AddBusinessIcon />
            </IconButton>
          </div>
        </div>
        </div>
        <TabelaSaldoCredito />
      <Footer />
      {popupOpen && (
        <VincularEstabelecimento open={popupOpen} onClose={handleClosePopup} />
      )}
    </>
  );
}
