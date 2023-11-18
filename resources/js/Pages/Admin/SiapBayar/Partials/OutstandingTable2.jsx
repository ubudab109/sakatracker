import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import { Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import $ from 'jquery';
import 'datatables.net';
import { Edit, Eye, Info, Plus } from 'react-feather';
import Axios from 'axios';


export default function OutstandingTable2(props) {
    console.log(props);

    const tableRef = useRef(null);
    const [outstanding_invoices, setOutstandingData] = useState([]);
    console.log("Outstanding Invoices: ", outstanding_invoices);

    useEffect(() => {
        setOutstandingData(props.data.outstanding_invoices);
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

    const exaddInvoice = (item, index) => {
        console.log("Add Data: ", item);
        try {
            const requestData = {
                batch_payment_id: props.data.batch_payment.id,
                exchange_invoice_id: item.id,
            };

            const response = Axios.post('/admin/batch-payment/add-invoice', requestData);
            console.log('Invoice added successfully:', response.data);
        } catch (error) {
            console.error('Error adding invoice:', error);
        }
    }

    const addInvoice = (item, index) => {
        const newData = outstanding_invoices;
        const spliceData = newData.splice(index, 1);
        
        console.log(newData);
        setOutstandingData(newData);
        console.log(newData);
    }

    return (
        <div className="pt-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full overflow-x-auto">
                    <table ref={tableRef} className="w-full">
                        <thead>
                            <tr>
                                <th>Aksi</th>
                                <th>No. Dokumen</th>
                                <th>Tanggal Inv.</th>
                                <th>Total</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {outstanding_invoices.map((item, index) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className='flex gap-1'>
                                            <a href={route('admin.exchange-invoice.show', item.id)} className='text-gray-500'>
                                                <Eye />
                                            </a>
                                            <a onClick={() => {addInvoice(item, index)}} className='text-gray-500'>
                                                <Plus />
                                            </a>
                                        </div>
                                    </td>
                                    <td>{item.document_number}</td>
                                    <td>{item.date}</td>
                                    <td>{item.total}</td>
                                    <td>{item.is_po ? 'PO' : 'Non PO'}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}