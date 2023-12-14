import React, { useState } from 'react';
import Chart from 'react-apexcharts';


export default function ChartOverdue(props) {
  const labels = [props.month];
  const [chartState] = useState({
    options: {
      chart: {
        id: 'overdue',
        type: 'bar'
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
        style: {
          colors: ['#333']
        },
        offsetX: 30,
      },
      tooltip: {
        enabled: true,
        style: {}
      },
      colors: ['#777aca', '#5156be'],
      labels: labels,
      plotOptions: {
        bar: {
          columnWidth: '10%'
        }
      }
    },
    // series: [props.data.on_time, props.data.late],
    // series: [
    //   {
    //     name: '0 - 30',
    //     data: [0.2, 0.4, 0.8]
    //   },
    //   {
    //     name: '30-60',
    //     data: [0.2, 0.4, 0.8]
    //   },
    // ],
    series: [
      {
        name: '0 - 30',
        data: labels.map(() => props.data.overdue_0_30)
      },
      {
        name: '30-60',
        data: labels.map(() => props.data.overdue_30_60)
      },
    ],
  });
  const data = {
    labels,
    datasets: [
      {
        label: '0 - 30',
        data: labels.map(() => props.data.overdue_0_30),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: '30 - 60',
        data: labels.map(() => props.data.overdue_30_60),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-wrap align-items-center mb-4">
            <h5 className="card-title me-2">Chart Overdue</h5>
            <div className="ms-auto">
              <div>
                <button type="button" className="btn btn-soft-primary btn-sm">
                  ALL
                </button>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-xl-12">
              <div>
                {/* <Chart type="column" /> */}
                <Chart
                  options={chartState.options}
                  series={chartState.series}
                  type="bar"
                />
                <div id="market-overview" data-colors='["#5156be", "#34c38f"]' className="apex-charts"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}