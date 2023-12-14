import { useState } from 'react';
import Chart from 'react-apexcharts';

export default function ChartOutstandingInvApproval(props) {

  const [chartState] = useState({
    options: {
      chart: {
        id: 'outstanding-process-inv-dep'
      },
      legend: {
        show: true,
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#333']
        },
        offsetX: 30,
      },
      tooltip: {
        enabled: false,
        style: {}
      },
      colors: ['#777aca', '#5156be', '#a8aada', '#eb6734', '#b3b012'],
      labels: ['Approver 1', 'Approver 2', 'Approver 3', 'Approver 4', 'Approver 5']
    },
    series: [10, 12, 23, 13, 20],
  });
  return (
    <div className="col-xl-6 col-md-12">
      <div className="card card-h-100">
        <div className="card-body">
          <div className="d-flex flex-wrap align-items-center mb-4">
            <h5 className="card-title me-2">Outstanding Approval</h5>
            <div className="ms-auto">
              <div>
                <button type="button" className="btn btn-soft-secondary btn-sm">
                  ALL
                </button>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-sm">
              <div className="donut">
                <Chart className="apex-charts" options={chartState.options} series={chartState.series} type="pie" width={400} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}