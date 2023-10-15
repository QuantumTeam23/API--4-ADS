import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import styles from '../styles/TabelaCarteiraEstab.module.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function TabelaCarteiraEstab() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const id = localStorage.getItem('idParceiro');
  const [estabData, setEstabData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/listCarteira/${id}`, {
      method: "GET",
       headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEstabData(data)
      })
      .catch((error) => console.log(error));
  }, []);

  /*
  const data = Array.from({ length: 18 }, (_, index) => ({
    nome: `Nome ${index + 1}`,
    contato: `Contato ${index + 1}`,
    endereco: `Endereço ${index + 1}`,
    volumeMedio: `Volume médio ${index + 1}`,
    volumeTotal: `Volume total ${index + 1}`,
    dataUltimaColeta: `0${index + 1}/09/2023`,
  }));
  */

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
          {currentData.map((item: any, index: any) => (
            <tr key={index}>
              <td>{item.estabelecimento_razao_social}</td>
              <td>{item.estabelecimento_telefone}</td>
              <td>{item.estabelecimento_cidade}</td>
              <td>0</td>
              <td>0</td>
              <td>sem coletas</td>
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
      <p>ㅤ</p>
      <p>ㅤ</p>
      <p>ㅤ</p>
      <p>ㅤ</p>
    </>
  );
}
