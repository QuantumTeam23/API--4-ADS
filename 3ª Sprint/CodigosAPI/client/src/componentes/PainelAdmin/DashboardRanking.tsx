import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import { TabelaRegiaoParceiros, TabelaRegiaoEstabelecimento, TabelaMelhorPerformanceDescarte, TabelaEstabMaiorVolDescartado, TabelaParceirosMaisDoamCreditos } from './TabelasRankingRegiao';
import stylesTable from '../styles/TabelasRaking.module.css';
import styles from '../styles/PainelParceiro.module.css';
import NavbarAdministrador from '../Navbars/NavbarAdministrador';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Col, Container, Row } from 'react-bootstrap';
import { useActionData, useSubmit } from 'react-router-dom';

interface DataFromBackend {
  regiao: string;
  total_oleo_descartado: number;
  total_moedas_recebidas: number;
  total_creditos_doados: number;
  total_oleo_coletado: number;
}

const mapData = (dataFromBackend: DataFromBackend[]) => {
  return dataFromBackend.map((item) => ({
    regiao: item.regiao,
    quantidade: item.total_creditos_doados || item.total_moedas_recebidas || item.total_oleo_descartado || item.total_oleo_coletado
  }));
};

type DataMapeada = {
  regiao: string;
  quantidade: number;
};

export default function DashboardRanking() {
  const [activeTab, setActiveTab] = useState('parceiro');
  

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    if (tab === 'regiao-parceiro') {
      fetchChartData('regiaoParceiroMaisCedido');
    } else if (tab === 'regiao-estabelecimento') {
      fetchChartData('regiaoEstabMaisRecebeu');
    } else if (tab === 'melhor-performance-descarte') {
      fetchChartData('regiaoEstabMaisOleoDescarte');
    } 
  };

  //evento para os botões "Parceiros que mais doas os créditos" e "Estabelecimentos com maiores volumes descartados" 
  const [activeTab2, setActiveTab2] = useState('parceiro2');
  const handleTabClick2 = (tab2: string) => {
    setActiveTab2(tab2);
  };


  const fetchChartData = async (route: string) => {
    try {
      const response = await fetch(`http://localhost:3001/${route}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const mappedData = mapData(data);
        setChartData(mappedData);
      } else {
        console.error('Erro ao buscar dados do servidor.');
      }
    } catch (error) {
      console.error('Erro na solicitação ao servidor:', error);
    }
  };



  const initialData: DataMapeada[] = []


  const [chartData, setChartData] = useState<DataMapeada[]>(initialData.sort((a, b) => b.quantidade - a.quantidade));



  const PieChart: React.FC = () => {
    const data = {
      labels: chartData.map((item) => item.regiao),
      datasets: [
        {
          data: chartData.map((item) => item.quantidade),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#4BC0C0'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#4BC0C0'],
        },
      ],
    };

    return <Pie data={data} />;
  };

  return (
    <>
      <NavbarAdministrador />
      <Container style={{ marginTop: "5%", marginBottom: "10%" }}>
        <div className={styles.topContent}>
          <h1>
            Dashboard Ranking
          </h1>
        </div>
        <Row>
          <Col sm={9} >
            <Row className={stylesTable.tabsContainer}>
              <div style={{ justifyContent: "center" }}>
                <button
                  className={
                    activeTab === 'regiao-parceiro' ? `${styles.activeTabButton} ${stylesTable.enabledButton}` : styles.tabButton
                  }
                  onClick={() => handleTabClick('regiao-parceiro')}
                >
                  Parceiro
                </button>
                <button
                  className={
                    activeTab === 'regiao-estabelecimento' ? `${styles.activeTabButton} ${stylesTable.enabledButton}` : styles.tabButton
                  }
                  onClick={() => handleTabClick('regiao-estabelecimento')}
                >
                  Estabelecimento
                </button>
                <button
                  className={
                    activeTab === 'melhor-performance-descarte' ? `${styles.activeTabButton} ${stylesTable.enabledButton}` : styles.tabButton
                  }
                  onClick={() => handleTabClick('melhor-performance-descarte')}
                >
                  Melhor Performance de Descarte
                </button>
              </div>
              {/* Adicione mais botões de aba conforme necessário */}
            </Row>
            <Row sm={8} className='TabelasRankingRegiao' style={{ marginBottom: "5%" }}>
              {activeTab === 'regiao-parceiro' && <TabelaRegiaoParceiros />}
              {activeTab === 'regiao-estabelecimento' && <TabelaRegiaoEstabelecimento />}
              {activeTab === 'melhor-performance-descarte' && <TabelaMelhorPerformanceDescarte />}
            </Row>
          </Col>
          <Col sm={3} style={{ display: "flex", textAlign: "center", paddingTop: "5%", maxHeight: "367px", minHeight: "367px" }}>
            <PieChart />
          </Col>
          <Row className={stylesTable.tabsContainer}>
            <div style={{ justifyContent: "center" }}>
              <button
                className={
                  activeTab === 'parceiros-mais-utilizam-creditos' ? `${styles.activeTabButton} ${stylesTable.enabledButton}` : styles.tabButton
                }
                onClick={() => handleTabClick2('parceiros-mais-utilizam-creditos')}
              >
                Parceiros que mais doam os créditos
              </button>
              <button
                className={
                  activeTab === 'estabelecimentos-maiores-volumes-descartados' ? `${styles.activeTabButton} ${stylesTable.enabledButton}` : styles.tabButton
                }
                onClick={() => handleTabClick2('estabelecimentos-maiores-volumes-descartados')}
              >
                Estabelecimentos com maiores volumes descartados
              </button>
            </div>
          </Row>
          <Row sm={8} className='TabelasRankingRegiao' style={{ marginBottom: "5%" }}>
            {activeTab2 === 'parceiros-mais-utilizam-creditos' && <TabelaParceirosMaisDoamCreditos />}
            {activeTab2 === 'estabelecimentos-maiores-volumes-descartados' && <TabelaEstabMaiorVolDescartado />}
          </Row>

        </Row>
      </Container>
      <Footer />

    </>
  );
}
