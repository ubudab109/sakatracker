import { useState } from 'react';
import Chart from 'react-apexcharts';

export default function ChartOutstandingProcessing(props) {
  // console.log(props);
  // const data = {
  //   labels: ['Reject', 'In Progress', 'Payment'],
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       data: [props.data.rejected, props.data.progress, props.data.payment],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(75, 192, 192, 1)',
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const [chartState] = useState({
    options: {
      chart: {
        id: 'outstanding-process'
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
      colors: ['#777aca', '#5156be', '#a8aada'],
      labels: ['Reject', 'In Progress', 'Payment']
    },
    series: [props.data.rejected, props.data.progress, props.data.payment],
  });
  return (
    <div className="col-xl-6 col-md-12">
      <div className="card card-h-100">
        <div className="card-body">
          <div className="d-flex flex-wrap align-items-center mb-4">
            <h5 className="card-title me-2">Outstanding Processing</h5>
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
                  <p className="mb-2"><i className="mdi mdi-circle align-middle font-size-10 me-2 text-primary"></i> Reject = {props.data.rejected}</p>
                </div>

                <div className="mt-4 pt-2">
                  <p className="mb-2"><i className="mdi mdi-circle align-middle font-size-10 me-2 text-info"></i> In Progress = {props.data.progress} </p>
                  {/* <h6>80</h6> */}
                </div>

                <div className="mt-4 pt-2">
                  <p className="mb-2"><i className="mdi mdi-circle align-middle font-size-10 me-2" style={{ color : '#a8aada'}}></i> Payment = {props.data.payment} </p>
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