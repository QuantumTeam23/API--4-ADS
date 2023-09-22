import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import styles from '../styles/TabelaCarteiraEstab.module.css';
import { useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function TabelaCarteiraEstab() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const data = Array.from({ length: 18 }, (_, index) => ({
    nome: `Nome ${index + 1}`,
    contato: `Contato ${index + 1}`,
    endereco: `Endereço ${index + 1}`,
    volumeMedio: `Volume médio ${index + 1}`,
    volumeTotal: `Volume total ${index + 1}`,
    dataUltimaColeta: `0${index + 1}/09/2023`,
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
            <th>Nome</th>
            <th>Contato</th>
            <th>Endereço</th>
            <th>Volume Médio</th>
            <th>Volume Total</th>
            <th>Data da Última Coleta</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.nome}</td>
              <td>{item.contato}</td>
              <td>{item.endereco}</td>
              <td>{item.volumeMedio}</td>
              <td>{item.volumeTotal}</td>
              <td>{item.dataUltimaColeta}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} style={{ textAlign: 'center' }}>
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
