import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import $ from 'jquery';
import 'datatables.net';
import { Edit, Trash, X, Check } from 'react-feather';

export default function Table(props) {

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
                                <th>Number</th>
                                <th>Name</th>
                                <th>On Time</th>
                                <th>Delayed</th>
                                <th>Achievement(%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.approver_vendors.map((item, index) => (
                                <tr className="border-t bg-gray-100 text-center" key={index}>
                                    <td className='border border-slate-600'>{index+1}</td>
                                    <td className='border border-slate-600'>{item.role.name}</td>
                                    <td className='border border-slate-600'>{item.on_time}</td>
                                    <td className='border border-slate-600'>{item.on_delay}</td>
                                    <td className='border border-slate-600'>{item.achievement}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
