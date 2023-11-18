import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import ModalDelete from './ModalDelete';
import Dropdown from '@/Components/Dropdown';
import { Edit, Trash } from 'react-feather';
import $ from 'jquery';
import 'datatables.net';

export default function Table(props) {
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);


    const tableRef = useRef(null);

    useEffect(() => {
        $(tableRef.current).DataTable();
    }, []);

    return (
        <div className="pt-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full overflow-x-auto">
                    <table ref={tableRef} className="w-full">
                        <thead>
                            <tr>
                                {props.permissions.includes('update_user') || props.permissions.includes('delete_user') ?
                                    <th>Aksi</th>
                                :''}
                                <th>Nama</th>
                                <th>Email Address</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((item, index) => (
                                <tr className="border-t bg-gray-100">
                                    {props.permissions.includes('update_user') || props.permissions.includes('delete_user') ?
                                        <td className='border border-slate-600'>
                                            <div className='flex gap-1'>
                                                {props.permissions.includes('update_user') ?
                                                    <a href={route(props.routeEdit, item.id)} className='text-blue-500'>
                                                        <Edit />
                                                    </a>
                                                :''}
                                                {props.permissions.includes('delete_user') ?
                                                    <a href='javascript:;' className='text-red-500' onClick={() => { setShowModal(true); setItemToDelete(item); }}>
                                                        <Trash />
                                                    </a>
                                                :''}
                                            </div>
                                        </td>
                                    :''}
                                    <td className='border border-slate-600'>{item.name}</td>
                                    <td className='border border-slate-600'>{item.email}</td>
                                    <td className='border border-slate-600'>
                                        {item.user_role.map((user_role, index) => (   
                                            <>
                                                - {user_role.role.name} <br />
                                            </>
                                         ))}
                                    </td>
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