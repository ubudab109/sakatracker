
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import ModifyButton from "@/Components/ModifyButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { FileUploader } from "react-drag-drop-files";
import SecondaryButton from "@/Components/SecondaryButton";
import ModalGR from "./ModalGR";
import Modal from "@/Components/Modal";
import PDFPopup from "@/Components/PDFPopup";

export default function Form(props) {
    console.log(props);
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        category: props.data.invoice == null ? '' : props.data.invoice.category,
        location: props.data.invoice == null ? '' : props.data.invoice.location,
        date: props.data.invoice == null ? '' : props.data.invoice.date,
        dpp: props.data.invoice == null ? '' : props.data.invoice.dpp,
        tax_invoice: '',
        ppn: props.data.invoice == null ? '' : props.data.invoice.ppn,
        invoice_number: '',
        total: props.data.invoice == null ? 0 : props.data.invoice.total,
        is_materai: props.data.invoice == null ? '' : props.data.invoice.is_materai,
        note: props.data.invoice == null ? '' : props.data.invoice.note,
        attachment: '',
        is_po: props.data.invoice == null ? '' : props.data.invoice.is_po,
        po_number: props.data.invoice == null ? '' : props.data.invoice.po_number,
        order_id: props.data.invoice == null ? '' : props.data.invoice.order_id,
        gr_items: '',
        status_submit: ''
    });

    // console.log(errors);

    const submit = (e) => {
        e.preventDefault();
        if(props.data.invoice == null) {
            post(route('exchange-invoice.store'));
        } else {
            post(route('exchange-invoice.update', props.data.invoice.id));
        }
    };

    const withOptionChangeHandler = (selectedOptionHandler) => {
        return (event) => {
            const dataValue = event.target.value;
            selectedOptionHandler(dataValue);
        };
    };

    const [selectedValue1, setSelectedValue1] = useState(props.data.invoice == null ? '' : props.data.invoice.category);
    const [selectedValue2, setSelectedValue2] = useState(props.data.invoice == null ? '' : props.data.invoice.location);
    const [selectedValue3, setSelectedValue3] = useState(props.data.invoice == null ? '' : props.data.invoice.is_materai);
    const [selectedValue4, setSelectedValue4] = useState(props.data.invoice == null ? '' : props.data.invoice.is_po);
    const [selectedValue5, setSelectedValue5] = useState('');

    const [selectedLabel5, setSelectedLabel5] = useState('');
    const [dataGoodReceipt, setDataGoodReceipt] = useState([]);

    const [selectedButtonPO, setSelectedButtonPO] = useState(selectedValue4 == 1 ? false : true);

    const handleOptionChange = (dataValue, setSelectedValue) => {
        setSelectedValue(dataValue);

        if(setSelectedValue4 === setSelectedValue) {
            if(dataValue === '1') {
                setSelectedButtonPO(false);
            } else {
                setSelectedButtonPO(true);
            }
        }
    };

    const enhancedHandleOptionChange1 = withOptionChangeHandler((dataValue) => handleOptionChange(dataValue, setSelectedValue1, data.category = dataValue));
    const enhancedHandleOptionChange2 = withOptionChangeHandler((dataValue) => handleOptionChange(dataValue, setSelectedValue2, data.location = dataValue));
    const enhancedHandleOptionChange3 = withOptionChangeHandler((dataValue) => handleOptionChange(dataValue, setSelectedValue3, data.is_materai = dataValue));
    const enhancedHandleOptionChange4 = withOptionChangeHandler((dataValue) => handleOptionChange(dataValue, setSelectedValue4, data.is_po = dataValue));

    const handleChange5 = (event) => {
        // console.log(event);
        // data.order_id = event.target.value;

        setSelectedValue5(event.value);

        setSelectedLabel5(event.label);
        // data.po_number = selectedOption.label;
        
        fetch(`/api/purchase-order-detail?order_id=${event.value}`)
        .then((response) => response.json())
        .then((res) => {
            setDataGoodReceipt(res.datas);
            console.log(res.datas);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    };

    const [file, setFile] = useState(props.data.invoice == null ? '' : props.data.invoice.exchange_invoice_attachments);
    const handleChangeFile = (file) => {
        setFile(file);
        setData('attachment', file);
    };

    const [isModalGROpen, setIsModalGROpen] = useState(false);

    const openModalGR = () => {
        setIsModalGROpen(true);
    };

    const closeModalGR = () => {
        setIsModalGROpen(false);
    };

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [pdfUrl, setPdfUrl] = useState('');

    const openPopup = (item) => {
        // console.log(item);
        setPdfUrl(item); 
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const [selectedItemsGR, setSelectedItemsGR] = useState([]);
    const [dataItemsGR, setDataItemsGR] = useState(props.data.invoice == null ? [] : props.data.invoice.purchase_orders);
    const [sumTotalGR, setSumTotalGR] = useState(0);

    const handleCheckboxChange = (item) => {
        console.log(item);
        var totalGR = parseInt(sumTotalGR);
        if (selectedItemsGR.includes(item)) {
            setSelectedItemsGR(selectedItemsGR.filter(selectedItemsGR => selectedItemsGR !== item));
            totalGR -= parseInt(item.purchase_order_detail.sub_total);
        } else {
            setSelectedItemsGR([...selectedItemsGR, item]);
            totalGR = parseInt(totalGR) + parseInt(item.purchase_order_detail.sub_total);
        }
        setSumTotalGR(totalGR);
    };

    const submitModalGR = () => {
        data.order_id = selectedValue5;
        data.po_number = selectedLabel5;
        data.gr_items = selectedItemsGR;
        data.total = sumTotalGR;
        setDataItemsGR(selectedItemsGR);
        setIsModalGROpen(false);
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${day}-${month}-${year}`;
      }

    const fileTypes = ["PDF"];

    const colourOptions = [
        { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
        { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
        { value: 'purple', label: 'Purple', color: '#5243AA' },
        { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
        { value: 'orange', label: 'Orange', color: '#FF8B00' },
        { value: 'yellow', label: 'Yellow', color: '#FFC400' },
        { value: 'green', label: 'Green', color: '#36B37E' },
        { value: 'forest', label: 'Forest', color: '#00875A' },
        { value: 'slate', label: 'Slate', color: '#253858' },
        { value: 'silver', label: 'Silver', color: '#666666' },
      ];

    return (
        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg mt-6 p-6">
            <PDFPopup
                pdfUrl={pdfUrl}
                show={isPopupOpen}
                onClose={closePopup}
            />
            <form onSubmit={submit}>

                <p className="text-gray-500 mb-3">Anda menggunakan data profil yang disetujui tanggal {formatDate(props.data.user.updated_at)} (Lihat Detail)</p>

                <div className="grid grid-cols-2 gap-3">
                    <div className="mb-3">
                        <InputLabel value="Kategori" className="font-bold" required={true}/>
                        <select className="select select-bordered w-full mt-1"
                            id="category"
                            name="category"
                            value={selectedValue1}
                            onChange={enhancedHandleOptionChange1}
                        >
                            <option value="" hidden>Kategori</option>
                            {props.data.categories.map((item, index) => (
                                <option value={item.name} label={item.name}>{item.name}</option>
                            ))}
                        </select>

                        <InputError message={errors.category} className="mt-2" />
                    </div>
                    
                    <div className="mb-3">
                        <InputLabel htmlFor="date" value="Tanggal Invoice" required={true} />

                        <TextInput 
                            id="date"
                            name="date"
                            value={data.date}
                            type="date"
                            className="mt-1 block w-full"
                            autoComplete="date"
                            isFocused={true}
                            onChange={(e) => setData('date', e.target.value)}
                            
                        />

                        <InputError 
                            message={errors.date}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">                    
                    <div className="mb-3">
                        <InputLabel value="Lokasi" className="font-bold" required={true}/>
                        <select className="select select-bordered w-full mt-1"
                            id="location"
                            name="location"
                            value={selectedValue2}
                            onChange={enhancedHandleOptionChange2}
                        >
                            <option value="" hidden>Lokasi</option>
                            {props.data.locations.map((item, index) => (
                                <option value={item.name} label={item.name}>{item.name}</option>
                            ))}
                        </select>

                        <InputError message={errors.location} className="mt-2" />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="dpp" value="DPP" required={true} />

                        <TextInput 
                            id="dpp"
                            name="dpp"
                            value={data.dpp}
                            type="number"
                            className="mt-1 block w-full"
                            autoComplete="dpp"
                            placeholder="DPP"
                            isFocused={true}
                            onChange={(e) => setData('dpp', e.target.value)}
                            
                        />

                        <InputError 
                            message={errors.dpp}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">                    
                    <div className="mb-3">
                        <InputLabel htmlFor="tax_invoice" value="Faktur Pajak" required={true} />

                        <div className="flex items-center align-middle">
                            <input name="tax_invoice" type="file" className="file-input file-input-bordered w-full max-w-xs" 
                                onChange={(e) => setData('tax_invoice', e.target.files[0])}
                            />
                            {props.data.invoice != null ? <a href="javascript:;" onClick={(e) => openPopup(props.data.invoice.tax_invoice)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                </svg>
                            </a> : '' }
                        </div>

                        <InputError 
                            message={errors.tax_invoice}
                            className="mt-2"
                        />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="ppn" value="PPN" required={true} />

                        <TextInput 
                            id="ppn"
                            name="ppn"
                            value={data.ppn}
                            type="number"
                            className="mt-1 block w-full"
                            autoComplete="PPN"
                            placeholder="PPN"
                            isFocused={true}
                            onChange={(e) => setData('ppn', e.target.value)}
                            
                        />

                        <InputError 
                            message={errors.ppn}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">                    
                    <div className="mb-3">
                        <InputLabel htmlFor="invoice_number" value="Nomor Invoice" required={true} />

                        <div className="flex items-center align-middle">
                            <input name="invoice_number" type="file" className="file-input file-input-bordered w-full max-w-xs" 
                                onChange={(e) => setData('invoice_number', e.target.files[0])}
                            />
                            {props.data.invoice != null ? <a href="javascript:;" onClick={(e) => openPopup(props.data.invoice.invoice_number)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                </svg>
                            </a> : '' }
                        </div>

                        <InputError 
                            message={errors.invoice_number}
                            className="mt-2"
                        />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="total" value="Total" required={true} />

                        <TextInput 
                            id="total"
                            name="total"
                            value={data.total}
                            type="number"
                            className="mt-1 block w-full"
                            autoComplete="Total"
                            placeholder="Total"
                            isFocused={true}
                            onChange={(e) => setData('total', e.target.value)}
                            
                        />

                        <InputError 
                            message={errors.total}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">                    
                    <div className="mb-3">
                        <InputLabel value="Menggunakan Ematerai" className="font-bold" required={true}/>
                        <select className="select select-bordered w-full mt-1"
                            id="is_materai"
                            name="is_materai"
                            value={selectedValue3}
                            onChange={enhancedHandleOptionChange3}
                        >
                            <option value="" hidden>Pilih</option>
                            <option value="1">Iya</option>
                            <option value="0">Tidak</option>
                        </select>

                        <InputError message={errors.is_materai} className="mt-2" />
                    </div>

                    <div className="mb-3">
                        
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">                    
                    <div className="mb-3">
                        <InputLabel value="Catatan" className="font-bold" required={true}/>
                        <textarea 
                            name="note"
                            className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                            placeholder="Catatan"
                            onChange={(e) => setData('note', e.target.value)}
                            value={data.note}
                        />

                        <InputError message={errors.note} className="mt-2" />
                    </div>

                    <div className="mb-3">
                        
                    </div>
                </div>

                <div className="grid grid-cols-2">                    
                    <div className="mb-3 ">
                        <InputLabel value="Lampiran Lainnya" className="font-bold" required={true}/>
                        <div className="w-full">
                            <FileUploader handleChange={handleChangeFile} name="attachment" types={fileTypes} multiple={true} />
                        </div>
                        <p>{file ? `Total File: ${file.length}` : "no files uploaded yet"}</p>

                        <InputError message={errors.file} className="mt-2" />
                    </div>

                    <div className="mb-3">
                        
                    </div>
                </div>

                <div className="grid grid-cols-2">              
                    <div className="mb-3 ">
                        <InputLabel value="PO/Non PO" className="font-bold" required={true}/>

                        <div className="flex items-center gap-3">
                            <select className="select select-bordered w-full mt-1"
                                id="is_po"
                                name="is_po"
                                value={selectedValue4}
                                onChange={enhancedHandleOptionChange4}
                            >
                                <option value="">Pilih</option>
                                <option value="0">Tanpa PO</option>
                                <option value="1">PO</option>
                            </select>
                            <PrimaryButton disabled={selectedButtonPO} type="button" onClick={(e) => openModalGR(e)}>
                                Pilih
                            </PrimaryButton>
                        </div>

                        <InputError message={errors.is_po} className="mt-2" />
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="mb-3" hidden={selectedButtonPO}>
                        <InputLabel value="Nomor PO" className="font-bold" required={true}/>

                        <div className="flex items-center gap-3">
                            <p className="text-gray-500">{data.po_number}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1">
                    <div className="mb-3" hidden={selectedButtonPO}>
                        <table className="table table-xs">
                            <thead>
                                <tr className="border-t bg-gray-100">
                                    {/* <th>Aksi</th> */}
                                    <th>No. Dokumen</th>
                                    <th>Invoice No</th>
                                    <th>Tanggal GR</th>
                                    <th>Qty</th>
                                    <th>Harga Satuan</th>
                                    <th>Total</th>
                                </tr>
                                <tr></tr>
                            </thead>
                            <tbody>
                                {dataItemsGR.map((data, index) => (
                                    <tr className="border-collapse border-1 border-gray-500">        
                                        {/* <td>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="data_gr[]"
                                                    className="form-checkbox"
                                                    checked={selectedItemsGR.includes(data)}
                                                    onChange={() => handleCheckboxChange(data)}
                                                />
                                            </label>
                                        </td> */}
                                        <td>{data.document_number == null ? data.good_receipt.receipt_num : data.document_number}</td>
                                        <td>
                                            invoice 123
                                        </td>
                                        <td>{formatDate(data.date_gr == null ? data.good_receipt.receive_date : data.date_gr)}</td>
                                        <td>{data.quantity == null ? data.purchase_order_detail.quantity_ordered : data.quantity}</td>
                                        <td>{data.unit_price == null ? data.purchase_order_detail.unit_price : data.unit_price}</td>
                                        <td>{data.total_price == null ? data.purchase_order_detail.sub_total : data.total_price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className="flex justify-end items-end gap-2 mt-2">
                    <Link href={route('exchange-invoice.index')}>
                        <SecondaryButton>
                            Back
                        </SecondaryButton>
                    </Link>
                    {props.data.invoice != null 
                        ? props.data.noDraft == 1 
                            ? '' 
                            : 
                            <PrimaryButton onClick={(e) => {setData('status_submit', 'draft')}}>
                                Simpan Draft
                            </PrimaryButton> 
                        : 
                        <PrimaryButton onClick={(e) => {setData('status_submit', 'draft')}}>
                            Simpan Draft
                        </PrimaryButton>
                    }
                    <PrimaryButton onClick={(e) => {setData('status_submit', 'menunggu persetujuan')}}>
                        Submit
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

            <Modal show={isModalGROpen} onClose={closeModalGR}>
                <div className='border-b-2 p-3'>
                    <b>Pilih PO dan GR</b>
                </div>
                <div className="p-3">
                    <div className='mb-3'>
                        <InputLabel value="Nomor PO" className="font-bold" required={true}/>

                        <div className="flex items-center gap-3">
                            {/* <select className="select select-bordered w-full mt-1"
                                id="po_number"
                                name="po_number"
                                value={selectedValue5}
                                onChange={handleChange5}
                            >
                                <option value="" hidden>Pilih</option>
                                {props.data.purchase_orders.map((item, index) => (
                                    <option value={item.po_header_id} label={item.po_num}>{item.po_num}</option>
                                ))}
                            </select> */}
                            <Select
                                className="basic-single w-full z-50"
                                id="po_number"
                                classNamePrefix="select"
                                defaultValue={selectedValue5}
                                isClearable={true}
                                isSearchable={true}
                                name="po_number"
                                // value={selectedValue5}
                                onChange={handleChange5}
                                options={props.data.po_array}
                                style={{zIndex:1000}}
                            />
                        </div>
                    </div>
                    <div className='mb-3'>
                        <b>List GR</b>
                        <table className="table table-xs">
                            <thead>
                                <tr className="border-t bg-gray-100">
                                    <th>Aksi</th>
                                    <th>No. Dokumen</th>
                                    <th>Invoice No</th>
                                    <th>Tanggal GR</th>
                                    <th>Qty</th>
                                    <th>Harga Satuan</th>
                                    <th>Total</th>
                                </tr>
                                <tr></tr>
                            </thead>
                            <tbody>
                                {dataGoodReceipt.map((data, index) => (
                                    <tr className="border-collapse border-1 border-gray-500">        
                                        <td>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="data_gr[]"
                                                    className="form-checkbox"
                                                    checked={selectedItemsGR.includes(data)}
                                                    onChange={() => handleCheckboxChange(data)}
                                                />
                                            </label>
                                        </td>
                                        <td>{data.good_receipt.receipt_num}</td>
                                        <td>
                                            invoice 123
                                        </td>
                                        <td>{formatDate(data.good_receipt.receive_date)}</td>
                                        <td>{data.purchase_order_detail.quantity_ordered}</td>
                                        <td>{data.purchase_order_detail.unit_price}</td>
                                        <td>{data.purchase_order_detail.sub_total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModalGR}>Tutup</SecondaryButton>
                        <PrimaryButton onClick={submitModalGR}>Simpan</PrimaryButton>
                    </div>
                </div>
            </Modal>
            
        </div>
    );    
}