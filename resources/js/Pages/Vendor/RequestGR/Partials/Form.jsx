
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import ModifyButton from "@/Components/ModifyButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { convertMb } from "@/Utils/helper";
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

        if (props.title == 'Tambah') {
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

    // const [file, setFile] = useState(props.data.invoice == null ? '' : props.data.invoice.exchange_invoice_attachments);
    // const handleChangeFile = (file) => {
    //     setFile(file);
    //     setData('attachment', file);
    // };

    const [files, setFiles] = useState(props.data.invoice == null ? [] : props.data.invoice.exchange_invoice_attachments);
    const [objectFilesUrl, setObjectFilesUrl] = useState([]);
    const [limitedFiles, setLimitedFiles] = useState(0);

    const handleChangeFile = (fileUploaded) => {
        const uploaded = [...files];
        const objectUrl = [...objectFilesUrl];
        let currentSize = 0;
        fileUploaded.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                const objectFile = Object.assign(file);
                const url = URL.createObjectURL(objectFile);
                let sizeFile = convertMb(file.size);
                objectUrl.push({
                    url: url,
                    fileName: file.name,
                    fileSize: sizeFile,
                });
                currentSize += sizeFile;
                setLimitedFiles(currentSize);
            }
        });
        setFiles(uploaded);
        setObjectFilesUrl(objectUrl);
        setData("attachment", uploaded);
    };

    const removeFiles = (fileName, fileSize) => {
        const fileUploaded = [...files];
        const objectUrl = [...objectFilesUrl];
        const indexFile = fileUploaded.findIndex((f) => f.name === fileName);
        const indexObjectUrl = objectUrl.findIndex(
            (o) => o.fileName === fileName
        );
        fileUploaded.splice(indexFile, 1);
        objectUrl.splice(indexObjectUrl, 1);
        setFiles(fileUploaded);
        setObjectFilesUrl(objectUrl);
        setLimitedFiles(limitedFiles - fileSize);
        setData("attachment", fileUploaded);
    };

    const handleFileEvent = (e) => {
        const choosenFiles = Array.prototype.slice.call(e.target.files);
        handleChangeFile(choosenFiles);
    };
    const fileTypes = ["PDF"];

    return (
        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg mt-6 p-6">
            <form onSubmit={submit}>
                <div className='mb-3'>
                    <InputLabel value="PO Number" className="font-bold" required={true} />

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
                    {/* <div className="mb-3 ">
                        <InputLabel value="Upload Travel" className="font-bold" required={true} />
                        <div className="w-full">
                            <FileUploader handleChange={handleChangeFile} name="attachment" types={fileTypes} multiple={true} />
                        </div>
                        <p>{file ? `Total File: ${file.length}` : "no files uploaded yet"}</p>

                        <InputError message={errors.file} className="mt-2" />
                    </div>

                    <div className="mb-3">

                    </div> */}

                    <div className="mb-3">
                        <InputLabel
                            value="Upload Travel"
                            className="font-bold"
                            required={true}
                        />
                        <div className="flex">
                            <label
                                htmlFor="attachment"
                                className="border-1 p-3 rounded-s-lg w-15 m-0 text-white bg-slate-800"
                            >
                                CHOOSE FILE
                            </label>
                            <div className="border-1 p-3 rounded-e-lg w-50 break-all">
                                No File Chosen
                            </div>
                            <input
                                type="file"
                                id="attachment"
                                className="hidden-input"
                                name="attachment"
                                hidden={true}
                                onChange={(e) =>
                                    handleFileEvent(e)
                                }
                                multiple={true}
                            />
                        </div>
                        <div className="row">
                            <ul className="list-group p-2">
                                {objectFilesUrl.length > 0
                                    ? objectFilesUrl.map(
                                        (url) => (
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                <a
                                                    style={{
                                                        color: "blue",
                                                    }}
                                                    href={
                                                        url.url
                                                    }
                                                    target="_blank"
                                                    rel="no-referrer"
                                                >
                                                    {
                                                        url.fileName
                                                    }
                                                </a>
                                                <span
                                                    onClick={() =>
                                                        removeFiles(
                                                            url.fileName,
                                                            url.fileSize
                                                        )
                                                    }
                                                    style={{
                                                        cursor: "pointer",
                                                        background:
                                                            "red",
                                                        color: "white",
                                                    }}
                                                    class="badge badge-danger badge-pill"
                                                >
                                                    X
                                                </span>
                                            </li>
                                        )
                                    )
                                    : null}
                            </ul>
                        </div>
                        <p>
                            {files.length > 0
                                ? `Total File: ${files.length}`
                                : "no files uploaded yet"}
                        </p>
                        <i className="text-muted">
                            * Max: 20mb
                        </i>
                        {limitedFiles > 20 ? (
                            <InputError
                                message="Maximum files is 20 MB"
                                className="mt-2"
                            />
                        ) : null}

                        <InputError
                            message={errors.file}
                            className="mt-2"
                        />
                    </div>
                </div>

                {props.data.request_good_receipt
                    ?
                    <>
                        {props.data.request_good_receipt.status == 'reject' ?
                            <div className="grid grid-cols-2 mb-3">
                                <div className="border-2 border-dashed p-6">
                                    <p>Purchasing Note:</p>
                                    <div className="break-all" style={{overflowX: 'auto', height: '200px'}}>
                                        <p>{props.data.request_good_receipt.note}</p>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                            : ''}
                    </>
                    : ''}

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