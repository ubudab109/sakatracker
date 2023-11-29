import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import OutstandingTable from './Partials/OutstandingTable';
import OutstandingTable2 from './Partials/OutstandingTable2';
import InvoiceItemTable from './Partials/InvoiceItemTable';
import ModalDelete from './Partials/ModalDelete';
import ModifyButton from '@/Components/ModifyButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';
import { Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';

export default function Index(props) {

console.log("Data Props Page: ", props.data.batch_payment_invoices);

let [outstanding_invoices, setOutstandingData] = useState(props.data.outstanding_invoices);
let [batch_payment_invoices, setInvoiceItems] = useState(props.data.batch_payment_invoices);
let [totalInvoice, setTotalInvoice] = useState(props.data.batch_payment.total);
let [periode, setPeriode] = useState(props.data.batch_payment.periode);
let [due_date, setDueDate] = useState(props.data.batch_payment.jatuh_tempo);
let [showModal, setShowModal] = useState(false);
let [itemToDelete, setItemToDelete] = useState(null);
let deleteRoute = '/admin/batch-payment/' + props.data.batch_payment.id + '/delete';

const onChange = (key) => {
  console.log(key);
};

useEffect(() => {
    getBatchPaymentInvoices();
}, []);

const items = [
  {
    key: '1',
    label: 'List Invoice',
    children: (
        <InvoiceItemTable 
            data={props.data}
            outstanding_invoices={outstanding_invoices}
            setOutstandingData={setOutstandingData}
            batch_payment_invoices={batch_payment_invoices}
            setInvoiceItems={setInvoiceItems}
            totalInvoice={totalInvoice}
            setTotalInvoice={setTotalInvoice}
        />
    ),
  },
  {
    key: '2',
    label: 'Tambah',
    children: (
        <OutstandingTable2 
            data={props.data}
            outstanding_invoices={outstanding_invoices}
            setOutstandingData={setOutstandingData}
            batch_payment_invoices={batch_payment_invoices}
            setInvoiceItems={setInvoiceItems}
            totalInvoice={totalInvoice}
            setTotalInvoice={setTotalInvoice}
        />
    ),
  },
];

const getBatchPaymentInvoices = () => {
    Axios.get('/admin/batch-payment/get-invoices/' + props.data.batch_payment.id)
        .then((response) => {
            console.log(response);
            setInvoiceItems(response.data.invoices);
            console.log("Data Invoice: ", batch_payment_invoices);
        })
        .catch((error) => {
            console.error('Error fetching products:', error);
        });
}

const simpanDraf = () => {
    const formData = {
        batch_payment: props.data.batch_payment,
        periode: periode,
        jatuh_tempo: due_date,
        total: totalInvoice,
        batch_payment_invoices: batch_payment_invoices
    }

    console.log(formData);

    // Make a POST request using Axios
    Axios.post('/admin/batch-payment/save-draft', formData)
      .then((response) => {
        console.log('Data sent to the API:', response);
        // You can handle the API response here
        openDetailBatchPayment();
      })
      .catch((error) => {
        console.error('Error sending data to the API:', error);
      });
}

const simpanBatchPayment = () => {
    const formData = {
        batch_payment: props.data.batch_payment,
        periode: periode,
        jatuh_tempo: due_date,
        total: totalInvoice,
        batch_payment_invoices: batch_payment_invoices
    }

    console.log(formData);

    // Make a POST request using Axios
    Axios.post('/admin/batch-payment/save', formData)
      .then((response) => {
        console.log('Data sent to the API:', response);
        // You can handle the API response here
        openDetailBatchPayment();
      })
      .catch((error) => {
        console.error('Error sending data to the API:', error.response.data.message);
      });
}

const hapusDraf = () => {
    window.location.href = route('admin.batch-payment.delete', props.data.batch_payment.id);
}

const openDetailBatchPayment = () => {
    window.location.href = '/admin/batch-payment/' + props.data.batch_payment.id
}

const changePeriode = (event) => {
    setPeriode(event.target.value);
}

const changeDueDate = (event) => {
    setDueDate(event.target.value);
}

return (

<AuthenticatedLayout user={props.auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
    Buat Batch Payment</h2>}
    >

    <Head title="Master User" />

    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
        <h4 className="mb-sm-0 font-size-18">Buat Batch Payment</h4>
        <div className="page-title-right">
            <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">Batch Payment</li>
                <li className="breadcrumb-item active">Buat Batch Payment</li>
            </ol>
        </div>
    </div>

    <div className="pt-6">
        <div className="">
            <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                <div className="p-6 text-gray-900 font-bold">Buat Batch Payment</div>
            </div>
        </div>
    </div>

    <div class="bg-white overflow-hidden shadow-lg sm:rounded-lg mt-6 p-6">
        <div>
            <div class="mb-3 grid grid-cols-8 gap-4 items-center">
                <label for="batch_number" class="block font-medium text-sm text-gray-700 ">Nomor Batch</label>
                <div class="col-span-3 flex gap-4 items-center">
                    <div>:</div>
                    <div class="font-bold">{props.data.batch_payment.no_batch}</div>
                </div>
            </div>
            {/* <div class="mb-3 grid grid-cols-8 gap-4 items-center">
                <label for="periode" class="block font-medium text-sm text-gray-700 ">Periode<span class="text-red-500">*</span></label>
                <div class="col-span-3 flex gap-4 items-center">
                    <div>:</div>
                    <input type="month" id="periode" value={periode} onChange={changePeriode} placeholder="Pilih periode.." class="ant-input css-190m0jy mt-1 block w-full"></input>
                </div>
            </div>
            <div class="mb-3 grid grid-cols-8 gap-4 items-center">
                <label for="due_date" class="block font-medium text-sm text-gray-700 ">Jatuh Tempo<span class="text-red-500">*</span></label>
                <div class="col-span-3 flex gap-4 items-center">
                    <div>:</div>
                    <input type="date" id="due_date" value={due_date} onChange={changeDueDate} placeholder="Pilih due_date.." class="ant-input css-190m0jy mt-1 block w-full"></input>
                </div>
            </div> */}
            <div class="mb-3 grid grid-cols-8 gap-4 items-center">
                <label for="total" class="block font-medium text-sm text-gray-700 ">Total</label>
                <div class="col-span-3 flex gap-4 items-center">
                    <div>:</div>
                    <div class="font-bold">Rp {totalInvoice.toLocaleString()}</div>
                </div>
            </div>

            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            
            <div class="flex items-center gap-2 mt-2">
                    <button onClick={hapusDraf} class="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 undefined ">
                        Hapus
                    </button>
                    <button onClick={simpanDraf} type="button" class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 undefined ">Simpan
                        Draf
                    </button>
                    <button onClick={simpanBatchPayment} class="inline-flex items-center px-4 py-2 bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 undefined ">
                        Simpan
                    </button>
            </div>
        </div>
    </div>

</AuthenticatedLayout>
);
}
