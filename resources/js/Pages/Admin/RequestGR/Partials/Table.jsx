import React, { useEffect, useRef, useState } from 'react';
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
                                <th>Action</th>
                                <th>Vendor</th>
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
                                        <>
                                            <td className='border border-slate-600'>
                                                {props.permissions.includes('verification_request_gr') && item.status == 'pending' ?
                                                    <div className='flex gap-1'>
                                                        <a href={route(props.routeEdit, item.id)} className='text-blue-500'>
                                                            <Edit />
                                                        </a>
                                                    </div>
                                                :''}
                                            </td>
                                        </>
                                    <td className='border border-slate-600'>{item.vendor.name}, {item.vendor.legality}</td>
                                    <td className='border border-slate-600'>{item.po_number}</td>
                                    <td className='border border-slate-600'>{item.document_number}</td>
                                    {/* <td className='border border-slate-600'>{item.invoice_number}</td> */}
                                    <td className='border border-slate-600'>{item.date_gr}</td>
                                    {/* <td className='border border-slate-600'>{item.quantity}</td> */}
                                    {/* <td className='border border-slate-600'>{item.unit_price}</td> */}
                                    {/* <td className='border border-slate-600'>{item.total_price}</td> */}
                                    <td className='border border-slate-600'>
                                        {item.status == 'approved' ? 
                                        'Approved'
                                        : item.status == 'reject' ? 
                                        'Rejected'
                                        : item.status}
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