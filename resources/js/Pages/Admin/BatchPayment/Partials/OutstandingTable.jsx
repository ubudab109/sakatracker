import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import { Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import $ from 'jquery';
import 'datatables.net';
import { Edit, Eye, Info } from 'react-feather';
import PrimaryButton from '@/Components/PrimaryButton';


export default function OutstandingTable(props) {
    // console.log(props);

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

      const [selectedInvoiceId, setSelectedInvoiceId] = useState([]);
      const handleCheckboxChange = (item) => {
        if (selectedInvoiceId.includes(item)) {
            setSelectedInvoiceId(selectedInvoiceId.filter(item => item !== item));
        } else {
            setSelectedInvoiceId([...selectedInvoiceId, item]);
        }
    };

    return (
        <>
            <div className="mt-3 text-end">
                <Link href={`/admin/batch-payment/create-batch?invoice_id=${selectedInvoiceId}`}>
                    <PrimaryButton>
                        Buat Batch Payment
                    </PrimaryButton>
                </Link>    
            </div>
            <div className="mt-3">
                <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                    <div className="pt-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full overflow-x-auto">
                                <table ref={tableRef} className="w-full">
                                    <thead>
                                        <tr>
                                            <th>Aksi</th>
                                            <th>Tanggal Jatuh Tempo</th>
                                            <th>BCA/NON BCA</th>
                                            <th>Nama Vendor</th>
                                            <th>Nomor Invoice</th>
                                            <th>Total</th>
                                            <th>Nama Bank</th>
                                            <th>Detail Rekening</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.data.outstanding_invoices.map((item, index) => (
                                            <tr>
                                                <td>
                                                    <div className='flex gap-1'>
                                                        <a href={route('admin.exchange-invoice.show', item.id)} className='text-gray-500'>
                                                            <Eye />
                                                        </a>
                                                        <label className="inline-flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                name="invoice_id[]"
                                                                className="form-checkbox"
                                                                checked={selectedInvoiceId.includes(item.id)}
                                                                onChange={() => handleCheckboxChange(item.id)}
                           s                                  />
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>{item.jatuh_tempo}</td>
                                                <td>{item.vendor ? item.vendor.is_bca == 1 ? 'BCA' : 'NON BCA' : '-'}</td>
                                                <td>{item.vendor ? item.vendor.name : '-'}</td>
                                                <td>{item.invoice_number}</td>
                                                <td>{item.total}</td>
                                                <td>{item.vendor ? item.vendor.bank_name : '-'}</td>
                                                <td>{item.vendor ? item.vendor.bank_account_name : '-'} - {item.vendor ? item.vendor.bank_account_number : '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}