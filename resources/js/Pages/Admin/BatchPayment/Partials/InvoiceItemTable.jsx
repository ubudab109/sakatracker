import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import { Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import $ from 'jquery';
import 'datatables.net';
import { Edit, Eye, Info, Plus, X } from 'react-feather';
import Axios from 'axios';


export default function InvoiceItemTable(props) {

    const tableRef = useRef(null);

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

    function removeInvoice(item, index){
        const outstandingInvoices = props.outstanding_invoices;
        const dataAdded = props.batch_payment_invoices.splice(index, 1);
        outstandingInvoices.push(dataAdded[0]);

        const newData = props.batch_payment_invoices;

        console.log("Data Added: ", dataAdded);
        console.log("New Data: ", newData);

        const newTotalInvoice = parseInt(props.totalInvoice) - parseInt(dataAdded[0].total);

        props.setTotalInvoice(newTotalInvoice);

        props.setInvoiceItems([...newData]);
        props.setOutstandingData([...outstandingInvoices]);
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
                    <table ref={tableRef} className="w-full">
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>Expired Date</th>
                                <th>BCA/NON BCA</th>
                                <th>Vendor Name</th>
                                <th>Invoice Number</th>
                                <th>Total</th>
                                <th>Bank Name</th>
                                <th>Detail Rekening</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.batch_payment_invoices.map((item, index) => (
                                <tr>
                                    <td>
                                        <div className='flex gap-1'>
                                            <a href={route('admin.exchange-invoice.show', item.id)} className='text-gray-500'>
                                                <Eye />
                                            </a>
                                            <a onClick={() => {removeInvoice(item, index)}} className='text-gray-500'>
                                                <X />
                                            </a>
                                        </div>
                                    </td>
                                    <td>{item.jatuh_tempo}</td>
                                    <td>{item.vendor ? item.vendor.is_bca == 1 ? 'BCA' : 'NON BCA' : '-'}</td>
                                    <td>{item.vendor ? item.vendor.name : '-'}</td>
                                    <td>{item.invoice_number}</td>
                                    <td>{formatterCurrency.format(parseInt(item.total)).replace("€", "").trim()}</td>
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