
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

export default function Form(props) {
    console.log('test', props.data.newdocs);
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        status: props.data != null ? props.data.request_good_receipt.status : '',
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
        data.status = event.target.value;
        setSelectedOptionStatus(event.target.value);
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
                    <InputLabel htmlFor="po_number" value="No. PO" required={true} />

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
                    <InputLabel htmlFor="document_number" value="No. Surat Jalan" required={true} />

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
                    <InputLabel htmlFor="date_gr" value="Tanggal Surat Jalan" required={true} />

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
                            <p>Dokumen Surat Jalan</p>
                            <p className='flex'>
                                {props.data.request_good_receipt.request_good_receipt_attachments != null ? props.data.request_good_receipt.request_good_receipt_attachments.length : 0} Berkas
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

                <p className="font-bold text-black mb-3">Tindakan</p>

                <div className="w-full mb-3">
                    <InputLabel value="Status" className="font-bold" required={true}/>
                    <select className="select select-bordered w-full mt-1"
                        id="status"
                        name="status"
                        value={selectedOptionStatus}
                        onChange={handleStatusChange}
                    >
                        <option value="" hidden>Pilih Status</option>
                        <option value="approved">Sudah diinput ke DB</option>
                        <option value="reject">Tolak</option>
                    </select>

                    <InputError message={errors.status} className="mt-2" />
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                    <PrimaryButton>
                        Save
                    </PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">{props.message}</p>
                    </Transition>
                </div>
            </form>
        </div>
    );    
}