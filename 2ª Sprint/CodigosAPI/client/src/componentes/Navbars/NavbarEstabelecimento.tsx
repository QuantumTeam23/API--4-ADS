import React from 'react';
import MenuLateralEstabelecimento from './NavbarEstabelecimentoMenuLateral';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


function NavbarEstabelecimento() {
    const navigate = useNavigate();

    const handleSair = () => {
        Swal.fire({
          title: 'Você tem certeza que deseja sair?',
          text: 'Isso irá desconectar você da sua conta.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#FFD700',
          cancelButtonColor: 'red',
          confirmButtonText: '<span style="color: white;">Sair</span>', // Estilizando o texto do botão Sair
          cancelButtonText: '<span style="color: white;">Cancelar</span>', // Estilizando o texto do botão Cancelar
          customClass: {
            confirmButton: 'custom-confirm-button',
            cancelButton: 'custom-cancel-button',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear()
            navigate('/login')
          }
        });
      }

      const handleClick = () => {
        const id = localStorage.getItem('idEstabelecimento');
        const tipo = localStorage.getItem('tipo')
        fetch(`http://localhost:3001/read-by-id-to-edit/${id}/${tipo}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erro na solicitação: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            setTimeout(() => {
              navigate('/editar-usuario');
          }, 100);
            localStorage.setItem('estabelecimentoData', JSON.stringify(data));
    
          })
          .catch(error => {
            console.error('Erro ao buscar dados do estabelecimento:', error);
          });
      };

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#136935' }}>
            <div className="container" style={{ maxWidth: '90vw', maxHeight: '60px' }}>
                <a href="#" className="navbar-brand">
                    <img src={require('../Imagens/logoEmpresa.png')} alt="Imagem" className="img-fluid"  style={{ maxWidth: '58px', maxHeight: '58px' }}  /> 
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span style={{ display: 'flex', alignItems: 'center' }}><MenuLateralEstabelecimento /></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className='navbar-nav mt-auto'>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#" style={{ fontSize: '28px'}}>Painel do Estabelecimento </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto" style={{ alignItems: 'center'}}>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/painel-estabelecimento-extrato" style={{ marginRight: '0.5vw'}}>Extrato e Saldo de Crédito </a>
                        </li>
                        <li className="nav-item" style={{ marginRight: '3vw' }}>
                            <a className="nav-link text-white" href="/painel-estabelecimento-historico-compras">Histórico de Compra</a>
                        </li>
                        <li className="nav-item" style={{ marginRight: '1vw' }}>
                            <img src={require('../Imagens/user.png')} alt="Imagem" className="img-fluid"  style={{ maxWidth: '36px', maxHeight: '36px' }}  /> 
                        </li>
                        <li className="nav-item" style={{ marginRight: '1vw' }}>
                            <a href="#">
                                <img src={require('../Imagens/icone-editar.png')} alt="Editar" className="img-fluid" style={{ maxWidth: '36px', maxHeight: '36px' }} onClick={handleClick}/>
                            </a>                       
                        </li>
                        <li className="nav-item">
                            <a href="#">
                                <img src={require('../Imagens/icone-sair.png')} alt="Imagem" className="img-fluid" style={{ maxWidth: '36px', maxHeight: '36px' }} onClick={handleSair}/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavbarEstabelecimento;
