import styles from '../styles/TabelaHistTransacoes.module.css';
import DeleteIcon from '@mui/icons-material/Delete'; // Importe o ícone que deseja usar
import Button from '@mui/material/Button';
import { useState } from 'react'; // Importe useState
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function TabelasHistTransacoes() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const data = Array.from({ length: 18 }, (_, index) => ({
    usuario: `Usuário ${index + 1}`,
    valor: `Valor ${index + 1}`,
    destinatario: `Destinatário ${index + 1}`,
  }));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Valor</th>
            <th>Destinatário</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.usuario}</td>
              <td>{item.valor}</td>
              <td>{item.destinatario}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              <div style={{ textAlign: 'center' }}>
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
                  disabled={endIndex >= data.length}
                  onClick={handleNextPage}
                  style={{
                    color: endIndex < data.length ? 'lightblue' : 'lightgray',
                    fontWeight: endIndex < data.length ? 'bold' : 'normal',
                  }}
                >
                  Próxima
                </Button>
              </div>
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
