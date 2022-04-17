import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const LineChart = () => {
  const [chart, setChart] = useState({})
  var baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";



  useEffect(() => {
    const fetchCoins = async () => {
      await fetch("https://covidtracking.com/api/v1/states/current.json")
        .then((response) => {
          debugger;
          if (response.ok) {
            response.json().then((json) => {
              console.log(json);
              setChart(json)
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchCoins()
  }, [])

  console.log("chart", chart);
  var labelTemp = [];
  var dataTemp = [];
    if (chart.length) {
        chart.forEach(function(rec) {
            if (rec.state) {
                labelTemp.push(rec.state);
            }
            if (rec.positive) {
                dataTemp.push(rec.positive);
            }
        });
    }
  
  var data = {
    labels: labelTemp ? labelTemp : null,
    datasets: [{
      //label: labelTemp ? labelTemp : null,
      data: dataTemp ? dataTemp : null,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div>
      <Line
        data={data}
        height={400}
        options={options}

      />
    </div>
  )
}

export default LineChart
