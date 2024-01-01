import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import { Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import $ from 'jquery';
import 'datatables.net';
import { CheckCircle, CheckSquare, Edit, Eye, Info, X, XCircle } from 'react-feather';
import axios from 'axios';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';



export default function ShowBatchTable(props) {
    // console.log(props);

    const tableRef = useRef(null);
    const [invoices, setInvoices] = useState(props.data ?? []);
    const [currentIdInvoice, setCurrentIdInvoice] = useState('');
    const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);
    const [isModalApproveOpen, setIsModalApproveOpen] = useState(false);
    const [notes, setNotes] = useState('');
    const [errorNotes, setErrorNotes] = useState('');
    const updateInvoiceBatchPayment = async (status) => {
        if (status === 'ditolak' && notes === '') {
            setErrorNotes('Notes is required');
            return;
        }
        let form = {
            status: status,
            notes: notes,
        };
        axios.put(`/admin/batch-payment-invoice/${currentIdInvoice}`, form).then(() => {
            setCurrentIdInvoice('');
            setIsModalRejectOpen(false);
            setIsModalApproveOpen(false);
            setNotes('');
            location.reload();
        }).catch(() => {
            alert('Error when updateing invoices');
        })
    }
    const closeModal = () => {
        setCurrentIdInvoice('');
        setIsModalRejectOpen(false);
        setIsModalApproveOpen(false);
    }

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

    useEffect(() => {

    }, []);

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

    return (
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
                                            <a href={route('admin.exchange-invoice.show', { id: item.id, batchId: props.batchId })} className='text-gray-500'>
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
                                                <div style={{ cursor: 'pointer' }} onClick={() => approveRejectInvoice(index, 'approve')}>
                                                    <CheckCircle
                                                        className={`rounded-full text-white bg-${!item.document_status ? "gray"
                                                            : item.document_status ==
                                                                'approve'
                                                                ? "green"
                                                                : "gray"
                                                            }-500`}
                                                    />
                                                </div>
                                                <div style={{ cursor: 'pointer' }} onClick={() => approveRejectInvoice(index, 'reject')}>
                                                    <XCircle
                                                        className={`rounded-full text-white bg-${!item.document_status
                                                            ? "gray"
                                                            : item.document_status ==
                                                                'reject'
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
                                                item.document_status === 'reject' ? (
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
    );
}