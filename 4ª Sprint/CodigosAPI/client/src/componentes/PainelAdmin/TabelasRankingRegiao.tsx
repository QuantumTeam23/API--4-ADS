import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styles from '../styles/TabelasLayoutGeral.module.css'; 

export const TabelaRegiaoParceiros: React.FC = () => {

  type Data = {
    numRanking: string;
    regiao: string;
    total_creditos_doados: number;
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 9;

  useEffect(() => {
    fetch("http://localhost:3001/regiaoParceiroMaisCedido", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const initialData: Data[] = []
 
  const [data, setData] = useState<Data[]>(initialData.sort((a, b) => b.total_creditos_doados - a.total_creditos_doados));

  const indexedData = data.map((item, index) => ({
    ...item,
    numRanking: `${index + 1}º`,
  }));

  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const currentData: Data[] = indexedData.slice(startIndex, endIndex);

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
      <h4>Regiões que mais receberam créditos de parceiros</h4>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{width: '1%'}} >Nº</th>
            <th>Região</th>
            <th>Créditos Cedidos</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td >{item.numRanking}</td>
              <td >{item.regiao}</td>
              <td >{item.total_creditos_doados}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style={{ textAlign: 'center', padding: '3px 0' }}>
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

    </>
  );
};

export const TabelaRegiaoEstabelecimento: React.FC = () => {

  type Data = {
    numRanking: string;
    regiao: string;
    total_moedas_recebidas: number;
  };

  useEffect(() => {
    fetch("http://localhost:3001/regiaoEstabMaisRecebeu", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const initialData: Data[] = []

  const [data, setData] = useState<Data[]>(initialData.sort((a, b) => b.total_moedas_recebidas - a.total_moedas_recebidas));

  const indexedData = data.map((item, index) => ({
    ...item,
    numRanking: `${index + 1}º`,
  }));

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 9;

  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const currentData: Data[] = indexedData.slice(startIndex, endIndex);

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
      <h4>Estabelecimentos que Mais Receberam Créditos (Por Região)</h4>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{width: '1%'}}>Nº</th>
            <th>Região</th>
            <th>Créditos Recebidos</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.numRanking}</td>
              <td>{item.regiao}</td>
              <td>{item.total_moedas_recebidas}</td>
            </tr>
          ))} 
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style={{ textAlign: 'center', padding: '3px 0' }}>
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
   
    </>
  );
};


export const TabelaMelhorPerformanceDescarte: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 9;

  type Data = {
    numRanking: string;
    regiao: string;
    total_oleo_descartado: number;
  };

  useEffect(() => {
    fetch("http://localhost:3001/regiaoEstabMaisOleoDescarte", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const initialData: Data[] = []

  const [data, setData] = useState<Data[]>(initialData.sort((a, b) => b.total_oleo_descartado - a.total_oleo_descartado));

  const indexedData = data.map((item, index) => ({
    ...item,
    numRanking: `${index + 1}º`,
  }));


  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const currentData: Data[] = indexedData.slice(startIndex, endIndex);

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
      <h4>Estabelecimentos com Melhor Descarte de Óleo (Por Região)</h4>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{width: '1%'}}>Nº</th>
            <th>Região</th>
            <th>Óleo (Em Litros)</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.numRanking}</td>
              <td>{item.regiao}</td>
              <td>{item.total_oleo_descartado}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style={{ textAlign: 'center', padding: '3px 0' }}>
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
      
    </>
  );
};

export const TabelaParceirosMaisDoamCreditos: React.FC = () => {

  type Data = {
    numRanking: string;
    regiao: string;
    nome_parceiro: string;
    nomeEstabelecimento: string;
    total_creditos_doados: number;
    QtdVolume: number;
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 9;

  useEffect(() => {
    fetch("http://localhost:3001/parceirosMaisCreditosDoados", { 
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data); 
      })
      .catch((error) => console.log(error));
  }, []);

  const initialData: Data[] = []

  const [data, setData] = useState<Data[]>(initialData.sort((a, b) => b.total_creditos_doados - a.total_creditos_doados));

  const indexedData = data.map((item, index) => ({
    ...item,
    numRanking: `${index + 1}º`,
  }));

  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const currentData: Data[] = indexedData.slice(startIndex, endIndex);

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
      <h4>Parceiros que mais doam os créditos</h4>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{width: '0.1%'}}>Nº</th>
            <th style={{width: '75%'}}>Parceiro</th>
            <th style={{width: '15%'}}>Créditos</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.numRanking}</td>
              <td>{item.nome_parceiro}</td>
              <td>{item.total_creditos_doados}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style={{ textAlign: 'center', padding: '3px 0' }}>
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
    </>
  );
};

export const TabelaEstabMaiorVolDescartado: React.FC = () => {

  type Data = {
    numRanking: string;
    regiao: string;
    nome_estabelecimento: string;
    total_oleo_coletado: number;
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 9;

  useEffect(() => {
    fetch("http://localhost:3001/estabelecimentosMaisCreditosDoados", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const initialData: Data[] = []

  const [data, setData] = useState<Data[]>(initialData.sort((a, b) => b.total_oleo_coletado - a.total_oleo_coletado));

  const indexedData = data.map((item, index) => ({
    ...item,
    numRanking: `${index + 1}º`,
  }));

  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const currentData: Data[] = indexedData.slice(startIndex, endIndex);

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
      <h4>Estabelecimentos com maiores volumes descartados</h4>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{width: '1%'}}>Nº</th>
            <th style={{width: '75%'}}>Estabelecimento</th>
            <th style={{width: '19%'}}>Volume (Litros)</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.numRanking}</td>
              <td>{item.nome_estabelecimento}</td>
              <td>{item.total_oleo_coletado}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style={{ textAlign: 'center', padding: '3px 0' }}>
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
};



