import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net';
import { npwpFormat } from '@/Utils/helper';

export default function Table(props) {
    console.log(props);
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);


    const tableRef = useRef(null);

    useEffect(() => {
        $(tableRef.current).DataTable({
            ordering: false, // Matikan pengurutan otomatis di sini
        });
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
                                <th>Name</th>
                                <th>NPWP</th>
                                <th>KTP</th>
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
                                    <td className='border border-slate-600'>{item.vendor.name}</td>
                                    <td className='border border-slate-600'>{npwpFormat(item.vendor.npwp.toString())}</td>
                                    <td className='border border-slate-600'>
                                        { item.vendor.ktp ? item.vendor.ktp.toString() : ''}
                                    </td>
                                    <td className='border border-slate-600'>{item.vendor.user.email}</td>
                                    <td className='border border-slate-600'>{item.vendor.type_of_business}</td>
                                    <td className='border border-slate-600'>{item.vendor.phone_number}</td>
                                    <td className='border border-slate-600'>{item.vendor.status_account == 'disetujui' ? 'Complete' : item.status}</td>
                                    <td className='border border-slate-600'>{formatDate(item.new_updated_at)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}