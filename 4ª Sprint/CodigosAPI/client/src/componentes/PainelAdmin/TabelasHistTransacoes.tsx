import styles from '../styles/TabelasLayoutGeral.module.css'; 
import styles2 from '../styles/PainelLayoutGeral.module.css';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react'; // Importe useState
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface Data {
  estabelecimento: string;
  parceiro: string;
  tipo: string;
}

export default function TabelasHistTransacoes() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [transacoes, setTransacoes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Variável de estado para armazenar a consulta de pesquisa
  const [filteredData, setFilteredData] = useState([]); // Variável de estado para armazenar os dados filtrados


  useEffect(() => {
    fetch("http://localhost:3001/admTransacoes", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Filtrar os dados com base na consulta de pesquisa antes de atualizar a variável de estado
        const filteredData = data.filter((item: Data) => {
          const lowerCaseTipo = item.tipo.toLowerCase();
          const lowerCaseEstab = item.estabelecimento.toLowerCase();
          const lowerCaseParc = item.parceiro.toLowerCase();
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          return (
            item.tipo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lowerCaseTipo.includes(lowerCaseSearchQuery) ||
            lowerCaseEstab.includes(lowerCaseSearchQuery) ||
            lowerCaseParc.includes(lowerCaseSearchQuery)
          );
        });
        
        setFilteredData(filteredData);
        setTransacoes(data);
      })
      .catch((error) => console.log(error));
  }, [searchQuery]); // Adicione a variável de dependência searchQuery
  

  const formatarData = (date: string) => {
    const dataformat = new Date(date).toLocaleString('pt-BR');
    return dataformat;
  }

  const index = [1,2,3,4,5];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = filteredData.slice(startIndex, endIndex); // Use filteredData em vez de user

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

  return (
    <>
      <div className={styles2.containerConteudoEspecifico2}>
        <div>
          <input
            type="text"
            placeholder="Pesquisar..."
            onChange={handleSearchChange}
            value={searchQuery}
          />
        </div>
      </div>
      <div className={styles2.containerConteudoEspecifico}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{width: '5%'}}>Tipo</th>
            <th style={{width: '3%'}}>Créditos</th>
            <th style={{width: '5%'}}>Parceiro</th>
            <th style={{width: '5%'}}>Estabelecimento</th>
            <th style={{width: '3%'}}>Data / Hora</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item.tipo}</td>
              <td>{item.creditos}</td>
              <td>{item.parceiro}</td>
              <td>{item.estabelecimento}</td>
              <td>{formatarData(item.data)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <div style={{ textAlign: 'center', padding: '3px 0'  }}>
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
              </div>
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
