import React, { useEffect, useRef, useState } from 'react';
import ModalDelete from '@/Pages/Admin/Role/Partials/ModalDelete';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import $ from 'jquery';
import 'datatables.net';
import { Edit, Trash, X, Check } from 'react-feather';

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
                                {props.permissions.includes('update_role') || props.permissions.includes('delete_role') ?
                                    <th>Aksi</th>
                                :''}
                                <th>Role</th>
                                <th>Hak Akses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((item, index) => (
                                <tr className="border-t bg-gray-100">
                                    {props.permissions.includes('update_role') || props.permissions.includes('delete_role') ?
                                        <td className='border border-slate-600' width={1}>
                                            <div className='flex gap-1'>
                                                {props.permissions.includes('update_role') ?
                                                    <a href={route(props.routeEdit, item.id)} className='text-blue-500'>
                                                        <Edit />
                                                    </a>
                                                :''}
                                                {props.permissions.includes('delete_role') ?
                                                    <a href='javascript:;' className='text-red-500' onClick={() => { setShowModal(true); setItemToDelete(item); }}>
                                                        <Trash />
                                                    </a>
                                                :''}
                                            </div>
                                        </td>
                                    :''}
                                    <td className='border border-slate-600' width={1}>{item.name}</td>
                                    <td className='border border-slate-600'>
                                        <>
                                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                                                {props.arrayPermission.map((item1, index1) => (
                                                    <div>
                                                        <b className='capitalize'>{item1.title}</b>
                                                        <ul>
                                                            {item1.permission.map((item2, index2) => (
                                                                <li className='flex'>
                                                                    {item.arrayPermissions.includes(item2 + '_' + item1.name) ? 
                                                                        <Check className={`text-green-500`} />
                                                                    : 
                                                                        <X className={`text-red-500`} />
                                                                    }
                                                                    {item1.label[index2]}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
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