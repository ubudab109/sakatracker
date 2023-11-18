import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import { Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import $ from 'jquery';
import 'datatables.net';
import { Edit, Eye, Info } from 'react-feather';


export default function ShowBatchTable(props) {
    // console.log(props);

    const tableRef = useRef(null);

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

    const checkInvoice = (event) => {
        let checkedInvoicesData = props.checkedInvoices;

        if (event.target.checked) {
            checkedInvoicesData.push(event.target.value);
        } else {
            for (let i = checkedInvoicesData.length - 1; i >= 0; i--) {
                if (checkedInvoicesData[i] === event.target.value) {
                    checkedInvoicesData.splice(i, 1);
                }
            }
        }

        props.setCheckedInvoices([...checkedInvoicesData]);
        console.log('Checked Invoices: ', props.checkedInvoices);
    }

    return (
        <div className="pt-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full overflow-x-auto">
                    <table ref={tableRef} className="w-full table">
                        <thead>
                            <tr>
                                <th>Aksi</th>
                                <th>No. Dokumen</th>
                                <th>Tanggal Inv.</th>
                                <th>Total</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((item, index) => (
                                <tr>
                                    <td>
                                        <div className='flex gap-1'>
                                            <a href={route('admin.exchange-invoice.show', item.id)} className='text-gray-500'>
                                                <Eye />
                                            </a>
                                            {item.status == 'unpaid' ? (
                                                <input onChange={checkInvoice} value={item.id} type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 ml-2 mt-1"></input>
                                            ) : ''}
                                        </div>
                                    </td>
                                    <td>{item.document_number}</td>
                                    <td>{item.date}</td>
                                    <td>{item.total}</td>
                                    <td>{item.is_po ? 'PO' : 'Non PO'}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}