import React, { useEffect, useRef, useState } from 'react';
import ModalDelete from './ModalDelete';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import $ from 'jquery';
import 'datatables.net';
import { Edit, Trash, X, Check } from 'react-feather';
import SwapButton from '@/Components/SwapButton';
import { useForm } from '@inertiajs/react';

export default function Table(props) {
    // console.log(props);
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        icon: 'up'
    });

    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);


    const tableRef = useRef(null);

    useEffect(() => {
        $(tableRef.current).DataTable();
    }, []);

    const swapClicked = (id, icon) => {
        data.icon = icon;
        post(route('approver-payment.swap-level', id));
    }

    return (
        <div className="pt-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full overflow-x-auto">
                    <table ref={tableRef} className="w-full">
                        <thead>
                            <tr>
                                {props.permissions.includes('update_approver_payment') || props.permissions.includes('delete_approver_payment') ?
                                <th>Aksi</th>
                                : ''}
                                <th>Role</th>
                                <th>Range Nominal</th>
                                <th>SLA</th>
                                {/* <th>Level</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((item, index) => (
                                <tr className="border-t bg-gray-100">
                                    {props.permissions.includes('update_approver_payment') || props.permissions.includes('delete_approver_payment') ?
                                        <td className='border border-slate-600' width={1}>
                                            <div className='flex gap-1'>
                                                {props.permissions.includes('update_approver_payment') ?
                                                <>
                                                    <div onClick={(e) => swapClicked(item.id, 'up')}>
                                                        <SwapButton icon={'up'} />
                                                    </div>
                                                    <div onClick={(e) => swapClicked(item.id, 'down')}>
                                                        <SwapButton icon={'down'} />
                                                    </div>
                                                    <a href={route(props.routeEdit, item.id)} className='text-blue-500'>
                                                        <Edit />
                                                    </a>
                                                </>
                                                : ''}
                                                {props.permissions.includes('delete_approver_payment') ?
                                                    <a href='javascript:;' className='text-red-500' onClick={() => { setShowModal(true); setItemToDelete(item); }}>
                                                        <Trash />
                                                    </a>
                                                : ''}
                                            </div>
                                        </td>
                                    : ''}
                                    <td className='border border-slate-600'>{item.role.name}</td>
                                    <td className='border border-slate-600'>{item.start_fee == null ? 0 : item.start_fee} to {item.end_fee == null ? 0 : item.end_fee}</td>
                                    <td className='border border-slate-600'>{item.sla} Jam</td>
                                    {/* <td className='border border-slate-600'>{item.level}</td> */}
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