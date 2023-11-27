import Button from '@mui/material/Button';
import styles from '../styles/TabelasLayoutGeral.module.css';
import styles2 from '../styles/PainelLayoutGeral.module.css';
import { useEffect, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function TabelaSaldoCreditoExtrato() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const id = localStorage.getItem('idEstabelecimento');
  const [transacoes, setTransacoes] = useState([]);
  const index = [1, 2, 3, 4];
  const [mesAno, setMesAno] = useState('');

  const handleChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMesAno(event.target.value);
  };

  // Função para converter o formato do dropdown para o formato dos dados
  const converterParaFormatoDados = (mesAnoFormatado: string) => {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
    ];
    const [mes, ano] = mesAnoFormatado.split('/');
    const mesNumerico = meses.indexOf(mes) + 1;
    return `${mesNumerico < 10 ? '0' : ''}${mesNumerico}/${ano}`;
  };

  const mesesAnosDisponiveisFormatados = [
    'Janeiro/2023',
    'Fevereiro/2023',
    'Março/2023',
    'Abril/2023',
    'Maio/2023',
    'Junho/2023',
    'Julho/2023',
    'Agosto/2023',
    'Setembro/2023',
    'Outubro/2023',
    'Novembro/2023',
    'Dezembro/2023',
  ];


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

  // Filtra os dados com base no mês/ano selecionado
  const filteredData = mesAno
    ? transacoes.filter((item: any) => {
      // Converte o valor do dropdown para o formato dos dados
      const mesAnoFormatado = converterParaFormatoDados(mesAno);
      return formatarData(item.acao_data).includes(mesAnoFormatado);
    })
    : transacoes;

  // Atualiza a variável currentData com os dados filtrados
  const currentData = filteredData.slice(startIndex, endIndex);

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
      <div className={styles2.containerConteudoEspecifico2}>
        <div className={styles.searchContainer}>
          <select
            onChange={handleChange2}
          >
            <option value="">Selecione um Mês/Ano</option>
            {mesesAnosDisponiveisFormatados.map((mesAno, index) => (
              <option key={index} value={mesAno}>
                {mesAno}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles2.containerConteudoEspecifico}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Movimentação</th>
              <th style={{ width: '12%' }}>Créditos Recebidos</th>
              <th style={{ width: '8%' }}>Litros de óleo</th>
              <th style={{ width: '10%' }}>Data / Hora</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item: any, index: any) => (
              <tr key={index}>
                <td>Coleta de óleo com crédito recebido do Parceiro Greenneat</td>
                <td>{item.quantidade_moedas}</td>
                <td>{item.quantidade_oleo_coletado}</td>
                <td>{formatarData(item.acao_data)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', padding: '3px 0' }}>
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
      </div>
    </>
  );
}
