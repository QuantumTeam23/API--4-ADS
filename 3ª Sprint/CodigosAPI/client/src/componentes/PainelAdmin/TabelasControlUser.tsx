import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import styles from '../styles/TabelaControlUser.module.css';
import { useEffect, useState } from 'react';
import { EditarUsuarioAdminPopup, EditarUsuarioPopup } from './AcoesUsuarioPopup';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Swal from 'sweetalert2';

export default function TabelasControlUser() {
  const [editarUsuarioPopupOpen, setEditarUsuarioPopupOpen] = useState(false);
  const [editarUsuarioAdminPopupOpen, setEditarUsuarioAdminPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleEditarUsuarioClick = (item: any) => {

      const razaoSocial = item.nome
      const tipo = item.tipo
      localStorage.setItem('nomeEdit', razaoSocial)
      localStorage.setItem('tipoEdit', tipo)

      if (tipo === 'Parceiro') {

        fetch(`http://localhost:3001/read-by-id-to-edit-admin/${razaoSocial}/${tipo}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          localStorage.setItem('ParceiroData', JSON.stringify(data));
          setTimeout(() => {
            setEditarUsuarioPopupOpen(true);
        }, 500);
  
        })
        .catch(error => {
          console.error('Erro ao buscar dados do estabelecimento:', error);
        });
      } else if (tipo === 'Estabelecimento') {

        fetch(`http://localhost:3001/read-by-id-to-edit-admin/${razaoSocial}/${tipo}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          localStorage.setItem('EstabelecimentoData', JSON.stringify(data));
          setTimeout(() => {
            setEditarUsuarioPopupOpen(true);
        }, 500);
  
        })
        .catch(error => {
          console.error('Erro ao buscar dados do estabelecimento:', error);
        });
      } else if (tipo === 'Administrador') {

        fetch(`http://localhost:3001/read-by-id-to-edit-admin/${razaoSocial}/${tipo}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          localStorage.setItem('AdministradorData', JSON.stringify(data));
          setTimeout(() => {
            setEditarUsuarioAdminPopupOpen(true);
        }, 500);
  
        })
        .catch(error => {
          console.error('Erro ao buscar dados do estabelecimento:', error);
        });
      }
  };
  
      const msgSucessoPost = () => {
        Swal.fire({
          title: "Sucesso",
          html: "Exclusão realizada com sucesso.",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: '#de940a',
          customClass: {
            container: 'swal-container',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }

  const handleRemoverUsuarioClick = (item: any) => {
    const razaoSocial = item.nome;
    const tipoUsuario = item.tipo;
    
    // Exibir um SweetAlert para confirmar a exclusão do usuário
    Swal.fire({
      title: 'Confirmar Exclusão',
      text: `Deseja mesmo excluir o usuário ${razaoSocial}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, Excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/deletar-users/${razaoSocial}/${tipoUsuario}`, {
          method: 'DELETE'
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) =>
          console.error('Erro ao excluir o produto:', error)
        );
        msgSucessoPost()
      }
    });
  };

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

  const handleCloseRemoverUsuarioPopup = () => {
  };


  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/listarusuarios", {
      method: "GET",
       headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data)
      })
      .catch((error) => console.log(error));
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = user.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < user.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{width: '5%'}}>Nome</th>
            <th style={{width: '5%'}}>Tipo</th>
            <th colSpan={2} style={{width: '5%'}}><center>Ações</center></th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item: any, index: any) => (
            <tr key={index}>
              <td>{item.nome}</td>
              <td>{item.tipo}</td>
              <td>
                <div style={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon style={{ fontSize: 28 }} />}
                    onClick={() => {
                      handleEditarUsuarioClick(item)
                    }}
                  />
                </div>
              </td>
              <td>
                <div style={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon style={{ fontSize: 28 }} />}
                    onClick={() => handleRemoverUsuarioClick(item)}
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
                disabled={endIndex >= user.length}
                onClick={handleNextPage}
                style={{
                  color: endIndex < user.length ? 'lightblue' : 'lightgray',
                  fontWeight: endIndex < user.length ? 'bold' : 'normal',
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
