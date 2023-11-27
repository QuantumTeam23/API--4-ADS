import Chart from "react-apexcharts";


function Grafico(){
const state = {
  options: {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: ["Óleo virgem", "Óleo de Fritura", "Crédito Greenneat"]
    }
  },
  series: [
    {
      name: "series-1",
      data: [5.0, 7.49, 2.49]
    }
  ]
};

return (
  <div className="app">
    <div className="row">
      <div className="mixed-chart ">
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
          min-width="300"
        />
      </div>
    </div>
  </div>
);
}

export default Grafico;