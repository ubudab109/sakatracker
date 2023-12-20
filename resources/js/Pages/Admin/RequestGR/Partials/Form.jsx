
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import ModifyButton from "@/Components/ModifyButton";
import PDFPopup from "@/Components/PDFPopup";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import ModalViewer from "@/Components/ModalViewer";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Form(props) {
    console.log('test', props.data.newdocs);
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        status: props.data != null ? props.data.request_good_receipt.status : '',
        note: props.data != null ? props.data.request_good_receipt.note : '',
    });

    const submit = (e) => {
        e.preventDefault();

        if(props.title == 'Tambah') {
            post(route(props.route));
        } else {
            post(route(props.route, props.id));
        }
    };

    const [selectedOptionStatus, setSelectedOptionStatus] = useState(props.data.request_good_receipt.status);
    const handleStatusChange = (event) => {
        data.status = event;
        setSelectedOptionStatus(event.target.value);
        if (event == 'disetujui' && props.data.invoice.status == 'menunggu persetujuan') {
            setShowOptionApproverInvoice(false);
        } else {
            setShowOptionApproverInvoice(true);
        }

        if (event == 'ditolak') {
            setSelectedOptionApprover(false)
        } else {
            setSelectedOptionApprover(true)
        }
    }
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpen1, setIsPopupOpen1] = useState(false);
    const openPopup = (item) => {
        // console.log(item);
        setPdfUrl(item);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };
    const openPopup1 = () => {
        console.info(props.data.newdocs);
        setIsPopupOpen1(true);
    };

    const closePopup1 = () => {
        setIsPopupOpen1(false);
    };

    const [pdfUrl, setPdfUrl] = useState("");

    const [submitSuccess, setSubmitSuccess] = useState(false);
    
    return (
        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg mt-6 p-6">
            <PDFPopup
                pdfUrl={pdfUrl}
                show={isPopupOpen}
                onClose={closePopup}
                docs={props.docs}
            />

            <ModalViewer
                files={props.data.newdocs}
                show={isPopupOpen1}
                onClose={closePopup1}
            />
            <form onSubmit={submit}>
                <div className="mb-3">
                    <InputLabel htmlFor="vendor" value="Vendor" required={true} />

                    <TextInput 
                        id="vendor"
                        name="vendor"
                        value={`${props.data.request_good_receipt.vendor.name}, ${props.data.request_good_receipt.vendor.legality}`}
                        className="mt-1 block w-full"
                        autoComplete="vendor"
                        placeholder="vendor.."
                        isFocused={true}
                        onChange={(e) => setData('vendor', e.target.value)}
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <InputLabel htmlFor="po_number" value="PO Number" required={true} />

                    <TextInput 
                        id="po_number"
                        name="po_number"
                        value={props.data.request_good_receipt.po_number}
                        className="mt-1 block w-full"
                        autoComplete="po_number"
                        placeholder="no po.."
                        isFocused={true}
                        onChange={(e) => setData('po_number', e.target.value)}
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <InputLabel htmlFor="document_number" value="Travel Number" required={true} />

                    <TextInput 
                        id="document_number"
                        name="document_number"
                        value={props.data.request_good_receipt.document_number}
                        className="mt-1 block w-full"
                        autoComplete="document_number"
                        placeholder="no dokumen.."
                        isFocused={true}
                        onChange={(e) => setData('document_number', e.target.value)}
                        disabled
                    />
                </div>

                {/* <div className="mb-3">
                    <InputLabel htmlFor="invoice_number" value="No. Invoice" required={true} />

                    <TextInput 
                        id="invoice_number"
                        name="invoice_number"
                        value={props.data.request_good_receipt.invoice_number}
                        className="mt-1 block w-full"
                        autoComplete="invoice_number"
                        placeholder="no invoice.."
                        isFocused={true}
                        onChange={(e) => setData('invoice_number', e.target.value)}
                        disabled
                    />
                </div> */}

                <div className="mb-3">
                    <InputLabel htmlFor="date_gr" value="Travel Date" required={true} />

                    <TextInput 
                        id="date_gr"
                        name="date_gr"
                        type="date"
                        value={props.data.request_good_receipt.date_gr}
                        className="mt-1 block w-full"
                        autoComplete="date_gr"
                        placeholder="tanggal.."
                        isFocused={true}
                        onChange={(e) => setData('date_gr', e.target.value)}
                        disabled
                    />
                </div>

                {/* <div className="mb-3">
                    <InputLabel htmlFor="quantity" value="Quantity" required={true} />

                    <TextInput 
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={props.data.request_good_receipt.quantity}
                        className="mt-1 block w-full"
                        autoComplete="quantity"
                        placeholder="0"
                        isFocused={true}
                        onChange={(e) => setData('quantity', e.target.value)}
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <InputLabel htmlFor="unit_price" value="Unit Price" required={true} />

                    <TextInput 
                        id="unit_price"
                        name="unit_price"
                        type="number"
                        value={props.data.request_good_receipt.unit_price}
                        className="mt-1 block w-full"
                        autoComplete="unit_price"
                        placeholder="0"
                        isFocused={true}
                        onChange={(e) => setData('unit_price', e.target.value)}
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <InputLabel htmlFor="total_price" value="Total Price" required={true} />

                    <TextInput 
                        id="total_price"
                        name="total_price"
                        type="number"
                        value={props.data.request_good_receipt.total_price}
                        className="mt-1 block w-full"
                        autoComplete="total_price"
                        placeholder="0"
                        isFocused={true}
                        onChange={(e) => setData('total_price', e.target.value)}
                        disabled
                    />
                </div> */}

                <div className='mb-3'>
                    <div className='flex justify-around font-bold'>
                        <div className='grid grid-cols-1 w-full'>
                            <p>Travel Documents</p>
                            <p className='flex'>
                                {props.data.request_good_receipt.request_good_receipt_attachments != null ? props.data.request_good_receipt.request_good_receipt_attachments.length : 0} File
                                {props.data.request_good_receipt.request_good_receipt_attachments.length > 0 && (
                                <a
                                    href="javascript:;"
                                    onClick={(e) =>
                                        openPopup1()
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 ml-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                        />
                                    </svg>
                                </a>)}
                            </p>
                        </div>
                    </div>
                </div>
                
                {props.data.request_good_receipt.status == 'pending'
                ? 
                    <>
                        <p className="font-bold text-black mb-3">Action</p>
                        
                        <div className="grid grid-cols-2">
                            {/* <div className="w-full mb-3">
                                <InputLabel value="Status" className="font-bold" required={true}/>
                                <select className="select select-bordered w-full mt-1"
                                    id="status"
                                    name="status"
                                    value={selectedOptionStatus}
                                    onChange={handleStatusChange}
                                >
                                    <option value="" hidden>Choose Status</option>
                                    <option value="approved">Approved</option>
                                    <option value="reject">Rejected</option>
                                </select>

                                <InputError message={errors.status} className="mt-2" />
                            </div>
                            <div></div> */}
                            <div className="mb-3">
                                <div className="flex justify-around font-bold">
                                    <div className="grid grid-cols-1 w-full">
                                        <InputLabel
                                            value="Note"
                                            className="font-bold"
                                        />
                                        <textarea
                                            name="note"
                                            className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                            placeholder="Note *"
                                            onChange={(e) =>
                                                setData(
                                                    "note",
                                                    e.target
                                                        .value
                                                )
                                            }
                                            value={data.note}
                                        />

                                        <InputError
                                            message={
                                                errors.note
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div className="flex gap-3">
                                <DangerButton
                                    className="w-full items-center justify-center"
                                    hidden={
                                        submitSuccess
                                    }
                                    onClick={() =>
                                        handleStatusChange(
                                            "ditolak"
                                        )
                                    }
                                >
                                    Reject
                                </DangerButton>
                                <PrimaryButton
                                    className="w-full items-center justify-center"
                                    hidden={
                                        submitSuccess
                                    }
                                    onClick={() =>
                                        handleStatusChange(
                                            "disetujui"
                                        )
                                    }
                                >
                                    Approve
                                </PrimaryButton>
                            </div>
                        </div>
                    </>
                :''}

                {props.data.request_good_receipt.status == 'reject'
                ? 
                    <div className="grid grid-cols-2">
                        <div>
                            <p>Note:</p>
                            <p>{props.data.request_good_receipt.note}</p>
                        </div>
                        <div></div>
                    </div>
                :''}

                <div className="flex justify-end items-end gap-2 mt-2">
                    <Link href={route('admin.request-good-receipt.index')}>
                        <SecondaryButton>
                            Back
                        </SecondaryButton>
                    </Link>
                </div>
                
                {/* <div className="flex items-center gap-2 mt-2">
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">{props.message}</p>
                    </Transition>
                </div> */}
            </form>
        </div>
    );    
}