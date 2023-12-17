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
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import History from './Partials/History';
import HistoryPaymentGateway from './Partials/HistoryPaymentGateway';

export default function Show(props) {

console.log(props);

const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
    note: props.data.batch_payment.note != 'null' ? props.data.batch_payment.note : '',
});

const editUrl    = '/admin/batch-payment/' + props.data.batch_payment.id + '/edit';
const processUrl = '/admin/batch-payment/' + props.data.batch_payment.id + '/process';
const rejectUrl = '/admin/batch-payment/reject/' + props.data.batch_payment.id + '?note=' + data.note;

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
                            <p>Jatuh Tempo</p>
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
                                Ubah
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

                    {props.data.user_role.role_id == props.data.batch_payment.role_id && props.data.batch_payment.status == 'on progress' && props.data.batch_payment.level > 1 ? (
                        <a href={rejectUrl}>
                            <button class="inline-flex items-center px-4 py-2 bg-red-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 undefined ">
                                Reject
                            </button>
                        </a>
                    ) : ''}
                    
                    {props.data.user_role.role_id == props.data.batch_payment.role_id && props.data.batch_payment.status == 'on progress' ? (
                        <a href={processUrl}>
                            <button class="inline-flex items-center px-4 py-2 bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 undefined ">
                                Approve
                            </button>
                        </a>
                    ) : ''}
                    
                </div>
            </dic>

            <ShowBatchTable data={props.data.batch_payment_invoices}/>

            <div className="">
                <div className="mt-3">
                    <b>History</b>
                    <br />
                    <History data={props.data.timeline} batchPayment={props.data.batch_payment} />
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
