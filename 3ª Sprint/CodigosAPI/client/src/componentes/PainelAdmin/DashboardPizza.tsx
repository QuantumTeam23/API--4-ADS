import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Importe 'chart.js/auto' para corrigir problemas com canvas.

var dados: number[];

const PieChart: React.FC = (props) => {
  const data = {
    labels: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
    datasets: [
      {
        data: dados, // Quantidade de estados em cada região (exemplo)
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#4BC0C0'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
