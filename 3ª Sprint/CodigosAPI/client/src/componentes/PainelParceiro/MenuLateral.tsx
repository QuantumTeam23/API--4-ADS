import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const MenuLateral: React.FC = () => {
  const [menuAberto, setMenuAberto] = React.useState(false);

  const abrirMenu = () => {
    setMenuAberto(true);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="Abrir menu"
        edge="start"
        onClick={abrirMenu}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={menuAberto} onClose={fecharMenu}>
        <List>
          <ListItem button onClick={fecharMenu}>
            <Link to="/painel-parceiro-carteira-estabelecimento">
              <ListItemText primary="Carteira de Estabelecimentos" />
            </Link>
          </ListItem>
          <ListItem button onClick={fecharMenu}>
            <Link to="/painel-parceiro-coleta">
              <ListItemText primary="Coletas" />
            </Link>
          </ListItem>
          <ListItem button onClick={fecharMenu}>
            <Link to="/painel-parceiro-historico-compra">
              <ListItemText primary="Histórico de Compra" />
            </Link>
          </ListItem>
          <ListItem button onClick={fecharMenu}>
            <Link to="/painel-parceiro-saldo-credito">
              <ListItemText primary="Saldo de Crédito" />
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default MenuLateral;
