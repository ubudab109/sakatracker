import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import ModifyButton from "@/Components/ModifyButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { FileUploader } from "react-drag-drop-files";
import SecondaryButton from "@/Components/SecondaryButton";
import ModalGR from "./ModalGR";
import Modal from "@/Components/Modal";
import PDFPopup from "@/Components/PDFPopup";
import { convertMb } from "@/Utils/helper";

export default function Form(props) {
    const {
        data,
        setData,
        post,
        clearErrors,
        hasErrors,
        processing,
        errors,
        recentlySuccessful,
        reset,
    } = useForm({
        // category: props.data.invoice == null ? '' : props.data.invoice.category,
        location: props.data.invoice == null ? "" : props.data.invoice.location,
        date: props.data.invoice == null ? "" : props.data.invoice.date,
        dpp: props.data.invoice == null ? "" : props.data.invoice.dpp,
        tax_invoice: null,
        invoice: null,
        bast: null,
        po: null,
        quotation: null,
        ppn: props.data.invoice == null ? "" : props.data.invoice.ppn,
        invoice_number:
            props.data.invoice == null ? 0 : props.data.invoice.invoice_number,
        // tax_invoice_number: props.data.invoice == null ? 0 : props.data.invoice.tax_invoice_number,
        total: props.data.invoice == null ? 0 : props.data.invoice.total,
        is_materai:
            props.data.invoice == null ? "" : props.data.invoice.is_materai,
        note: props.data.invoice == null ? "" : props.data.invoice.note,
        attachment: "",
        is_po: props.data.invoice == null ? "" : props.data.invoice.is_po,
        po_number: props.data.po_number
            ? props.data.po_number
            : props.data.invoice == null
            ? ""
            : props.data.invoice.po_number,
        order_id: props.data.invoice == null ? "" : props.data.invoice.order_id,
        gr_items: "",
        status_submit: "",
    });

    const handleFile = (e) => {
        if (convertMb(e.target.files[0].size) > 5) {
            setError(
                e.target.name,
                "Max file size should not be greater than 5mb"
            );
        } else {
            clearErrors(e.target.name);
            setData(e.target.name, e.target.files[0]);
        }
    };

    // console.log(errors);

    const submit = (e) => {
        e.preventDefault();
        console.log(errors);
        if (props.data.invoice == null) {
            post(route("exchange-invoice.store"));
        } else {
            post(route("exchange-invoice.update", props.data.invoice.id));
        }
    };

    const withOptionChangeHandler = (selectedOptionHandler) => {
        return (event) => {
            const dataValue = event.target.value;
            selectedOptionHandler(dataValue);
        };
    };

    // const [selectedValue1, setSelectedValue1] = useState(props.data.invoice == null ? '' : props.data.invoice.category);
    const [selectedValue2, setSelectedValue2] = useState(
        props.data.invoice == null ? "" : props.data.invoice.location
    );
    const [selectedValue3, setSelectedValue3] = useState(
        props.data.invoice == null ? "" : props.data.invoice.is_materai
    );
    const [selectedValue4, setSelectedValue4] = useState(
        props.data.invoice == null
            ? props.data.po_number != null
                ? 1
                : ""
            : props.data.po_number != null
            ? 1
            : props.data.invoice.is_po
    );
    const [selectedValue5, setSelectedValue5] = useState(props.data.po_number);

    const [selectedLabel5, setSelectedLabel5] = useState("");
    const [dataGoodReceipt, setDataGoodReceipt] = useState([]);

    const [selectedButtonPO, setSelectedButtonPO] = useState(
        props.data.po_number ? false : selectedValue4 == 1 ? false : true
    );

    const handleOptionChange = (dataValue, setSelectedValue) => {
        setSelectedValue(dataValue);

        if (setSelectedValue4 === setSelectedValue) {
            if (dataValue === "1") {
                setSelectedButtonPO(false);
                setShowTotalPpnTax(true);
            } else {
                setSelectedButtonPO(true);
                setShowTotalPpnTax(false);
            }
        }
    };

    // const enhancedHandleOptionChange1 = withOptionChangeHandler((dataValue) => handleOptionChange(dataValue, setSelectedValue1, data.category = dataValue));
    const enhancedHandleOptionChange2 = withOptionChangeHandler((dataValue) =>
        handleOptionChange(
            dataValue,
            setSelectedValue2,
            (data.location = dataValue)
        )
    );
    const enhancedHandleOptionChange3 = withOptionChangeHandler((dataValue) =>
        handleOptionChange(
            dataValue,
            setSelectedValue3,
            (data.is_materai = dataValue)
        )
    );
    const enhancedHandleOptionChange4 = withOptionChangeHandler((dataValue) =>
        handleOptionChange(
            dataValue,
            setSelectedValue4,
            (data.is_po = dataValue)
        )
    );

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
                console.error("Error fetching data:", error);
            });
    };

    const [files, setFiles] = useState(
        props.data.invoice == null
            ? []
            : props.data.invoice.exchange_invoice_attachments
    );
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

    useEffect(() => {
        fetch(`/api/purchase-order-detail?order_id=${selectedValue5}`)
            .then((response) => response.json())
            .then((res) => {
                setDataGoodReceipt(res.datas);
                console.log("test", res.datas);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        objectFilesUrl.map((url) => URL.revokeObjectURL(url));
    }, []);

    const handleFileEvent = (file) => {
        const choosenFiles = Array.prototype.slice.call(file);
        handleChangeFile(choosenFiles);
    };

    const [isModalGROpen, setIsModalGROpen] = useState(false);

    const openModalGR = () => {
        setIsModalGROpen(true);
    };

    const closeModalGR = () => {
        setIsModalGROpen(false);
    };

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [pdfUrl, setPdfUrl] = useState("");

    const openPopup = (item) => {
        // console.log(item);
        setPdfUrl(item);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const [selectedItemsGR, setSelectedItemsGR] = useState([]);
    const [dataItemsGR, setDataItemsGR] = useState(
        props.data.invoice == null ? [] : props.data.invoice.purchase_orders
    );
    const [sumTotalGR, setSumTotalGR] = useState(0);

    const [sumTotalTaxGR, setSumTotalTaxGR] = useState(0);

    const [taxPercentage, setTaxPercentage] = useState(0);
    const calculateTaxPercentage = (totalAmount, totalAmountWithTax) => {
        const calculatedTaxPercentage =
            ((totalAmountWithTax - totalAmount) / totalAmount) * 100;
        setTaxPercentage(calculatedTaxPercentage);
    };

    const handleCheckboxChange = (gr) => {
        console.log("test", gr);
        var totalGR = parseInt(sumTotalGR);
        var totalTaxGR = parseInt(sumTotalTaxGR);
        if (selectedItemsGR.includes(gr)) {
            console.log("dor", 0);
            gr.array.forEach((item) => {
                totalGR -= parseInt(item.purchase_order_detail.sub_total);
                totalTaxGR -= parseInt(item.purchase_order_detail.tax);
            });
            setSelectedItemsGR(selectedItemsGR.filter((item) => item !== gr));
        } else {
            console.log("dor", 1);
            gr.array.forEach((item) => {
                totalGR += parseInt(item.purchase_order_detail.sub_total);
                totalTaxGR += parseInt(item.purchase_order_detail.tax);
            });
            setSelectedItemsGR([...selectedItemsGR, gr]);
        }
        console.log(selectedItemsGR);
        setSumTotalGR(totalGR);
        setSumTotalTaxGR(totalTaxGR);
        calculateTaxPercentage(totalGR, totalGR + totalTaxGR);
    };

    const [showTotalPpnTax, setShowTotalPpnTax] = useState(false);
    const submitModalGR = () => {
        data.order_id = selectedValue5;
        data.po_number = selectedLabel5;
        data.gr_items = selectedItemsGR;
        data.total = sumTotalGR;
        data.dpp = sumTotalTaxGR;
        data.ppn = taxPercentage;
        setDataItemsGR(selectedItemsGR);
        setIsModalGROpen(false);
    };

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}-${month}-${year}`;
    }

    const fileTypes = ["PDF"];

    const colourOptions = [
        { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
        { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
        { value: "purple", label: "Purple", color: "#5243AA" },
        { value: "red", label: "Red", color: "#FF5630", isFixed: true },
        { value: "orange", label: "Orange", color: "#FF8B00" },
        { value: "yellow", label: "Yellow", color: "#FFC400" },
        { value: "green", label: "Green", color: "#36B37E" },
        { value: "forest", label: "Forest", color: "#00875A" },
        { value: "slate", label: "Slate", color: "#253858" },
        { value: "silver", label: "Silver", color: "#666666" },
    ];

    return (
        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg mt-6 p-6">
            <PDFPopup pdfUrl={pdfUrl} show={isPopupOpen} onClose={closePopup} />
            <form onSubmit={submit}>
                <p className="text-gray-500 mb-3">
                    Anda menggunakan data profil yang disetujui tanggal{" "}
                    {formatDate(props.data.user.updated_at)} (
                    <a href={route("vendor.company-profile.index")}>
                        Lihat Detail
                    </a>
                    )
                </p>

                <div className="grid grid-cols-2">
                    <div className="mb-3 ">
                        <InputLabel
                            value="PO/Non PO"
                            className="font-bold"
                            required={true}
                        />

                        <div className="flex items-center gap-3">
                            <select
                                className="select select-bordered w-full mt-1"
                                id="is_po"
                                name="is_po"
                                value={selectedValue4}
                                onChange={enhancedHandleOptionChange4}
                            >
                                <option value="">Pilih</option>
                                <option value="0">Tanpa PO</option>
                                <option value="1">PO</option>
                            </select>
                            <PrimaryButton
                                disabled={selectedButtonPO}
                                type="button"
                                onClick={(e) => openModalGR(e)}
                            >
                                Pilih
                            </PrimaryButton>
                        </div>

                        <InputError message={errors.is_po} className="mt-2" />
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
                                {dataItemsGR.map((item, index) => (
                                    <>
                                        {item.array ? (
                                            <>
                                                {item.array.map(
                                                    (item1, index) => (
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
                                                            <td>
                                                                {data.document_number ==
                                                                null
                                                                    ? item1
                                                                          .good_receipt
                                                                          .receipt_num
                                                                    : data.document_number}
                                                            </td>
                                                            <td>
                                                                {
                                                                    data.invoice_number
                                                                }
                                                            </td>
                                                            <td>
                                                                {data.date_gr ==
                                                                null
                                                                    ? item1
                                                                          .good_receipt
                                                                          .receive_date
                                                                    : data.date_gr}
                                                            </td>
                                                            <td>
                                                                {data.quantity ==
                                                                null
                                                                    ? item1.qty_received
                                                                    : data.quantity}
                                                            </td>
                                                            <td>
                                                                {data.unit_price ==
                                                                null
                                                                    ? item1
                                                                          .purchase_order_detail
                                                                          .unit_price
                                                                    : data.unit_price}
                                                            </td>
                                                            <td>
                                                                {data.total_price ==
                                                                null
                                                                    ? item1
                                                                          .purchase_order_detail
                                                                          .sub_total
                                                                    : data.total_price}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </>
                                        ) : (
                                            <>
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
                                                    <td>
                                                        {item.document_number}
                                                    </td>
                                                    <td>
                                                        {item.invoice_number}
                                                    </td>
                                                    <td>{item.date_gr}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.unit_price}</td>
                                                    <td>{item.total_price}</td>
                                                </tr>
                                            </>
                                        )}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        {/* <div className="mb-1">
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
                        </div> */}
                        <div className="mb-1">
                            <InputLabel
                                value="Lokasi"
                                className="font-bold"
                                required={true}
                            />
                            <select
                                className="select select-bordered w-full mt-1"
                                id="location"
                                name="location"
                                value={selectedValue2}
                                onChange={enhancedHandleOptionChange2}
                            >
                                <option value="" hidden>
                                    Lokasi
                                </option>
                                {props.data.locations.map((item, index) => (
                                    <option value={item.name} label={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>

                            <InputError
                                message={errors.location}
                                className="mt-2"
                            />
                        </div>
                        {/* <div className="mb-1">
                            <InputLabel htmlFor="tax_invoice_number" value="Faktur Pajak" required={true} />

                            <TextInput 
                                id="tax_invoice_number"
                                name="tax_invoice_number"
                                value={data.tax_invoice_number}
                                type="text"
                                className="mt-1 block w-full"
                                placeholder="Faktur Pajak"
                                isFocused={true}
                                onChange={(e) => setData('tax_invoice_number', e.target.value)}
                                
                            />

                            <InputError 
                                message={errors.tax_invoice_number}
                                className="mt-2"
                            />
                        </div> */}
                        <div className="mb-1">
                            <InputLabel
                                htmlFor="tax_invoice"
                                value="Attach File Faktur Pajak"
                                required={true}
                            />

                            <div className="flex items-center align-middle">
                                <input
                                    name="tax_invoice"
                                    type="file"
                                    className="file-input file-input-bordered w-full max-w-xs"
                                    onChange={(e) => handleFile(e)}
                                />
                                {props.data.invoice != null ? (
                                    <a
                                        href={props.data.invoice.tax_invoice}
                                        target="_blank"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-8 h-8 ml-2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                            />
                                        </svg>
                                    </a>
                                ) : (
                                    ""
                                )}
                            </div>
                            <i className="text-muted">* Max: 5mb</i>
                            <InputError
                                message={errors.tax_invoice}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-1">
                            <InputLabel
                                htmlFor="invoice_number"
                                value="Nomor Invoice"
                                required={true}
                            />

                            <TextInput
                                id="invoice_number"
                                name="invoice_number"
                                value={data.invoice_number}
                                type="text"
                                className="mt-1 block w-full"
                                autoComplete="invoice number"
                                placeholder="invoice number"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("invoice_number", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.invoice_number}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-1">
                            <InputLabel
                                htmlFor="invoice"
                                value="Attach File Invoice"
                                required={true}
                            />

                            <div className="flex items-center align-middle">
                                <input
                                    name="invoice"
                                    type="file"
                                    className="file-input file-input-bordered w-full max-w-xs"
                                    onChange={(e) => handleFile(e)}
                                />
                                {props.data.invoice != null ? (
                                    <a
                                        href={props.data.invoice.invoice}
                                        target="_blank"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-8 h-8 ml-2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                            />
                                        </svg>
                                    </a>
                                ) : (
                                    ""
                                )}
                            </div>
                            <i className="text-muted">* Max: 5mb</i>
                            <InputError
                                message={errors.invoice}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-1">
                            <InputLabel
                                htmlFor="bast"
                                value="BAST/Surat Jalan"
                                required={true}
                            />

                            <div className="flex items-center align-middle">
                                <input
                                    name="bast"
                                    type="file"
                                    className="file-input file-input-bordered w-full max-w-xs"
                                    onChange={(e) => handleFile(e)}
                                />
                                {props.data.invoice != null ? (
                                    <a
                                        href={props.data.invoice.bast}
                                        target="_blank"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-8 h-8 ml-2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                            />
                                        </svg>
                                    </a>
                                ) : (
                                    ""
                                )}
                            </div>
                            <i className="text-muted">* Max: 5mb</i>
                            <InputError
                                message={errors.bast}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-1">
                            <InputLabel
                                value="Menggunakan Ematerai"
                                className="font-bold"
                                required={true}
                            />
                            <select
                                className="select select-bordered w-full mt-1"
                                id="is_materai"
                                name="is_materai"
                                value={selectedValue3}
                                onChange={enhancedHandleOptionChange3}
                            >
                                <option value="" hidden>
                                    Pilih
                                </option>
                                <option value="1">Iya</option>
                                <option value="0">Tidak</option>
                            </select>

                            <InputError
                                message={errors.is_materai}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-1">
                            <InputLabel
                                value="Catatan"
                                className="font-bold"
                                required={true}
                            />
                            <textarea
                                name="note"
                                className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                placeholder="Catatan"
                                onChange={(e) =>
                                    setData("note", e.target.value)
                                }
                                value={data.note}
                            />

                            <InputError
                                message={errors.note}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-1">
                            <InputLabel
                                value="Lampiran Lainnya"
                                className="font-bold"
                                required={true}
                            />
                            <div className="w-full">
                                <FileUploader
                                    handleChange={handleFileEvent}
                                    name="attachment"
                                    types={fileTypes}
                                    multiple={true}
                                />
                            </div>
                            <div className="row">
                                <ul className="list-group p-2">
                                    {objectFilesUrl.length > 0
                                        ? objectFilesUrl.map((url) => (
                                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                                  <a
                                                      style={{ color: "blue" }}
                                                      href={url.url}
                                                      target="_blank"
                                                      rel="no-referrer"
                                                  >
                                                      {url.fileName}
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
                                                          background: "red",
                                                          color: "white",
                                                      }}
                                                      class="badge badge-danger badge-pill"
                                                  >
                                                      X
                                                  </span>
                                              </li>
                                          ))
                                        : null}
                                </ul>
                            </div>
                            <p>
                                {files
                                    ? `Total File: ${files.length}`
                                    : "no files uploaded yet"}
                            </p>
                            <i className="text-muted">* Max: 25mb</i>
                            {limitedFiles > 25 ? (
                                <InputError
                                    message="Maximum files is 25 MB"
                                    className="mt-2"
                                />
                            ) : null}

                            <InputError
                                message={errors.file}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="mb-1" hidden={selectedButtonPO}>
                            <InputLabel
                                value="Nomor PO"
                                className="font-bold"
                                required={true}
                            />

                            <div className="flex items-center gap-3">
                                <p className="text-gray-500 form-control">
                                    {data.po_number ? data.po_number : "-"}
                                </p>
                            </div>
                        </div>
                        <div className="mb-1" hidden={selectedButtonPO}>
                            <InputLabel
                                htmlFor="po"
                                value="Attach File PO"
                                required={true}
                            />

                            <div className="flex items-center align-middle">
                                <input
                                    name="po"
                                    type="file"
                                    className="file-input file-input-bordered w-full max-w-xs"
                                    onChange={(e) => handleFile(e)}
                                />
                                {props.data.invoice != null ? (
                                    <a
                                        href={props.data.invoice.po}
                                        target="_blank"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-8 h-8 ml-2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                            />
                                        </svg>
                                    </a>
                                ) : (
                                    ""
                                )}
                            </div>
                            <i className="text-muted">* Max: 5mb</i>
                            <InputError message={errors.po} className="mt-2" />
                        </div>
                        <div className="mb-1">
                            <InputLabel
                                htmlFor="quotation"
                                value="Attach File Quotation"
                                required={true}
                            />

                            <div className="flex items-center align-middle">
                                <input
                                    name="quotation"
                                    type="file"
                                    className="file-input file-input-bordered w-full max-w-xs"
                                    onChange={(e) => handleFile(e)}
                                />
                                {props.data.invoice != null ? (
                                    <a
                                        href={props.data.invoice.quotation}
                                        target="_blank"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-8 h-8 ml-2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                            />
                                        </svg>
                                    </a>
                                ) : (
                                    ""
                                )}
                            </div>
                            <i className="text-muted">* Max: 5mb</i>
                            <InputError
                                message={errors.quotation}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-1">
                            <InputLabel
                                htmlFor="date"
                                value="Tanggal Invoice"
                                required={true}
                            />

                            <TextInput
                                id="date"
                                name="date"
                                value={data.date}
                                type="date"
                                className="mt-1 block w-full"
                                autoComplete="date"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("date", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.date}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-1">
                            <InputLabel
                                htmlFor="dpp"
                                value="DPP"
                                required={true}
                            />

                            <TextInput
                                id="dpp"
                                name="dpp"
                                value={data.dpp}
                                type="number"
                                className="mt-1 block w-full"
                                autoComplete="dpp"
                                placeholder="DPP"
                                isFocused={true}
                                onChange={(e) => setData("dpp", e.target.value)}
                            />

                            <InputError message={errors.dpp} className="mt-2" />
                        </div>
                        <div className="mb-1" hidden={showTotalPpnTax}>
                            <InputLabel
                                htmlFor="ppn"
                                value="PPN"
                                required={true}
                            />

                            <TextInput
                                id="ppn"
                                name="ppn"
                                value={data.ppn}
                                type="number"
                                className="mt-1 block w-full"
                                autoComplete="PPN"
                                placeholder="PPN"
                                isFocused={true}
                                onChange={(e) => setData("ppn", e.target.value)}
                            />

                            <InputError message={errors.ppn} className="mt-2" />
                        </div>
                        <div className="mb-1" hidden={showTotalPpnTax}>
                            <InputLabel
                                htmlFor="total"
                                value="Total"
                                required={true}
                            />

                            <TextInput
                                id="total"
                                name="total"
                                value={data.total}
                                type="number"
                                className="mt-1 block w-full"
                                autoComplete="Total"
                                placeholder="Total"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("total", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.total}
                                className="mt-2"
                            />
                        </div>
                        {/* <div className="mb-1 mt-2" hidden={!showTotalPpnTax}>
                            <b>DPP: {sumTotalTaxGR}</b>
                        </div> */}
                        <div className="mb-1 mt-2" hidden={!showTotalPpnTax}>
                            <b>PPN: {taxPercentage}</b>
                        </div>
                        <div className="mb-1 mt-2" hidden={!showTotalPpnTax}>
                            <b>Total: {sumTotalGR}</b>
                        </div>
                    </div>
                </div>

                {/* <div className="grid grid-cols-2">              
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
                </div> */}

                <div className="flex justify-end items-end gap-2 mt-2">
                    <Link href={route("exchange-invoice.index")}>
                        <SecondaryButton>Back</SecondaryButton>
                    </Link>
                    {props.data.invoice != null ? (
                        props.data.noDraft == 1 ? (
                            ""
                        ) : (
                            <PrimaryButton
                                onClick={(e) => {
                                    setData("status_submit", "draft");
                                }}
                            >
                                Simpan Draft
                            </PrimaryButton>
                        )
                    ) : (
                        <PrimaryButton
                            onClick={(e) => {
                                setData("status_submit", "draft");
                            }}
                        >
                            Simpan Draft
                        </PrimaryButton>
                    )}
                    <PrimaryButton
                        onClick={(e) => {
                            setData("status_submit", "menunggu persetujuan");
                        }}
                    >
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
                <div className="border-b-2 p-3">
                    <b>Pilih PO dan GR</b>
                </div>
                <div className="p-3">
                    <div className="mb-3">
                        <InputLabel
                            value="Nomor PO"
                            className="font-bold"
                            required={true}
                        />

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
                            />
                        </div>
                    </div>
                    <div className="mb-3">
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
                                {dataGoodReceipt.map((item, index) => (
                                    <>
                                        {item.array.map((item1, index) => (
                                            <tr className="border-collapse border-1 border-gray-500">
                                                {index == 0 ? (
                                                    <td
                                                        rowSpan={
                                                            item.array.length
                                                        }
                                                    >
                                                        <label className="inline-flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                name="data_gr[]"
                                                                className="form-checkbox"
                                                                checked={selectedItemsGR.includes(
                                                                    item
                                                                )}
                                                                onChange={() =>
                                                                    handleCheckboxChange(
                                                                        item
                                                                    )
                                                                }
                                                            />
                                                        </label>
                                                    </td>
                                                ) : (
                                                    ""
                                                )}
                                                <td>
                                                    {
                                                        item1.good_receipt
                                                            .receipt_num
                                                    }
                                                </td>
                                                <td>{data.invoice_number}</td>
                                                <td>
                                                    {
                                                        item1.good_receipt
                                                            .receive_date
                                                    }
                                                </td>
                                                <td>{item1.qty_received}</td>
                                                <td>
                                                    {
                                                        item1
                                                            .purchase_order_detail
                                                            .unit_price
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item1
                                                            .purchase_order_detail
                                                            .sub_total
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {selectedValue5 ? (
                        <p className="float-left mt-3">
                            Data GR Tidak ditemukan?
                            <a
                                href={`/request-good-receipt/create?po_number=${selectedLabel5}`}
                                className="text-blue-500"
                            >
                                {" "}
                                Request GR
                            </a>
                        </p>
                    ) : (
                        ""
                    )}
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModalGR}>
                            Tutup
                        </SecondaryButton>
                        <PrimaryButton onClick={submitModalGR}>
                            Simpan
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
