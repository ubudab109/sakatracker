import React, { useEffect, useRef, useState } from 'react';
import ModalDelete from './ModalDelete';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import $ from 'jquery';
import 'datatables.net';
import { Edit, Trash, X, Check } from 'react-feather';

export default function Table(props) {
    console.log(props);
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
                                {props.permissions.includes('update_payment_term') || props.permissions.includes('delete_payment_term') ?
                                    <th>Action</th>
                                :''}
                                <th>Name</th>
                                <th>Day</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((item, index) => (
                                <tr className="border-t bg-gray-100">
                                    {props.permissions.includes('update_payment_term') || props.permissions.includes('delete_payment_term') ?
                                        <td className='border border-slate-600'>
                                            <div className='flex gap-1'>
                                                {props.permissions.includes('update_payment_term') ?
                                                    <a href={route(props.routeEdit, item.id)} className='text-blue-500'>
                                                        <Edit />
                                                    </a>
                                                :''}
                                                {props.permissions.includes('delete_payment_term') ?
                                                    <a href='javascript:;' className='text-red-500' onClick={() => { setShowModal(true); setItemToDelete(item); }}>
                                                        <Trash />
                                                    </a>
                                                :''}    
                                            </div>
                                        </td>
                                    :''}
                                    <td className='border border-slate-600'>{item.name}</td>
                                    <td className='border border-slate-600'>{item.day}</td>
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