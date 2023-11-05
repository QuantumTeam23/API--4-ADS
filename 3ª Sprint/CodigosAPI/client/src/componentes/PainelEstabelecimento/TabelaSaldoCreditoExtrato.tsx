import Button from '@mui/material/Button';
import styles from '../styles/TabelasEstabelecimento.module.css'; // Corrija o caminho do estilo se necessário
import { useEffect, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function TabelaSaldoCreditoExtrato() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const id = localStorage.getItem('idEstabelecimento');
  const [transacoes, setTransacoes] = useState([]);
  const index = [1, 2, 3, 4];
  /*
  const data = Array.from({ length: 18 }, (_, index) => ({
    movimentacao: `Movimentação ${index + 1}`,
    valor: `Valor ${index + 1}`,
    data: `Data ${index + 1}`,
    descricao: `Descrição ${index + 1}`,
  }));
  */
  useEffect(() => {
    fetch(`http://localhost:3001/transacoes-estabelecimento/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTransacoes(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const formatarData = (date: string) => {
    const dataformat = new Date(date).toLocaleString('pt-BR');
    return dataformat;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = transacoes.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < transacoes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: '20%' }}>Movimentação</th>
            <th style={{ width: '10%' }}>Créditos Recebidos</th>
            <th style={{ width: '10%' }}>Data / Hora</th>
            <th style={{ width: '10%' }}>Litros de óleo</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item: any, index: any) => (
            <tr key={index}>
              <td>Coleta de óleo com crédito recebido do Parceiro Greenneat</td>
              <td>{item.quantidade_moedas}</td>
              <td>{formatarData(item.acao_data)}</td>
              <td>{item.quantidade_oleo_coletado}</td>
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
                disabled={endIndex >= transacoes.length}
                onClick={handleNextPage}
                style={{
                  color: endIndex < transacoes.length ? 'lightblue' : 'lightgray',
                  fontWeight: endIndex < transacoes.length ? 'bold' : 'normal',
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
