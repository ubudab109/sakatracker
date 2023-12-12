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

export default function Index(props) {
    console.log(props);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
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
                        <div className='grid grid-cols-1 md:grid-cols-2'>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>Nomor Dokumen</p>
                                        <p className='text-center'>:</p>
                                        <p>{props.data.invoice.document_number}</p>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>Nomor Invoice</p>
                                        <p className='text-center'>:</p>
                                        <p>{props.data.invoice.invoice_number}</p>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>No Efaktur</p>
                                        <p className='text-center'>:</p>
                                        <p>{props.data.invoice.tax_invoice_number}</p>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>Lokasi</p>
                                        <p className='text-center'>:</p>
                                        <p>{props.data.invoice.location}</p>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>Mengggunakan Ematerai</p>
                                        <p className='text-center'>:</p>
                                        <p>{props.data.invoice.is_materai == 1 ? 'Iya' : 'Tidak'}</p>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>Type</p>
                                        <p className='text-center'>:</p>
                                        <p>{props.data.invoice.is_po == 1 ? 'PO' : 'Tanpa PO'}</p>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            {props.data.invoice.is_po == 1 ?
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>NO PO</p>
                                            <p className='text-center'>:</p>
                                            <p>{props.data.invoice.po_number}</p>
                                        </div>
                                    </div>
                                </div>
                                : ''}
                            {props.data.invoice.is_po == 1 ?
                                <div></div>
                                : ''}
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>Periode</p>
                                        <p className='text-center'>:</p>
                                        <p>{props.data.invoice.date}</p>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>Status Approval</p>
                                        <p className='text-center'>:</p>
                                        <p>{props.data.invoice.status_approval}</p>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>DPP</p>
                                        <p className='text-center'>:</p>
                                        <p>Rp. {props.data.invoice.dpp}</p>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>PPN</p>
                                        <p className='text-center'>:</p>
                                        <p>Rp. {props.data.invoice.ppn}</p>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>Total</p>
                                        <p className='text-center'>:</p>
                                        <p>Rp. {props.data.invoice.total}</p>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>Catatan</p>
                                        <p className='text-center'>:</p>
                                        <p>{props.data.invoice.note}</p>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>File Faktur Pajak</p>
                                        <p className='text-center'>:</p>
                                        <p className='flex'>
                                            {props.data.invoice.tax_invoice != null ? 1 : 0} Berkas
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
                            <div></div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>File Invoice</p>
                                        <p className='text-center'>:</p>
                                        <p className='flex'>
                                            {props.data.invoice.invoice != null ? 1 : 0} Berkas
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
                            <div></div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>File BAST</p>
                                        <p className='text-center'>:</p>
                                        <p className='flex'>
                                            {props.data.invoice.bast != null ? 1 : 0} Berkas
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
                            <div></div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>File Quotation</p>
                                        <p className='text-center'>:</p>
                                        <p className='flex'>
                                            {props.data.invoice.quotation != null ? 1 : 0} Berkas
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
                            <div></div>
                            {props.data.invoice.is_po == 1 ?
                                <div className='mb-3'>
                                    <div className='flex justify-around font-bold'>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p>File PO</p>
                                            <p className='text-center'>:</p>
                                            <p className='flex'>
                                                {props.data.invoice.po != null ? 1 : 0} Berkas
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
                                : ''}
                            {props.data.invoice.is_po == 1 ?
                                <div></div>
                                : ''}
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>Lampiran</p>
                                        <p className='text-center'>:</p>
                                        <p className='flex'>
                                            {props.data.invoice.exchange_invoice_attachments != null ? props.data.invoice.exchange_invoice_attachments.length : 0} Berkas
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
                            <div></div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>Timeline Status</p>
                                        <p className='text-center'>:</p>
                                        <p className='flex'>
                                            <div class="flex items-center">
                                                {
                                                    props.data.invoice.status !== 'ditolak' ? (
                                                        <>
                                                            {
                                                                props.data.invoice.status === 'menunggu persetujuan' ? (
                                                                    <span className="">Menunggu Persetujuan</span>
                                                                ) : (
                                                                    props.data.invoice.status === 'sedang berlangsung' ? (
                                                                        <>
                                                                            <span className="">Menunggu Persetujuan</span>
                                                                            <span className="mx-2">&#8594;</span>
                                                                            <span className="mx-2">Sedang Berlangsung</span>
                                                                        </>
                                                                    ) : (
                                                                        props.data.invoice.status === 'disetujui' ? (
                                                                            <>
                                                                                <span className="">Menunggu Persetujuan</span>
                                                                                <span className="mx-2">&#8594;</span>
                                                                                <span className="mx-2">Sedang Berlangsung</span>
                                                                                <span className="mx-2">&#8594;</span>
                                                                                <span className="mx-2">Disetujui</span>
                                                                            </>
                                                                        ) : (
                                                                            props.data.invoice.status === 'paid' ? (
                                                                                <>
                                                                                    <span className="">Menunggu Persetujuan</span>
                                                                                    <span className="mx-2">&#8594;</span>
                                                                                    <span className="mx-2">Sedang Berlangsung</span>
                                                                                    <span className="mx-2">&#8594;</span>
                                                                                    <span className="mx-2">Disetujui</span>
                                                                                    <span className="mx-2">&#8594;</span>
                                                                                    <span className="mx-2">Paid</span>
                                                                                </>
                                                                            ) : null
                                                                        )
                                                                    )
                                                                )
                                                            }
                                                        </>
                                                    ) : (
                                                        <span className="">Ditolak</span>
                                                    )
                                                }
                                            </div>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                        </div>

                        {props.data.invoice.purchase_orders.length > 0
                            ?
                            <div className='mt-3'>
                                <b>List GR</b>
                                <table className="table table-xs">
                                    <thead>
                                        <tr className="border-t bg-gray-100">
                                            {/* <th>Aksi</th> */}
                                            <th>No. Dokumen</th>
                                            <th>Invoice No</th>
                                            <th>Tanggal GR</th>
                                            <th>Qty</th>
                                            <th>Harga Satuan</th>
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
                                                <td>
                                                    invoice 123
                                                </td>
                                                <td>{data.date_gr}</td>
                                                <td>{data.quantity}</td>
                                                <td>{data.unit_price}</td>
                                                <td>{data.total_price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            : ''}
                        <div className='mt-3'>
                            <b>History</b>
                            <br />
                            <History data={props.data.timeline} />
                        </div>
                        <div className="flex justify-end items-end gap-2 mt-2">
                            {props.data.invoice.status == 'ditolak'
                                ?
                                <Link href={route('exchange-invoice.edit', props.data.invoice.id)}>
                                    <PrimaryButton>
                                        Revisi
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
