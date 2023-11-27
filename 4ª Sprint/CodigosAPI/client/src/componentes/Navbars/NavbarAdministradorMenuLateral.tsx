import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MenuLateralAdministrador: React.FC = () => {
  const [menuAberto, setMenuAberto] = React.useState(false);
  const navigate = useNavigate();

  const abrirMenu = () => {
    setMenuAberto(true);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  const handleSair = () => {
    fecharMenu()
    Swal.fire({
      title: 'Você tem certeza que deseja sair?',
      text: 'Isso irá desconectar você da sua conta.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '#999999',
      confirmButtonText: '<span style="color: white;">Sair</span>', // Estilizando o texto do botão Sair
      cancelButtonText: '<span style="color: white;">Cancelar</span>', // Estilizando o texto do botão Cancelar
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear()
        navigate('/')
      }
    });
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="Abrir menu"
        edge="start"
        onClick={abrirMenu}
        style={{
          borderRadius: '12px', // Adicionando bordas arredondadas
          padding: '8px',
          width: '48px', // Ajustando a largura
          height: '48px', // Ajustando a altura
        }}
      >
        <MenuIcon style={{ fontSize: '28px' }} /> {/* Ajustando o tamanho do ícone */}
      </IconButton>
      <Drawer open={menuAberto} onClose={fecharMenu} anchor="right">
        <div style={{ width: '250px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
            <h2>Conta</h2>
            <AccountCircleIcon style={{ fontSize: '64px' }} />
          </div>
          <List>
            <ListItemButton onClick={handleSair} component={Link} to="#">
              <ListItemText primary="Sair da conta" />
            </ListItemButton>
          </List>
          <Divider />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
            <h2>Menu</h2>
          </div>
          <List>
            <ListItemButton onClick={fecharMenu} component={Link} to="/painel-administrador-preco-regiao">
              <ListItemText primary="Preço por Região" />
            </ListItemButton>
            <ListItemButton onClick={fecharMenu} component={Link} to="/painel-administrador-usuario">
              <ListItemText primary="Controle de Usuário" />
            </ListItemButton>
            <ListItemButton onClick={fecharMenu} component={Link} to="/painel-administrador-transacoes">
              <ListItemText primary="Histórico de Transações" />
            </ListItemButton>
            <ListItemButton onClick={fecharMenu} component={Link} to="/painel-administrador-requisicoes">
              <ListItemText primary="Requisições" />
            </ListItemButton>
            <ListItemButton onClick={fecharMenu} component={Link} to="/painel-administrador-dashboard-ranking">
              <ListItemText primary="Dashboard Ranking" />
            </ListItemButton>
            <ListItemButton onClick={fecharMenu} component={Link} to="/painel-administrador-comparador-precos">
              <ListItemText primary="Comparador de Preços" />
            </ListItemButton>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default MenuLateralAdministrador;
