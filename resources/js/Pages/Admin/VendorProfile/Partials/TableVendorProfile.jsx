import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import { Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import $ from 'jquery';
import 'datatables.net';


export default function TableVendorProfile(props) {
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
                    <table ref={tableRef} className="w-full">
                        <thead>
                            <tr>
                                {props.permissions.includes('verification_vendor_profile') ?
                                    <th>Aksi</th>
                                :''}
                                <th>Nama</th>
                                <th>NPWP</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Phone Number</th>
                                <th>Status</th>
                                <th>Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((item, index) => (
                                <tr className="border-t bg-gray-100">
                                    {props.permissions.includes('verification_vendor_profile') ?
                                        <td className='border border-slate-600'>
                                            <div className='flex'>
                                                <div className='mr-1'>
                                                    <Link href={route('admin.vendor-profile.edit', item.id)}>
                                                        <div className="badge badge-primary">verifikasi</div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                    :''}
                                    <td className='border border-slate-600'>{item.vendor.name}, {item.vendor.legality}</td>
                                    <td className='border border-slate-600'>{item.vendor.npwp}</td>
                                    <td className='border border-slate-600'>{item.vendor.email}</td>
                                    <td className='border border-slate-600'>{`${item.vendor.type_of_business}`}</td>
                                    <td className='border border-slate-600'>{item.vendor.phone_number}</td>
                                    <td className='border border-slate-600'>{item.status}</td>
                                    <td className='border border-slate-600'>{formatDate(item.updated_at)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}