import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import { Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import $ from 'jquery';
import 'datatables.net';
import { CheckSquare, Edit, Eye, Info, X } from 'react-feather';


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
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((item, index) => (
                                <tr>
                                    <td>
                                        <div className='flex gap-1'>
                                            <a href={route('admin.exchange-invoice.show', {id: item.id, batchId: props.batchId})} className='text-gray-500'>
                                                <Eye />
                                            </a>
                                        </div>
                                    </td>
                                    <td>{item.tax_invoice_number}</td>
                                    <td>{item.jatuh_tempo}</td>
                                    <td>{item.date}</td>
                                    <td>{formatterCurrency.format(parseInt(item.total)).replace("€", "").trim()}</td>
                                    <td>{item.is_po == 1 ? 'PO' : item.is_po == 0 ? 'Non PO' : 'MT'}</td>
                                    <td>{item.status}</td>
                                    <td className='border border-slate-600' width={1}>
                                        <div className='flex gap-1'>
                                            <>
                                                <div>
                                                    <CheckSquare color="green" />
                                                </div>
                                                <div>
                                                    <X color="red" />
                                                </div>
                                            </>
                                        </div>
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