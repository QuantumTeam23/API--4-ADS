import Button from '@mui/material/Button';
import styles from '../styles/TabelasLayoutGeral.module.css';
import styles2 from '../styles/PainelLayoutGeral.module.css';
import { useState, useEffect } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export function TabelaCreditoContratado() {
  const [mesAno, setMesAno] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [contratacoes, setContratacoes] = useState([]);
  const id = localStorage.getItem('idParceiro');

  const mesesAnosDisponiveis = [
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
    fetch(`http://localhost:3001/creditos-contratados/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setContratacoes(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const formatarData = (date: string) => {
    const dataformat = new Date(date).toLocaleString('pt-BR');
    return dataformat;
  }

  const converterParaFormatoDados = (mesAnoFormatado: string) => {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
    ];
    const [mes, ano] = mesAnoFormatado.split('/');
    const mesNumerico = meses.indexOf(mes) + 1;
    return `${mesNumerico < 10 ? '0' : ''}${mesNumerico}/${ano}`;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredData = mesAno
    ? contratacoes.filter((item: any) => {
      // Converte o valor do dropdown para o formato dos dados
      const mesAnoFormatado = converterParaFormatoDados(mesAno);
      return formatarData(item.acao_compra_data).includes(mesAnoFormatado);
    })
    : contratacoes;


  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < contratacoes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatarStatus = (x: boolean) => {
    if (x === true) {
      return ("Aprovado")
    }
    else if (x === false) {
      return ("Recusado")
    }
    else {
      return ("Aguardando Aprovação")
    }
  }

  const handleChangeFiltroDataReq = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMesAno(event.target.value);
  };

  return (
    <>
      <div className={styles2.containerConteudoEspecifico2}>
        <div style={{ display: 'flex' }}>
          <a href="../transacao-compra-credito">
            <img
              src={require("../Imagens/icone-moedas.png")}
              alt="Editar"
              className="img-fluid"
              style={{
                width: "40px",
                height: "40px",
                maxWidth: "40px",
                maxHeight: "40px",
                marginRight: "10px"
              }}
            />
          </a>

          <select onChange={handleChangeFiltroDataReq} style={{ width: '160px' }}>
            <option value="">Mês/Ano</option>
            {mesesAnosDisponiveis.map((mesAno, index) => (
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
              <th style={{ width: '20%' }}>Quantidade de Créditos</th>
              <th style={{ width: '44%' }}>Status</th>
              <th style={{ width: '16%' }}>Data / Hora</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item: any, index: any) => (
              <tr key={index}>
                <td>{item.valor_comprado}</td>
                <td>{formatarStatus(item.aprovado)}</td>
                <td>{formatarData(item.acao_compra_data)}</td>
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
                  disabled={endIndex >= contratacoes.length}
                  onClick={handleNextPage}
                  style={{
                    color: endIndex < contratacoes.length ? 'lightblue' : 'lightgray',
                    fontWeight: endIndex < contratacoes.length ? 'bold' : 'normal',
                  }}
                >
                  Próxima
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

    </>
  );
}

export function TabelaCreditoCedido() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const id = localStorage.getItem('idParceiro');
  const [transacoes, setTransacoes] = useState([]);
  const index = [1, 2, 3, 4];
  const [mesAno, setMesAno] = useState('');

  const mesesAnosDisponiveis = [
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

  const converterParaFormatoDados = (mesAnoFormatado: string) => {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
    ];
    const [mes, ano] = mesAnoFormatado.split('/');
    const mesNumerico = meses.indexOf(mes) + 1;
    return `${mesNumerico < 10 ? '0' : ''}${mesNumerico}/${ano}`;
  };

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

  const handleChangeFiltroDataCredCedidos = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMesAno(event.target.value);
  };

  return (
    <>
      <div className={styles2.containerConteudoEspecifico2}>

        <div style={{ display: 'flex' }}>
          <a href="../transacao-doacao">
            <img
              src={require("../Imagens/icone-ceder-credito.png")}
              alt="Editar"
              className="img-fluid"
              style={{
                width: "40px",
                height: "40px",
                maxWidth: "40px",
                maxHeight: "40px",
                marginRight: "10px"
              }}

            />
          </a>
          <select onChange={handleChangeFiltroDataCredCedidos} style={{ width: '160px' }} >
            <option value="">Mês/Ano</option>
            {mesesAnosDisponiveis.map((mesAno, index) => (
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
              <th style={{ width: '25%' }}>Descrição</th>
              <th style={{ width: '10%' }}>Créditos</th>
              <th style={{ width: '10%' }}>Óleo (Litros)</th>
              <th style={{ width: '13%' }}>Data / Hora</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item: any, index: any) => (
              <tr key={index}>
                <td>Coleta: {item.estabelecimento_razao_social}</td>
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
      </div>
      <p>ㅤ</p>
      <p>ㅤ</p>
      <p>ㅤ</p>
      <p>ㅤ</p>
    </>
  );
}
