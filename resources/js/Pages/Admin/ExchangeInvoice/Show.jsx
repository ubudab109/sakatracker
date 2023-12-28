import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import { Head, Link, useForm } from '@inertiajs/react';
import React from "react";
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';
import History from './Partials/History';
import HistoryPayment from './Partials/HistoryPayment';
import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { FileUploader } from 'react-drag-drop-files';
import SecondaryButton from '@/Components/SecondaryButton';
import ModalViewer from "@/Components/ModalViewer";
import DangerButton from '@/Components/DangerButton';
import { useEffect } from 'react';
import { convertMb, userHasRoles } from "@/Utils/helper";
import GeneratedRfp from './Partials/GeneratedRfp';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import { CheckCircle, XCircle } from 'react-feather';

export default function Index(props) {
    console.log(props);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isRfpViewerOpen, setIsRfpViewerOpen] = useState(false);
    const [isRfpExistingOpen, setIsRfpExistingOpen] = useState(false);
    const [rfpFile, setRfpFile] = useState(props.rfp_docs.length < 1 ? [] : props.rfp_docs);
    const [isGeneratingRfp, setIsGeneratingRfp] = useState(false);
    const [errorRfp, setErrorRfp] = useState('');
    const [currentBatchId, setCurrentBatchId] = useState('');
    // const [urlRfpViewer]
    const pdfRref = useRef();
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        status: '',
        note: '',
        approver_invoice: '',
        attachment: '',
        reject_user_id: '',
        tax_invoice_note: props.data.invoice.tax_invoice_note == null ? 'Tukar Faktur terdapat kesalahan' : props.data.invoice.npwp_note,
        invoice_note: props.data.invoice.invoice_note == null ? 'Invoice terdapat kesalahan' : props.data.invoice.invoice_note,
        bast_note: props.data.invoice.bast_note == null ? 'BAST terdapat kesalahan' : props.data.invoice.bast_note,
        quotation_note: props.data.invoice.quotation_note == null ? 'Quotation terdapat kesalahan' : props.data.invoice.quotation_note,
        po_note: props.data.invoice.po_note == null ? 'PO terdapat kesalahan' : props.data.invoice.po_note,
        attachment_note: props.data.invoice.attachment_note == null ? 'Lampiran terdapat kesalahan' : props.data.invoice.attachment_note,

        file_tax_invoice_validate: props.data.invoice.tax_invoice_note == null ? 'Tukar Faktur terdapat kesalahan' : props.data.invoice.tax_invoice_note,
        file_invoice_validate: props.data.invoice.invoice_note == null ? 'Invoice terdapat kesalahan' : props.data.invoice.invoice_note,
        file_bast_validate: props.data.invoice.bast_note == null ? 'BAST terdapat kesalahan' : props.data.invoice.bast_note,
        file_quotation_validate: props.data.invoice.quotation_note == null ? 'Quotation terdapat kesalahan' : props.data.invoice.quotation_note,
        file_po_validate: props.data.invoice.po_note == null ? 'PO terdapat kesalahan' : props.data.invoice.po_note,
        file_attachment_validate: props.data.invoice.attachment_note == null ? 'Lampiran terdapat kesalahan' : props.data.invoice.attachment_note,
    });
    const [fileOpen, setFileOpen] = useState('');
    const submit = (e) => {
        e.preventDefault();

        post(route('admin.exchange-invoice.update', props.data.revision_id));
    };

    const [selectedOptionStatus, setSelectedOptionStatus] = useState();
    const [showOptionApproverInvoice, setShowOptionApproverInvoice] = useState(props.data.im_pic == false ? true : false);
    const [selectedOptionApprover, setSelectedOptionApprover] = useState(true);
    const [selectedOptionApproverVendor, setSelectedOptionApproverVendor] = useState();
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const handleStatusChange = (event) => {
        data.status = event;
        setSelectedOptionStatus(event.target.value);
        if (event == 'disetujui' && props.data.invoice.status == 'menunggu persetujuan') {
            setShowOptionApproverInvoice(false);
        } else {
            setShowOptionApproverInvoice(true);
        }

        if (event == 'ditolak') {
            setSelectedOptionApprover(false)
        } else {
            setSelectedOptionApprover(true)
        }
    }

    const handleApproverVendorChange = (event) => {
        data.reject_user_id = event.target.value;
        setSelectedOptionApproverVendor(event.target.value);
    }

    const generateRfp = async (invoiceId) => {
        setIsGeneratingRfp(true);
        await axios.post(`/generate-rfp/${invoiceId}`)
            .then(res => {
                console.log(res.data);
                // setRfpFile(res.data.rfp_docs);
                // setIsRfpViewerOpen(true);
                setIsGeneratingRfp(false);
                window.open(route('admin.exchange-invoice.show', props.data.invoice.id), "_self");
            }).catch(err => {
                setIsGeneratingRfp(false);
            });
    }

    const openExistingRfp = () => {
        setIsRfpExistingOpen(true);
    }

    const closeRfpPopup = () => {
        setIsRfpViewerOpen(false);
    }

    const closeRfpExisting = () => {
        setIsRfpExistingOpen(false);
    }

    const [selectedApproverInvoice, setSelectedApproverInvoice] = useState();
    const handleApproverInvoiceChange = (event) => {
        data.approver_invoice = event.target.value;
        setSelectedApproverInvoice(event.target.value);
    }

    const [filePDF, setFilePDF] = useState(null);

    const fileTypes = ["PDF"];

    const [indexFile, setIndexFile] = useState(0);

    const openPopup = (file) => {
        setIndexFile(file);
        setFileOpen(filePDF);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setFileOpen('');
        setIsPopupOpen(false);
    };

    const backPage = () => {
        window.history.back();
    };

    const [files, setFiles] = useState([]);
    const [objectFilesUrl, setObjectFilesUrl] = useState([]);
    const [limitedFiles, setLimitedFiles] = useState(0);
    const handleChangeFile = (fileUploaded) => {
        const uploaded = [...files];
        const objectUrl = [...objectFilesUrl];
        let currentSize = 0;
        fileUploaded.some((file) => {
            if (uploaded.findIndex(f => f.name === file.name) === -1) {
                uploaded.push(file);
                const objectFile = Object.assign(file);
                const url = URL.createObjectURL(objectFile);
                let sizeFile = convertMb(file.size);
                objectUrl.push({
                    url: url,
                    fileName: file.name,
                    fileSize: sizeFile
                });
                currentSize += sizeFile;
                setLimitedFiles(currentSize);
            }
        });
        setFiles(uploaded);
        setObjectFilesUrl(objectUrl);
        setData('attachment', uploaded);
    };

    const removeFiles = (fileName, fileSize) => {
        const fileUploaded = [...files];
        const objectUrl = [...objectFilesUrl];
        const indexFile = fileUploaded.findIndex(f => f.name === fileName);
        const indexObjectUrl = objectUrl.findIndex(o => o.fileName === fileName);
        fileUploaded.splice(indexFile, 1);
        objectUrl.splice(indexObjectUrl, 1);
        setFiles(fileUploaded);
        setObjectFilesUrl(objectUrl);
        setLimitedFiles(limitedFiles - fileSize);
        setData('attachment', fileUploaded);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const batchId = urlParams.get('batchId');
        if (batchId) {
            setCurrentBatchId(batchId);
        }
        return () => objectFilesUrl.map(url => URL.revokeObjectURL(url));
    })

    const handleFileEvent = (file) => {
        const choosenFiles = Array.prototype.slice.call(file);
        handleChangeFile(choosenFiles);
    }

    const initialState = {
        fileTaxInvoiceStatus: props.data.invoice.tax_invoice_note
            ? props.data.invoice.tax_invoice_note != "acc"
                ? false
                : true
            : null,
        fileInvoiceStatus: props.data.invoice.invoice_note
            ? props.data.invoice.invoice_note != "acc"
                ? false
                : true
            : null,
        fileBastStatus: props.data.invoice.bast_note
            ? props.data.invoice.bast_note != "acc"
                ? false
                : true
            : null,
        fileQuotationStatus: props.data.invoice.quotation_note
            ? props.data.invoice.quotation_note != "acc"
                ? false
                : true
            : null,
        filePoStatus: props.data.invoice.po_note
            ? props.data.invoice.po_note != "acc"
                ? false
                : true
            : null,
        fileAttachmentStatus: props.data.invoice.attachment_note
            ? props.data.invoice.attachment_note != "acc"
                ? false
                : true
            : null,
    };

    const [fileStatus, setFileStatus] = useState(initialState);
    const [taxInvoiceNote, setTaxInvoiceNote] = useState(props.data.invoice.tax_invoice_note == null ? 'Tukar Faktur terdapat kesalahan' : props.data.invoice.tax_invoice_note == 'done revisi' ? 'Tukar Faktur terdapat kesalahan' : props.data.invoice.tax_invoice_note);
    const [invoiceNote, setInvoiceNote] = useState(props.data.invoice.invoice_note == null ? 'Invoice terdapat kesalahan' : props.data.invoice.invoice_note == 'done revisi' ? 'Invoice terdapat kesalahan' : props.data.invoice.invoice_note);
    const [bastNote, setBastNote] = useState(props.data.invoice.bast_note == null ? 'BAST terdapat kesalahan' : props.data.invoice.bast_note == 'done revisi' ? 'BAST terdapat kesalahan' : props.data.invoice.bast_note);
    const [quotationNote, setQuotationNote] = useState(props.data.invoice.quotation_note == null ? 'Quotation terdapat kesalahan' : props.data.invoice.quotation_note == 'done revisi' ? 'Quotation terdapat kesalahan' : props.data.invoice.quotation_note);
    const [poNote, setPoNote] = useState(props.data.invoice.po_note == null ? 'PO terdapat kesalahan' : props.data.invoice.po_note == 'done revisi' ? 'PO terdapat kesalahan' : props.data.invoice.po_note);
    const [attachmentNote, setAttachmentNote] = useState(props.data.invoice.attachment_note == null ? 'Lampiran terdapat kesalahan' : props.data.invoice.attachment_note == 'done revisi' ? 'Lampiran terdapat kesalahan' : props.data.invoice.attachment_note);
    const [statusHideNote, setStatusHideNote] = useState(props.auth.user.user_role[0].role.name == 'Preparer' || props.auth.user.user_role[0].role.name == 'PIC TUKAR FAKTUR' ? props.data.invoice.status == 'menunggu persetujuan' || props.data.invoice.status == 'sedang berlangsung' ? props.data.revision_id != null ? false : true : true : true);
    const clickStatusFile = (name, stat) => {
        const setDataAndStatus = (fileName, statusKey) => {
            if (name === fileName && stat === 1) {
                setFileStatus((prevStatus) => ({
                    ...prevStatus,
                    [statusKey]: false,
                }));
                if (fileName == 'file_tax_invoice') {
                    setTaxInvoiceNote("Tukar Faktur Terdapat Kesalahan");
                    data[fileName] = "Tukar Faktur Terdapat Kesalahan";
                    data.tax_invoice_note = "Tukar Faktur Terdapat Kesalahan";
                }
                if (fileName == 'file_invoice') {
                    setInvoiceNote("Invoice Terdapat Kesalahan");
                    data[fileName] = "Invoice Terdapat Kesalahan";
                    data.invoice_note = "Invoice Terdapat Kesalahan";
                }
                if (fileName == 'file_bast') {
                    setBastNote("BAST Terdapat Kesalahan");
                    data[fileName] = "BAST Terdapat Kesalahan";
                    data.bast_note = "BAST Terdapat Kesalahan";
                }
                if (fileName == 'file_quotation') {
                    setQuotationNote("Quotation Terdapat Kesalahan");
                    data[fileName] = "Quotation Terdapat Kesalahan";
                    data.quotation_note = "Quotation Terdapat Kesalahan";
                }
                if (fileName == 'file_po') {
                    setPoNote("PO Terdapat Kesalahan");
                    data[fileName] = "PO Terdapat Kesalahan";
                    data.po_note = "PO Terdapat Kesalahan";
                }
                if (fileName == 'file_attachment') {
                    setAttachmentNote("Lampiran Terdapat Kesalahan");
                    data[fileName] = "Lampiran Terdapat Kesalahan";
                    data.attachment_note = "Lampiran Terdapat Kesalahan";
                }
            }
            if (name === fileName && stat === 0) {
                setFileStatus((prevStatus) => ({
                    ...prevStatus,
                    [statusKey]: true,
                }));
                data[fileName] = "acc";
            }
            if (statusKey == "validate" && `${name}_validate` === fileName) {
                if (stat === 0) {
                    data[fileName] = "acc";
                } else {
                    data[fileName] = "Terdapat Kesalahan";
                }
            }
        };

        setDataAndStatus("file_tax_invoice", "fileTaxInvoiceStatus");
        setDataAndStatus("file_invoice", "fileInvoiceStatus");
        setDataAndStatus("file_bast", "fileBastStatus");
        setDataAndStatus("file_quotation", "fileQuotationStatus");
        setDataAndStatus("file_po", "filePoStatus");
        setDataAndStatus("file_attachment", "fileAttachmentStatus");
        setDataAndStatus("file_tax_invoice_validate", "validate");
        setDataAndStatus("file_invoice_validate", "validate");
        setDataAndStatus("file_bast_validate", "validate");
        setDataAndStatus("file_quotation_validate", "validate");
        setDataAndStatus("file_po_validate", "validate");
        setDataAndStatus("file_attachment_validate", "validate");
        // Add more conditions as needed for other files
    };

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

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Detail Management Invoice" />

            <ModalViewer
                files={props.newdocs}
                indexFile={indexFile}
                show={isPopupOpen}
                onClose={closePopup}
            />

            <ModalViewer
                files={rfpFile}
                show={isRfpViewerOpen}
                onClose={closeRfpPopup}
            />

            <ModalViewer
                files={rfpFile}
                show={isRfpExistingOpen}
                onClose={closeRfpExisting}
            />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Management Invoice</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href={route('admin.exchange-invoice.index')}>Management Invoice</a></li>
                        <li className="breadcrumb-item active">Detail Management Invoice</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Detail Management Invoice</div>
                    </div>
                </div>
            </div>

            <div className="pt-3">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                        <div className='grid grid-cols-2'>
                            <div>
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>ID Tukar Faktur</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-32'>{props.data.invoice.tax_invoice_number}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Nomor Invoice</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-32'>{props.data.invoice.invoice_number}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>No Efaktur</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-32'>{props.data.invoice.document_number}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Jatuh Tempo</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-32'>{props.data.invoice.jatuh_tempo}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Nomor Rekening</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-32'>{props.data.invoice.bank_account_number}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Lokasi</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-32'>{props.data.invoice.location}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Menggunakan Ematerai</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-32'>{props.data.invoice.is_materai == 1 ? 'Iya' : 'Tidak'}</p>
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
                                            <p className='-ml-32'>{props.data.invoice.is_po == 1 ? 'PO' : 'Tanpa PO'}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                {props.data.invoice.is_po == 1 ?
                                    <div className='mb-3'>
                                        <div className='flex justify-around font-bold'>
                                            <div className='grid grid-cols-3 w-full'>
                                                <p>NO PO</p>
                                                <p className='text-center w-1'>:</p>
                                                <p className='-ml-32'>{props.data.invoice.po_number}</p>
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
                                            <p>Tanggal Invoice</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-32'>{props.data.invoice.date}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Status Approval</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-32'>{props.data.invoice.status_approval}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>DPP</p>
                                            <p className='text-center w-1'>:</p>
                                            {/* <p className='-ml-32'>Rp. {formatterCurrency.format(parseInt(props.data.invoice.dpp)).replace("€", "").trim()}</p> */}
                                            <p className='-ml-32'>-</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className={`grid grid-cols-3 w-full ${props.data.invoice.pdf_rfp ? props.data.invoice.ppn != props.data.total_tax ? 'text-red-500' : '' : ''}`}>
                                            <p>PPN</p>
                                            <p className='text-center w-1'>:</p>
                                            {/* <p className='-ml-32'>Rp. {formatterCurrency.format(parseInt(props.data.invoice.ppn)).replace("€", "").trim()}</p> */}
                                            <p className='-ml-32'>-</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Total</p>
                                            <p className='text-center w-1'>:</p>
                                            {/* <p className='-ml-32'>Rp. {formatterCurrency.format(parseInt(props.data.invoice.total)).replace("€", "").trim()}</p> */}
                                            <p className='-ml-32'>-</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>Note</p>
                                            <p className='text-center w-1'>:</p>
                                            <p className='-ml-32'>{props.data.invoice.note}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div></div> */}
                            </div>
                            {
                                userHasRoles(props.auth.user.user_role, 'PIC TUKAR FAKTUR') ? null : (
                                    <div className='mb-3'>
                                        <div className='flex justify-around font-bold'>
                                            <div className='grid grid-cols-3 w-full'>
                                                <p>RFP {
                                                    errorRfp !== '' ? (
                                                        <p style={{ color: 'red' }}>{errorRfp}</p>
                                                    ) : null
                                                }</p>
                                                <p className='text-center w-1'>:</p>

                                                <div className="flex justify-left font-bold -ml-32">
                                                    {
                                                        props.auth.user.user_role[0].role.name === 'Preparer' ? (
                                                            <button style={{ fontSize: '10px' }} disabled={isGeneratingRfp} onClick={() => generateRfp(props.data.invoice.id)} className="btn btn-success btn-sm mr-3 text-white">
                                                                {props.data.invoice.pdf_rfp !== null ? (isGeneratingRfp ? 'Generating...' : 'Re-Generate RFP') : (isGeneratingRfp ? 'Generating...' : 'Generate RFP')}
                                                            </button>
                                                        ) : (
                                                            null
                                                        )
                                                    }
                                                    {
                                                        rfpFile?.length > 0 ?
                                                            <button style={{ fontSize: '10px' }} onClick={() => openPopup(0)} className="btn btn-primary btn-sm text-white" disabled={isGeneratingRfp}>
                                                                View Generated RFP
                                                            </button>
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                userHasRoles(props.auth.user.user_role, 'PIC TUKAR FAKTUR') ? null : (
                                    <div></div>
                                )
                            }
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
                                                    openPopup(1)
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
                                            <a
                                                hidden={statusHideNote}
                                                className='mr-3 ml-3'
                                                href="javascript:;" onClick={(e) => clickStatusFile("file_invoice", 0)}>
                                                <CheckCircle
                                                    className={`rounded-full text-white bg-${fileStatus.fileInvoiceStatus ==
                                                        null
                                                        ? "gray"
                                                        : fileStatus.fileInvoiceStatus ==
                                                            true
                                                            ? "green"
                                                            : "gray"
                                                        }-500`}
                                                />
                                            </a>
                                            <a
                                                hidden={statusHideNote}
                                                href="javascript:;" onClick={(e) => clickStatusFile("file_invoice", 1)}>
                                                <XCircle
                                                    className={`rounded-full text-white bg-${fileStatus.fileInvoiceStatus ==
                                                        null
                                                        ? "gray"
                                                        : fileStatus.fileInvoiceStatus ==
                                                            false
                                                            ? "red"
                                                            : "gray"
                                                        }-500`}
                                                />
                                            </a>
                                            <InputError
                                                message={
                                                    errors.file_invoice_validate
                                                }
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div hidden={statusHideNote}>
                                    <div
                                        className="mb-3 w-full"
                                        hidden={
                                            fileStatus.fileInvoiceStatus !=
                                                null
                                                ? fileStatus.fileInvoiceStatus
                                                : true
                                        }
                                    >
                                        <InputLabel
                                            value="Note File Invoice"
                                            className="font-bold"
                                        />
                                        <textarea
                                            name="invoice_note"
                                            className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                            placeholder="Note file invoice *"
                                            onChange={(e) =>
                                                setData(
                                                    "invoice_note",
                                                    e.target.value
                                                )
                                            }
                                            value={data.invoice_note}
                                        />

                                        <InputError
                                            message={
                                                errors.invoice_note
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
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
                                                className=''
                                                onClick={(e) =>
                                                    openPopup(2)
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
                                            <a
                                                hidden={statusHideNote}
                                                className='mr-3 ml-3'
                                                href="javascript:;" onClick={(e) => clickStatusFile("file_tax_invoice", 0)}>
                                                <CheckCircle
                                                    className={`rounded-full text-white bg-${fileStatus.fileTaxInvoiceStatus ==
                                                        null
                                                        ? "gray"
                                                        : fileStatus.fileTaxInvoiceStatus ==
                                                            true
                                                            ? "green"
                                                            : "gray"
                                                        }-500`}
                                                />
                                            </a>
                                            <a
                                                hidden={statusHideNote}
                                                href="javascript:;" onClick={(e) => clickStatusFile("file_tax_invoice", 1)}>
                                                <XCircle
                                                    className={`rounded-full text-white bg-${fileStatus.fileTaxInvoiceStatus ==
                                                        null
                                                        ? "gray"
                                                        : fileStatus.fileTaxInvoiceStatus ==
                                                            false
                                                            ? "red"
                                                            : "gray"
                                                        }-500`}
                                                />
                                            </a>
                                            <InputError
                                                message={
                                                    errors.file_tax_invoice_validate
                                                }
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div hidden={statusHideNote}>
                                    <div
                                        className="mb-3 w-full"
                                        hidden={
                                            fileStatus.fileTaxInvoiceStatus !=
                                                null
                                                ? fileStatus.fileTaxInvoiceStatus
                                                : true
                                        }
                                    >
                                        <InputLabel
                                            value="Note File Faktur Pajak"
                                            className="font-bold"
                                        />
                                        <textarea
                                            name="tax_invoice_note"
                                            className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                            placeholder="Note file tax_invoice *"
                                            onChange={(e) =>
                                                setData(
                                                    "tax_invoice_note",
                                                    e.target.value
                                                )
                                            }
                                            value={data.tax_invoice_note}
                                        />

                                        <InputError
                                            message={
                                                errors.tax_invoice_note
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                {props.data.invoice.status == 'ditolak' ? props.data.invoice.tax_invoice_note != 'acc' ?
                                    <div>
                                        <InputLabel
                                            value="Note File Faktur Pajak"
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
                                                    openPopup(3)
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
                                            <a
                                                hidden={statusHideNote}
                                                className='mr-3 ml-3'
                                                href="javascript:;" onClick={(e) => clickStatusFile("file_quotation", 0)}>
                                                <CheckCircle
                                                    className={`rounded-full text-white bg-${fileStatus.fileQuotationStatus ==
                                                        null
                                                        ? "gray"
                                                        : fileStatus.fileQuotationStatus ==
                                                            true
                                                            ? "green"
                                                            : "gray"
                                                        }-500`}
                                                />
                                            </a>
                                            <a
                                                hidden={statusHideNote}
                                                href="javascript:;" onClick={(e) => clickStatusFile("file_quotation", 1)}>
                                                <XCircle
                                                    className={`rounded-full text-white bg-${fileStatus.fileQuotationStatus ==
                                                        null
                                                        ? "gray"
                                                        : fileStatus.fileQuotationStatus ==
                                                            false
                                                            ? "red"
                                                            : "gray"
                                                        }-500`}
                                                />
                                            </a>
                                            <InputError
                                                message={
                                                    errors.file_quotation_validate
                                                }
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div hidden={statusHideNote}>
                                    <div
                                        className="mb-3 w-full"
                                        hidden={
                                            fileStatus.fileQuotationStatus !=
                                                null
                                                ? fileStatus.fileQuotationStatus
                                                : true
                                        }
                                    >
                                        <InputLabel
                                            value="Note File Quotation"
                                            className="font-bold"
                                        />
                                        <textarea
                                            name="quotation_note"
                                            className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                            placeholder="Note file quotation *"
                                            onChange={(e) =>
                                                setData(
                                                    "quotation_note",
                                                    e.target.value
                                                )
                                            }
                                            value={data.quotation_note}
                                        />

                                        <InputError
                                            message={
                                                errors.quotation_note
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
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
                                                        openPopup(4)
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
                                                <a
                                                    hidden={statusHideNote}
                                                    className='mr-3 ml-3'
                                                    href="javascript:;" onClick={(e) => clickStatusFile("file_po", 0)}>
                                                    <CheckCircle
                                                        className={`rounded-full text-white bg-${fileStatus.filePoStatus ==
                                                            null
                                                            ? "gray"
                                                            : fileStatus.filePoStatus ==
                                                                true
                                                                ? "green"
                                                                : "gray"
                                                            }-500`}
                                                    />
                                                </a>
                                                <a
                                                    hidden={statusHideNote}
                                                    href="javascript:;" onClick={(e) => clickStatusFile("file_po", 1)}>
                                                    <XCircle
                                                        className={`rounded-full text-white bg-${fileStatus.filePoStatus ==
                                                            null
                                                            ? "gray"
                                                            : fileStatus.filePoStatus ==
                                                                false
                                                                ? "red"
                                                                : "gray"
                                                            }-500`}
                                                    />
                                                </a>
                                                <InputError
                                                    message={
                                                        errors.file_po_validate
                                                    }
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                : ''}
                            {props.data.invoice.is_po == 1 ?
                                <div>
                                    <div hidden={statusHideNote}>
                                        <div
                                            className="mb-3 w-full"
                                            hidden={
                                                fileStatus.filePoStatus !=
                                                    null
                                                    ? fileStatus.filePoStatus
                                                    : true
                                            }
                                        >
                                            <InputLabel
                                                value="Note File PO"
                                                className="font-bold"
                                            />
                                            <textarea
                                                name="po_note"
                                                className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                                placeholder="Note file po *"
                                                onChange={(e) =>
                                                    setData(
                                                        "po_note",
                                                        e.target.value
                                                    )
                                                }
                                                value={data.po_note}
                                            />

                                            <InputError
                                                message={
                                                    errors.po_note
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
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
                                : ''}
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
                                                    openPopup(5)
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
                                            <a
                                                hidden={statusHideNote}
                                                className='mr-3 ml-3'
                                                href="javascript:;" onClick={(e) => clickStatusFile("file_bast", 0)}>
                                                <CheckCircle
                                                    className={`rounded-full text-white bg-${fileStatus.fileBastStatus ==
                                                        null
                                                        ? "gray"
                                                        : fileStatus.fileBastStatus ==
                                                            true
                                                            ? "green"
                                                            : "gray"
                                                        }-500`}
                                                />
                                            </a>
                                            <a
                                                hidden={statusHideNote}
                                                href="javascript:;" onClick={(e) => clickStatusFile("file_bast", 1)}>
                                                <XCircle
                                                    className={`rounded-full text-white bg-${fileStatus.fileBastStatus ==
                                                        null
                                                        ? "gray"
                                                        : fileStatus.fileBastStatus ==
                                                            false
                                                            ? "red"
                                                            : "gray"
                                                        }-500`}
                                                />
                                            </a>
                                            <InputError
                                                message={
                                                    errors.file_bast_validate
                                                }
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div hidden={statusHideNote}>
                                    <div
                                        className="mb-3 w-full"
                                        hidden={
                                            fileStatus.fileBastStatus !=
                                                null
                                                ? fileStatus.fileBastStatus
                                                : true
                                        }
                                    >
                                        <InputLabel
                                            value="Note File BAST"
                                            className="font-bold"
                                        />
                                        <textarea
                                            name="bast_note"
                                            className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                            placeholder="Note file bast *"
                                            onChange={(e) =>
                                                setData(
                                                    "bast_note",
                                                    e.target.value
                                                )
                                            }
                                            value={data.bast_note}
                                        />

                                        <InputError
                                            message={
                                                errors.bast_note
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
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
                                        <p className={`text-sm text-${props.data.invoice.status == 'ditolak' ? props.data.invoice.attachment_note != 'acc' ? 'red' : 'gray' : 'gray'}-500`}>Attachment</p>
                                        <p className='text-center w-1'>:</p>
                                        <p className='flex -ml-36'>
                                            {props.data.invoice.exchange_invoice_attachments != null ? props.data.invoice.exchange_invoice_attachments.length : 0} File
                                            <>
                                                <a
                                                    href="javascript:;"
                                                    onClick={(e) =>
                                                        openPopup(6)
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
                                                <a
                                                    hidden={statusHideNote}
                                                    className='mr-3 ml-3'
                                                    href="javascript:;" onClick={(e) => clickStatusFile("file_attachment", 0)}>
                                                    <CheckCircle
                                                        className={`rounded-full text-white bg-${fileStatus.fileAttachmentStatus ==
                                                            null
                                                            ? "gray"
                                                            : fileStatus.fileAttachmentStatus ==
                                                                true
                                                                ? "green"
                                                                : "gray"
                                                            }-500`}
                                                    />
                                                </a>
                                                <a
                                                    hidden={statusHideNote}
                                                    href="javascript:;" onClick={(e) => clickStatusFile("file_attachment", 1)}>
                                                    <XCircle
                                                        className={`rounded-full text-white bg-${fileStatus.fileAttachmentStatus ==
                                                            null
                                                            ? "gray"
                                                            : fileStatus.fileAttachmentStatus ==
                                                                false
                                                                ? "red"
                                                                : "gray"
                                                            }-500`}
                                                    />
                                                </a>
                                                <InputError
                                                    message={
                                                        errors.file_attachment_validate
                                                    }
                                                />
                                            </>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div hidden={statusHideNote}>
                                    <div
                                        className="mb-3 w-full"
                                        hidden={
                                            fileStatus.fileAttachmentStatus !=
                                                null
                                                ? fileStatus.fileAttachmentStatus
                                                : true
                                        }
                                    >
                                        <InputLabel
                                            value="Note File Lampiran"
                                            className="font-bold"
                                        />
                                        <textarea
                                            name="attachment_note"
                                            className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                            placeholder="Note file attachment *"
                                            onChange={(e) =>
                                                setData(
                                                    "attachment_note",
                                                    e.target.value
                                                )
                                            }
                                            value={data.attachment_note}
                                        />

                                        <InputError
                                            message={
                                                errors.attachment_note
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                {props.data.invoice.status == 'ditolak' ? props.data.invoice.attachment_note != 'acc' ?
                                    <div>
                                        <InputLabel
                                            value="Note File Lampiran"
                                            className="font-bold"
                                        />
                                        <p className='mb-3 mt-0'>
                                            {props.data.invoice.attachment_note}
                                        </p>
                                    </div>
                                    : '' : ''}
                            </div>
                        </div>
                        <div id="pdf-content" ref={pdfRref} style={{ display: 'none' }}>
                            <GeneratedRfp newdocs={props.data.rfp.newdocs} data={props.data.rfp.data} auth={props.auth} />
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
                                                <td>
                                                    {data.invoice_number}
                                                </td>
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
                        {props.data.invoice.status == 'menunggu persetujuan' || props.data.invoice.status == 'sedang berlangsung' ?
                            <>
                                {props.data.revision_id != null ? (
                                    <>
                                        {props.data.outstanding_invoice ? (
                                            <form onSubmit={submit}>
                                                <div className="grid grid-cols-1 md:grid-cols-2">
                                                    <div className="mb-3">
                                                        <div className="flex justify-around font-bold">
                                                            <div className="grid grid-cols-3 w-full">
                                                                <b>Action</b>
                                                                <p className="text-center"></p>
                                                                <p></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        hidden={selectedOptionApprover}
                                                    ></div>
                                                    {props.data.approver_revision_done
                                                        .length > 0 ? (
                                                        <div
                                                            className="mb-3"
                                                            hidden={
                                                                selectedOptionApprover
                                                            }
                                                        >
                                                            <div className="flex justify-around font-bold">
                                                                <div className="grid grid-cols-1 w-full">
                                                                    <InputLabel
                                                                        value="Approver Invoice"
                                                                        className="font-bold"
                                                                    />
                                                                    <select
                                                                        className="select select-bordered w-full mt-1"
                                                                        id="reject_user_id"
                                                                        name="reject_user_id"
                                                                        value={
                                                                            selectedOptionApproverVendor
                                                                        }
                                                                        onChange={
                                                                            handleApproverVendorChange
                                                                        }
                                                                    >
                                                                        <option
                                                                            value=""
                                                                            hidden
                                                                        >
                                                                            Pilih
                                                                        </option>
                                                                        {props.data.approver_revision_done.map(
                                                                            (
                                                                                item,
                                                                                index
                                                                            ) => (
                                                                                <option
                                                                                    value={
                                                                                        item.user_id
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        item
                                                                                            .user
                                                                                            .name
                                                                                    }
                                                                                </option>
                                                                            )
                                                                        )}
                                                                    </select>

                                                                    <InputError
                                                                        message={
                                                                            errors.status
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    <div></div>
                                                    <div
                                                        className="mb-3"
                                                        hidden={
                                                            showOptionApproverInvoice
                                                        }
                                                    >
                                                        <div className="flex justify-around font-bold">
                                                            <div className="grid grid-cols-1 w-full">
                                                                <InputLabel
                                                                    value="Approver Invoice"
                                                                    className="font-bold"
                                                                    required={true}
                                                                />
                                                                <select
                                                                    className="select select-bordered w-full mt-1"
                                                                    id="approver_invoice"
                                                                    name="approver_invoice"
                                                                    value={
                                                                        selectedApproverInvoice
                                                                    }
                                                                    onChange={
                                                                        handleApproverInvoiceChange
                                                                    }
                                                                >
                                                                    <option
                                                                        value=""
                                                                        hidden
                                                                    >
                                                                        Pilih
                                                                    </option>
                                                                    {props.data.approver_invoices.map(
                                                                        (
                                                                            item,
                                                                            index
                                                                        ) => (
                                                                            <option
                                                                                value={
                                                                                    item.id
                                                                                }
                                                                            >
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>

                                                                <InputError
                                                                    message={
                                                                        errors.approver_invoice
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        hidden={
                                                            showOptionApproverInvoice
                                                        }
                                                    ></div>
                                                    <div className="mb-3">
                                                        <div className="flex justify-around font-bold">
                                                            <div className="grid grid-cols-1 w-full">
                                                                <InputLabel
                                                                    value="Note"
                                                                    className="font-bold"
                                                                />
                                                                <textarea
                                                                    name="note"
                                                                    className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                                                    placeholder="Note *"
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "note",
                                                                            e.target
                                                                                .value
                                                                        )
                                                                    }
                                                                    value={data.note}
                                                                />

                                                                <InputError
                                                                    message={
                                                                        errors.note
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div></div>
                                                    <div className="mb-3">
                                                        <InputLabel value="Attachment" className="font-bold" required={true} />
                                                        <div className="w-full">
                                                            <FileUploader handleChange={handleFileEvent} name="attachment" types={fileTypes} multiple={true} />
                                                        </div>
                                                        <div className="row">
                                                            <ul className="list-group p-2">
                                                                {objectFilesUrl.length > 0
                                                                    ? objectFilesUrl.map((url) => (
                                                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                                                            <a
                                                                                style={{ color: "blue" }}
                                                                                href={url.url}
                                                                                target="_blank"
                                                                                rel="no-referrer"
                                                                            >
                                                                                {url.fileName}
                                                                            </a>
                                                                            <span
                                                                                onClick={() =>
                                                                                    removeFiles(
                                                                                        url.fileName,
                                                                                        url.fileSize
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    cursor: "pointer",
                                                                                    background: "red",
                                                                                    color: "white",
                                                                                }}
                                                                                class="badge badge-danger badge-pill"
                                                                            >
                                                                                X
                                                                            </span>
                                                                        </li>
                                                                    ))
                                                                    : null}
                                                            </ul>
                                                        </div>
                                                        <p>{files ? `Total File: ${files?.length}` : "no files uploaded yet"}</p>
                                                        {
                                                            limitedFiles > 25 ? <InputError message="Maximum files is 25 MB" className="mt-2" /> : null
                                                        }
                                                        <p className='text-muted'>* Max 25mb</p>
                                                        <InputError message={errors.file} className="mt-2" />
                                                    </div>
                                                    <div></div>
                                                    <div className="mb-3">
                                                        <div className="flex justify-center font-bold">
                                                            <div className="grid grid-cols-2 text-center items-center w-full">
                                                                <DangerButton
                                                                    className="w-full items-center justify-center"
                                                                    hidden={
                                                                        submitSuccess
                                                                    }
                                                                    onClick={() =>
                                                                        handleStatusChange(
                                                                            "ditolak"
                                                                        )
                                                                    }
                                                                >
                                                                    Reject
                                                                </DangerButton>
                                                                <PrimaryButton
                                                                    className="w-full items-center justify-center"
                                                                    hidden={
                                                                        submitSuccess
                                                                    }
                                                                    onClick={() =>
                                                                        handleStatusChange(
                                                                            "disetujui"
                                                                        )
                                                                    }
                                                                >
                                                                    Approve
                                                                </PrimaryButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div></div>
                                                </div>
                                            </form>
                                        ) : (
                                            <>
                                                <div className="mb-3">
                                                    <div className="flex justify-around font-bold">
                                                        <div className="grid grid-cols-3 w-full">
                                                            <b>TINDAKAN</b>
                                                            <p className="text-center"></p>
                                                            <p></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <b className="text-red-500">
                                                    Data tidak ditemukan di oracle
                                                </b>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    ""
                                )}
                            </>
                            : ''
                        }

                        {props.data.outstanding_invoice ? (
                            <div className="mt-3">
                                <b>History</b>
                                <br />
                                <History data={props.data.timeline} />
                            </div>
                        ) : (
                            ""
                        )}

                        {props.data.timeline_payment != '' ? (
                            <div className="mt-3">
                                <b>History Payment</b>
                                <br />
                                <HistoryPayment data={props.data.timeline_payment} />
                            </div>
                        ) : (
                            ""
                        )}
                        <div className="flex justify-end items-end gap-2 mt-2">
                            {
                                currentBatchId ? (
                                    <SecondaryButton onClick={() => backPage()}>
                                        Back
                                    </SecondaryButton>
                                ) : (

                                    <SecondaryButton onClick={() => backPage()}>
                                        Back
                                    </SecondaryButton>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
