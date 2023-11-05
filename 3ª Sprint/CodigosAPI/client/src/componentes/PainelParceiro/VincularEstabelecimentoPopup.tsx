import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styles from '../styles/PainelAdmin.module.css';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import { resourceLimits } from 'worker_threads';


export default function VincularEstabelecimento({ open, onClose }: { open: boolean; onClose: () => void }) {
  const id = localStorage.getItem('idParceiro');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;


  const [estabData, setEstabData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/listSemVinculo/${id}`, {
      method: "GET",
       headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEstabData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = estabData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < estabData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAdicionarEstabelecimento = async (estabelecimentoId: string, nome: string) => {
    const idParceiro = localStorage.getItem('idParceiro');
    handleClose();
    Swal.fire({
      title: `Deseja vincular o estabelecimento ${nome} à sua carteira?`,
      text: 'Esta ação é irreversível.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'z-index-high',
      },
      willOpen: (toast) => {
        toast.style.zIndex = '9999';
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://localhost:3001/vincular', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estabelecimentoId,
          idParceiro,
        }),
      })
      setTimeout(() => {
        Swal.close();
        Swal.fire({
          title: 'Sucesso',
          text: 'O estabelecimento foi adicionado com sucesso.',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
        });
      }, 100);
      window.location.reload();
      }
    });
  }

      /*
      if (result.isConfirmed) {
        console.log(`Adicionar estabelecimento com ID ${estabelecimentoId}`);

        setTimeout(() => {
          Swal.close();
          Swal.fire({
            title: 'Sucesso',
            text: 'O estabelecimento foi adicionado com sucesso.',
            icon: 'success',
            timer: 5000,
            timerProgressBar: true,
          });
        }, 100);
      }
    });
    */

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Vincular Estabelecimento</DialogTitle>
      <DialogContent>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Vincular</th>
            </tr>
          </thead>
          <tbody>
            {currentData
              .map((item: any, index: any) => (
                <tr key={index}>
                  <td>{item.estabelecimento_razao_social}</td>
                  <td>{item.estabelecimento_tipo}</td>
                  <td>{item.estabelecimento_bairro}</td>
                  <td>{item.estabelecimento_cidade}</td>
                  <td>{item.estabelecimento_estado}</td>
                  <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                    <IconButton onClick={() => handleAdicionarEstabelecimento(item.estabelecimento_id, item.estabelecimento_razao_social)}>
                      <AddIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>
                <Button
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
                  disabled={endIndex >= estabData.length}
                  onClick={handleNextPage}
                  style={{
                    color: endIndex < estabData.length ? 'lightblue' : 'lightgray',
                    fontWeight: endIndex < estabData.length ? 'bold' : 'normal',
                  }}
                >
                  Próxima
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
