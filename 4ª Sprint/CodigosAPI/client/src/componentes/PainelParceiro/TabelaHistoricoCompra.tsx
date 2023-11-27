import Button from '@mui/material/Button';
import styles from '../styles/TabelasLayoutGeral.module.css';
import { useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function TabelaHistoricoCompra() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const data = Array.from({ length: 18 }, (_, index) => ({
    item: `Item ${index + 1}`,
    valor: `Valor ${index + 1}`,
    quantidade: `Quantidade ${index + 1}`,
    data: `0${index + 1}/09/2023`,
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
            <th>Item</th>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.item}</td>
              <td>{item.valor}</td>
              <td>{item.quantidade}</td>
              <td>{item.data}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} style={{ textAlign: 'center', padding: '3px 0'  }}>
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
