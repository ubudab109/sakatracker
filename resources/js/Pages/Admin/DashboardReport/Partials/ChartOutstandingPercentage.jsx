import Chart from 'react-apexcharts';
import { useState } from 'react';

export default function ChartOutstandingPercentage(props) {
  const [chartState] = useState({
    options: {
      chart: {
        id: 'wallet-balance'
      },
      legend: {
        show: false,
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
      colors: ['#777aca', '#5156be'],
      labels: ['On Time', 'Late']
    },
    series: [props.data.on_time, props.data.late],
  });

  return (
    <div className="col-xl-6 col-md-12">
      <div className="card card-h-100">
        <div className="card-body">
          <div className="d-flex flex-wrap align-items-center mb-4">
            <h5 className="card-title me-2">Outstanding Percentage</h5>
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
                <Chart className="apex-charts" options={chartState.options} series={chartState.series} type="pie" width={250} />
              </div>
            </div>
            <div className="col-sm align-self-center">
              <div className="mt-sm-0">
                <div className="">
                  <p className="mb-2"><i className="mdi mdi-circle align-middle font-size-10 me-2 text-primary"></i> On Time = {props.data.on_time}</p>
                </div>

                <div className="mt-4 pt-2">
                  <p className="mb-2"><i className="mdi mdi-circle align-middle font-size-10 me-2 text-info"></i> Late = {props.data.late} </p>
                  {/* <h6>80</h6> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}