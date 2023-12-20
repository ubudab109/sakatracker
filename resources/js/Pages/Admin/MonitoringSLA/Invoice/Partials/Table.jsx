import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import $ from 'jquery';
import 'datatables.net';
import { Edit, Trash, X, Check } from 'react-feather';

export default function Table(props) {
    console.log(props);

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

    return (
        <div className="pt-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full overflow-x-auto">
                    <table ref={tableRef}  className="w-full">
                        <thead>
                            <tr>
                                <th>Document Number</th>
                                <th>Vendor Code</th>
                                <th>Status</th>
                                <th>Approve Date</th>
                                <th>Document Stage</th>
                                <th>Created Date</th>
                                {props.data.items.map((item, index) => (
                                    <th>{item.user.name}</th>
                                ))}
                                <th>Total SLA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.invoices.map((item, index) => (
                                <tr className="border-t bg-gray-100 text-center">
                                    <td className='border border-slate-600'>{item.document_number}</td>
                                    <td className='border border-slate-600'>{item.vendor.id_manual}</td>
                                    <td className='border border-slate-600'>{item.status}</td>
                                    <td className='border border-slate-600'>{formatDate(item.updated_at)}</td>
                                    <td className='border border-slate-600'>{item.status}</td>
                                    <td className='border border-slate-600'>{formatDate(item.created_at)}</td>
                                    {props.data.items.map((item2, index) => (
                                        <td className={`border border-slate-600 ${item[item2.user.name] == 0 ? '' : item[item2.user.name] > 0 ? 'bg-green-300' : 'bg-red-300'}`}>
                                            {item[item2.user.name]}
                                        </td>
                                    ))}
                                    <td className='border border-slate-600'>{item.total_sla}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
