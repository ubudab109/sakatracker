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
        $(tableRef.current).DataTable({
            order:[[4, 'desc']]
        });
    }, []);

    return (
        <div className="pt-6">
            <div className="w-full">
                <div className='table-responsive'>
                    <table ref={tableRef} className="table align-middle datatable dt-responsive table-check nowrap w-full border-collapse border-spacing-y-8">
                        <thead>
                            <tr className='bg-transparent'>
                                <th>Action</th>
                                <th>PO Number</th>
                                <th>Travel Number</th>
                                {/* <th>No. Invoice</th> */}
                                <th>Travel Date</th>
                                {/* <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total Price</th> */}
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((item, index) => (
                                <tr className="border-t bg-gray-100">
                                    <td className='border border-slate-600'>
                                        {item.status == 'reject' ?
                                            <a href={route(props.routeEdit, item.id)} className='text-blue-500'>
                                                <Edit />
                                            </a>
                                        : '-'}
                                    </td>
                                    <td className='border border-slate-600'>{item.po_number}</td>
                                    <td className='border border-slate-600'>{item.document_number}</td>
                                    {/* <td className='border border-slate-600'>{item.invoice_number}</td> */}
                                    <td className='border border-slate-600'>{item.date_gr}</td>
                                    {/* <td className='border border-slate-600'>{item.quantity}</td>
                                    <td className='border border-slate-600'>{item.unit_price}</td>
                                    <td className='border border-slate-600'>{item.total_price}</td> */}
                                    <td className='border border-slate-600'>
                                        {item.status == 'approved' ? 
                                            <div className="badge bg-green-300 text-green-700 font-size-12">Approved</div>
                                        : item.status == 'reject' ? 
                                            <div className="badge bg-red-300 text-red-700 font-size-12">Rejected</div>
                                        : <div className="badge bg-gray-300 text-gray-700 font-size-12 capitalize">{item.status}</div>
                                        }
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