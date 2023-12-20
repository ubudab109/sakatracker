import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import { Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import $ from 'jquery';
import 'datatables.net';
import { npwpFormat } from '@/Utils/helper';


export default function TableVendor(props) {
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

    return (
        <div className="pt-6">
            <div className="max-w-7xl mx-auto table-responsive">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full overflow-x-auto table-responsive">
                    <table ref={tableRef} className="w-full">
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>Code</th>
                                <th>Name</th>
                                <th>NPWP</th>
                                <th>KTP</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Last Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((item, index) => (
                                <tr className="border-t bg-gray-100">
                                    <td className='border border-slate-600'>
                                        <div className='flex'>
                                            <div className='mr-1'>
                                                <Link href={route('admin.vendor.show', item.vendor_latest.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='border border-slate-600'>{`${item.vendor_latest.id_manual}`}</td>
                                    <td className='border border-slate-600'>{item.vendor_latest.name}, {item.vendor_latest.legality}</td>
                                    <td className='border border-slate-600'>{item.vendor_latest.npwp ? npwpFormat(item.vendor_latest.npwp.toString()) : ''}</td>
                                    <td className='border border-slate-600'>
                                        { item.vendor_latest.ktp ? item.vendor_latest.ktp.toString() : ''}
                                    </td>
                                    <td className='border border-slate-600'>{item.vendor_latest.user.email}</td>
                                    <td className='border border-slate-600'>{item.vendor_latest.phone_number}</td>
                                    <td className='border border-slate-600'>{formatDate(item.vendor_latest.updated_at)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}