import React from 'react';
export default function NavbarTelaInicial() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#136935' }}>
      <div className="container" style={{ maxWidth: '90vw', maxHeight: '60px' }}>
        <a href="#" className="navbar-brand">
          <img src={require('../Imagens/logoEmpresa.png')} alt="Imagem" className="img-fluid" style={{ maxWidth: '58px', maxHeight: '58px' }} />
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className='navbar-nav mt-auto'>
            <li className="nav-item">
              <a className="nav-link text-white" href="#" style={{ fontSize: '28px' }}>Economia Circular do Óleo!</a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto" style={{alignItems: 'center'}}>
            <li className="nav-item" style={{marginRight: '2vw'}}>
              <a className="nav-link text-white" href="https://greenneat.eco.br/">Site oficial <br />Greenneat</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/login">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
