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
            <th style={{width: '25%'}}>Nome</th>
            <th style={{width: '25%'}}>Contato</th>
            <th style={{width: '25%'}}>Endereço</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item: any, index: any) => (
            <tr key={index}>
              <td>{item.estabelecimento_razao_social}</td>
              <td>{item.estabelecimento_telefone}</td>
              <td>{item.estabelecimento_cidade}</td>

            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style={{ textAlign: 'center' }}>
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
