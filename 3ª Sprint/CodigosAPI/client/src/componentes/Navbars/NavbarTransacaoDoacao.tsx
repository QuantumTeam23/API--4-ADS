import React from 'react';
import MenuLateralTransacao from './NavbarTransacaoMenuLateral';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


function NavbarTransacaoDoacao() {
  

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#136935' }}>
            <div className="container" style={{ maxWidth: '90vw', maxHeight: '60px'}}>
                <a href="#" className="navbar-brand">
                    <img src={require('../Imagens/logoEmpresa.png')} alt="Imagem" className="img-fluid"  style={{ maxWidth: '58px', maxHeight: '58px' }}  /> 
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span style={{ display: 'flex', alignItems: 'center' }}><MenuLateralTransacao/></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className='navbar-nav mt-auto'>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#" style={{fontSize: '28px'}}>Transação Doação </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <a className="nav-link text-white" href="/painel-parceiro-historico-compra" style={{ marginRight: '0.5vw'}}>Histórico </a>
                        </li>
                        <li className="nav-item" style={{ marginRight: '0.5vw' }}>
                            <a className="nav-link text-white" href="/painel-parceiro-carteira-estabelecimento">Carteira</a>
                        </li>
                        <li className="nav-item" style={{ marginRight: '0.5vw' }}>
                            <a className="nav-link text-white" href="/painel-parceiro-coleta">Coletas</a>
                        </li>
                        <li className="nav-item" style={{ marginRight: '3vw' }}>
                            <a className="nav-link text-white" href="/painel-parceiro-saldo-credito">Transações</a>
                        </li>
                        <li className="nav-item" style={{ marginRight: '1vw' }}>
                            <img src={require('../Imagens/user.png')} alt="Imagem" className="img-fluid"  style={{ maxWidth: '36px', maxHeight: '36px' }}  /> 
                        </li>   
                        <li className="nav-item">
                            <a href="#">
                                <img src={require('../Imagens/icone-sair.png')} alt="Imagem" className="img-fluid" style={{ maxWidth: '36px', maxHeight: '36px' }} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavbarTransacaoDoacao;
