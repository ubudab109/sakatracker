import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import OutstandingTable from './Partials/OutstandingTable';
import OutstandingTable2 from './Partials/OutstandingTable2';
import InvoiceItemTable from './Partials/InvoiceItemTable';
import ShowBatchTable from './Partials/ShowBatchTable';
import ModifyButton from '@/Components/ModifyButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import { CheckCircle, CheckSquare, Edit, Eye, Info, X, XCircle } from 'react-feather';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import History from './Partials/History';
import axios from 'axios';
import HistoryPaymentGateway from './Partials/HistoryPaymentGateway';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

export default function Show(props) {

    const tableRef = useRef(null);
    const [invoices, setInvoices] = useState(props.data.batch_payment_invoices ?? []);

    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        note: props.data.batch_payment.note != 'null' ? props.data.batch_payment.note : '',
        invoices: invoices,
    });

    const editUrl = '/admin/batch-payment/' + props.data.batch_payment.id + '/edit';
    const submitProcess = async () => {
        const hasNullDocumentStatus = invoices.some((invoice) => invoice.document_status === null || !invoice.document_status);
        if (hasNullDocumentStatus) {
            alert('Please select all status of the invoices first');
        } else {
            const formData = new FormData();
            formData.append('invoices', JSON.stringify(invoices));
            await axios.post('/admin/batch-payment/' + props.data.batch_payment.id + '/process', formData).then(res => {
                location.reload();
            }).catch(err => {
                console.log(err);
            });
        }
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    // Create our number formatterCurrency.
    const formatterCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    const noteOnChange = (index, event) => {
        const cloneInvoices = [...invoices];
        cloneInvoices[index]['note'] = event.target.value;
        setInvoices(cloneInvoices);
    };

    const approveRejectInvoice = (index, type) => {
        const cloneInvoices = [...invoices];
        cloneInvoices[index]['document_status'] = type;
        cloneInvoices[index]['note'] = '';
        setInvoices(cloneInvoices);
    }
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
                <div className="mb-5">
                    <div className="mt-3">
                        <b>History</b>
                        <br />
                        <History data={props.data.timeline} batchPayment={props.data.batch_payment} />
                    </div>
                </div>
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
                </div> */}
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
                    </div>
                    <dic className="grid grid-cols-2 justify-center">
                        <div className='text-start'>
                            {props.data.user_role.role_id == props.data.batch_payment.role_id && props.data.batch_payment.status == 'on progress' && props.data.batch_payment.level > 1 ? (
                                <>
                                    <TextInput
                                        id="note"
                                        name="note"
                                        value={data.note}
                                        className="mt-1 block w-full"
                                        autoComplete="note"
                                        placeholder="note.."
                                        isFocused={true}
                                        onChange={(e) => setData('note', e.target.value)}
                                        required
                                    />

                                    <InputError
                                        message={errors.note}
                                        className="mt-2"
                                    />
                                </>
                            ) :
                                // <>
                                //     {props.data.batch_payment.status == 'draft' ? <p>Note: {props.data.batch_payment.note}</p> : ''}
                                // </>
                                ''
                            }
                        </div>
                        <div class="mt-3 text-end">
                            {props.data.user_role.role_id == props.data.batch_payment.role_id && props.data.batch_payment.status == 'draft' ? (
                                <a href={editUrl}>
                                    <button class="inline-flex items-center px-4 py-2 bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 undefined ">
                                        Edit
                                    </button>
                                </a>
                            ) : ''}

                            {props.data.user_role.role_id == props.data.batch_payment.role_id && props.data.batch_payment.status == 'ditolak' ? (
                                <a href={editUrl}>
                                    <button class="inline-flex items-center px-4 py-2 bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 undefined ">
                                        Revisi
                                    </button>
                                </a>
                            ) : ''}

                            {/* {props.data.user_role.role_id == props.data.batch_payment.role_id && props.data.batch_payment.status == 'on progress' && props.data.batch_payment.level > 1 ? (
                        <a href={rejectUrl}>
                            <button class="inline-flex items-center px-4 py-2 bg-red-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 undefined ">
                                Reject
                            </button>
                        </a>
                    ) : ''} */}

                            <button onClick={() => submitProcess()}>
                                <button class="inline-flex items-center px-4 py-2 bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 undefined ">
                                    Submit
                                </button>
                            </button>
                            {/* {props.data.user_role.role_id == props.data.batch_payment.role_id && props.data.batch_payment.status == 'on progress' ? (
                    ) : ''} */}

                        </div>
                    </dic>

                    {/* <ShowBatchTable data={props.data.batch_payment_invoices} batchId={props.data.batch_payment.id} /> */}

                    <div className="pt-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full overflow-x-auto">
                                <table ref={tableRef} className="w-full table">
                                    <thead>
                                        <tr>
                                            <th>Action</th>
                                            <th>ID Tukar Faktur</th>
                                            <th>Expired Date</th>
                                            <th>Inv. Date</th>
                                            <th>Total</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                            <th>Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoices.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className='flex gap-1'>
                                                        <a href={route('admin.exchange-invoice.show', { id: item.id, batchId: props.data.batch_payment.id })} className='text-gray-500'>
                                                            <Eye />
                                                        </a>
                                                    </div>
                                                </td>
                                                <td>{item.tax_invoice_number}</td>
                                                <td>{item.jatuh_tempo}</td>
                                                <td>{item.date}</td>
                                                <td>{formatterCurrency.format(parseInt(item.total)).replace("€", "").trim()}</td>
                                                <td>{item.is_po == 1 ? 'PO' : item.is_po == 0 ? 'Non PO' : 'MT'}</td>
                                                <td>{item.batch_invoice_status ?? 'Butuh Approval'}</td>
                                                <td className='border border-slate-600' width={1}>
                                                    <div className='flex gap-1'>
                                                        <>
                                                            <div style={{ cursor: 'pointer' }} onClick={() => approveRejectInvoice(index, 'disetujui')}>
                                                                <CheckCircle
                                                                    className={`rounded-full text-white bg-${!item.document_status ? "gray"
                                                                        : item.document_status ==
                                                                            'approve'
                                                                            ? "green"
                                                                            : "gray"
                                                                        }-500`}
                                                                />
                                                            </div>
                                                            <div style={{ cursor: 'pointer' }} onClick={() => approveRejectInvoice(index, 'ditolak')}>
                                                                <XCircle
                                                                    className={`rounded-full text-white bg-${!item.document_status
                                                                        ? "gray"
                                                                        : item.document_status ==
                                                                            'ditolak'
                                                                            ? "red"
                                                                            : "gray"
                                                                        }-500`}
                                                                />
                                                            </div>
                                                        </>
                                                    </div>
                                                </td>
                                                <td>
                                                    {
                                                        !item.document_status ? null : (
                                                            item.document_status === 'ditolak' ? (
                                                                <TextInput type="text" onChange={e => noteOnChange(index, e)} value={item.note} />
                                                            ) : item.notes ?? '-'
                                                        )
                                                    }
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>



                    <div className="">
                        <div className="mt-3">
                            <b>History Status API</b>
                            <br />
                            <HistoryPaymentGateway data={props.data.payment_gateway_histories} />
                        </div>
                    </div>

                    <div class="flex justify-end items-end gap-2 mt-2">
                        <a href="/admin/batch-payment">
                            <button type="button" class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 undefined ">
                                Back
                            </button>
                        </a>
                    </div>

                </div>
            </div>



        </AuthenticatedLayout>
    );
}
