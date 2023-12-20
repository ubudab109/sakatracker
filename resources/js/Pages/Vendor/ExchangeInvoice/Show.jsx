import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import { Head, Link } from '@inertiajs/react';
import React from "react";
import PrimaryButton from '@/Components/PrimaryButton';
import History from './Partials/History';
import SecondaryButton from '@/Components/SecondaryButton';
import { ArrowLeft } from 'react-feather';
import ModalViewer from "@/Components/ModalViewer";
import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';

export default function Index(props) {
    console.log(props);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${day}-${month}-${year}`;
    }

    const [pdfUrl, setPdfUrl] = useState('');

    const [file, setFile] = useState();
    const handleChangeFile = (file) => {
        setFile(file);
        setData('attachment', file);
    };

    const openPopup = (item) => {
        setPdfUrl(item);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setPdfUrl('');
        setIsPopupOpen(false);
    };

    const formatterCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Detail Tukar Faktur" />

            <ModalViewer
                files={pdfUrl}
                show={isPopupOpen}
                onClose={closePopup}
            />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Tukar Faktur</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href={route('exchange-invoice.index')}>Tukar Faktur</a></li>
                        <li className="breadcrumb-item active">Detail Tukar Faktur</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="flex items-center gap-2">
                    <a href={route('exchange-invoice.index')}><ArrowLeft /></a>
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg w-full">
                        <div className="p-6 text-gray-900 font-bold">Detail Tukar Faktur</div>
                    </div>
                </div>
            </div>

            <div className="pt-3">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                    <div className='mb-3'>
                        <div className='font-bold'>
                            <p className='mb-3'>Status Timeline</p>
                            <div className="flex items-center whitespace-nowrap gap-3 overflow-auto">
                                <div className=''>
                                    <div className={`font-bold ${props.data.timelineLevel >= 1 ? 'text-white bg-green-500' : props.data.timelineLevel == 0 ? 'text-white bg-red-500' : 'text-gray-700 bg-white'} rounded-full border-2 flex items-center justify-center font-mono`} style={{height: 32, width: 32, fontSize: 12}}>
                                        1
                                    </div>
                                    <div className={`${props.data.timelineLevel >= 1 ? 'text-green-500' : props.data.timelineLevel == 0 ? 'text-red-500' : ''}`}>
                                        Submit ------------{`>`}
                                    </div>
                                </div>
                                <div className=''>
                                    <div className={`font-bold ${props.data.timelineLevel >= 2 ? 'text-white bg-green-500' : 'text-gray-700 bg-white'} rounded-full border-2 flex items-center justify-center font-mono`} style={{height: 32, width: 32, fontSize: 12}}>
                                        2
                                    </div>
                                    <div className={`${props.data.timelineLevel >= 2 ? 'text-green-500' : ''}`}>
                                        Validation Process ------------{`>`}
                                    </div>
                                </div>
                                <div className=''>
                                    <div className={`font-bold ${props.data.timelineLevel >= 3 ? 'text-white bg-green-500' : 'text-gray-700 bg-white'} rounded-full border-2 flex items-center justify-center font-mono`} style={{height: 32, width: 32, fontSize: 12}}>
                                        3
                                    </div>
                                    <div className={`${props.data.timelineLevel >= 3 ? 'text-green-500' : ''}`}>
                                        Payment Process ------------{`>`}
                                    </div>
                                </div>
                                <div className=''>
                                    <div className={`font-bold ${props.data.timelineLevel >= 4 ? 'text-white bg-green-500' : 'text-gray-700 bg-white'} rounded-full border-2 flex items-center justify-center font-mono`} style={{height: 32, width: 32, fontSize: 12}}>
                                        4
                                    </div>
                                    <div className={`${props.data.timelineLevel >= 4 ? 'text-green-500' : ''}`}>
                                        Ready To Paid ------------{`>`}
                                    </div>
                                </div>
                                <div className=''>
                                    <div className={`font-bold ${props.data.timelineLevel >= 5 ? 'text-white bg-green-500' : 'text-gray-700 bg-white'} rounded-full border-2 flex items-center justify-center font-mono`} style={{height: 32, width: 32, fontSize: 12}}>
                                        5
                                    </div>
                                    <div className={`${props.data.timelineLevel >= 5 ? 'text-green-500' : ''}`}>
                                        Paid
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2'>
                            <div>
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>ID Tukar Faktur</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-36'>{props.data.invoice.tax_invoice_number}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Invoice Number</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-36'>{props.data.invoice.invoice_number}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>No Efaktur</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-36'>{props.data.invoice.document_number}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Expired Date</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-36'>{props.data.invoice.jatuh_tempo}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Rekening Number</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-36'>{props.data.invoice.bank_account_number}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Location</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-36'>{props.data.invoice.location}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Using Ematerai</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-36'>{props.data.invoice.is_materai == 1 ? 'Iya' : 'Tidak'}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                            </div>
                            <div>

                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Type</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-36'>{props.data.invoice.is_po == 1 ? 'PO' : 'Tanpa PO'}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                {props.data.invoice.is_po == 1 ?
                                    <div className='mb-3'>
                                        <div className='flex justify-around font-bold'>
                                            <div className='grid grid-cols-3 w-full'>
                                                <p>PO Number</p>
                                                <p className='text-center w-1'>:</p>
                                                <p className='-ml-36'>{props.data.invoice.po_number}</p>
                                            </div>
                                        </div>
                                    </div>
                                : ''}
                                {/* {props.data.invoice.is_po == 1 ?
                                <div></div>
                                : ''} */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Invoice Date</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-36'>{props.data.invoice.date}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Status Approval</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-36'>{props.data.invoice.status}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>DPP</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-36'>{formatterCurrency.format(parseInt(props.data.invoice.dpp)).replace("€", "").trim()}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>PPN</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-36'>{formatterCurrency.format(parseInt(props.data.invoice.ppn)).replace("€", "").trim()}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Total</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-36'>{formatterCurrency.format(parseInt(props.data.invoice.total)).replace("€", "").trim()}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Note</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-36'>{props.data.invoice.note}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                
                                {/* <div></div> */}
                            </div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p className={`text-sm text-${props.data.invoice.status == 'ditolak' ? props.data.invoice.invoice_note != 'acc' ? 'red' : 'gray' : 'gray'}-500`}>File Invoice</p>
                                        <p className='text-center w-1'>:</p>
                                        <p className='flex -ml-36'>
                                            {props.data.invoice.invoice != null ? 1 : 0} File
                                            <a
                                                href="javascript:;"
                                                onClick={(e) =>
                                                    openPopup(props.data.invoice.invoice)
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6 ml-2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                    />
                                                </svg>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {props.data.invoice.status == 'ditolak' ? props.data.invoice.invoice_note != 'acc' ? 
                                    <div>
                                        <InputLabel
                                            value="Note File Invoice"
                                            className="font-bold"
                                        />
                                        <p className='mb-3 mt-0'>
                                            {props.data.invoice.invoice_note}
                                        </p>
                                    </div>
                                : '' : ''}
                            </div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p className={`text-sm text-${props.data.invoice.status == 'ditolak' ? props.data.invoice.tax_invoice_note != 'acc' ? 'red' : 'gray' : 'gray'}-500`}>File Faktur Pajak</p>
                                        <p className='text-center w-1'>:</p>
                                        <p className='flex -ml-36'>
                                            {props.data.invoice.tax_invoice != null ? 1 : 0} File
                                            <a
                                                href="javascript:;"
                                                onClick={(e) =>
                                                    openPopup(props.data.invoice.tax_invoice)
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6 ml-2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                    />
                                                </svg>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                            {props.data.invoice.status == 'ditolak' ? props.data.invoice.tax_invoice_note != 'acc' ? 
                                <div>
                                    <InputLabel
                                        value="Note File Tukar Faktur"
                                        className="font-bold"
                                    />
                                    <p className='mb-3 mt-0'>
                                        {props.data.invoice.tax_invoice_note}
                                    </p>
                                </div>
                            : '' : ''}
                            </div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p className={`text-sm text-${props.data.invoice.status == 'ditolak' ? props.data.invoice.quotation_note != 'acc' ? 'red' : 'gray' : 'gray'}-500`}>File Quotation</p>
                                        <p className='text-center w-1'>:</p>
                                        <p className='flex -ml-36'>
                                            {props.data.invoice.quotation != null ? 1 : 0} File
                                            <a
                                                href="javascript:;"
                                                onClick={(e) =>
                                                    openPopup(props.data.invoice.quotation)
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6 ml-2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                    />
                                                </svg>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {props.data.invoice.status == 'ditolak' ? props.data.invoice.quotation_note != 'acc' ? 
                                    <div>
                                        <InputLabel
                                            value="Note File Quotation"
                                            className="font-bold"
                                        />
                                        <p className='mb-3 mt-0'>
                                            {props.data.invoice.quotation_note}
                                        </p>
                                    </div>
                                : '' : ''}
                            </div>
                            {props.data.invoice.is_po == 1 ?
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p className={`text-sm text-${props.data.invoice.status == 'ditolak' ? props.data.invoice.po_note != 'acc' ? 'red' : 'gray' : 'gray'}-500`}>File PO</p>
                                        <p className='text-center w-1'>:</p>
                                        <p className='flex -ml-36'>
                                            {props.data.invoice.po != null ? 1 : 0} File
                                            <a
                                                href="javascript:;"
                                                onClick={(e) =>
                                                    openPopup(props.data.invoice.po)
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6 ml-2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                    />
                                                </svg>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            : '' }
                            {props.data.invoice.is_po == 1 ?
                            <div>
                                {props.data.invoice.status == 'ditolak' ? props.data.invoice.po_note != 'acc' ? 
                                    <div>
                                        <InputLabel
                                            value="Note File PO"
                                            className="font-bold"
                                        />
                                        <p className='mb-3 mt-0'>
                                            {props.data.invoice.po_note}
                                        </p>
                                    </div>
                                : '' : ''}
                            </div>
                            : '' }
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p className={`text-sm text-${props.data.invoice.status == 'ditolak' ? props.data.invoice.bast_note != 'acc' ? 'red' : 'gray' : 'gray'}-500`}>File BAST</p>
                                        <p className='text-center w-1'>:</p>
                                        <p className='flex -ml-36'>
                                            {props.data.invoice.bast != null ? 1 : 0} File
                                            <a
                                                href="javascript:;"
                                                onClick={(e) =>
                                                    openPopup(props.data.invoice.bast)
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6 ml-2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                    />
                                                </svg>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {props.data.invoice.status == 'ditolak' ? props.data.invoice.bast_note != 'acc' ? 
                                    <div>
                                        <InputLabel
                                            value="Note File BAST"
                                            className="font-bold"
                                        />
                                        <p className='mb-3 mt-0'>
                                            {props.data.invoice.bast_note}
                                        </p>
                                    </div>
                                : '' : ''}
                            </div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p className={`text-sm text-${props.data.invoice.status == 'ditolak' ? props.data.invoice.attachment_note != 'acc' ? 'red' : 'gray' : 'gray'}-500`}>Lampiran</p>
                                        <p className='text-center w-1'>:</p>
                                        <p className='flex -ml-36'>
                                            {props.data.invoice.exchange_invoice_attachments != null ? props.data.invoice.exchange_invoice_attachments.length : 0} File
                                            {props.data.invoice.exchange_invoice_attachments.length > 0 && (
                                            <a
                                                href="javascript:;"
                                                onClick={(e) =>
                                                    openPopup(props.data.invoice.exchange_invoice_attachments)
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6 ml-2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                    />
                                                </svg>
                                            </a>)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* <div>
                            </div> */}
                        </div>
                        {props.data.invoice.purchase_orders.length > 0 
                        ? 
                            <div className='mt-3'>
                                <b>List GR</b>
                                <table className="table table-xs">
                                    <thead>
                                        <tr className="border-t bg-gray-100">
                                            {/* <th>Aksi</th> */}
                                            <th>GR Number</th>
                                            <th>Name of goods</th>
                                            <th>Invoice Number</th>
                                            <th>GR Date</th>
                                            <th>Qty</th>
                                            <th>Unit Price</th>
                                            <th>Total</th>
                                        </tr>
                                        <tr></tr>
                                    </thead>
                                    <tbody>
                                        {props.data.invoice.purchase_orders.map((data, index) => (
                                            <tr className="border-collapse border-1 border-gray-500">        
                                                {/* <td>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="data_gr[]"
                                                            className="form-checkbox"
                                                            checked={selectedItemsGR.includes(data)}
                                                            onChange={() => handleCheckboxChange(data)}
                                                        />
                                                    </label>
                                                </td> */}
                                                <td>{data.document_number}</td>
                                                <td>{data.item_description}</td>
                                                <td>{data.invoice_number}</td>
                                                <td>{data.date_gr}</td>
                                                <td>{data.quantity}</td>
                                                <td>{formatterCurrency.format(parseInt(data.unit_price)).replace("€", "").trim()}</td>
                                                <td>{formatterCurrency.format(parseInt(data.total_price)).replace("€", "").trim()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        : ''}
                        {/* <div className='mt-3'>
                            <b>History</b>
                            <br />
                            <History data={props.data.timeline} />
                        </div> */}
                        <div className="flex justify-end items-end gap-2 mt-2">
                            {props.data.invoice.status == 'ditolak' || props.data.invoice.status == 'tukar faktur tidak valid'
                            ? 
                                <Link href={route('exchange-invoice.edit', props.data.invoice.id)}>
                                    <PrimaryButton>
                                        Revision
                                    </PrimaryButton>
                                </Link>
                            : ''}
                            <Link href={route('exchange-invoice.index')}>
                                <SecondaryButton>
                                    Back
                                </SecondaryButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
