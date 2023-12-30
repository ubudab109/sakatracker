
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import ModifyButton from "@/Components/ModifyButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

export default function Form(props) {
    console.log(props);
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        po_number: props.data.request_good_receipt != null ? props.data.po_number ? props.data.po_number : props.data.request_good_receipt.po_number : props.data.po_number,
        document_number: props.data.request_good_receipt != null ? props.data.request_good_receipt.document_number : '',
        // invoice_number: props.data.request_good_receipt != null ? props.data.request_good_receipt.invoice_number : '',
        date_gr: props.data.request_good_receipt != null ? props.data.request_good_receipt.date_gr : '',
        // quantity: props.data.request_good_receipt != null ? props.data.request_good_receipt.quantity : '',
        // unit_price: props.data.request_good_receipt != null ? props.data.request_good_receipt.unit_price : '',
    });

    const submit = (e) => {
        e.preventDefault();

        if(props.title == 'Tambah') {
            post(route(props.route));
        } else {
            post(route(props.route, props.id));
        }
    };

    const [selectedValue5, setSelectedValue5] = useState(props.data.request_good_receipt != null ? props.data.po_number ? props.data.po_number : props.data.request_good_receipt.po_number : props.data.po_number);

    const handleChange5 = (event) => {
        // console.log(event);
        // data.order_id = event.target.value;

        setSelectedValue5(event.value);
        data.po_number = event.value;
    };

    const [file, setFile] = useState(props.data.invoice == null ? '' : props.data.invoice.exchange_invoice_attachments);
    const handleChangeFile = (file) => {
        setFile(file);
        setData('attachment', file);
    };
    const fileTypes = ["PDF"];

    return (
        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg mt-6 p-6">
            <form onSubmit={submit}>
                <div className='mb-3'>
                    <InputLabel value="PO Number" className="font-bold" required={true}/>

                    <div className="flex items-center gap-3">
                        <Select
                            className="basic-single w-full z-50"
                            id="po_number"
                            classNamePrefix="select"
                            defaultInputValue={selectedValue5}
                            isClearable={true}
                            isSearchable={true}
                            name="po_number"
                            onChange={handleChange5}
                            options={props.data.po_array}
                            // value={selectedValue5}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <InputLabel htmlFor="document_number" value="Travel Number" required={true} />

                    <TextInput 
                        id="document_number"
                        name="document_number"
                        value={data.document_number}
                        className="mt-1 block w-full"
                        autoComplete="document_number"
                        placeholder="travel number.."
                        isFocused={true}
                        onChange={(e) => setData('document_number', e.target.value)}
                        
                    />

                    <InputError 
                        message={errors.document_number}
                        className="mt-2"
                    />
                </div>

                {/* <div className="mb-3">
                    <InputLabel htmlFor="invoice_number" value="No. Invoice" required={true} />

                    <TextInput 
                        id="invoice_number"
                        name="invoice_number"
                        value={data.invoice_number}
                        className="mt-1 block w-full"
                        autoComplete="invoice_number"
                        placeholder="no invoice.."
                        isFocused={true}
                        onChange={(e) => setData('invoice_number', e.target.value)}
                        
                    />

                    <InputError 
                        message={errors.invoice_number}
                        className="mt-2"
                    />
                </div> */}

                <div className="mb-3">
                    <InputLabel htmlFor="date_gr" value="Travel Date" required={true} />

                    <TextInput 
                        id="date_gr"
                        name="date_gr"
                        type="date"
                        value={data.date_gr}
                        className="mt-1 block w-full"
                        autoComplete="date_gr"
                        placeholder="tanggal surat jalan.."
                        isFocused={true}
                        onChange={(e) => setData('date_gr', e.target.value)}
                        
                    />

                    <InputError 
                        message={errors.date_gr}
                        className="mt-2"
                    />
                </div>

                {/* <div className="mb-3">
                    <InputLabel htmlFor="quantity" value="Quantity" required={true} />

                    <TextInput 
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={data.quantity}
                        className="mt-1 block w-full"
                        autoComplete="quantity"
                        placeholder="0"
                        isFocused={true}
                        onChange={(e) => setData('quantity', e.target.value)}
                        
                    />

                    <InputError 
                        message={errors.quantity}
                        className="mt-2"
                    />
                </div> */}

                {/* <div className="mb-3">
                    <InputLabel htmlFor="unit_price" value="Unit Price" required={true} />

                    <TextInput 
                        id="unit_price"
                        name="unit_price"
                        type="number"
                        value={data.unit_price}
                        className="mt-1 block w-full"
                        autoComplete="unit_price"
                        placeholder="0"
                        isFocused={true}
                        onChange={(e) => setData('unit_price', e.target.value)}
                        
                    />

                    <InputError 
                        message={errors.unit_price}
                        className="mt-2"
                    />
                </div> */}

                <div className="grid grid-cols-2">                    
                    <div className="mb-3 ">
                        <InputLabel value="Upload Travel" className="font-bold" required={true}/>
                        <div className="w-full">
                            <FileUploader handleChange={handleChangeFile} name="attachment" types={fileTypes} multiple={true} />
                        </div>
                        <p>{file ? `Total File: ${file.length}` : "no files uploaded yet"}</p>

                        <InputError message={errors.file} className="mt-2" />
                    </div>

                    <div className="mb-3">
                        
                    </div>
                </div>

                {props.data.request_good_receipt
                ? 
                <>
                    {props.data.request_good_receipt.status  == 'reject' ? 
                        <div className="grid grid-cols-2 mb-3">
                            <div className="border-2 border-dashed p-6">
                                <p>Purchasing Note:</p>
                                <p className="break-all">{props.data.request_good_receipt.note}</p>
                            </div>
                            <div></div>
                        </div>
                    : ''}
                </>
                :''}
                
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