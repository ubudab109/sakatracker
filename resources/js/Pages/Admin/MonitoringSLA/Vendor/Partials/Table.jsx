import React, { useEffect, useRef, useState } from 'react';
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
                                <th>Vendor Name</th>
                                <th>Vendor Code</th>
                                <th>Status</th>
                                <th>Last Update</th>
                                <th>Document Stage</th>
                                <th>Created Date</th>
                                {props.data.approver_vendors.map((item, index) => (
                                    <th>{item.role.name}</th>
                                ))}
                                <th>Total SLA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.vendors.map((item, index) => (
                                <tr className="border-t bg-gray-100 text-center" key={index}>
                                    <td className='border border-slate-600'>{item.name}</td>
                                    <td className='border border-slate-600'>{item.id_manual}</td>
                                    <td className='border border-slate-600'>{item.status_account}</td>
                                    <td className='border border-slate-600'>{formatDate(item.updated_at)}</td>
                                    <td className='border border-slate-600'>{item.status_account}</td>
                                    <td className='border border-slate-600'>{formatDate(item.created_at)}</td>
                                    {props.data.approver_vendors.map((item2, index) => (
                                        <td className={`border border-slate-600 ${item[item2.role.name] == 0 ? '' : item[item2.role.name] > 0 ? 'bg-green-300' : 'bg-red-300'}`}>
                                            {item[item2.role.name]}
                                        </td>
                                    ))}
                                    <td className='border border-slate-600'>{item.total_sla}</td>
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
