import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import OutstandingTable from './Partials/OutstandingTable';
import OutstandingTable2 from './Partials/OutstandingTable2';
import InvoiceItemTable from './Partials/InvoiceItemTable';
import ShowBatchTable from './Partials/ShowBatchTable';
import ModifyButton from '@/Components/ModifyButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';
import { Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';

export default function Show(props) {

console.log(props);

const paidUrl = '/admin/siap-bayar/' + props.data.batch_payment.id + '/paid';
const [checkedInvoices, setCheckedInvoices] = useState([]);

const paidInvoice = () => {
    let data = {
        batch_payment: props.data.batch_payment,
        invoices: checkedInvoices,
    }

    // Make a POST request using Axios
    Axios.post('/admin/siap-bayar/paid', data)
      .then((response) => {
        console.log('Data sent to the API:', response);
        // You can handle the API response here
        refreshPage();
      })
      .catch((error) => {
        console.error('Error sending data to the API:', error);
      });
}

const refreshPage = () => {
    location.reload();
}

const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

return (

<AuthenticatedLayout user={props.auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
    Detail Batch Payment</h2>}
    >

    <Head title="Master User" />

    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
        <h4 className="mb-sm-0 font-size-18">Batch Payment</h4>
        <div className="page-title-right">
            <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">Batch Payment</li>
                <li className="breadcrumb-item active">Detail Batch Payment</li>
            </ol>
        </div>
    </div>

    <div className="pt-6">
        <div className="">
            <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                <div className="p-6 text-gray-900 font-bold">Detail Batch Payment</div>
            </div>
        </div>
    </div>

    <div class="bg-white overflow-hidden shadow-lg sm:rounded-lg mt-6 p-6">
        <div>
            <div class="grid grid-cols-1 md:grid-cols-2">
                <div class="mb-3">
                    <div class="flex justify-around font-bold">
                        <div class="grid grid-cols-3 w-full">
                            <p>Nomor Batch</p>
                            <p class="text-center">:</p>
                            <p>{props.data.batch_payment.no_batch}</p>
                        </div>
                    </div>
                </div>
                <div></div>
                <div class="mb-3">
                    <div class="flex justify-around font-bold">
                        <div class="grid grid-cols-3 w-full">
                            <p>Periode</p>
                            <p class="text-center">:</p>
                            <p>{props.data.batch_payment.periode}</p>
                        </div>
                    </div>
                </div>
                <div></div>
                <div class="mb-3">
                    <div class="flex justify-around font-bold">
                        <div class="grid grid-cols-3 w-full">
                            <p>Jatuh Tempo</p>
                            <p class="text-center">:</p>
                            <p>{props.data.batch_payment.jatuh_tempo}</p>
                        </div>
                    </div>
                </div>
                <div></div>
                <div class="mb-3">
                    <div class="flex justify-around font-bold">
                        <div class="grid grid-cols-3 w-full">
                            <p>Total</p>
                            <p class="text-center">:</p>
                            <p>Rp {props.data.batch_payment.total.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div></div>
                <div class="mb-3">
                    <div class="flex justify-around font-bold">
                        <div class="grid grid-cols-3 w-full">
                            <p>Status</p>
                            <p class="text-center">:</p>
                            <p>{props.data.batch_payment.status}</p>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>

            <div class="mt-3 text-end">
                {props.data.batch_payment.status == 'ready to paid' ? (
                    <button type="button" onClick={openModal} class="inline-flex items-center px-4 py-2 bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 undefined ">
                        Paid
                    </button>
                ) : ''};
            </div>

            <ShowBatchTable 
                data={props.data.batch_payment_invoices}
                checkedInvoices={checkedInvoices}
                setCheckedInvoices={setCheckedInvoices}
            />

            <div class="flex justify-end items-end gap-2 mt-2">
                <a href="/admin/siap-bayar">
                    <button type="button" class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 undefined ">
                        Back
                    </button>
                </a>
            </div>

            <Modal show={isModalOpen} onClose={closeModal}>
                <div className='border-b-2 p-3'>
                    <b>Apakah anda yakin mau melunasi payment ini?</b>
                </div>
                <div className="p-3">
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>Tutup</SecondaryButton>
                        <PrimaryButton onClick={paidInvoice}>Submit</PrimaryButton>
                    </div>
                </div>
            </Modal>

        </div>
    </div>



</AuthenticatedLayout>
);
}
