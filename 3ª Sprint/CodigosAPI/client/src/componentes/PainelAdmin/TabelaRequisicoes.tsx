import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../styles/TabelaRequisicoes.module.css';
import { useEffect, useState } from 'react';
import { EditarUsuarioAdminPopup, EditarUsuarioPopup } from './AcoesUsuarioPopup';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Swal from 'sweetalert2';

export default function TabelaRequisicoes() {
      const [editarUsuarioPopupOpen, setEditarUsuarioPopupOpen] = useState(false);
      const [editarUsuarioAdminPopupOpen, setEditarUsuarioAdminPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [requisicoes , setRequisicoes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/getRequisicoesAprovar", {
      method: "GET",
       headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRequisicoes(data)
      })
      .catch((error) => console.log(error));
  }, []);
  

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = requisicoes.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < requisicoes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAprovarClick = (item: any) => {
    const idAcao = item.acao_transacao_compra_id ;
    const idParceiro = item.id_parceiro ;
    const valor = item.valor_comprado ;

    fetch(`http://localhost:3001/aprovado/${idAcao}/${idParceiro}/${valor}` ,{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      }})
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.status}`);
          }
          return response.json();
        })
        .catch(error => {
          console.error('Erro ao buscar dados do estabelecimento:', error);
        });
        window.location.reload();
  }



  const handleRecusarClick = (item: any) => {
    const idAcao = item.acao_transacao_compra_id ;
    fetch(`http://localhost:3001/recusado/${idAcao}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      }})
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.status}`);
          }
          return response.json();
        })
        .catch(error => {
          console.error('Erro ao buscar dados do estabelecimento:', error);
        });
        window.location.reload();
  }

  const handleCloseEditarUsuarioPopup = () => {
    localStorage.removeItem('EstabelecimentoData')
    localStorage.removeItem('ParceiroData')
    localStorage.removeItem('nomeEdit')
    localStorage.removeItem('tipoEdit')
    setEditarUsuarioPopupOpen(false);
  };

  const handleCloseEditarUsuarioAdminPopup = () => {
    localStorage.removeItem('AdministradorData')
    localStorage.removeItem('nomeEdit')
    localStorage.removeItem('tipoEdit')
    setEditarUsuarioAdminPopupOpen(false);
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{width: '5%'}}>Nome</th>
            <th style={{width: '5%'}}>Créditos</th>
            <th colSpan={2} style={{width: '5%'}}><center>Ações</center></th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item: any, index: any) => (
            <tr key={index}>
              <td>{item.parceiro_razao_social}</td>
              <td>{item.valor_comprado}</td>
              <td>
                <div style={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CheckIcon style={{ fontSize: 28 }} />}
                    onClick={() => handleAprovarClick(item)}
                  />
                </div>
              </td>
              <td>
                <div style={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<CloseIcon style={{ fontSize: 28 }} />}
                    onClick={() => handleRecusarClick(item)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} style={{ textAlign: 'center' }}>
              <Button
                startIcon={<KeyboardArrowLeftIcon />}
                disabled={currentPage === 1}
                onClick={handlePrevPage}
                style={{
                  color: currentPage !== 1 ? 'lightblue' : 'lightgray',
                  fontWeight: currentPage !== 1 ? 'bold' : 'normal',
                }}
              >
                Anterior
              </Button>
              <Button
                endIcon={<KeyboardArrowRightIcon />}
                disabled={endIndex >= requisicoes.length}
                onClick={handleNextPage}
                style={{
                  color: endIndex < requisicoes.length ? 'lightblue' : 'lightgray',
                  fontWeight: endIndex < requisicoes.length ? 'bold' : 'normal',
                }}
              >
                Próxima
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
      <p>ㅤ</p>
      <p>ㅤ</p>
      <p>ㅤ</p>
      <p>ㅤ</p>
      
      <EditarUsuarioPopup open={editarUsuarioPopupOpen} onClose={handleCloseEditarUsuarioPopup}/>
      <EditarUsuarioAdminPopup open={editarUsuarioAdminPopupOpen} onClose={handleCloseEditarUsuarioAdminPopup}/>
      
    </>
  );
}
