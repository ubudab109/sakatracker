import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Dropdown from "@/Components/Dropdown";
import { Link, useForm } from "@inertiajs/react";
import { format } from "date-fns";
import $ from "jquery";
import "datatables.net";
import { Edit, Eye, Filter, Info } from "react-feather";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";

export default function OutstandingTable(props) {
    // console.log(props);

    const tableRef = useRef(null);

    useEffect(() => {
        $(tableRef.current).DataTable();
    }, []);

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    const [selectedInvoiceId, setSelectedInvoiceId] = useState([]);
    const handleCheckboxChange = (item) => {
        if (selectedInvoiceId.includes(item)) {
            setSelectedInvoiceId(
                selectedInvoiceId.filter((item) => item !== item)
            );
        } else {
            setSelectedInvoiceId([...selectedInvoiceId, item]);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Create our number formatterCurrency.
    const formatterCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return (
        <>
            <div className="mt-3 text-end">
                <PrimaryButton onClick={openModal}>Filter</PrimaryButton>
                <Link
                    href={`/admin/batch-payment/create-batch?invoice_id=${selectedInvoiceId}&start_date=${props.data.start_date}&end_date=${props.data.end_date}&is_bca=${props.data.is_bca}&name=${props.data.name}&invoice_number=${props.data.invoice_number}`}
                >
                    <PrimaryButton>Buat Batch Payment</PrimaryButton>
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
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.data.outstanding_invoices.map(
                                            (item, index) => (
                                                <>
                                                    {item.show == 1 ? (
                                                        <tr>
                                                            <td>
                                                                <div className="flex gap-1">
                                                                    <a
                                                                        href={route(
                                                                            "admin.exchange-invoice.show",
                                                                            item.id
                                                                        )}
                                                                        className="text-gray-500"
                                                                    >
                                                                        <Eye />
                                                                    </a>
                                                                    <label className="inline-flex items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            name="invoice_id[]"
                                                                            className="form-checkbox"
                                                                            checked={selectedInvoiceId.includes(
                                                                                item.id
                                                                            )}
                                                                            onChange={() =>
                                                                                handleCheckboxChange(
                                                                                    item.id
                                                                                )
                                                                            }
                                                                            s
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.jatuh_tempo
                                                                }
                                                            </td>
                                                            <td>
                                                                {item.vendor
                                                                    ? item
                                                                          .vendor
                                                                          .is_bca ==
                                                                      1
                                                                        ? "BCA"
                                                                        : "NON BCA"
                                                                    : "-"}
                                                            </td>
                                                            <td>
                                                                {item.vendor
                                                                    ? item
                                                                          .vendor
                                                                          .name
                                                                    : "-"}
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.invoice_number
                                                                }
                                                            </td>
                                                            <td>{formatterCurrency.format(parseInt(item.total)).replace("€", "").trim()}</td>
                                                            <td>
                                                                {item.vendor
                                                                    ? item
                                                                          .vendor
                                                                          .bank_name
                                                                    : "-"}
                                                            </td>
                                                            <td>
                                                                {item.vendor
                                                                    ? item
                                                                          .vendor
                                                                          .bank_account_name
                                                                    : "-"}{" "}
                                                                -{" "}
                                                                {item.vendor
                                                                    ? item
                                                                          .vendor
                                                                          .bank_account_number
                                                                    : "-"}
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.status
                                                                }
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        ""
                                                    )}
                                                </>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="border-b-2 p-3">
                    <b>Filter Data</b>
                </div>
                <div className="p-3">
                    <form method="get">
                        <div className="grid grid-cols-2 gap-3 mb-1">
                            <div>
                                <InputLabel
                                    value="Start Date"
                                    className="font-bold"
                                    required={true}
                                />
                                <input
                                    className="border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm mt-1 block w-full"
                                    name="start_date"
                                    // value={props.data.start_date}
                                    type="date"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    value="End Date"
                                    className="font-bold"
                                    required={true}
                                />
                                <input
                                    className="border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm mt-1 block w-full"
                                    name="end_date"
                                    // value={props.data.end_date}
                                    type="date"
                                />
                            </div>
                        </div>
                        <div className="mb-1">
                            <InputLabel
                                value="Bank"
                                className="font-bold"
                                required={true}
                            />
                            <select
                                className="border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm mt-1 block w-full"
                                name="is_bca"
                            >
                                <option value="">Pilih</option>
                                <option value="1">BCA</option>
                                <option value="0">Non BCA</option>
                            </select>
                        </div>
                        <div className="mb-1">
                            <InputLabel
                                value="Nama Vendor"
                                className="font-bold"
                                required={true}
                            />
                            <input
                                className="border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm mt-1 block w-full"
                                name="name"
                                // value={props.data.end_date}
                                type="text"
                                placeholder="name vendor"
                            />
                        </div>
                        <div className="mb-1">
                            <InputLabel
                                value="Nomor Invoice"
                                className="font-bold"
                                required={true}
                            />
                            <input
                                className="border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm mt-1 block w-full"
                                name="invoice_number"
                                // value={props.data.end_date}
                                type="text"
                                placeholder="nomor invoice"
                            />
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <SecondaryButton onClick={closeModal} type="button">
                                Tutup
                            </SecondaryButton>
                            <PrimaryButton>Filter</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
