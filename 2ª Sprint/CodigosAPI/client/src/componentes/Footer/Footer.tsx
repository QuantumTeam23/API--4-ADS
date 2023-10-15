import React from 'react';
import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer fixed-bottom">
      <div className="container" style={{ maxWidth: '98%', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className="row align-items-center">
            <div className="col">
              <a href="#" className="footer-link">
                  <img src={require('../Imagens/logoTeam.png')} alt="Imagem" className="img-fluid" style={{ maxHeight: '3vh' }} />
              </a>
            </div>
            <div className="col text-end">
              <a href="https://github.com/QuantumTeam23" target='_blank' className="footer-link" rel="noreferrer">
                <img src={require('../Imagens/github.png')} alt="Imagem" className="img-fluid ml-md-auto" style={{ maxHeight: '3vh' }} />
              </a>
              <a href="https://greenneat.eco.br/" target='_blank' className="footer-link" rel="noreferrer">
                <img src={require('../Imagens/world-wide-web.png')} alt="Imagem" className="img-fluid" style={{ maxHeight: '3vh' }} />
              </a>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;