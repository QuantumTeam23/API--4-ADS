import React, { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';
import {
  TabelaRegiaoParceiros,
  TabelaRegiaoEstabelecimento,
  TabelaMelhorPerformanceDescarte,
  TabelaEstabMaiorVolDescartado,
  TabelaParceirosMaisDoamCreditos
} from './TabelasRankingRegiao';
import stylesTable from '../styles/TabsTabelaRaking.module.css';
import styles from '../styles/PainelLayoutGeral.module.css';
import NavbarAdministrador from '../Navbars/NavbarAdministrador';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Col, Container, Row } from 'react-bootstrap';

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

interface PieChartProps {
  chartData: DataMapeada[];
}

const PieChart: React.FC<PieChartProps> = ({ chartData }) => {
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

export default function DashboardRanking() {
  const [activeTab, setActiveTab] = useState('regiao-parceiro');  // Estado inicial alterado para 'regiao-parceiro'
  const [activeTab2, setActiveTab2] = useState('parceiros-mais-utilizam-creditos');  // Estado inicial alterado para 'parceiros-mais-utilizam-creditos'
  const [chartData, setChartData] = useState<DataMapeada[]>([]);

  useEffect(() => {
    // Fetch data when component mounts or activeTab changes
    fetchChartData();
  }, [activeTab]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleTabClick2 = (tab2: string) => {
    setActiveTab2(tab2);
  };

  const fetchChartData = async () => {
    try {
      const route = getRouteBasedOnActiveTab();
      const response = await fetch(`http://localhost:3001/${route}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const mappedData = mapData(data);
        console.log("Fetched data:", mappedData);
        setChartData(mappedData);
      } else {
        console.error('Erro ao buscar dados do servidor.');
      }
    } catch (error) {
      console.error('Erro na solicitação ao servidor:', error);
    }
  };

  const getRouteBasedOnActiveTab = () => {
    if (activeTab === 'regiao-parceiro') {
      return 'regiaoParceiroMaisCedido';
    } else if (activeTab === 'regiao-estabelecimento') {
      return 'regiaoEstabMaisRecebeu';
    } else if (activeTab === 'melhor-performance-descarte') {
      return 'regiaoEstabMaisOleoDescarte';
    }

    return '';
  };

  return (
    <>
      <NavbarAdministrador />
      <Container style={{ marginTop: "5%", marginBottom: "10%" }}>
        <div className={styles.topContent}>
          <h1>Dashboard Ranking</h1>
        </div>
        <Row>
          <Col sm={9}>
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
            </Row>
            <Row sm={8} className='TabelasRankingRegiao' style={{ marginBottom: "5%" }}>
              {activeTab === 'regiao-parceiro' && <TabelaRegiaoParceiros />}
              {activeTab === 'regiao-estabelecimento' && <TabelaRegiaoEstabelecimento />}
              {activeTab === 'melhor-performance-descarte' && <TabelaMelhorPerformanceDescarte />}
            </Row>
          </Col>
          <Col sm={3} style={{ display: "flex", textAlign: "center", paddingTop: "5%", maxHeight: "367px", minHeight: "367px" }}>
            <PieChart chartData={chartData} />
          </Col>
        </Row>
        <Row className={stylesTable.tabsContainer}>
          <div style={{ justifyContent: "center" }}>
            <button
              className={
                activeTab2 === 'parceiros-mais-utilizam-creditos' ? `${styles.activeTabButton} ${stylesTable.enabledButton}` : styles.tabButton
              }
              onClick={() => handleTabClick2('parceiros-mais-utilizam-creditos')}
            >
              Parceiros que mais doam os créditos
            </button>
            <button
              className={
                activeTab2 === 'estabelecimentos-maiores-volumes-descartados' ? `${styles.activeTabButton} ${stylesTable.enabledButton}` : styles.tabButton
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
      </Container>
      <Footer />
    </>
  );
}