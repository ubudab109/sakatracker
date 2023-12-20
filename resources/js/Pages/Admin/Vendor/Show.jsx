import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableProfile from "@/Pages/Vendor/Profile/Partials/TableProfile";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useState } from "react";
import PDFPopup from "@/Components/PDFPopup";
import ModalViewer from "@/Components/ModalViewer";
import { ArrowLeft, File, Plus, Trash } from "react-feather";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import { useEffect } from "react";
import ModifyButton from "@/Components/ModifyButton";
import DangerButton from "@/Components/DangerButton";

export default function Show(props) {
    console.log(props);
    const {
		data,
		setData,
		post,
		processing,
		errors,
		recentlySuccessful,
		reset,
	} = useForm({
		top: props.data.vendor.top,
        ppn: props.data.vendor.ppn,
        pph: props.data.vendor.pph,
        can_edit_top_ppn: props.data.permissions.includes("update_ppn_top_vendor_profile"),
        can_edit_pph_coa: props.data.permissions.includes("update_skb_accounting_vendor_profile"),
        coa: "",
	});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpen1, setIsPopupOpen1] = useState(false);

    const [pdfUrl, setPdfUrl] = useState("");

    const openPopup = (item) => {
        // console.log(item);
        setPdfUrl(item);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const openPopup1 = (fileUrl) => {
        setPdfUrl(fileUrl);
        console.info(pdfUrl);
        setIsPopupOpen1(true);
    };

    const closePopup1 = () => {
        setPdfUrl("");
        setIsPopupOpen1(false);
    };

    const [selectedOptionTop, setSelectedOptionTop] = useState(
		props.data.vendor.top
	);

    const [selectedOptionPpn, setSelectedOptionPpn] = useState(
		props.data.vendor.ppn
	);

    const [selectedOptionPph, setSelectedOptionPph] = useState(
		props.data.vendor.pph
	);

    const handleTopChange = (event) => {
		data.top = event.target.value;
		setSelectedOptionTop(data.top);
	};

    const handlePpnChange = (event) => {
		data.ppn = event.target.value;
		setSelectedOptionPpn(data.ppn);
	};

    const handlePphChange = (event) => {
		data.pph = event.target.value;
		setSelectedOptionPph(data.pph);
	};

    const [isModalSSOpen, setIsModalSSOpen] = useState(false);

	const openModalSS = () => {
		setIsModalSSOpen(true);
	};

	const closeModalSS = () => {
		setIsModalSSOpen(false);
	};

    const [formDataSS, setFormDataSS] = useState({
		entries: [], // Array untuk menyimpan setiap entri
		currentEntry: {
			supplier_site: "",
			coa_prepayment: {
				coa_prepayment_1: "",
				coa_prepayment_2: "",
				coa_prepayment_3: "",
				coa_prepayment_4: "",
				coa_prepayment_5: "",
				coa_prepayment_6: "",
				coa_prepayment_7: "",
			},
			coa_liability_account: {
				coa_liability_account_1: "",
				coa_liability_account_2: "",
				coa_liability_account_3: "",
				coa_liability_account_4: "",
				coa_liability_account_5: "",
				coa_liability_account_6: "",
				coa_liability_account_7: "",
			},
			coa_receiving: {
				coa_receiving_1: "",
				coa_receiving_2: "",
				coa_receiving_3: "",
				coa_receiving_4: "",
				coa_receiving_5: "",
				coa_receiving_6: "",
				coa_receiving_7: "",
			},
		},
	});

	useEffect(() => {
		if (props.data.coa.entries.length > 0) {
			setFormDataSS({
				entries: props.data.coa.entries.map((entry) => ({
					supplier_site: entry.supplier_site,
					coa_prepayment: {
						coa_prepayment_1: entry.coa_prepayment.coa_prepayment_1,
						coa_prepayment_2: entry.coa_prepayment.coa_prepayment_2,
						coa_prepayment_3: entry.coa_prepayment.coa_prepayment_3,
						coa_prepayment_4: entry.coa_prepayment.coa_prepayment_4,
						coa_prepayment_5: entry.coa_prepayment.coa_prepayment_5,
						coa_prepayment_6: entry.coa_prepayment.coa_prepayment_6,
						coa_prepayment_7: entry.coa_prepayment.coa_prepayment_7,
					},
					coa_liability_account: {
						coa_liability_account_1:
							entry.coa_liability_account.coa_liability_account_1,
						coa_liability_account_2:
							entry.coa_liability_account.coa_liability_account_2,
						coa_liability_account_3:
							entry.coa_liability_account.coa_liability_account_3,
						coa_liability_account_4:
							entry.coa_liability_account.coa_liability_account_4,
						coa_liability_account_5:
							entry.coa_liability_account.coa_liability_account_5,
						coa_liability_account_6:
							entry.coa_liability_account.coa_liability_account_6,
						coa_liability_account_7:
							entry.coa_liability_account.coa_liability_account_7,
					},
					coa_receiving: {
						coa_receiving_1: entry.coa_receiving.coa_receiving_1,
						coa_receiving_2: entry.coa_receiving.coa_receiving_2,
						coa_receiving_3: entry.coa_receiving.coa_receiving_3,
						coa_receiving_4: entry.coa_receiving.coa_receiving_4,
						coa_receiving_5: entry.coa_receiving.coa_receiving_5,
						coa_receiving_6: entry.coa_receiving.coa_receiving_6,
						coa_receiving_7: entry.coa_receiving.coa_receiving_7,
					},
				})),
				currentEntry: {
					supplier_site: "",
					coa_prepayment: {
						coa_prepayment_1: "",
						coa_prepayment_2: "",
						coa_prepayment_3: "",
						coa_prepayment_4: "",
						coa_prepayment_5: "",
						coa_prepayment_6: "",
						coa_prepayment_7: "",
					},
					coa_liability_account: {
						coa_liability_account_1: "",
						coa_liability_account_2: "",
						coa_liability_account_3: "",
						coa_liability_account_4: "",
						coa_liability_account_5: "",
						coa_liability_account_6: "",
						coa_liability_account_7: "",
					},
					coa_receiving: {
						coa_receiving_1: "",
						coa_receiving_2: "",
						coa_receiving_3: "",
						coa_receiving_4: "",
						coa_receiving_5: "",
						coa_receiving_6: "",
						coa_receiving_7: "",
					},
				},
			});
		}
	}, []);

	const handleChangeSS = (event) => {
		const selectedOptions = Array.from(
			event.target.selectedOptions,
			(option) => option.value
		);
		setFormDataSS((prevFormData) => ({
			...prevFormData,
			currentEntry: {
				...prevFormData.currentEntry,
				supplier_site: selectedOptions,
			},
		}));
	};

	const handleChangeItemSS = (coaType, coaNumber, event) => {
		const { value } = event.target;
		setFormDataSS((prevFormData) => ({
			...prevFormData,
			currentEntry: {
				...prevFormData.currentEntry,
				[coaType]: {
					...prevFormData.currentEntry[coaType],
					[`${coaType}_${coaNumber}`]: value,
				},
			},
		}));
	};

	const addEntry = () => {
		const currentCoaValues = Object.values(
			formDataSS.currentEntry.coa_prepayment
		);
		const currentCoaValues2 = Object.values(
			formDataSS.currentEntry.coa_liability_account
		);
		const currentCoaValues3 = Object.values(
			formDataSS.currentEntry.coa_receiving
		);
		const currentCoaValues4 = Object.values(
			formDataSS.currentEntry.supplier_site
		);

		if (formDataSS.currentEntry.supplier_site) {
			if (
				currentCoaValues.every((value) => value !== "") &&
				currentCoaValues2.every((value) => value !== "") &&
				currentCoaValues3.every((value) => value !== "")
			) {
				setFormDataSS((prevFormData) => ({
					entries: [
						...prevFormData.entries,
						prevFormData.currentEntry,
					],
					currentEntry: {
						supplier_site: "",
						coa_prepayment: {
							coa_prepayment_1: "",
							coa_prepayment_2: "",
							coa_prepayment_3: "",
							coa_prepayment_4: "",
							coa_prepayment_5: "",
							coa_prepayment_6: "",
							coa_prepayment_7: "",
						},
						coa_liability_account: {
							coa_liability_account_1: "",
							coa_liability_account_2: "",
							coa_liability_account_3: "",
							coa_liability_account_4: "",
							coa_liability_account_5: "",
							coa_liability_account_6: "",
							coa_liability_account_7: "",
						},
						coa_receiving: {
							coa_receiving_1: "",
							coa_receiving_2: "",
							coa_receiving_3: "",
							coa_receiving_4: "",
							coa_receiving_5: "",
							coa_receiving_6: "",
							coa_receiving_7: "",
						},
					},
				}));
				data.coa = formDataSS;
				closeModalSS();
			} else {
				// Tampilkan pesan kesalahan atau ambil tindakan lain sesuai kebutuhan
				alert(
					"Please Choose all CoA options before adding a new entry."
				);
			}
		} else {
			alert("Please Choose Supplier Site before adding a new entry.");
		}
	};

	const handleDeleteEntry = (index) => {
        console.log('index', index);
		setFormDataSS((prevFormData) => {
            const updatedEntries = [...prevFormData.entries];
			updatedEntries.splice(index, 1);
            console.log('prevFormData', prevFormData);
            console.log('updatedEntries', updatedEntries);
            data.coa = {
				...prevFormData,
				entries: updatedEntries,
			};
			return {
				...prevFormData,
				entries: updatedEntries,
			};
		});
		console.log('formatDataSS', formDataSS);
	};

    const submit = (e) => {
		e.preventDefault();

		post(
			route("admin.vendor.update", props.data.vendor.id)
		);
	};

    const [expandedIndex, setExpandedIndex] = useState(-1);

    const toggleExpand = (index) => {
        if (expandedIndex === index) {
        setExpandedIndex(-1);
        } else {
        setExpandedIndex(index);
        }
    };

    const [selectSupplierSite, setSelectSupplierSite] = useState();
    const handleSupplierSiteChange = (event) => {
		setSelectSupplierSite(event.target.value);
	};

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Details Perubahan Data" />

            <PDFPopup
                pdfUrl={pdfUrl}
                show={isPopupOpen}
                onClose={closePopup}
                docs={props.docs}
            />

            <ModalViewer
                files={pdfUrl}
                show={isPopupOpen1}
                onClose={closePopup1}
            />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Vendor</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                            <a href={route("admin.vendor.index")}>Vendor</a>
                        </li>
                        <li className="breadcrumb-item active">
                            <a href="javascript: void(0);">Detail Vendor</a>
                        </li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="flex items-center gap-2">
                    <a href={route('admin.vendor.index')}><ArrowLeft /></a>
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg w-full">
                        <div className="p-6 text-gray-900 font-bold">Detail Vendor</div>
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">
                            <div className="mb-3">
                                <p className="font-bold mb-3">
                                    Company Information
                                </p>
                                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 text-sm text-gray-500 p-1">
                                    <div className="">
                                        <p className="mb-3">Nama</p>
                                        <p className="mb-3">Email Address</p>
                                        <p className="mb-3">NPWP</p>
                                        <p className="mb-3">KTP</p>
                                        <p className="mb-3">NPWP Address</p>
                                        <p className="mb-3">KTP Address</p>
                                    </div>
                                    <div className="">
                                        <p className="mb-3">
                                            : {props.data.vendor.name}, {props.data.vendor.legality}
                                        </p>
                                        <p className="mb-3">
                                            : {props.data.vendor.email}
                                        </p>
                                        <p className="mb-3">
                                            : {props.data.vendor.npwp}
                                        </p>
                                        <p className="mb-3">
                                            : {props.data.vendor.ktp}
                                        </p>
                                        <p className="mb-3">
                                            : {props.data.vendor.npwp_address}
                                        </p>
                                        <p className="mb-3">
                                            : {props.data.vendor.ktp_address}
                                        </p>
                                    </div>
                                    <div className="lg:ml-5 block">
                                        <p className="mb-3">Phone Number</p>
                                        <p className="mb-3">Mobile Number</p>
                                        {/* <p className='mb-3'>TOP</p>
                                        <p className='mb-3'>PPN</p>
                                        <p className='mb-3'>PPH</p>
                                        <p className='mb-3'>COA Prepayment</p>
                                        <p className='mb-3'>COA Liability Account</p>
                                        <p className='mb-3'>COA Receiving</p>
                                        <p className='mb-3'>Ship To</p>
                                        <p className='mb-3'>Bill To</p> */}
                                    </div>
                                    <div className="lg:ml-5">
                                        <p className="mb-3">
                                            : {props.data.vendor.phone_number}
                                        </p>
                                        <p className="mb-3">
                                            :{" "}
                                            {
                                                props.data.vendor
                                                    .mobile_phone_number
                                            }
                                        </p>
                                        {/* <p className='mb-3'>: {props.data.vendor.top  ? props.data.vendor.top : '-'}</p>
                                        <p className='mb-3'>: {props.data.vendor.ppn  ? props.data.vendor.ppn : '-'}</p>
                                        <p className='mb-3'>: {props.data.vendor.pph  ? props.data.vendor.pph : '-'}</p>
                                        <p className='mb-3'>: {props.data.vendor.coa_prepayment  ? props.data.vendor.coa_prepayment : '-'}</p>
                                        <p className='mb-3'>: {props.data.vendor.coa_liability_account  ? props.data.vendor.coa_liability_account : '-'}</p>
                                        <p className='mb-3'>: {props.data.vendor.coa_receiving  ? props.data.vendor.coa_receiving : '-'}</p>
                                        <p className='mb-3'>: {props.data.vendor.ship_to  ? props.data.vendor.ship_to : '-'}</p>
                                        <p className='mb-3'>: {props.data.vendor.bill_to  ? props.data.vendor.bill_to : '-'}</p> */}
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 border-dashed border-y-2 border-gray-300 p-1">
                                    <div className="border-l-0">
                                        <p className="font-bold text-black mb-3">
                                            Director Information
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Name
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Email Address
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Phone Number
                                        </p>
                                    </div>
                                    <div className=" border-gray-300 text-sm text-gray-500">
                                        <p className="mb-3">&nbsp;</p>
                                        <p className="mb-3">
                                            : {props.data.vendor.director_name}
                                        </p>
                                        <p className="mb-3">
                                            : {props.data.vendor.director_email}
                                        </p>
                                        <p className="mb-3">
                                            :{" "}
                                            {
                                                props.data.vendor
                                                    .director_phone_number
                                            }
                                        </p>
                                    </div>
                                    <div className="lg:ml-5 block">
                                        <p className="font-bold text-black mb-3">
                                            FA Information
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Name
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Email Address
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Phone Number
                                        </p>
                                    </div>
                                    <div className="lg:ml-5 text-sm text-gray-500">
                                        <p className="mb-3">&nbsp;</p>
                                        <p className="mb-3">
                                            : {props.data.vendor.fa_name}
                                        </p>
                                        <p className="mb-3">
                                            : {props.data.vendor.fa_email}
                                        </p>
                                        <p className="mb-3">
                                            :{" "}
                                            {props.data.vendor.fa_phone_number}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 border-dashed border-b-2 border-gray-300 p-1">
                                    <div className="border-l-0">
                                        <p className="font-bold text-black mb-3">
                                            Marketing/Key Account Information
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Name
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Email Address
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Phone Number
                                        </p>
                                    </div>
                                    <div className=" border-gray-300 text-sm text-gray-500">
                                        <p className="mb-3">&nbsp;</p>
                                        <p className="mb-3">
                                            :{" "}
                                            {
                                                props.data.vendor
                                                    .marketing_key_account
                                            }
                                        </p>
                                        <p className="mb-3">
                                            :{" "}
                                            {props.data.vendor.marketing_email}
                                        </p>
                                        <p className="mb-3">
                                            :{" "}
                                            {
                                                props.data.vendor
                                                    .marketing_phone_number
                                            }
                                        </p>
                                    </div>
                                    <div className="lg:ml-5 block">
                                        <p className="font-bold text-black mb-3">
                                            Financial Information
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Type Bank
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Bank
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Rekening Number
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Account Name
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Branch
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Swift Code
                                        </p>
                                    </div>
                                    <div className="lg:ml-5 text-sm text-gray-500">
                                        <p className="mb-3">&nbsp;</p>
                                        <p className="mb-3">
                                            :{" "}
                                            {props.data.vendor
                                                .is_virtual_account == 1
                                                ? "Virtual Account"
                                                : "Non Vitual Account"}
                                        </p>
                                        <p className="mb-3">
                                            :{" "}
                                            {props.data.vendor.is_bca == 1
                                                ? "BCA"
                                                : props.data.vendor.bank_name}
                                        </p>
                                        <p className="mb-3">
                                            :{" "}
                                            {
                                                props.data.vendor
                                                    .bank_account_number
                                            }
                                        </p>
                                        <p className="mb-3">
                                            :{" "}
                                            {
                                                props.data.vendor
                                                    .bank_account_name
                                            }
                                        </p>
                                        <p className="mb-3">
                                            : {props.data.vendor.branch_of_bank}
                                        </p>
                                        <p className="mb-3">
                                            :{" "}
                                            {props.data.vendor.bank_swift_code}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {props.data.vendor.type_of_business == "PKP" ? (
                                <div className="mb-3">
                                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 border-dashed border-b-2 border-gray-300 p-1">
                                        <div className="border-l-0">
                                            <p className="font-bold text-black mb-3">
                                                Business Information
                                            </p>
                                            <p className="text-sm text-gray-500 mb-3">
                                                Type
                                            </p>
                                            <p className="text-sm text-gray-500 mb-3">
                                                NPWP
                                            </p>
                                            <p className="text-sm text-gray-500 mb-3">
                                                SPPKP
                                            </p>
                                            <p className="text-sm text-gray-500 mb-4">
                                                SIUP
                                            </p>
                                            {props.data.vendor.file_tdp ? 
                                            <p className="text-sm text-gray-500 mb-4">
                                                TDP
                                            </p>
                                            :''}
                                            <p className="text-sm text-gray-500 mb-4">
                                                NIB
                                            </p>
                                            <p className="text-sm text-gray-500 mb-4">
                                                Akta Susunan Direksi
                                            </p>
                                        </div>
                                        <div className="border-dashed border-gray-300 text-sm text-gray-500">
                                            <p className="mb-3">&nbsp;</p>
                                            <p className="mb-3">
                                                : Wajib Pajak Badan Usaha PKP
                                            </p>
                                            <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor.file_npwp !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_npwp)
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
                                                    </a>
                                                ) : (
                                                    ""
                                                )}
                                                / <p>&nbsp;</p>
                                            </p>
                                            <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor.file_sppkp !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_sppkp)
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
                                                    </a>
                                                ) : (
                                                    <p>-</p>
                                                )}
                                                /{" "}
                                                {
                                                    props.data.vendor
                                                        .expired_sppkp
                                                }
                                            </p>
                                            <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor.file_siup !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_siup)
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
                                                    </a>
                                                ) : (
                                                    <p>-</p>
                                                )}
                                                /{" "}
                                                {props.data.vendor.expired_siup}
                                            </p>
                                            {props.data.vendor.file_tdp ?
                                            <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor.file_tdp !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_tdp)
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
                                                    </a>
                                                ) : (
                                                    <p>-</p>
                                                )}
                                                /{" "}
                                                {props.data.vendor.expired_tdp}
                                            </p>
                                            :''}
                                            <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor.file_nib !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_nib)
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
                                                    </a>
                                                ) : (
                                                    <p>-</p>
                                                )}
                                                /{" "}
                                                {props.data.vendor.expired_nib}
                                            </p>
                                            <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor
                                                    .file_board_of_directors_composition !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_board_of_directors_composition)
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
                                                    </a>
                                                ) : (
                                                    <p>-</p>
                                                )}
                                                / <p>&nbsp;</p>
                                            </p>
                                        </div>
                                        <div className="lg:ml-5 block">
                                            <p className="font-bold text-black mb-3">
                                                &nbsp;
                                            </p>
                                            <p className="mb-3">&nbsp;</p>
                                            {/* <p className="text-sm text-gray-500 mb-3">
                                                Akta Susunan Direksi
                                            </p> */}
                                            {/* <p className='text-sm text-gray-500 mb-3'>Halaman Depan Rekening</p>
                                        <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Rekening Bank</p> */}
                                        </div>
                                        <div className="lg:ml-5 text-sm text-gray-500">
                                            <p className="mb-3">&nbsp;</p>
                                            <p className="mb-3">&nbsp;</p>
                                            {/* <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor
                                                    .file_board_of_directors_composition !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_board_of_directors_composition)
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
                                                    </a>
                                                ) : (
                                                    <p>-</p>
                                                )}
                                                <p>&nbsp;</p>
                                            </p> */}
                                            {/* <p className='mb-3 grid grid-cols-3'>:
                                            {props.data.vendor.file_front_page_bank != '' ? <a href={props.data.vendor.file_front_page_bank} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
                                        <p className='mb-3 grid grid-cols-3'>:
                                            {props.data.vendor.file_bank_account_statement_letter != '' ? <a href={props.data.vendor.file_bank_account_statement_letter} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p> */}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}

                            {props.data.vendor.type_of_business == "Non PKP" ? (
                                <div className="mb-3">
                                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 border-dashed border-b-2 border-gray-300 p-1">
                                        <div className="border-l-0">
                                            <p className="font-bold text-black mb-3">
                                                Business Information
                                            </p>
                                            <p className="text-sm text-gray-500 mb-3">
                                                Type
                                            </p>
                                            <p className="text-sm text-gray-500 mb-3">
                                                NPWP
                                            </p>
                                            <p className="text-sm text-gray-500 mb-3">
                                                SPPKP
                                            </p>
                                            <p className="text-sm text-gray-500 mb-3">
                                                SIUP
                                            </p>
                                            {props.data.vendor.file_tdp ?
                                            <p className="text-sm text-gray-500 mb-4">
                                                TDP
                                            </p>
                                            :''}
                                            <p className="text-sm text-gray-500 mb-4">
                                                NIB
                                            </p>
                                            <p className="text-sm text-gray-500 mb-4">
                                                Akta Susunan Direksi
                                            </p>
                                            <p className="text-sm text-gray-500 mb-4">
                                                Surat Pernyataan Non PKP
                                            </p>
                                        </div>
                                        <div className="border-dashed border-gray-300 text-sm text-gray-500">
                                            <p className="mb-3">&nbsp;</p>
                                            <p className="mb-3">
                                                : Wajib Pajak Badan Usaha Non
                                                PKP
                                            </p>
                                            <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor.file_npwp !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_npwp)
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
                                                    </a>
                                                ) : (
                                                    ""
                                                )}
                                                / <p>&nbsp;</p>
                                            </p>
                                            <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor.file_sppkp !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_sppkp)
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
                                                    </a>
                                                ) : (
                                                    <p>-</p>
                                                )}
                                                /{" "}
                                                {
                                                    props.data.vendor
                                                        .expired_sppkp
                                                }
                                            </p>
                                            <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor.file_siup !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_siup)
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
                                                    </a>
                                                ) : (
                                                    <p>-</p>
                                                )}
                                                /{" "}
                                                {props.data.vendor.expired_siup}
                                            </p>
                                            {props.data.vendor.file_tdp ?
                                            <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor.file_tdp !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_tdp)
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
                                                    </a>
                                                ) : (
                                                    <p>-</p>
                                                )}
                                                /{" "}
                                                {props.data.vendor.expired_tdp}
                                            </p>
                                            :''}
                                            <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor.file_nib !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_nib)
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
                                                    </a>
                                                ) : (
                                                    <p>-</p>
                                                )}
                                                /{" "}
                                                {props.data.vendor.expired_nib}
                                            </p>
                                            <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor
                                                    .file_board_of_directors_composition !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_board_of_directors_composition)
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
                                                    </a>
                                                ) : (
                                                    <p>-</p>
                                                )}
                                                / <p>&nbsp;</p>
                                            </p>
                                            <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor
                                                    .file_non_pkp_statement !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_non_pkp_statement)
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
                                                    </a>
                                                ) : (
                                                    <p>-</p>
                                                )}
                                                / <p>&nbsp;</p>
                                            </p>
                                        </div>
                                        <div className="lg:ml-5 block">
                                            <p className="font-bold text-black mb-3">
                                                &nbsp;
                                            </p>
                                            <p className="mb-3">&nbsp;</p>
                                            {/* <p className="text-sm text-gray-500 mb-3">
                                                Akta Susunan Direksi
                                            </p> */}
                                            {/* <p className='text-sm text-gray-500 mb-3'>Halaman Depan Rekening</p>
                                        <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Rekening Bank</p> */}
                                            {/* <p className="text-sm text-gray-500 mb-3">
                                                Surat Pernyataan Non PKP
                                            </p> */}
                                        </div>
                                        <div className="lg:ml-5 text-sm text-gray-500">
                                            <p className="mb-3">&nbsp;</p>
                                            <p className="mb-3">&nbsp;</p>
                                            {/* <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor
                                                    .file_board_of_directors_composition !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_board_of_directors_composition)
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
                                                    </a>
                                                ) : (
                                                    <p>-</p>
                                                )}
                                                <p>&nbsp;</p>
                                            </p> */}
                                            {/* <p className='mb-3 grid grid-cols-3'>:
                                            {props.data.vendor.file_front_page_bank != '' ? <a href={props.data.vendor.file_front_page_bank} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
                                        <p className='mb-3 grid grid-cols-3'>:
                                            {props.data.vendor.file_bank_account_statement_letter != '' ? <a href={props.data.vendor.file_bank_account_statement_letter} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p> */}
                                            {/* <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor
                                                    .file_non_pkp_statement !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_non_pkp_statement)
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
                                                    </a>
                                                ) : (
                                                    <p>-</p>
                                                )}
                                                <p>&nbsp;</p>
                                            </p> */}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}

                            {props.data.vendor.type_of_business == "Prinadi" ? (
                                <div className="mb-3">
                                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 border-dashed border-b-2 border-gray-300 p-1">
                                        <div className="border-l-0">
                                            <p className="font-bold text-black mb-3">
                                                Business Information
                                            </p>
                                            <p className="text-sm text-gray-500 mb-3">
                                                Type
                                            </p>
                                            <p className="text-sm text-gray-500 mb-3">
                                                NPWP/KTP
                                            </p>
                                            <p className="text-sm text-gray-500 mb-3">
                                                Surat Pernyataan Non PKP
                                            </p>
                                            {/* <p className='text-sm text-gray-500 mb-3'>E-KTP</p> */}
                                        </div>
                                        <div className="border-dashed border-gray-300 text-sm text-gray-500">
                                            <p className="mb-3">&nbsp;</p>
                                            <p className="mb-3">
                                                : Wajib Pajak Orang Pribadi ({props.data.vendor.type_of_business == 'Pribadi' ? 'PKP' : ''} {props.data.vendor.type_of_business == 'Pribadi Non PKP' ? 'Non PKP' : ''})
                                            </p>
                                            <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor.file_npwp !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_npwp)
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
                                                    </a>
                                                ) : (
                                                    ""
                                                )}
                                                <p>&nbsp;</p>
                                            </p>
                                            <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor
                                                    .file_non_pkp_statement !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_non_pkp_statement)
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
                                                    </a>
                                                ) : (
                                                    <p>-</p>
                                                )}
                                                <p>&nbsp;</p>
                                            </p>
                                            {/* <p className='mb-3 grid grid-cols-3'>:
                                            {props.data.vendor.file_ektp != '' ? <a href={props.data.vendor.file_ektp} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            / {props.data.vendor.expired_ektp}
                                        </p> */}
                                        </div>
                                        <div className="lg:ml-5 block">
                                            <p className="font-bold text-black mb-3">
                                                &nbsp;
                                            </p>
                                            <p className="mb-3">&nbsp;</p>
                                            {/* <p className='text-sm text-gray-500 mb-3'>Halaman Depan Rekening</p>
                                        <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Rekening Bank</p> */}
                                            {/* <p className="text-sm text-gray-500 mb-3">
                                                Surat Pernyataan Non PKP
                                            </p> */}
                                        </div>
                                        <div className="lg:ml-5 text-sm text-gray-500">
                                            <p className="mb-3">&nbsp;</p>
                                            <p className="mb-3">&nbsp;</p>
                                            {/* <p className='mb-3 grid grid-cols-3'>:
                                            {props.data.vendor.file_front_page_bank != '' ? <a href={props.data.vendor.file_front_page_bank} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
                                        <p className='mb-3 grid grid-cols-3'>:
                                            {props.data.vendor.file_bank_account_statement_letter != '' ? <a href={props.data.vendor.file_bank_account_statement_letter} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p> */}
                                            {/* <p className="mb-3 grid grid-cols-3">
                                                :
                                                
                                                {props.data.vendor
                                                    .file_non_pkp_statement !=
                                                "" ? (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={(e) =>
                                                            openPopup1(props.data.vendor.file_non_pkp_statement)
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
                                                    </a>
                                                ) : (
                                                    <p>-</p>
                                                )}
                                                <p>&nbsp;</p>
                                            </p> */}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            <div className='grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 border-dashed border-b-2 border-gray-300 p-1'>
                                <div className='border-l-0'>
                                    <p className="font-bold text-black mb-3">Additional Information</p>
                                    <div className="grid grid-cols-3">
                                        {props.data.permissions.includes("update_ppn_top_vendor_profile") && !props.data.permissions.includes("update_skb_accounting_vendor_profile") ? 
                                            <div className="mb-3">
                                                <InputLabel
                                                    value="Top"
                                                    className="font-bold"
                                                    required={true}
                                                />
                                                <select
                                                    className="select select-bordered w-full mt-1"
                                                    id="top"
                                                    name="top"
                                                    value={
                                                        selectedOptionTop
                                                    }
                                                    onChange={
                                                        handleTopChange
                                                    }
                                                >
                                                    <option
                                                        value=""
                                                        hidden
                                                    >
                                                        Top
                                                    </option>
                                                    {props.data.payment_terms.map(
                                                        (item) => (
                                                            <option
                                                                key={
                                                                    item.id
                                                                }
                                                                value={
                                                                    item.day
                                                                }
                                                            >
                                                                {
                                                                    item.name
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                <InputError
                                                    message={errors.top}
                                                    className="mt-2"
                                                />
                                            </div>
                                        : 
                                            <p className='mb-3 text-gray-500'>TOP: {props.data.vendor.top ?? '-'} Hari</p>
                                        }
                                        {props.data.permissions.includes("update_ppn_top_vendor_profile") && !props.data.permissions.includes("update_skb_accounting_vendor_profile") ? 
                                            <div className="mb-3">
                                                <InputLabel
                                                    value="PPN"
                                                    className="font-bold"
                                                    required={true}
                                                />
                                                <select
                                                    className="select select-bordered w-full mt-1"
                                                    id="ppn"
                                                    name="ppn"
                                                    value={
                                                        selectedOptionPpn
                                                    }
                                                    onChange={
                                                        handlePpnChange
                                                    }
                                                >
                                                    <option
                                                        value=""
                                                        hidden
                                                    >
                                                        PPN
                                                    </option>
                                                    {props.data.taxes.map(
                                                        (item) => (
                                                            <option
                                                                key={
                                                                    item.id
                                                                }
                                                                value={
                                                                    item.tax
                                                                }
                                                            >
                                                                {
                                                                    item.name
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                <InputError
                                                    message={errors.ppn}
                                                    className="mt-2"
                                                />
                                            </div>
                                        : 
                                            <p className='mb-3 text-gray-500'>PPN: {props.data.vendor.ppn ?? '-'}%</p>
                                        }
                                        {props.data.permissions.includes("update_skb_accounting_vendor_profile") ? 
                                            <>
                                                <div className="mb-3">
                                                    <InputLabel
                                                        value="PPH"
                                                        className="font-bold"
                                                        required={true}
                                                    />
                                                    <select
                                                        className="select select-bordered w-full mt-1"
                                                        id="pph"
                                                        name="pph"
                                                        value={
                                                            selectedOptionPph
                                                        }
                                                        onChange={
                                                            handlePphChange
                                                        }
                                                    >
                                                        <option
                                                            value=""
                                                            hidden
                                                        >
                                                            PPH
                                                        </option>
                                                        <option value="ada">
                                                            Ada
                                                        </option>
                                                        <option value="tidak ada">
                                                            Tidak Ada
                                                        </option>
                                                    </select>
                                                    <InputError
                                                        message={errors.pph}
                                                        className="mt-2"
                                                    />
                                                </div>
                                                {props.data.permissions.includes(
                                                    "update_skb_accounting_vendor_profile"
                                                ) ? (
                                                    <div className="mb-3">
                                                        <InputLabel
                                                            value="Supplier Site"
                                                            className="font-bold"
                                                            required={true}
                                                        />
                                                        <select
                                                            className="select select-bordered w-full mt-1"
                                                            id="supplier_site"
                                                            name="supplier_site"
                                                            value={
                                                                selectSupplierSite
                                                            }
                                                            onChange={
                                                                handleSupplierSiteChange
                                                            }
                                                        >
                                                            <option value="">Choose</option>
                                                            {
                                                                props.data.supplier_sites.map((item, key) => (
                                                                    <option value={item.name}>{item.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {props.data.permissions.includes(
                                                    "update_skb_accounting_vendor_profile"
                                                ) ? (
                                                    <div></div>
                                                ) : (
                                                    ""
                                                )}
                                                {props.data.permissions.includes(
                                                    "update_skb_accounting_vendor_profile"
                                                ) ? (
                                                    <div></div>
                                                ) : (
                                                    ""
                                                )}
                                                {props.data.permissions.includes(
                                                    "update_skb_accounting_vendor_profile"
                                                ) ? (
                                                    <>
                                                        <div className="mb-3">
                                                            <ModifyButton
                                                                type="button"
                                                                onClick={(e) =>
                                                                    openModalSS(
                                                                        e
                                                                    )
                                                                }
                                                            >
                                                                <Plus />
                                                            </ModifyButton>
                                                        </div>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                                {props.data.permissions.includes("update_skb_accounting_vendor_profile")
                                                ?
                                                <p></p>
                                                : ''}
                                                {props.data.permissions.includes("update_skb_accounting_vendor_profile")
                                                ?
                                                <p></p>
                                                : ''}
                                                {/* {props.data.vendor.coas.map((item, index) => (
                                                    <>
                                                        <p className='mb-1 text-gray-500'>Supplier Site: {item.supplier_site ?? '-'}</p>
                                                        <p></p>
                                                        <p></p>
                                                        <p className='mb-1 text-gray-500'>COA Prepayment: </p>
                                                        <p className='mb-1 text-gray-500'>COA Liability Account: </p>
                                                        <p className='mb-1 text-gray-500'>COA Receiving: </p>
                                                        <p className="text-gray-500 mb-3">{item.coa_prepayment_1 ?? '-'} - {item.coa_prepayment_2 ?? '-'} - {item.coa_prepayment_3 ?? '-'} - {item.coa_prepayment_4 ?? '-'} - {item.coa_prepayment_5 ?? '-'} - {item.coa_prepayment_6 ?? '-'} - {item.coa_prepayment_7 ?? '-'}</p>
                                                        <p className="text-gray-500 mb-3">{item.coa_liability_account_1 ?? '-'} - {item.coa_liability_account_2 ?? '-'} - {item.coa_liability_account_3 ?? '-'} - {item.coa_liability_account_4 ?? '-'} - {item.coa_liability_account_5 ?? '-'} - {item.coa_liability_account_6 ?? '-'} - {item.coa_liability_account_7 ?? '-'}</p>
                                                        <p className="text-gray-500 mb-3">{item.coa_receiving_1 ?? '-'} - {item.coa_receiving_2 ?? '-'} - {item.coa_receiving_3 ?? '-'} - {item.coa_receiving_4 ?? '-'} - {item.coa_receiving_5 ?? '-'} - {item.coa_receiving_6 ?? '-'} - {item.coa_receiving_7 ?? '-'}</p>
                                                    </>
                                                ))} */}
                                                {/* <div>
                                                    {formDataSS.entries.map(
                                                        (entry, index) => (
                                                            <div
                                                                key={index}
                                                                className="border-2 p-4 text-center mb-3"
                                                            >
                                                                <InputLabel
                                                                    value={`Supplier Site: `}
                                                                    className="font-bold text-center"
                                                                />
                                                                <p>{entry.supplier_site}</p>
                                                                {[
                                                                    "coa_prepayment",
                                                                    "coa_liability_account",
                                                                    "coa_receiving",
                                                                ].map(
                                                                    (
                                                                        coaType
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                coaType
                                                                            }
                                                                        >
                                                                            <div className="grid grid-cols-1 mb-1 text-center">
                                                                                <table className="table table-xs text-center">
                                                                                    <thead>
                                                                                        <tr className="border-t bg-gray-100 text-center">
                                                                                            <th colSpan="7">{`COA ${coaType.toUpperCase()}`}</th>
                                                                                        </tr>
                                                                                        <tr></tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr className="border-collapse border-1 border-gray-500 text-center">
                                                                                            <td
                                                                                                colSpan="7"
                                                                                                className="border-collapse border-gray-500 justify-evenly"
                                                                                            >
                                                                                                {Array.from(
                                                                                                    {
                                                                                                        length: 7,
                                                                                                    },
                                                                                                    (
                                                                                                        _,
                                                                                                        coaNumber
                                                                                                    ) => (
                                                                                                        <>
                                                                                                            {
                                                                                                                entry[
                                                                                                                coaType
                                                                                                                ][
                                                                                                                `${coaType}_${coaNumber +
                                                                                                                1
                                                                                                                }`
                                                                                                                ]
                                                                                                            }
                                                                                                            {coaNumber + 1 != 7 ? '-' : ''}
                                                                                                        </>
                                                                                                    )
                                                                                                )}
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}
                                                                {props.data.permissions.includes(
                                                                    "update_skb_accounting_vendor_profile"
                                                                ) ? (
                                                                    <div className="text-end">
                                                                        <DangerButton
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleDeleteEntry(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            <Trash />
                                                                        </DangerButton>
                                                                    </div>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </div> */}

                                                <div>
                                                    {formDataSS.entries.map((entry, index) => (
                                                        <div key={index} hidden={entry.supplier_site == selectSupplierSite ? false : true}>
                                                            <div className="border-2 p-4 text-center mb-3">
                                                            <div className="cursor-pointer" onClick={() => toggleExpand(index)}>
                                                                {/* Card Title */}
                                                                <InputLabel
                                                                value={`Supplier Site: `}
                                                                className="font-bold text-center"
                                                                />
                                                                <p>{entry.supplier_site}</p>
                                                            </div>
                                                            {expandedIndex === index && (
                                                                <>
                                                                    {[
                                                                        "coa_prepayment",
                                                                        "coa_liability_account",
                                                                        "coa_receiving",
                                                                    ].map(
                                                                        (
                                                                            coaType
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    coaType
                                                                                }
                                                                            >
                                                                                <div className="grid grid-cols-1 mb-1 text-center">
                                                                                    <table className="table table-xs text-center">
                                                                                        <thead>
                                                                                            <tr className="border-t bg-gray-100 text-center">
                                                                                                <th colSpan="7">{`COA ${coaType.toUpperCase()}`}</th>
                                                                                            </tr>
                                                                                            <tr></tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            <tr className="border-collapse border-1 border-gray-500 text-center">
                                                                                                <td
                                                                                                    colSpan="7"
                                                                                                    className="border-collapse border-gray-500 justify-evenly"
                                                                                                >
                                                                                                    {Array.from(
                                                                                                        {
                                                                                                            length: 7,
                                                                                                        },
                                                                                                        (
                                                                                                            _,
                                                                                                            coaNumber
                                                                                                        ) => (
                                                                                                            <>
                                                                                                                {
                                                                                                                    entry[
                                                                                                                    coaType
                                                                                                                    ][
                                                                                                                    `${coaType}_${coaNumber +
                                                                                                                    1
                                                                                                                    }`
                                                                                                                    ]
                                                                                                                }
                                                                                                                {coaNumber + 1 != 7 ? '-' : ''}
                                                                                                            </>
                                                                                                        )
                                                                                                    )}
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    
                                                                    )}
                                                                    {props.data.permissions.includes(
                                                                        "update_skb_accounting_vendor_profile"
                                                                    ) ? (
                                                                        <div className="text-end">
                                                                            <DangerButton
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    handleDeleteEntry(
                                                                                        index
                                                                                    )
                                                                                }
                                                                            >
                                                                                <Trash />
                                                                            </DangerButton>
                                                                        </div>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </>
                                                            )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        : 
                                            // <>
                                            //     {/* <p className='mb-3 text-gray-500'>SKB: {props.data.vendor.skb ?? '-'}</p> */}
                                            //     <p className='mb-3 text-gray-500'>PPH: {props.data.vendor.pph ?? '-'}</p>
                                            //     {/* <p className='mb-3 text-gray-500'>Ship To: {props.data.vendor.ship_to ?? '-'}</p>
                                            //     <p className='mb-3 text-gray-500'>Bill To: {props.data.vendor.bill_to ?? '-'}</p> */}
                                            //     {/* <p></p> */}
                                            //     {/* <p></p> */}
                                            //     {props.data.vendor.coas.map((item, index) => (
                                            //         <>
                                            //             <p className='mb-1 text-gray-500'>Supplier Site: {item.supplier_site ?? '-'}</p>
                                            //             <p></p>
                                            //             <p></p>
                                            //             <p className='mb-1 text-gray-500'>COA Prepayment: </p>
                                            //             <p className='mb-1 text-gray-500'>COA Liability Account: </p>
                                            //             <p className='mb-1 text-gray-500'>COA Receiving: </p>
                                            //             <p className="text-gray-500 mb-3">{item.coa_prepayment_1 ?? '-'} - {item.coa_prepayment_2 ?? '-'} - {item.coa_prepayment_3 ?? '-'} - {item.coa_prepayment_4 ?? '-'} - {item.coa_prepayment_5 ?? '-'} - {item.coa_prepayment_6 ?? '-'} - {item.coa_prepayment_7 ?? '-'}</p>
                                            //             <p className="text-gray-500 mb-3">{item.coa_liability_account_1 ?? '-'} - {item.coa_liability_account_2 ?? '-'} - {item.coa_liability_account_3 ?? '-'} - {item.coa_liability_account_4 ?? '-'} - {item.coa_liability_account_5 ?? '-'} - {item.coa_liability_account_6 ?? '-'} - {item.coa_liability_account_7 ?? '-'}</p>
                                            //             <p className="text-gray-500 mb-3">{item.coa_receiving_1 ?? '-'} - {item.coa_receiving_2 ?? '-'} - {item.coa_receiving_3 ?? '-'} - {item.coa_receiving_4 ?? '-'} - {item.coa_receiving_5 ?? '-'} - {item.coa_receiving_6 ?? '-'} - {item.coa_receiving_7 ?? '-'}</p>
                                            //         </>
                                            //     ))}
                                            // </>
                                            ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="font-bold mb-3 p-6">
                            <form onSubmit={submit}>
                                <Link href={route("admin.vendor.index")}>
                                    <SecondaryButton type="button">Back</SecondaryButton>
                                </Link>
                                {props.data.permissions.includes("update_ppn_top_vendor_profile") || props.data.permissions.includes("update_skb_accounting_vendor_profile")
                                ?
                                    <PrimaryButton
                                        className="items-center justify-center ml-3"
                                        type="submit"
                                    >
                                        Save
                                    </PrimaryButton>
                                : ''}
                            </form>
                        </p>

                        <Modal show={isModalSSOpen} onClose={closeModalSS}>
                            <div className="p-3 mb-3">
                                <div className="flex justify-center">
                                    <InputLabel
                                        value="Add Supplier Site"
                                        className="font-bold text-xl"
                                        required={true}
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        value="Supplier Site"
                                        className="font-bold"
                                        required={true}
                                    />

                                    <div className="grid grid-cols-1 items-center gap-3">
                                        <select
                                            className="select select-bordered w-full mt-1"
                                            id="supplier_site"
                                            name="supplier_site"
                                            // value={selectedValue5}
                                            onChange={handleChangeSS}
                                            value={formDataSS.currentEntry.supplier_site}
                                            required
                                        >
                                            {
                                                props.data.supplier_sites.map((item, key) => (
                                                    <option value={item.name}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    {[
                                        "coa_prepayment",
                                        "coa_liability_account",
                                        "coa_receiving",
                                    ].map((coaType) => (
                                        <div key={coaType}>
                                            <div className="font-bold mb-1 mt-2">
                                                {coaType}
                                            </div>
                                            <div className="grid grid-cols-7 items-center gap-1">
                                                {Array.from({ length: 7 }, (_, index) => (
                                                    <>
                                                        {index == 0 ? (
                                                            <select
                                                                key={index}
                                                                className="select select-bordered w-full mt-1"
                                                                onChange={(event) =>
                                                                    handleChangeItemSS(
                                                                        coaType,
                                                                        index + 1,
                                                                        event
                                                                    )
                                                                }
                                                                value={
                                                                    formDataSS.currentEntry[
                                                                    coaType
                                                                    ][
                                                                    `${coaType}_${index + 1
                                                                    }`
                                                                    ]
                                                                }
                                                                required
                                                            >
                                                                <option value="" hidden>
                                                                    Choose
                                                                </option>
                                                                {props.data.coa_1 ? props.data.coa_1.map(
                                                                    (item, index) => (
                                                                        <option
                                                                            value={
                                                                                item.coa_name
                                                                            }
                                                                        >
                                                                            {item.coa_name}
                                                                        </option>
                                                                    )
                                                                ) : null}
                                                                {/* Tambahkan opsi lain jika diperlukan */}
                                                            </select>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {index == 1 ? (
                                                            <select
                                                                key={index}
                                                                className="select select-bordered w-full mt-1"
                                                                onChange={(event) =>
                                                                    handleChangeItemSS(
                                                                        coaType,
                                                                        index + 1,
                                                                        event
                                                                    )
                                                                }
                                                                value={
                                                                    formDataSS.currentEntry[
                                                                    coaType
                                                                    ][
                                                                    `${coaType}_${index + 1
                                                                    }`
                                                                    ]
                                                                }
                                                                required
                                                            >
                                                                <option value="" hidden>
                                                                    Choose
                                                                </option>
                                                                {props.data.coa_2 ? props.data.coa_2.map(
                                                                    (item, index) => (
                                                                        <option
                                                                            value={
                                                                                item.coa_name
                                                                            }
                                                                        >
                                                                            {item.coa_name}
                                                                        </option>
                                                                    )
                                                                ) : null}
                                                                {/* Tambahkan opsi lain jika diperlukan */}
                                                            </select>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {index == 2 ? (
                                                            <select
                                                                key={index}
                                                                className="select select-bordered w-full mt-1"
                                                                onChange={(event) =>
                                                                    handleChangeItemSS(
                                                                        coaType,
                                                                        index + 1,
                                                                        event
                                                                    )
                                                                }
                                                                value={
                                                                    formDataSS.currentEntry[
                                                                    coaType
                                                                    ][
                                                                    `${coaType}_${index + 1
                                                                    }`
                                                                    ]
                                                                }
                                                                required
                                                            >
                                                                <option value="" hidden>
                                                                    Choose
                                                                </option>
                                                                {props.data.coa_3 ? props.data.coa_3.map(
                                                                    (item, index) => (
                                                                        <option
                                                                            value={
                                                                                item.coa_name
                                                                            }
                                                                        >
                                                                            {item.coa_name}
                                                                        </option>
                                                                    )
                                                                ) : null}
                                                                {/* Tambahkan opsi lain jika diperlukan */}
                                                            </select>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {index == 3 ? (
                                                            <select
                                                                key={index}
                                                                className="select select-bordered w-full mt-1"
                                                                onChange={(event) =>
                                                                    handleChangeItemSS(
                                                                        coaType,
                                                                        index + 1,
                                                                        event
                                                                    )
                                                                }
                                                                value={
                                                                    formDataSS.currentEntry[
                                                                    coaType
                                                                    ][
                                                                    `${coaType}_${index + 1
                                                                    }`
                                                                    ]
                                                                }
                                                                required
                                                            >
                                                                <option value="" hidden>
                                                                    Choose
                                                                </option>
                                                                {props.data.coa_4 ? props.data.coa_4.map(
                                                                    (item, index) => (
                                                                        <option
                                                                            value={
                                                                                item.coa_name
                                                                            }
                                                                        >
                                                                            {item.coa_name}
                                                                        </option>
                                                                    )
                                                                ) : null}
                                                                {/* Tambahkan opsi lain jika diperlukan */}
                                                            </select>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {index == 4 ? (
                                                            <select
                                                                key={index}
                                                                className="select select-bordered w-full mt-1"
                                                                onChange={(event) =>
                                                                    handleChangeItemSS(
                                                                        coaType,
                                                                        index + 1,
                                                                        event
                                                                    )
                                                                }
                                                                value={
                                                                    formDataSS.currentEntry[
                                                                    coaType
                                                                    ][
                                                                    `${coaType}_${index + 1
                                                                    }`
                                                                    ]
                                                                }
                                                                required
                                                            >
                                                                <option value="" hidden>
                                                                    Choose
                                                                </option>
                                                                {props.data.coa_5 ? props.data.coa_5.map(
                                                                    (item, index) => (
                                                                        <option
                                                                            value={
                                                                                item.coa_name
                                                                            }
                                                                        >
                                                                            {item.coa_name}
                                                                        </option>
                                                                    )
                                                                ) : null}
                                                                {/* Tambahkan opsi lain jika diperlukan */}
                                                            </select>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {index == 5 ? (
                                                            <select
                                                                key={index}
                                                                className="select select-bordered w-full mt-1"
                                                                onChange={(event) =>
                                                                    handleChangeItemSS(
                                                                        coaType,
                                                                        index + 1,
                                                                        event
                                                                    )
                                                                }
                                                                value={
                                                                    formDataSS.currentEntry[
                                                                    coaType
                                                                    ][
                                                                    `${coaType}_${index + 1
                                                                    }`
                                                                    ]
                                                                }
                                                                required
                                                            >
                                                                <option value="" hidden>
                                                                    Choose
                                                                </option>
                                                                {props.data.coa_6 ? props.data.coa_6.map(
                                                                    (item, index) => (
                                                                        <option
                                                                            value={
                                                                                item.coa_name
                                                                            }
                                                                        >
                                                                            {item.coa_name}
                                                                        </option>
                                                                    )
                                                                ) : null}
                                                                {/* Tambahkan opsi lain jika diperlukan */}
                                                            </select>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {index == 6 ? (
                                                            <select
                                                                key={index}
                                                                className="select select-bordered w-full mt-1"
                                                                onChange={(event) =>
                                                                    handleChangeItemSS(
                                                                        coaType,
                                                                        index + 1,
                                                                        event
                                                                    )
                                                                }
                                                                value={
                                                                    formDataSS.currentEntry[
                                                                    coaType
                                                                    ][
                                                                    `${coaType}_${index + 1
                                                                    }`
                                                                    ]
                                                                }
                                                                required
                                                            >
                                                                <option value="" hidden>
                                                                    Choose
                                                                </option>
                                                                {props.data.coa_7 ? props.data.coa_7.map(
                                                                    (item, index) => (
                                                                        <option
                                                                            value={
                                                                                item.coa_name
                                                                            }
                                                                        >
                                                                            {item.coa_name}
                                                                        </option>
                                                                    )
                                                                ) : null}
                                                                {/* Tambahkan opsi lain jika diperlukan */}
                                                            </select>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <SecondaryButton onClick={closeModalSS}>
                                        Close
                                    </SecondaryButton>
                                    <PrimaryButton onClick={addEntry}>Simpan</PrimaryButton>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
