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

    const showRoute = (id) => {
        return '/admin/batch-payment/' + id;
    }

    const filterCompleted = (event) => {
        if(event.target.checked){
           window.location.assign('/admin/batch-payment?filter=me');
        } else {
            window.location.assign('/admin/batch-payment');
        }
     }

    return (
        <div className="pt-6">
            <div className="max-w-7xl mx-auto">
                <form className='mb-3'>
                    <input type="checkbox" className='mr-3' id="filter" 
                        onChange={event => filterCompleted(event)}
                        checked={props.data.filter}
                    />
                    <label for="filter">Lihat data yang harus diverifikasi</label>
                </form>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full overflow-x-auto">
                    <table ref={tableRef} className="w-full">
                        <thead>
                            <tr>
                                <th>Aksi</th>
                                <th>No. Batch</th>
                                <th>Periode</th>
                                <th>Jatuh Tempo</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Last Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.batch_payments.map((item, index) => (
                                <>
                                    {item.show == 1 ?
                                        <tr>
                                            <td>
                                                <div className='flex gap-1'>
                                                    <a href={showRoute(item.id)} className='text-gray-500'>
                                                        <Eye />
                                                    </a>
                                                </div>
                                            </td>
                                            <td>{item.no_batch}</td>
                                            <td>{item.periode}</td>
                                            <td>{item.jatuh_tempo}</td>
                                            <td>{item.total}</td>
                                            <td>{item.status}</td>
                                            <td>{formatDate(item.updated_at)}</td>
                                        </tr>
                                    : ''}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}