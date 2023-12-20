import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import { Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import $ from 'jquery';
import 'datatables.net';
import { Edit, Eye, Info } from 'react-feather';


export default function Table(props) {
    // console.log(props);

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

      const formatterCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    

    return (
        <div className="pt-6">
            <div className="w-full">
                <div className='table-responsive'>
                    <table ref={tableRef} className="table align-middle datatable dt-responsive table-check nowrap w-full border-collapse border-spacing-y-8">
                        <thead>
                            <tr className='bg-transparent'>
                                <th>Action</th>
                                <th>ID Tukar Faktur</th>
                                <th>Invoice Number</th>
                                <th>Inv. Date</th>
                                <th>Type</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Last Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.invoices.map((item, index) => (
                                <tr>
                                    <td>
                                        <div className='flex gap-1'>
                                            {item.status != 'draft' ? 
                                                <a href={route('exchange-invoice.show', item.id)} className='text-gray-500'>
                                                    <Eye />
                                                </a>
                                            : ''}
                                            {item.status == 'draft' ? 
                                                <a href={route('exchange-invoice.edit', item.id)} className='text-gray-500'>
                                                    <Edit />
                                                </a>
                                            : ''}
                                        </div>
                                    </td>
                                    <td>{item.tax_invoice_number ?? '-'}</td>
                                    <td>{item.invoice_number ?? '-'}</td>
                                    <td>{item.date ?? '-'}</td>
                                    <td>
                                        {item.is_po == 1 ? 'PO' : item.is_po == 0 ? 'Non PO' : 'MT'}
                                    </td>
                                    <td>{formatterCurrency.format(parseInt(item.total)).replace("€", "").trim()}</td>
                                    <td>{
                                        item.status === 'menunggu persetujuan' || item.status === 'sedang berlangsung'
                                        ? <div className="badge bg-orange-300 text-orange-700 font-size-12">Validation Process</div>
                                        : (
                                            item.status === 'disetujui' ? <div className="badge bg-green-300 text-green-700 font-size-12">Payment Process</div> : item.status === 'ditolak' ? <div className="badge bg-red-300 text-red-700 font-size-12">Rejected</div> : <div className="badge bg-gray-300 text-gray-700 font-size-12 capitalize">{item.status ?? '-'}</div>
                                        )    
                                    }</td>
                                    <td>{formatDate(item.updated_at)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}