import Chart from 'react-apexcharts';
import { useState } from 'react';

export default function ChartRevisionVendor(props) {
  const [chartState] = useState({
    options: {
      chart: {
        id: 'revision-vendor'
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
      colors: ['#f5c542', '#42f587', '#e83e1c'],
      labels: ['Menunggu Persetujuan', 'Disetujui', 'Ditolak']
    },
    series: [props.data.revisionProgress, props.data.revisionApproved, props.data.revisionRejected],
  });

  return (
    <div className="col-xl-12">
      <div className="card card-h-100">
        <div className="card-body">
          <div className="d-flex flex-wrap align-items-center mb-4">
            <h5 className="card-title me-2">Perubahan Data</h5>
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
                  <p className="mb-2"><i className="mdi mdi-circle align-middle font-size-10 me-2" style={{color: '#f5c542'}}></i> Menunggu Persetujuan = {props.data.revisionProgress}</p>
                </div>

                <div className="mt-4 pt-2">
                  <p className="mb-2"><i className="mdi mdi-circle align-middle font-size-10 me-2" style={{color: '#42f587'}}></i> Disetujui = {props.data.revisionApproved} </p>
                  {/* <h6>80</h6> */}
                </div>

                <div className="mt-4 pt-2">
                  <p className="mb-2"><i className="mdi mdi-circle align-middle font-size-10 me-2" style={{color: '#e83e1c'}}></i> Ditolak = {props.data.revisionRejected} </p>
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