import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ModifyButton from '@/Components/ModifyButton';
import { Head, Link, useForm } from '@inertiajs/react';
import React from "react";
import { ChartLineComp } from '@/Components/ChartLineComp';
import faker from 'faker';
import PrimaryButton from '@/Components/PrimaryButton';

const optionsChart = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Total Nominal Invoice',
    },
  },
};

export default function Index(props) {
  const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
    start_date: props.data.start_date,
    end_date: props.data.end_date
  });

  const labels = props.data.period_dates;
  
  const dataChart = {
    labels,
    datasets: [
      {
        label: 'Data',
        data: props.data.invoice_period_dates,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label: 'Dataset 2',
      //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };

  const dataCard = [
    {
      id: 1,
      title: 'Total Invoice',
      Value: props.data.count_invoice,
      idr: false,
      link: '#',
    },
    {
      id: 2,
      title: 'Total Nominal Invoice',
      Value: props.data.total_price_invoice,
      idr: true,
      link: '#',
    },
    {
      id: 3,
      title: 'Total Invoice Unpaid',
      Value: props.data.count_invoice_unpaid,
      idr: false,
      link: '#',
    },
    {
      id: 4,
      title: 'Total Nominal Invoice Unpaid',
      Value: props.data.total_price_invoice_unpaid,
      idr: true,
      link: '#',
    },
    {
      id: 5,
      title: 'Total Invoice Paid',
      Value: props.data.count_invoice_paid,
      idr: false,
      link: '#',
    },
    {
      id: 6,
      title: 'Total Nominal Invoice Paid',
      Value: props.data.total_price_invoice_paid,
      idr: true,
      link: '#',
    },
    {
      id: 7,
      title: 'Total Vendor Registered',
      Value: props.data.count_vendor,
      idr: false,
      link: '#',
    },
    {
      id: 8,
      title: 'Total Vendor Waiting Approval',
      Value: props.data.count_vendor_waiting,
      idr: false,
      link: '#',
    },
  ]

  return (
    <>
      <AuthenticatedLayout
        // user={props.auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Report</h2>}
      >
        <Head title="Report" />

        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-sm-0 font-size-18">Report</h4>
        </div>

        <div className="pt-3">
          {/* date range picker */}
          <form>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-4">
              <div className="w-full">
                <label className="block mb-1 font-bold text-gray-700 text-sm">Start Date</label>
                <input 
                  name="start_date"
                  type="date" 
                  value={data.start_date}
                  onChange={(e) => setData('start_date', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="w-full">
                <label className="block mb-1 font-bold text-gray-700 text-sm">End Date</label>
                <input 
                  name="end_date"
                  type="date" 
                  value={data.end_date}
                  onChange={(e) => setData('end_date', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="">
                <label className="block mb-1 font-bold text-gray-700 text-sm">&nbsp;</label>
                <PrimaryButton>
                    Filter
                </PrimaryButton>
              </div>
            </div>
          </form>

          {/* card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mb-5">
            {dataCard.map((item, index) => (
              <div key={index} className="col
                  bg-white
                  overflow-hidden
                  shadow-lg
                  sm:rounded-lg
                  p-6
                  cursor-pointer
                  hover:bg-gray-50
                  hover:shadow-xl
                  transition-shadow
                  duration-300
                ">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-500 truncate">
                    <div className="text-gray-900 text-xl font-bold">{item.title}</div>
                    <div className="text-gray-500">
                      {item.idr ? 'Rp ' : ''}
                      {item.Value}
                    </div>
                  </div>
                  {/* <div className="ml-2 flex-shrink-0 flex">
                    <ModifyButton />
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-5">
          <ChartLineComp
            optionsChart={optionsChart}
            dataChart={dataChart}
          />
        </div>

      </AuthenticatedLayout>
    </>
  );
}
