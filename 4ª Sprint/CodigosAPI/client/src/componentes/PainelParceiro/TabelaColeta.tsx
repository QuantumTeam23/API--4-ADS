import Button from '@mui/material/Button';
import styles from '../styles/ParceiroTabelaColetas.module.css';
import styles2 from '../styles/PainelLayoutGeral.module.css';
import { useEffect, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function TabelaColeta() {
  const currentDate = new Date();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const id = localStorage.getItem('idParceiro');
  const [transacoes, setTransacoes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Variável de estado para armazenar a consulta de pesquisa
  const [searchQueryDataInicio, setSearchQueryDataInicio] = useState(''); // Variável de estado para armazenar a consulta de pesquisa
  const [searchQueryDataFim, setSearchQueryDataFim] = useState(currentDate.toISOString().split('T')[0]); // Variável de estado para armazenar a consulta de pesquisa


  useEffect(() => {
    fetch(`http://localhost:3001/transacoes-parceiro/${id}`, {
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

  const filteredData = transacoes.filter((item: any) => {
    const dataSemHora = item.acao_data.split('T')[0];
    const porData = dataSemHora >= searchQueryDataInicio && dataSemHora <= searchQueryDataFim;
    const porNome = item.estabelecimento_razao_social.toLowerCase().includes(searchQuery.toLowerCase());
    return (porData && porNome);
  });

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryDataInicio(e.target.value);
  };

  const handleSearchChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryDataFim(e.target.value);
  };





  return (
    <>
      <div className={styles2.containerConteudoEspecifico2}>

        <div className={styles.searchContainer}>

          <input
            type="text"
            placeholder="Pesquisar..."
            onChange={handleSearchChange}
            value={searchQuery}
          />

          <div className={styles.dateFilters}>
            Data de:
            <div>
              <input
                type="date"
                placeholder="Data Início..."
                onChange={handleSearchChange2}
                value={searchQueryDataInicio}
              />
            </div>
            Até
            <div>
              <input
                type="date"
                placeholder="Data Final..."
                onChange={handleSearchChange3}
                value={searchQueryDataFim}
              />
            </div>
          </div>

        </div>
      </div>
      <div className={styles2.containerConteudo}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: '28%' }}>Estabelecimento</th>
            <th style={{ width: '28%' }}>Endereço</th>
            <th style={{ width: '15%' }}>Volume (Litros)</th>
            <th style={{ width: '16%' }}>Data</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item: any, index: any) => (
            <tr key={index}>
              <td>{item.estabelecimento_razao_social}</td>
              <td>{item.estabelecimento_cidade}</td>
              <td>{item.quantidade_oleo_coletado} </td>
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
                  color: currentPage !== 1 ? 'lightblue' : 'lightgray', // Alterado para cinza claro quando desativado
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
                  color: endIndex < transacoes.length ? 'lightblue' : 'lightgray', // Alterado para cinza claro quando desativado
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
