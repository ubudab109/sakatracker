import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import { Head, Link, useForm } from '@inertiajs/react';
import React from "react";
import PrimaryButton from '@/Components/PrimaryButton';
import History from './Partials/History';
import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { FileUploader } from 'react-drag-drop-files';
import SecondaryButton from '@/Components/SecondaryButton';
import ModalViewer from "@/Components/ModalViewer";
import { ArrowLeft } from 'react-feather';

export default function Index(props) {
    console.log(props);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        status: '',
        note: '',
        approver_invoice: '',
        attachment: '',
        reject_user_id: '',
    });
    
    const submit = (e) => {
        e.preventDefault();

        post(route('admin.exchange-invoice.update', props.data.revision_id));
    };

    const [selectedOptionStatus, setSelectedOptionStatus] = useState();
    const [showOptionApproverInvoice, setShowOptionApproverInvoice] = useState(true);
    const [selectedOptionApprover, setSelectedOptionApprover] = useState(true);
    const [selectedOptionApproverVendor, setSelectedOptionApproverVendor] = useState();
    const handleStatusChange = (event) => {
        data.status = event.target.value;
        setSelectedOptionStatus(event.target.value);
        if(event.target.value == 'disetujui' && props.data.invoice.status == 'menunggu persetujuan') {
            setShowOptionApproverInvoice(false);
        } else {
            setShowOptionApproverInvoice(true);
        }

        if(event.target.value == 'ditolak')
        {
            setSelectedOptionApprover(false)
        } else {
            setSelectedOptionApprover(true)
        }
    }

    const handleApproverVendorChange = (event) => {
        data.reject_user_id = event.target.value;
        setSelectedOptionApproverVendor(event.target.value);
    }

    const [file, setFile] = useState();
    const handleChangeFile = (file) => {
        setFile(file);
        setData('attachment', file);
    };

    const [selectedApproverInvoice, setSelectedApproverInvoice] = useState();
    const handleApproverInvoiceChange = (event) => {
        data.approver_invoice = event.target.value;
        setSelectedApproverInvoice(event.target.value);
    }

    const fileTypes = ["PDF"];

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    // Create our number formatter.
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
    
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const tesMonth = new Intl.DateTimeFormat('en', { month: 'short' }).format(date.getMonth() + 1);
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${day}-${tesMonth}-${year}`;
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Detail Tukar Faktur" />

            <ModalViewer
                files={props.newdocs}
                show={isPopupOpen}
                onClose={closePopup}
            />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Tukar Faktur</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href={route('admin.exchange-invoice.index')}>Tukar Faktur</a></li>
                        <li className="breadcrumb-item active">Detail Tukar Faktur</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="flex items-center gap-2">
                    <a href={route('admin.exchange-invoice.index')}><ArrowLeft /></a>
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg w-full">
                        <div className="p-6 text-gray-900 font-bold">Detail Tukar Faktur</div>
                    </div>
                </div>
            </div>

            <div className="pt-3">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                        <div className='text-center mb-6'>
                            <h1 className='text-3xl font-bold'>REQUEST FOR PAYMENT</h1>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 font-semibold'>
                            {/* LEFT */}
                            <div>
                                <div className='grid grid-cols-2'>
                                    <p>Invoice Type</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].invoice_type : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Supplier Number</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].supp_code : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Supplier Name</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].supp_name : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Supplier NPWP</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].supp_npwp : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Supplier Site</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].supp_site : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Pay Group</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].pay_group : '' : ''}</p>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div>
                                <div className='grid grid-cols-2'>
                                    <p>Page</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>1 of 1</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Printed Date</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.printed_date}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>User Created</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].user_created : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>PO TYPE</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].po_type : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Invoice Due Date</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].invoice_due_date : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Invoice Currency</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].invoice_currency : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Invoice Total Amount</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? formatter.format(parseInt(props.data.outstanding_invoice.rfp_views[0].invoice_total_amount)).replace("€", "").trim() : '' : ''}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className='mb-3'></hr>
                        <div className='grid grid-cols-1 md:grid-cols-2 font-semibold'>
                            {/* LEFT */}
                            <div>
                                <div className='grid grid-cols-2'>
                                    <p>RFP Number</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Voucher Number</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].voucher_number : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Invoice Batch Name</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].invoice_batch_name : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Invoice Number</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].invoice_number : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Invoice Date</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].invoice_date : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>File Faktur Pajak</p>
                                    <div className='flex'>
                                    <p style={{width: '24px'}}>:</p>
                                        <div className='flex'>
                                            <p className='flex'>
                                            1 Berkas
                                            {props.data.invoice && (
                                                <a
                                                    href={props.data.invoice.tax_invoice}
                                                    target="_blank"
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
                                <div className='grid grid-cols-2'>
                                    <p>File Invoice</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <div className='flex'>
                                            <p className='flex'>
                                            1 Berkas
                                            {props.data.invoice && (
                                                <a
                                                    href={props.data.invoice.invoice}
                                                    target="_blank"
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
                                <div className='grid grid-cols-2'>
                                    <p>Lampiran Lainnya</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p className='flex'>
                                        {props.data.invoice.exchange_invoice_attachments != null ? props.data.invoice.exchange_invoice_attachments.length : 0} Berkas
                                        {props.data.invoice.exchange_invoice_attachments.length > 0 && (
                                            <a
                                                href="javascript:;"
                                                onClick={(e) =>
                                                    openPopup()
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
                                <div className='grid grid-cols-2'>
                                    <p>Description</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].invoice_description : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Activity Code</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p></p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Status</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].invoice_status : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Bank Name</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.invoice.vendor.bank_name}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Account Name</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.invoice.vendor.bank_account_name}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Bank Account Number</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.invoice.vendor.bank_account_number}</p>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div>
                                <div className='grid grid-cols-2'>
                                    <p>GL Date</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? formatDate(props.data.outstanding_invoice.rfp_views[0].gl_date) : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Invoice Receipt Date</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? formatDate(props.data.outstanding_invoice.rfp_views[0].invoice_receipt_date) : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Supplier Tax Invoice Num</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].supp_tax_invoice_num : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Due Date Determination Reason</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p></p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Rate Type</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].rate_type : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Rate Date</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? formatDate(props.data.outstanding_invoice.rfp_views[0].rate_date) : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Tax Name</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].supp_name : '' : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Tax NPWP</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? props.data.outstanding_invoice.rfp_views[0].tax_npwp : '' : ''}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-3'>
                            <table className="table table-xs text-center p-0">
                                <thead>
                                    <tr>
                                        <th className='border-2' rowSpan={2}>GL Date <br></br>Distribution</th>
                                        <th className='border-2' rowSpan={2}>Account</th>
                                        <th className='border-2' rowSpan={2}>Description</th>
                                        <th className='border-2' colSpan={2}>Entered Amount ({props.data.outstanding_invoice ? props.data.outstanding_invoice.invoice_currency_code : ''})</th>
                                        <th className='border-2' colSpan={2}>Accounted Amount (IDR)</th>
                                    </tr>
                                    <tr>
                                        <th className='border-2'>D</th>
                                        <th className='border-2'>C</th>
                                        <th className='border-2'>D</th>
                                        <th className='border-2'>C</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? 
                                        <tr>
                                            <td className='border-2'>{formatDate(props.data.outstanding_invoice.rfp_views[0].gl_date_dist)}</td>
                                            <td className='border-2 text-start'>{props.data.outstanding_invoice.rfp_views[0].tax_account}</td>
                                            <td className='border-2 text-start'>{props.data.outstanding_invoice.rfp_views[0].tax_code}</td>
                                            <td className='border-2'>{formatter.format(parseInt(props.data.outstanding_invoice.tax_amount)).replace("€", "").trim()}</td>
                                            <td className='border-2'></td>
                                            <td className='border-2'>{formatter.format(parseInt(props.data.outstanding_invoice.tax_amount)).replace("€", "").trim()}</td>
                                            <td className='border-2'></td>
                                        </tr>
                                    : '' : ''}
                                    {props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? 
                                        <>
                                            {props.data.outstanding_invoice.rfp_views.map((data, index) => (
                                                <tr>
                                                    <td className='border-2'>{formatDate(data.gl_date_dist)}</td>
                                                    <td className='border-2 text-start'>{data.account_dist}</td>
                                                    <td className='border-2 text-start'>{data.description_dist}</td>
                                                    <td className='border-2'>
                                                        {parseInt(data.amount_dist) > 0 ? formatter.format(parseInt(data.amount_dist)).replace("€", "").trim() : '' }
                                                    </td>
                                                    <td className='border-2'>
                                                        {parseInt(data.amount_dist) < 0 ? formatter.format(parseInt(data.amount_dist)).replace("€", "").trim() : '' }    
                                                    </td>
                                                    <td className='border-2'>
                                                        {parseInt(data.amount_dist) > 0 ? formatter.format(parseInt(data.amount_dist)).replace("€", "").trim() : '' }    
                                                    </td>
                                                    <td className='border-2'>
                                                        {parseInt(data.amount_dist) < 0 ? formatter.format(parseInt(data.amount_dist)).replace("€", "").trim() : '' }    
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    : '' : ''}
                                    {props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? 
                                        <tr>
                                            <td className='border-2'>{formatDate(props.data.outstanding_invoice.rfp_views[0].gl_date_dist)}</td>
                                            <td className='border-2 text-start'>{props.data.outstanding_invoice.rfp_views[0].ap_account}</td>
                                            <td className='border-2 text-start'>{props.data.outstanding_invoice.rfp_views[0].description_dist}</td>
                                            <td className='border-2'></td>
                                            <td className='border-2'>{formatter.format(parseInt(props.data.outstanding_invoice.total_amount)).replace("€", "").trim()}</td>
                                            <td className='border-2'></td>
                                            <td className='border-2'>{formatter.format(parseInt(props.data.outstanding_invoice.total_amount)).replace("€", "").trim()}</td>
                                        </tr>
                                    : '' : ''}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th className='border-2' colSpan={3}>TOTAL</th>
                                        <th className='border-2'>{formatter.format(parseInt(props.data.total_debit)).replace("€", "").trim()}</th>
                                        <th className='border-2'>{formatter.format(parseInt(props.data.total_credit)).replace("€", "").trim()}</th>
                                        <th className='border-2'>{formatter.format(parseInt(props.data.total_debit)).replace("€", "").trim()}</th>
                                        <th className='border-2'>{formatter.format(parseInt(props.data.total_credit)).replace("€", "").trim()}</th>
                                    </tr>
                                    <tr>
                                        <th className='border-2' colSpan={3}>Amount Remaining</th>
                                        <th className='border-2'>{formatter.format(parseInt(props.data.total_debit)).replace("€", "").trim()}</th>
                                        <th className='border-2'>{formatter.format(parseInt(props.data.total_credit)).replace("€", "").trim()}</th>
                                        <th className='border-2'>{formatter.format(parseInt(props.data.total_debit)).replace("€", "").trim()}</th>
                                        <th className='border-2'>{formatter.format(parseInt(props.data.total_credit)).replace("€", "").trim()}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className='mt-3'>
                            <table className="table table-xs text-center p-0">
                                <thead>
                                    <tr>
                                        <th className='border-2'>PO Num/IR <br></br>Number</th>
                                        <th className='border-2'>Receipt Num- <br></br>Line</th>
                                        <th className='border-2'>Item Code</th>
                                        <th className='border-2'>Billed <br></br> Quantity</th>
                                        <th className='border-2'>UOM</th>
                                        <th className='border-2'>Unit Price</th>
                                        <th className='border-2'>PO Account</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {props.data.outstanding_invoice ? props.data.outstanding_invoice.rfp_views.length > 0 ? 
                                    <>
                                        {props.data.outstanding_invoice.rfp_views.map((data, index) => (
                                            <>
                                                {data.po_number ?
                                                    <tr>
                                                        <td className='border-2'>{data.po_number}</td>
                                                        <td className='border-2'>{data.receipt_num_line}</td>
                                                        <td className='border-2'>{data.item_code}</td>
                                                        <td className='border-2'>{data.billed_qty}</td>
                                                        <td className='border-2'>{data.uom}</td>
                                                        <td className='border-2'>{data.unit_price}</td>
                                                        <td className='border-2'>{data.po_account}</td>
                                                    </tr>
                                                : ''}
                                            </>
                                        ))}
                                    </>
                                : '' : ''}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th className='border-2' colSpan={2}>Reference :</th>
                                        <th className='border-2' colSpan={3}>FUI Num :</th>
                                        <th className='border-2' colSpan={2}>Landed Cost :</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 font-semibold'>
                            {/* LEFT */}
                            <div>
                                <div className='grid grid-cols-2'>
                                    <p>Grand Total Amount Remaining IDR</p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? formatter.format(parseInt(props.data.outstanding_invoice.total_amount)).replace("€", "").trim() : ''}</p>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div>
                                <div className='grid grid-cols-2'>
                                    <p></p>
                                    <div className='flex'>
                                        <p style={{width: '24px'}}>:</p>
                                        <p>{props.data.outstanding_invoice ? formatter.format(parseInt(props.data.outstanding_invoice.total_amount)).replace("€", "").trim() : ''}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-3'>
                            <table className="table table-xs text-center p-0">
                                <thead>
                                    <tr>
                                        <th className='border-t-2 border-s-2 text-start' colSpan={2}>Paid From:</th>
                                        <th className='border-t-2 text-start' colSpan={3}>Lorem Ipsum</th>
                                        <th className='border-t-2 text-start' colSpan={2}>Received By:</th>
                                        <th className='border-t-2 border-e-2 text-start' colSpan={3}>Lorem Ipsum</th>
                                    </tr>
                                    <tr>
                                        <th className='border-b-2 border-s-2 text-start' colSpan={2}>Paid To:</th>
                                        <th className='border-b-2 text-start' colSpan={3}>Lorem Ipsum</th>
                                        <th className='border-b-2 text-start' colSpan={2}>Date:</th>
                                        <th className='border-b-2 border-e-2 text-start' colSpan={3}>29-AUG-23</th>
                                    </tr>
                                    <tr>
                                        <th className='border-2' colSpan={2}>Department <br></br> Requestor</th>
                                        <th className='border-2' colSpan={2}>Director</th>
                                        <th className='border-2' colSpan={2}>Tax</th>
                                        <th className='border-2' colSpan={2}>Accounting</th>
                                        <th className='border-2' colSpan={2}>Finance</th>
                                    </tr>
                                    <tr>
                                        <th className='border-2'>Issued By</th>
                                        <th className='border-2'>Approved By</th>
                                        <th className='border-2'>Approver By</th>
                                        <th className='border-2'>Checked By</th>
                                        <th className='border-2'>Approved By</th>
                                        <th className='border-2'>Coded By</th>
                                        <th className='border-2'>Checked By</th>
                                        <th className='border-2'>Approved By</th>
                                        <th className='border-2'>Passed for payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='border-2'></td>
                                        <td className='border-2'></td>
                                        <td className='border-2'></td>
                                        <td className='border-2'></td>
                                        <td className='border-2'></td>
                                        <td className='border-2'></td>
                                        <td className='border-2'></td>
                                        <td className='border-2'></td>
                                        <td className='border-2'></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {props.data.revision_id != null ? 
                            <form onSubmit={submit}>
                                <div className='grid grid-cols-1 md:grid-cols-2'>
                                    <div className='mb-3'>
                                        <div className='flex justify-around font-bold'>
                                            <div className='grid grid-cols-3 w-full'>
                                                <b>TINDAKAN</b>
                                                <p className='text-center'></p>
                                                <p></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div></div>
                                    <div className='mb-3'>
                                        <div className='flex justify-around font-bold'>
                                            <div className='grid grid-cols-1 w-full'>
                                                <InputLabel value="Status" className="font-bold" required={true}/>
                                                    <select className="select select-bordered w-full mt-1"
                                                        id="status"
                                                        name="status"
                                                        value={selectedOptionStatus}
                                                        onChange={handleStatusChange}
                                                    >
                                                        <option value="" hidden>Pilih Status</option>
                                                        <option value="disetujui">Setujui Dokumen</option>
                                                        <option value="ditolak">Tolak Dokumen</option>
                                                    </select>

                                                <InputError message={errors.status} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                    {props.data.approver_revision_done.length > 0 ?
                                        <div hidden={selectedOptionApprover}></div>
                                    : ''}
                                    {props.data.approver_revision_done.length > 0 ?
                                        <div className='mb-3' hidden={selectedOptionApprover}>
                                            <div className='flex justify-around font-bold'>
                                                <div className='grid grid-cols-1 w-full'>
                                                        <InputLabel value="Approver Invoice" className="font-bold" />
                                                        <select className="select select-bordered w-full mt-1"
                                                            id="reject_user_id"
                                                            name="reject_user_id"
                                                            value={selectedOptionApproverVendor}
                                                            onChange={handleApproverVendorChange}
                                                        >
                                                            <option value="" hidden>Pilih</option>
                                                            {props.data.approver_revision_done.map((item, index) => (
                                                                <option value={item.user_id}>{item.user.name}</option>
                                                            ))}
                                                        </select>

                                                        <InputError message={errors.status} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>
                                    : ''}
                                    <div></div>
                                    <div className='mb-3' hidden={showOptionApproverInvoice}>
                                        <div className='flex justify-around font-bold'>
                                            <div className='grid grid-cols-1 w-full'>
                                                <InputLabel value="Approver Invoice" className="font-bold" required={true}/>
                                                    <select className="select select-bordered w-full mt-1"
                                                        id="approver_invoice"
                                                        name="approver_invoice"
                                                        value={selectedApproverInvoice}
                                                        onChange={handleApproverInvoiceChange}
                                                    >
                                                        <option value="" hidden>Pilih</option>
                                                        {props.data.approver_invoices.map((item, index) => (
                                                            <option value={item.id}>{item.name}</option>
                                                        ))}
                                                    </select>

                                                <InputError message={errors.approver_invoice} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                    <div hidden={showOptionApproverInvoice}></div>
                                    <div className='mb-3'>
                                        <div className='flex justify-around font-bold'>
                                            <div className='grid grid-cols-1 w-full'>
                                                <InputLabel value="Catatan" className="font-bold"/>
                                                    <textarea 
                                                        name="note"
                                                        className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                                        placeholder="catatan *"
                                                        onChange={(e) => setData('note', e.target.value)}
                                                        value={data.note}
                                                    />

                                                <InputError message={errors.note} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                    <div></div>
                                    <div className='mb-3'>
                                        <div className='flex justify-around font-bold'>
                                            <div className='grid grid-cols-1 w-full'>
                                                <InputLabel value="Lampiran Lainnya" className="font-bold" required={true}/>
                                                <div className="w-full">
                                                    <FileUploader handleChange={handleChangeFile} name="attachment" types={fileTypes} multiple={true} />
                                                </div>
                                                <p>{file ? `Total File: ${file.length}` : "no files uploaded yet"}</p>

                                                <InputError message={errors.file} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                    <div></div>
                                    <div className='mb-3'>
                                        <div className='flex justify-center font-bold'>
                                            <div className='grid grid-cols-1 text-center items-center w-full'>
                                                <PrimaryButton className="w-full justify-center">
                                                    Kirim
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </form>
                        : '' }

                        <div className="flex justify-end items-end gap-2 mt-2">
                            <Link href={route('admin.exchange-invoice.index')}>
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
