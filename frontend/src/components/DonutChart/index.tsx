import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/request';

type ChartData = {
  labels: string[];
  series: number[];
}

const DonutChart = () => {
  //FORMA ERRADA "não carregará o gráfico"
  //let chartData: ChartData = { labels: [], series: [] };

  //FORMA ERRADA "entrará em loop infinito ao usar useState"
  // axios.get(`${BASE_URL}/sales/amount-by-seller`)
  //   .then((response) => {
  //     const data = response.data as SaleSum[];
  //     const myLabels = data.map(x => x.sellerName);
  //     const mySeries = data.map(x => x.sum);

  //     chartData = { labels: myLabels, series: mySeries };
  //     console.log(chartData)
  //   })

  //FORMA CORRETA
  const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

  //FORMA CORRETA
  useEffect(() => {
    axios.get(`${BASE_URL}/sales/amount-by-seller`)
      .then((response) => {
        const data = response.data as SaleSum[];
        const myLabels = data.map(x => x.sellerName);
        const mySeries = data.map(x => x.sum);

        setChartData({ labels: myLabels, series: mySeries });
      });
  }, []);




  // const mockData = {
  //   series: [477138, 499928, 444867, 220426, 473088],
  //   labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
  // }

  const options = {
    legend: {
      show: true
    }
  }

  return (
    <Chart
      options={{ ...options, labels: chartData.labels }}
      series={chartData.series}
      type="donut"
      height="240"

    />
  );
}

export default DonutChart;