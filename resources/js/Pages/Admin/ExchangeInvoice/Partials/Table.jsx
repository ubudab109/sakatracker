import React, { useCallback, useEffect, useState } from "react";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import DataTable from "react-data-table-component";
import "datatables.net";
import { Eye } from "react-feather";
import axios from "axios";

export default function Table(props) {
    const [columns] = useState([
        {
            name: "Aksi",
            selector: (row) => row.action,
            sortable: false,
        },
        {
            name: "No Dokumen",
            selector: (row) => row.document_number,
            sortable: true,
        },
        {
            name: "Invoice No",
            selector: (row) => row.invoice_number,
            sortable: true,
        },
        {
            name: "Tanggal Inv.",
            selector: (row) => row.invoice_number,
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.type,
            sortable: true,
        },
        {
            name: "Total",
            selector: (row) => row.total,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: "Last Update",
            selector: (row) => row.document_number,
            sortable: true,
        },
    ]);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");
    const [checked, setChecked] = useState(false);
    
    const requestData = async (filter) => {
        if (filter !== "" || filter !== null || filter !== undefined) {
            return await axios.get(`/admin-invoice-datatables?filter=${filter}`);
        } else {
            return await axios.get(`/admin-invoice-datatables`);
        }
    };

    const callbackRequestData = useCallback(() => {
        let filters = filter;
        return requestData(filters);
    }, [filter]);

    const initData = async () => {
        await callbackRequestData().then((res) => {
            let columnsData = [];
            res.data.forEach((row) => {
                let item = {
                    action: (
                        <div className="flex gap-1">
                            <a
                                href={route(
                                    "admin.exchange-invoice.show",
                                    row.id
                                )}
                                className="text-gray-500"
                            >
                                <Eye />
                            </a>
                        </div>
                    ),
                    document_number: row.document_number,
                    invoice_number: row.invoice_number,
                    type:
                        row.is_po != null
                            ? row.is_po == 0
                                ? "Tanpa PO"
                                : "PO"
                            : "MT",
                    total: row.total,
                    status: row.status,
                    last_update: formatDate(row.updated_at),
                };
                columnsData.push(item);
            });
            setData(columnsData);
        });
    };
    useEffect(() => {
        initData();
        return () => {
            setData([]);
        }
    }, [callbackRequestData]);

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    const filterCompleted = (event) => {
        if (event.target.checked) {
            setFilter('me');
            setChecked(true);
        } else {
            setFilter('');
            setChecked(false);
        }
    };

    return (
        <div className="pt-6">
            <div className="">
                <form className="mb-3">
                    <input
                        type="checkbox"
                        className="mr-3"
                        id="filter"
                        onChange={(event) => filterCompleted(event)}
                        checked={checked}
                    />
                    <label for="filter">
                        Lihat data yang harus diverifikasi
                    </label>
                </form>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full overflow-x-auto">
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                    />
                </div>
            </div>
        </div>
    );
}
