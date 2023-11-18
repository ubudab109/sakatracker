import React, { useEffect, useRef, useState } from 'react';
import ModalDelete from './ModalDelete';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import $ from 'jquery';
import 'datatables.net';
import { Edit, Trash, X, Check } from 'react-feather';
import ModifyButton from '@/Components/ModifyButton';
import { Link } from '@inertiajs/react';

export default function Table(props) {
    console.log(props);
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);


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
            {props.data.permissions.includes('store_sla_calendar') ?
                <div className="mb-3 text-end">
                    <Link href={route('admin.sla-holiday.create')}>
                        <ModifyButton>
                            Tambah
                        </ModifyButton>
                    </Link>    
                </div>
            :''}
            <div className="max-w-7xl mx-auto">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full overflow-x-auto">
                    <table ref={tableRef} className="w-full">
                        <thead>
                            <tr>
                                {props.permissions.includes('update_sla_calendar') || props.permissions.includes('delete_sla_calendar') ?
                                    <th>Aksi</th>
                                :''}
                                <th>Tanggal</th>
                                <th>Deskripsi</th>
                                <th>Tanggal Buat</th>
                                <th>Tanggal Ubah</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.sla_holidays.map((item, index) => (
                                <tr className="border-t bg-gray-100">
                                    {props.permissions.includes('update_sla_calendar') || props.permissions.includes('delete_sla_calendar') ?
                                        <td className='border border-slate-600'>
                                            <div className='flex gap-1'>
                                                {props.permissions.includes('update_sla_calendar') ?
                                                    <a href={route('admin.sla-holiday.edit', item.id)} className='text-blue-500'>
                                                        <Edit />
                                                    </a>
                                                :''}
                                                {props.permissions.includes('delete_sla_calendar') ?
                                                    <a href='javascript:;' className='text-red-500' onClick={() => { setShowModal(true); setItemToDelete(item); }}>
                                                        <Trash />
                                                    </a>
                                                :''}
                                            </div>
                                        </td>
                                        :''}
                                    <td className='border border-slate-600'>{item.date}</td>
                                    <td className='border border-slate-600'>{item.description}</td>
                                    <td className='border border-slate-600'>{formatDate(item.created_at)}</td>
                                    <td className='border border-slate-600'>{formatDate(item.updated_at)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {itemToDelete && (
                <ModalDelete
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    item={itemToDelete}
                />
            )}
        </div>
    );
}