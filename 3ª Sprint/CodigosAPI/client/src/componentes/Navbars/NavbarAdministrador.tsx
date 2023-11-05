import React from 'react';
import MenuLateralAdministrador from './NavbarAdministradorMenuLateral';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import '../styles/NavbarAdministrador.css';

function NavbarAdministrador() {
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
        const id = localStorage.getItem('idAdministrador'); 
        fetch(`http://localhost:3001/read-by-id-to-edit/${id}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erro na solicitação: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            setTimeout(() => {
              navigate('/editar-usuario');
          }, 1100);
            localStorage.setItem('administradorData', JSON.stringify(data));
    
          })
          .catch(error => {
            console.error('Erro ao buscar dados do administrador:', error);
          });
      };
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#136935' }}>
            <div className="container" style={{ maxWidth: '90vw', maxHeight: '60px' }}>
                <a href="#" className="navbar-brand">
                    <img src={require('../Imagens/logoEmpresa.png')} alt="Imagem" className="img-fluid"  style={{ maxWidth: '58px', maxHeight: '58px' }}  /> 
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span style={{ display: 'flex', alignItems: 'center' }}><MenuLateralAdministrador /></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className='navbar-nav mt-auto'>
                        <li className="nav-titulo">
                            <a className="nav-link text-white" href="#" style={{ fontSize: '28px'}}>Painel do Administrador </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto" style={{ alignItems: 'center'}}>
                        <li className="nav-item-adm">
                            <a className="nav-link text-white" href="/painel-administrador-preco-regiao">Preço por Região</a>
                        </li>
                        <li className="nav-item-adm">
                            <a className="nav-link text-white" href="/painel-administrador-transacoes">Transações</a>
                        </li>
                        <li className="nav-item-adm">
                            <a className="nav-link text-white" href="/painel-administrador-usuario">Controle de Usuários</a>
                        </li>
                        <li className="nav-item-adm">
                            <a className="nav-link text-white" href="/painel-administrador-requisicoes">Requisições</a>
                        </li>

                        <li className="nav-item-adm">
                            <a className="nav-link text-white" href="/painel-administrador-dashboard-ranking">Dashboard Ranking</a>
                        </li>
                        <li className="nav-item-adm">
                            <a className="nav-link text-white" href="/painel-administrador-comparador-precos">Comparador de Preços</a>
                        </li>
                        <li className="nav-img-adm">
                            <img src={require('../Imagens/user.png')} alt="Imagem" className="img-fluid"/> 
                        </li>
                        <li className="nav-img-adm">
                            <a href="#">
                                <img src={require('../Imagens/icone-sair.png')} alt="Imagem" className="img-fluid" onClick={handleSair}/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavbarAdministrador;
