import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import { Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import $ from 'jquery';
import 'datatables.net';
import { Edit, Eye, Info, Plus } from 'react-feather';
import Axios from 'axios';


export default function OutstandingTable2(props) {
    console.log('item', props);

    const tableRef = useRef(null);

    console.log("Outstanding Invoices: ", props.outstanding_invoices);

    useEffect(() => {
        $(tableRef.current).DataTable();
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

    const exaddInvoice = (item, index) => {
        console.log("Add Data: ", item);
        try {
            const requestData = {
                batch_payment_id: props.data.batch_payment.id,
                exchange_invoice_id: item.id,
            };

            const response = Axios.post('/admin/batch-payment/add-invoice', requestData);
            console.log('Invoice added successfully:', response.data);
        } catch (error) {
            console.error('Error adding invoice:', error);
        }
    }

    const addInvoice = (item, index) => {
        const batchPaymentInvoices = props.batch_payment_invoices;
        const dataAdded = props.outstanding_invoices.splice(index, 1);
        batchPaymentInvoices.push(dataAdded[0]);

        const newData = props.outstanding_invoices;

        console.log("Data Added: ", dataAdded);
        console.log("New Data: ", newData);

        const newTotalInvoice = parseInt(props.totalInvoice) + parseInt(dataAdded[0].total);

        props.setTotalInvoice(newTotalInvoice);
        props.setInvoiceItems([...batchPaymentInvoices]);
        props.setOutstandingData([...newData]);
    }

    return (
        <div className="pt-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full overflow-x-auto">
                    <table ref={tableRef} className="w-full">
                        <thead>
                            <tr>
                                <th>Aksi</th>
                                <th>Tanggal Jatuh Tempo</th>
                                <th>BCA/NON BCA</th>
                                <th>Nama Vendor</th>
                                <th>Nomor Invoice</th>
                                <th>Total</th>
                                <th>Nama Bank</th>
                                <th>Detail Rekening</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.outstanding_invoices.map((item, index) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className='flex gap-1'>
                                            <a href={route('admin.exchange-invoice.show', item.id)} className='text-gray-500'>
                                                <Eye />
                                            </a>
                                            <a onClick={() => {addInvoice(item, index)}} className='text-gray-500'>
                                                <Plus />
                                            </a>
                                        </div>
                                    </td>
                                    <td>{item.jatuh_tempo}</td>
                                    <td>{item.vendor ? item.vendor.is_bca == 1 ? 'BCA' : 'NON BCA' : '-'}</td>
                                    <td>{item.vendor ? item.vendor.name : '-'}</td>
                                    <td>{item.invoice_number}</td>
                                    <td>{item.total}</td>
                                    <td>{item.vendor ? item.vendor.bank_name : '-'}</td>
                                    <td>{item.vendor ? item.vendor.bank_account_name : '-'} - {item.vendor ? item.vendor.bank_account_number : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}