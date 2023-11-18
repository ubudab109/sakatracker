import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import { Head, Link } from '@inertiajs/react';
import React from "react";
import PrimaryButton from '@/Components/PrimaryButton';
import History from './Partials/History';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Index(props) {
    console.log(props);
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
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Detail Tukar Faktur" />

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
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
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
                                        <p>Invoice 123</p>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div className='mb-3'>
                                <div className='flex justify-around font-bold'>
                                    <div className='grid grid-cols-3 w-full'>
                                        <p>Kategori</p>
                                        <p className='text-center'>:</p>
                                        <p>{props.data.invoice.category}</p>
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
                                        <p>Lampiran</p>
                                        <p className='text-center'>:</p>
                                        <p>{props.data.invoice.exchange_invoice_attachments != null ? props.data.invoice.exchange_invoice_attachments.length : 0} Berkas</p>
                                    </div>
                                </div>
                            </div>
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
