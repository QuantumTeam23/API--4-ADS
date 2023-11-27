import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import styles from '../styles/TabelasLayoutGeral.module.css'; 

type RegionType = 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';

type ItemType = {
  preco_id?: string;
  preco_regiao: RegionType;
  preco_oleo_virgem: number;
  preco_oleo_usado: number;
};

export default function TabelaPrecopreco_regiao() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<ItemType[]>([
    { preco_regiao: 'Norte', preco_oleo_virgem: 0, preco_oleo_usado: 0 },
    { preco_regiao: 'Nordeste', preco_oleo_virgem: 0, preco_oleo_usado: 0 },
    { preco_regiao: 'Centro-Oeste', preco_oleo_virgem: 0, preco_oleo_usado: 0 },
    { preco_regiao: 'Sudeste', preco_oleo_virgem: 0, preco_oleo_usado: 0 },
    { preco_regiao: 'Sul', preco_oleo_virgem: 0, preco_oleo_usado: 0 },
  ]);

  useEffect(() => {
    fetch(`http://localhost:3001/listPreco`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);


  const formatarData = (date: string) => {
    const dataformat = new Date(date).toLocaleString('pt-BR');
    return dataformat;
  }

  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);


  const handleEdit = (item: ItemType) => {
    Swal.fire({
      title: 'Editar Informações',
      html: `
        <div>Preço de Óleo Virgem: <input type="number" id="virgem" value="${item.preco_oleo_virgem}" /></div>
        <div>Preço de Óleo Usado: <input type="number" id="usado" value="${item.preco_oleo_usado}" /></div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      preConfirm: () => {
        const virgemInput = document.getElementById('virgem') as HTMLInputElement;
        const usadoInput = document.getElementById('usado') as HTMLInputElement;

        const virgemValue = parseFloat(virgemInput.value);
        const usadoValue = parseFloat(usadoInput.value);
        const id_administrador = localStorage.getItem('idAdministrador');

        if (virgemValue !== 0 && usadoValue !== 0) {
          const updatedData = data.map((d) =>
            d === item
              ? {
                ...d,
                preco_oleo_virgem: virgemValue,
                preco_oleo_usado: usadoValue,
              }
              : d
          );

          setData(updatedData);

          fetch(`http://localhost:3001/editar-preco/${item.preco_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              preco_oleo_virgem: virgemValue,
              preco_oleo_usado: usadoValue,
              id_administrador: id_administrador,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Erro ao editar dados no servidor');
              }
              return response.json();
            })
            .then((data) => {
              console.log('Dados editados com sucesso no servidor:', data);
            })
            .catch((error) => {
              console.error('Erro ao editar dados no servidor:', error);
            });
          Swal.fire('Salvo!', 'As informações foram atualizadas.', 'success');
        } else {
          Swal.fire('Erro!', 'Por favor, insira valores válidos maiores que zero.', 'error')
            .then(() => handleEdit(item));
        }
      },
    });
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{width: '33%'}}>Região</th>
            <th style={{width: '33%'}}>Óleo Virgem</th>
            <th style={{width: '33%'}}>Óleo Usado</th>
            <th style={{width: '0.1'}}>Editar</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item: any, index: any) => (
            <tr key={index}>
              <td style={{width: '50%', padding: '3px 0.5vw'}}>{item.preco_regiao}</td>
              <td style={{width: '25%', padding: '3px 0.5vw'}}>{item.preco_oleo_virgem}</td>
              <td style={{width: '25%', padding: '3px 0.5vw'}}>{item.preco_oleo_usado}</td>
              <td style={{ width:'0.1%', padding: '3px 0.5vw'}}>
                <center>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(item)}
                    style={{maxWidth: '40px', maxHeight: '40px', minWidth: '36px', minHeight: '36px'}}
                    startIcon={<EditIcon style={{ fontSize: 24, marginLeft: '10px' }} />}
                  
                  />
                </center>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} style={{ padding: '8px 0.5vw'}}>
              <Button></Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
