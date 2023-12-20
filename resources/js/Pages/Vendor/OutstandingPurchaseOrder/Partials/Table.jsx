import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Dropdown from "@/Components/Dropdown";
import $ from "jquery";
import "datatables.net";
import { Edit, Trash, X, Check } from "react-feather";

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
            <div className="w-full">
                <div className='table-responsive'>
                    <table ref={tableRef} className="table align-middle datatable dt-responsive table-check nowrap w-full border-collapse border-spacing-y-8">
                        <thead>
                            <tr className='bg-transparent'>
                                <th>Action</th>
                                <th>ID PO</th>
                                <th>PO. Number</th>
                                <th>PO. Date</th>
                                <th>Sub Total</th>
                                <th>Tax</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.purchase_orders.map((item, index) => (
                                <tr>
                                    <td>
                                        <a
                                            href={`/exchange-invoice/create?po_number=${item.po_header_id}`}
                                            className="text-blue-500"
                                        >
                                            {" "}
                                            Add PO
                                        </a>
                                    </td>
                                    <td>{item.po_header_id}</td>
                                    <td>{item.po_num}</td>
                                    <td>{item.po_date}</td>
                                    <td>{item.sub_total}</td>
                                    <td>{item.tax}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
