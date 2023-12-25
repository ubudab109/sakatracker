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
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { formatDateToDDMMYYYY, isSimilarDate } from '@/Utils/helper';

export default function Show(props) {

    console.log(props);

    const paidUrl = '/admin/siap-bayar/' + props.data.batch_payment.id + '/paid';
    const [checkedInvoices, setCheckedInvoices] = useState([]);
    const [paymentDate, setPaymentDate] = useState('');
    const [errorPayment, setErrorPayment] = useState('');

    const paidInvoice = () => {
        let data = {
            batch_payment: props.data.batch_payment,
            invoices: checkedInvoices,
            payment_date: paymentDate,
        }
        if (paymentDate === '') {
            setErrorPayment('Payment date is required');
        } else {
            // Make a POST request using Axios
            Axios.post('/admin/siap-bayar/paid', data)
                .then((response) => {
                    // You can handle the API response here
                    refreshPage();
                })
                .catch((error) => {
                    console.error('Error sending data to the API:', error);
                });
        }
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

    useEffect(() => {
        const date = props.data.batch_payment.jatuh_tempo;
        if (date === null) {
            setPaymentDate(formatDateToDDMMYYYY(new Date()));
        } else if (new Date(date) < new Date()) {
            setPaymentDate(formatDateToDDMMYYYY(new Date()));
        } else if (new Date(date) > new Date()) {
            setPaymentDate(formatDateToDDMMYYYY(new Date(date)));
        } else {
            setPaymentDate(formatDateToDDMMYYYY(new Date()));
        }
    }, [])

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
                                    <p>Batch Number</p>
                                    <p class="text-center">:</p>
                                    <p>{props.data.batch_payment.no_batch}</p>
                                </div>
                            </div>
                        </div>
                        {/* <div></div>
                <div class="mb-3">
                    <div class="flex justify-around font-bold">
                        <div class="grid grid-cols-3 w-full">
                            <p>Periode</p>
                            <p class="text-center">:</p>
                            <p>{props.data.batch_payment.periode}</p>
                        </div>
                    </div>
                </div> */}
                        <div></div>
                        <div class="mb-3">
                            <div class="flex justify-around font-bold">
                                <div class="grid grid-cols-3 w-full">
                                    <p>Expired Date</p>
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
                                    <p>
                                        {

                                            props.data.batch_payment.payment_date ? (

                                                (props.data.batch_payment.payment_date && isSimilarDate(props.data.batch_payment.payment_date) ? 'Paid' :
                                                    (props.data.batch_payment.payment_date && !isSimilarDate(props.data.batch_payment.payment_date) ? 'On Progress' : 'Paid')
                                                )
                                            ) : props.data.batch_payment.status
                                        }

                                    </p>
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>

                    <div class="mt-3 text-end">
                        {props.data.batch_payment.status == 'ready to paid' || props.data.batch_payment.status == 'Partial Payment' || props.data.batch_payment.status == 'partial payment' ? (
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
                            <b>Are you sure you want to pay this payment?</b>
                        </div>
                        <div className="border-b-2 p-3">
                            <div>
                                <InputLabel value="Tanggal Pembayaran" className="font-bold" required={false} />
                                <input
                                    type="date"
                                    name="date"
                                    className="border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm mt-1 block w-full"
                                    value={paymentDate}
                                    onChange={(e) => setPaymentDate(e.target.value)}
                                />
                                <InputError message={errorPayment} className="mt-2" />
                            </div>
                        </div>
                        <div className="p-3">
                            <div className="mt-6 flex justify-end gap-3">
                                <SecondaryButton onClick={closeModal}>Close</SecondaryButton>
                                <PrimaryButton onClick={paidInvoice}>Submit</PrimaryButton>
                            </div>
                        </div>
                    </Modal>

                </div>
            </div>



        </AuthenticatedLayout>
    );
}
