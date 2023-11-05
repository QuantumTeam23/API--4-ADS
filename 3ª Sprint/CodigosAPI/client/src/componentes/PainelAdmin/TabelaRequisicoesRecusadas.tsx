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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [requisicoes , setRequisicoes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/getRequisicoesRecusadas", {
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

 
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Créditos</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item: any, index: any) => (
            <tr key={index}>
              <td>{item.parceiro_razao_social}</td>
              <td>{item.valor_comprado}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} style={{ textAlign: 'center' }}>
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
      
    </>
  );
}
