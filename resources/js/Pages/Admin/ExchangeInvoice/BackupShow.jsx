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

export default function Index(props) {
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
                        : '' }
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
                                    <div hidden={selectedOptionApprover}></div>
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
                        <div className='mt-3'>
                            <b>History</b>
                            <br />
                            <History data={props.data.timeline} />
                        </div>
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
