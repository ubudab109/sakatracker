import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import TableVendorProfile from "./Partials/TableVendorProfile";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import PDFPopup from "@/Components/PDFPopup";
import ModalViewer from "@/Components/ModalViewer";
import {
	ArrowLeft,
	Check,
	CheckSquare,
	Edit,
	Plus,
	Trash,
	X,
} from "react-feather";
import DangerButton from "@/Components/DangerButton";
import ModifyButton from "@/Components/ModifyButton";
import Modal from "@/Components/Modal";
import { useEffect } from "react";

export default function Index(props) {
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
		status: "",
		note: props.data.revision_vendor.note != null ? props.data.revision_vendor.note : props.data.before_revision_vendor ? props.data.before_revision_vendor.note : '',
		document: "",
		top: props.data.revision_vendor.vendor.top,
		ppn: props.data.revision_vendor.vendor.ppn,
		skb: props.data.revision_vendor.vendor.skb,
		pph: props.data.revision_vendor.vendor.pph,
		// coa_prepayment: props.data.revision_vendor.vendor.coa_prepayment,
		// coa_liability_account: props.data.revision_vendor.vendor.coa_liability_account,
		// coa_receiving: props.data.revision_vendor.vendor.coa_receiving,
		ship_to: props.data.revision_vendor.vendor.ship_to,
		bill_to: props.data.revision_vendor.vendor.bill_to,
		approval_role: "",

		npwp_note: props.data.revision_vendor.vendor.npwp_note == null ? 'NPWP terdapat kesalahan' : props.data.revision_vendor.vendor.npwp_note,
		sppkp_note: props.data.revision_vendor.vendor.sppkp_note == null ? 'SPPKP terdapat kesalahan' : props.data.revision_vendor.vendor.sppkp_note,
		siup_note: props.data.revision_vendor.vendor.siup_note == null ? 'SIUP terdapat kesalahan' : props.data.revision_vendor.vendor.siup_note,
		tdp_note: props.data.revision_vendor.vendor.tdp_note == null ? 'TDP terdapat kesalahan' : props.data.revision_vendor.vendor.tdp_note,
		nib_note: props.data.revision_vendor.vendor.nib_note == null ? 'NIB terdapat kesalahan' : props.data.revision_vendor.vendor.nib_note,
		board_of_directors_composition_note:
			props.data.revision_vendor.vendor
				.board_of_directors_composition_note == null ? 'Akta Susunan Direksi terdapat kesalahan' : props.data.revision_vendor.vendor
				.board_of_directors_composition_note,
		non_pkp_statement_note: props.data.revision_vendor.vendor.non_pkp_statement_note == null ? 'Surat Pernyataan Non PKP terdapat kesalahan' : props.data.revision_vendor.vendor.non_pkp_statement_note,

		file_npwp_validate: props.data.revision_vendor.vendor.npwp_note,
		file_sppkp_validate: props.data.revision_vendor.vendor.sppkp_note,
		file_siup_validate: props.data.revision_vendor.vendor.siup_note,
		file_tdp_validate: props.data.revision_vendor.vendor.tdp_note,
		file_nib_validate: props.data.revision_vendor.vendor.nib_note,
		file_board_of_directors_composition_validate:
			props.data.revision_vendor.vendor
				.board_of_directors_composition_note,
		file_non_pkp_statement_validate:
			props.data.revision_vendor.vendor.non_pkp_statement_note,
		coa: "",
	});

	const [selectedOptionTop, setSelectedOptionTop] = useState(
		props.data.revision_vendor.vendor.top
	);
	const [selectedOptionPpn, setSelectedOptionPpn] = useState(
		props.data.revision_vendor.vendor.ppn
	);
	const [selectedOptionSkb, setSelectedOptionSkb] = useState(
		props.data.revision_vendor.vendor.skb
	);
	const [selectedOptionPph, setSelectedOptionPph] = useState(
		props.data.revision_vendor.vendor.pph
	);
	const [selectedOptionShipTo, setSelectedOptionShipTo] = useState(
		props.data.revision_vendor.vendor.ship_to
	);
	const [selectedOptionBillTo, setSelectedOptionBillTo] = useState(
		props.data.revision_vendor.vendor.pph
	);

	const handleTopChange = (event) => {
		data.top = event.target.value;
		setSelectedOptionTop(data.top);
	};

	const handlePpnChange = (event) => {
		data.ppn = event.target.value;
		setSelectedOptionPpn(data.ppn);
	};

	const handleSkbChange = (event) => {
		data.skb = event.target.value;
		setSelectedOptionSkb(data.skb);
	};

	const handlePphChange = (event) => {
		data.pph = event.target.value;
		setSelectedOptionPph(data.pph);
	};

	const handleShipToChange = (event) => {
		data.ship_to = event.target.value;
		setSelectedOptionShipTo(data.ship_to);
	};

	const handleBillToChange = (event) => {
		data.bill_to = event.target.value;
		setSelectedOptionBillTo(data.bill_to);
	};

	const [submitSuccess, setSubmitSuccess] = useState(props.data.revision_vendor.status == 'menunggu persetujuan' ? false : true);

	const submit = (e) => {
		e.preventDefault();

		post(
			route("admin.vendor-profile.update", props.data.revision_vendor.id),
			{
				onSuccess: () => setSubmitSuccess(true),
			}
		);
	};
	const [selectedOptionStatus, setSelectedOptionStatus] = useState(
		props.data.revision_vendor.status
	);
	const [selectedOptionApprover, setSelectedOptionApprover] = useState(
		props.data.revision_vendor.status == "ditolak" ? false : true
	);
	const [selectedOptionApproverVendor, setSelectedOptionApproverVendor] =
		useState();
	const handleStatusChange = (event) => {
		if (event == "ditolak") {
			setSelectedOptionApprover(false);
		} else {
			setSelectedOptionApprover(true);
		}
		data.status = event;
		setSelectedOptionStatus(event);
	};

	const handleApproverVendorChange = (event) => {
		data.approval_role = event.target.value;
		setSelectedOptionApproverVendor(event.target.value);
	};

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

	const [indexFile, setIndexFile] = useState(0);

	const openPopup1 = (file) => {
		// setPdfUrl(file);
		setIndexFile(file);
		setIsPopupOpen1(true);
	};

	const closePopup1 = (tes = false) => {
		setSubmitSuccess(tes);
		setIsPopupOpen1(false);
	};

	const initialState = {
		fileNpwpStatus: props.data.revision_vendor.vendor.npwp_note
			? props.data.revision_vendor.vendor.npwp_note != "acc"
				? false
				: true
			: null,
		fileSppkpStatus: props.data.revision_vendor.vendor.sppkp_note
			? props.data.revision_vendor.vendor.sppkp_note != "acc"
				? false
				: true
			: null,
		fileSiupStatus: props.data.revision_vendor.vendor.siup_note
			? props.data.revision_vendor.vendor.siup_note != "acc"
				? false
				: true
			: null,
		fileTdpStatus: props.data.revision_vendor.vendor.tdp_note
			? props.data.revision_vendor.vendor.tdp_note != "acc"
				? false
				: true
			: null,
		fileNibStatus: props.data.revision_vendor.vendor.nib_note
			? props.data.revision_vendor.vendor.nib_note != "acc"
				? false
				: true
			: null,
		fileBodcStatus: props.data.revision_vendor.vendor
			.board_of_directors_composition_note
			? props.data.revision_vendor.vendor
				.board_of_directors_composition_note != "acc"
				? false
				: true
			: null,
		fileNonPkpStatus: props.data.revision_vendor.vendor
			.non_pkp_statement_note
			? props.data.revision_vendor.vendor.non_pkp_statement_note != "acc"
				? false
				: true
			: null,
	};

	const [fileStatus, setFileStatus] = useState(initialState);
	const [npwpNote, setNpwpNote] = useState(props.data.revision_vendor.vendor.npwp_note == null ? 'NPWP terdapat kesalahan' : props.data.revision_vendor.vendor.npwp_note == 'done revisi' ? 'NPWP terdapat kesalahan' : props.data.revision_vendor.vendor.npwp_note);
	const [siupNote, setSiupNote] = useState(props.data.revision_vendor.vendor.siup_note == null ? 'SIUP terdapat kesalahan' : props.data.revision_vendor.vendor.siup_note == 'done revisi' ? 'SIUP terdapat kesalahan' : props.data.revision_vendor.vendor.siup_note);
	const [sppkpNote, setSppkpNote] = useState(props.data.revision_vendor.vendor.sppkp_note == null ? 'SPPKP terdapat kesalahan' : props.data.revision_vendor.vendor.sppkp_note == 'done revisi' ? 'SPPKP terdapat kesalahan' : props.data.revision_vendor.vendor.sppkp_note);
	const [tdpNote, setTdpNote] = useState(props.data.revision_vendor.vendor.tdp_note == null ? 'TDP terdapat kesalahan' : props.data.revision_vendor.vendor.tdp_note == 'done revisi' ? 'TDP terdapat kesalahan' : props.data.revision_vendor.vendor.tdp_note);
	const [nibNote, setNibNote] = useState(props.data.revision_vendor.vendor.nib_note == null ? 'NIB terdapat kesalahan' : props.data.revision_vendor.vendor.nib_note == 'done revisi' ? 'NIB terdapat kesalahan' : props.data.revision_vendor.vendor.nib_note);
	const [bodcNote, setBodcNote] = useState(props.data.revision_vendor.vendor
		.board_of_directors_composition_note == null ? 'Akta Susunan Direksi terdapat kesalahan' : props.data.revision_vendor.vendor
			.board_of_directors_composition_note == 'done revisi' ? 'Akta Susunan Direksi terdapat kesalahan' : props.data.revision_vendor.vendor.board_of_directors_composition_note);
	const [nonPkpNote, setNonPkpNote] = useState(props.data.revision_vendor.vendor.non_pkp_statement_note == null ? 'Surat Pernyataan Non PKP terdapat kesalahan' : props.data.revision_vendor.vendor.non_pkp_statement_note == 'done revisi' ? 'Surat Pernyataan Non PKP terdapat kesalahan' : props.data.revision_vendor.vendor.non_pkp_statement_note);

	const clickStatusFile = (name, stat) => {
		const setDataAndStatus = (fileName, statusKey) => {
			if (name === fileName && stat === 1) {
				setFileStatus((prevStatus) => ({
					...prevStatus,
					[statusKey]: false,
				}));
				if (fileName == 'file_npwp') {
					setNpwpNote("NPWP Terdapat Kesalahan");
					data[fileName] = "NPWP Terdapat Kesalahan";
					data.npwp_note = "NPWP Terdapat Kesalahan";
				}
				if (fileName == 'file_sppkp') {
					setSppkpNote("SPPKP Terdapat Kesalahan");
					data[fileName] = "SPPKP Terdapat Kesalahan";
					data.sppkp_note = "SPPKP Terdapat Kesalahan";
				}
				if (fileName == 'file_siup') {
					setSiupNote("SIUP Terdapat Kesalahan");
					data[fileName] = "SIUP Terdapat Kesalahan";
					data.siup_note = "SIUP Terdapat Kesalahan";
				}
				if (fileName == 'file_tdp') {
					setTdpNote("TDP Terdapat Kesalahan");
					data[fileName] = "TDP Terdapat Kesalahan";
					data.tdp_note = "TDP Terdapat Kesalahan";
				}
				if (fileName == 'file_nib') {
					console.log(fileName);
					setNibNote("NIB Terdapat Kesalahan");
					data[fileName] = "NIB Terdapat Kesalahan";
					data.nib_note = "NIB Terdapat Kesalahan";
				}
				if (fileName == 'file_board_of_directors_composition') {
					setBodcNote("Akta Susunan Direksi Terdapat Kesalahan");
					data[fileName] = "Akta Susunan Direksi Terdapat Kesalahan";
					data.board_of_directors_composition_note = "Akta Susunan Direksi Terdapat Kesalahan";
				}
				if (fileName == 'file_non_pkp_statement') {
					setNonPkpNote("Surat Pernyataan Non PKP Terdapat Kesalahan");
					data[fileName] = "Surat Pernyataan Non PKP Terdapat Kesalahan";
					data.non_pkp_statement_note = "Surat Pernyataan Non PKP Terdapat Kesalahan";
				}
			}
			if (name === fileName && stat === 0) {
				setFileStatus((prevStatus) => ({
					...prevStatus,
					[statusKey]: true,
				}));
				data[fileName] = "acc";
			}
			if (statusKey == "validate" && `${name}_validate` === fileName) {
				data[fileName] = "acc";
			}
		};

		setDataAndStatus("file_npwp", "fileNpwpStatus");
		setDataAndStatus("file_sppkp", "fileSppkpStatus");
		setDataAndStatus("file_siup", "fileSiupStatus");
		setDataAndStatus("file_tdp", "fileTdpStatus");
		setDataAndStatus("file_nib", "fileNibStatus");
		setDataAndStatus(
			"file_board_of_directors_composition",
			"fileBodcStatus"
		);
		setDataAndStatus("file_non_pkp_statement", "fileNonPkpStatus");
		setDataAndStatus("file_npwp_validate", "validate");
		setDataAndStatus("file_sppkp_validate", "validate");
		setDataAndStatus("file_siup_validate", "validate");
		setDataAndStatus("file_tdp_validate", "validate");
		setDataAndStatus("file_nib_validate", "validate");
		setDataAndStatus(
			"file_board_of_directors_composition_validate",
			"validate"
		);
		setDataAndStatus("file_non_pkp_statement_validate", "validate");
		// Add more conditions as needed for other files
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
					"Harap pilih semua opsi CoA sebelum menambahkan entri baru."
				);
			}
		} else {
			alert("Harap pilih Supplier Site sebelum menambahkan entri baru.");
		}
	};

	const handleDeleteEntry = (index) => {
		setFormDataSS((prevFormData) => {
			const updatedEntries = [...prevFormData.entries];
			updatedEntries.splice(index, 1);

			return {
				...prevFormData,
				entries: updatedEntries,
			};
		});
		data.coa = formDataSS;
		console.log(formDataSS);
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
			<Head title="Verifikasi Perubahan Data" />

			<PDFPopup
				pdfUrl={pdfUrl}
				show={isPopupOpen}
				onClose={closePopup}
				docs={props.docs}
			/>

			<ModalViewer
				files={props.newdocs}
				indexFile={indexFile}
				show={isPopupOpen1}
				onClose={closePopup1}
				props={props}
				datas={data}
			/>

			<div className="page-title-box d-sm-flex align-items-center justify-content-between">
				<h4 className="mb-sm-0 font-size-18">Perubahan Data</h4>
				<div className="page-title-right">
					<ol className="breadcrumb m-0">
						<li className="breadcrumb-item">
							<a href={route("admin.vendor-profile.index")}>
								Perubahan Data
							</a>
						</li>
						<li className="breadcrumb-item active">
							<a href="javascript: void(0);">
								Verifikasi Perubahan Data
							</a>
						</li>
					</ol>
				</div>
			</div>

			<div className="pt-6">
				<div className="flex items-center gap-2">
					<a href={route("admin.vendor-profile.index")}>
						<ArrowLeft />
					</a>
					<div className="bg-white overflow-hidden shadow-lg sm:rounded-lg w-full">
						<div className="p-6 text-gray-900 font-bold">
							Verifikasi Perubahan Data
						</div>
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
								<div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 text-sm text-gray-500 p-1">
									<div className="">
										<div className="flex">
											<p className="mb-3">Nama</p>
											<p className="mb-3 ml-24">
												&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.name !=
														props.data.revision_vendor
															.vendor.name ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.name
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.name
												}
												,
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.legality !=
														props.data.revision_vendor
															.vendor.legality ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.legality
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.legality
												}
											</p>
										</div>
										<div className="flex">
											<p className="mb-3">
												Email Address
											</p>
											<p className="mb-3 ml-11">
												&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.email !=
														props.data.revision_vendor
															.vendor.email ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.email
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.email
												}
											</p>
										</div>
										<div className="flex">
											<p className="mb-3">Jenis Usaha</p>
											<p className="mb-3 ml-14">
												&nbsp;&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.name_business !=
														props.data.revision_vendor
															.vendor
															.name_business ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.name_business
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.name_business
												}
											</p>
										</div>
										<div className="flex">
											<p className="mb-3">NPWP</p>
											<p className="mb-3 ml-24">
												:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.npwp !=
														props.data.revision_vendor
															.vendor.npwp ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.npwp
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.npwp
												}
											</p>
										</div>
										<div className="flex">
											<p className="mb-3">
												Alamat Kantor
											</p>
											<p className="mb-3 ml-11">
												&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.office_address !=
														props.data.revision_vendor
															.vendor
															.office_address ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.office_address
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.office_address
												}
											</p>
										</div>
										<div className="flex">
											<p className="mb-3">Alamat NPWP</p>
											<p className="mb-3 ml-12">
												:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.npwp_address !=
														props.data.revision_vendor
															.vendor.npwp_address ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.npwp_address
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.npwp_address
												}
											</p>
										</div>
									</div>
									<div className="lg:ml-5 block">
										<div className="flex">
											<p className="mb-3">Phone Number</p>
											<p className="mb-3 ml-12">
												&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.phone_number !=
														props.data.revision_vendor
															.vendor.phone_number ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.phone_number
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.phone_number
												}
											</p>
										</div>
										<div className="flex">
											<p className="mb-3">
												Mobile Number
											</p>
											<p className="mb-3 ml-12">
												:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.mobile_phone_number !=
														props.data.revision_vendor
															.vendor
															.mobile_phone_number ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.mobile_phone_number
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor
														.mobile_phone_number
												}
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="mb-3">
								<div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 border-dashed border-y-2 border-gray-300 p-1">
									<div className="border-l-0">
										<p className="font-bold text-black mb-3">
											Director Information
										</p>
										<div className="flex text-sm text-gray-500 mb-3">
											<p className="mb-3">Nama</p>
											<p className="mb-3 ml-24">
												&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.director_name !=
														props.data.revision_vendor
															.vendor
															.director_name ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.director_name
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.director_name
												}
											</p>
										</div>
										<div className="flex text-sm text-gray-500 mb-3">
											<p className="mb-3">
												Email Address
											</p>
											<p className="mb-3 ml-11">
												&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.director_email !=
														props.data.revision_vendor
															.vendor
															.director_email ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.director_email
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.director_email
												}
											</p>
										</div>
										<div className="flex text-sm text-gray-500 mb-3">
											<p className="mb-3">Phone Number</p>
											<p className="mb-3 ml-10">
												&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.director_phone_number !=
														props.data.revision_vendor
															.vendor
															.director_phone_number ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.director_phone_number
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor
														.director_phone_number
												}
											</p>
										</div>
									</div>
									<div className="lg:ml-5 block">
										<p className="font-bold text-black mb-3">
											FA Information
										</p>
										<div className="flex text-sm text-gray-500 mb-3">
											<p className="mb-3">Nama</p>
											<p className="mb-3 ml-24">
												&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.fa_name !=
														props.data.revision_vendor
															.vendor.fa_name ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.fa_name
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.fa_name
												}
											</p>
										</div>
										<div className="flex text-sm text-gray-500 mb-3">
											<p className="mb-3">
												Email Address
											</p>
											<p className="mb-3 ml-11">
												&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.fa_email !=
														props.data.revision_vendor
															.vendor.fa_email ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.fa_email
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.fa_email
												}
											</p>
										</div>
										<div className="flex text-sm text-gray-500 mb-3">
											<p className="mb-3">Phone Number</p>
											<p className="mb-3 ml-10">
												&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.fa_phone_number !=
														props.data.revision_vendor
															.vendor
															.fa_phone_number ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.fa_phone_number
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.fa_phone_number
												}
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="mb-3">
								<div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 border-dashed border-b-2 border-gray-300 p-1">
									<div className="border-l-0">
										<p className="font-bold text-black mb-3">
											Marketing/Key Account Information
										</p>
										<div className="flex text-sm text-gray-500 mb-3">
											<p className="mb-3">Nama</p>
											<p className="mb-3 ml-24">
												&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.marketing_key_account !=
														props.data.revision_vendor
															.vendor
															.marketing_key_account ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.marketing_key_account
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor
														.marketing_key_account
												}
											</p>
										</div>
										<div className="flex text-sm text-gray-500 mb-3">
											<p className="mb-3">
												Email Address
											</p>
											<p className="mb-3 ml-11">
												&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.marketing_email !=
														props.data.revision_vendor
															.vendor
															.marketing_email ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.marketing_email
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.marketing_email
												}
											</p>
										</div>
										<div className="flex text-sm text-gray-500 mb-3">
											<p className="mb-3">Phone Number</p>
											<p className="mb-3 ml-10">
												&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.marketing_phone_number !=
														props.data.revision_vendor
															.vendor
															.marketing_phone_number ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.marketing_phone_number
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor
														.marketing_phone_number
												}
											</p>
										</div>
									</div>
									<div className="lg:ml-5 block">
										<p className="font-bold text-black mb-3">
											Financial Information
										</p>
										<div className="flex text-sm text-gray-500 mb-3">
											<p className="">Type Bank</p>
											<p className="ml-16">
												&nbsp;&nbsp;&nbsp;:
												{props.data.revision_vendor
													.vendor
													.is_virtual_account == 1
													? "Virtual Account"
													: "Non Vitual Account"}
											</p>
										</div>
										<div className="flex text-sm text-gray-500 mb-3">
											<p className="">Bank</p>
											<p className="ml-24">
												&nbsp;&nbsp;&nbsp;&nbsp;:
												{props.data.revision_vendor
													.vendor.is_bca == 1
													? "BCA"
													: props.data.revision_vendor
														.vendor.bank_name}
											</p>
										</div>
										<div className="flex text-sm text-gray-500 mb-3">
											<p className="">Nomor Rekening</p>
											<p className="mb-3 ml-8">
												&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.bank_account_number !=
														props.data.revision_vendor
															.vendor
															.bank_account_number ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.bank_account_number
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor
														.bank_account_number
												}
											</p>
										</div>
										<div className="flex text-sm text-gray-500 mb-3">
											<p className="">Nama Akun</p>
											<p className="ml-16">
												&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.bank_account_name !=
														props.data.revision_vendor
															.vendor
															.bank_account_name ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.bank_account_name
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor
														.bank_account_name
												}
											</p>
										</div>
										<div className="flex text-sm text-gray-500 mb-3">
											<p className="">Branch</p>
											<p className="ml-24">
												:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.branch_of_bank !=
														props.data.revision_vendor
															.vendor
															.branch_of_bank ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.branch_of_bank
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.branch_of_bank
												}
											</p>
										</div>
										<div className="flex text-sm text-gray-500 mb-3">
											<p className="">Swift Code</p>
											<p className="ml-16">
												&nbsp;&nbsp;:
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.bank_swift_code !=
														props.data.revision_vendor
															.vendor
															.bank_swift_code ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.bank_swift_code
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.bank_swift_code
												}
											</p>
										</div>
									</div>
								</div>
							</div>

							{props.data.revision_vendor.vendor
								.type_of_business == "PKP" ? (
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
											<p className="text-sm text-gray-500 mb-4">
												TDP
											</p>
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
											<p className="mb-3 flex justify-between">
												:
												{/* {props.data.latest_vendor !=
                                                null ? (
                                                    props.data.latest_vendor
                                                        .file_npwp !=
                                                    props.data.revision_vendor
                                                        .vendor.file_npwp ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="red"
                                                            className="w-6 h-6 ml-2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    ""
                                                )} */}
												{props.data.revision_vendor
													.vendor.file_npwp != "" ? (
													<>
														<a
															href="javascript:;"
															onClick={(e) =>
																openPopup1(
																	0
																)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_npwp",
																	0
																)
															}
															hidden={
																submitSuccess
															}
														>
															<Check
																className={`text-${fileStatus.fileNpwpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileNpwpStatus ==
																		true
																		? "green"
																		: "gray"
																	}-500`}
															/>
														</a>
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_npwp",
																	1
																)
															}
															hidden={
																submitSuccess
															}
														>
															<X
																className={`text-${fileStatus.fileNpwpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileNpwpStatus ==
																		false
																		? "red"
																		: "gray"
																	}-500`}
															/>
														</a>
														<InputError
															message={
																errors.file_npwp_validate
															}
														/>
													</>
												) : (
													""
												)}
												/ <p>&nbsp;</p>
											</p>
											<p className="mb-3 flex justify-between">
												:
												{/* {props.data.latest_vendor !=
                                                null ? (
                                                    props.data.latest_vendor
                                                        .file_sppkp !=
                                                    props.data.revision_vendor
                                                        .vendor.file_sppkp ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="red"
                                                            className="w-6 h-6 ml-2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    ""
                                                )} */}
												{props.data.revision_vendor
													.vendor.file_sppkp != "" ? (
													<>
														<a
															href="javascript:;"
															onClick={(e) =>
																openPopup1(
																	1
																)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_sppkp",
																	0
																)
															}
															hidden={
																submitSuccess
															}
														>
															<Check
																className={`text-${fileStatus.fileSppkpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileSppkpStatus ==
																		true
																		? "green"
																		: "gray"
																	}-500`}
															/>
														</a>
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_sppkp",
																	1
																)
															}
															hidden={
																submitSuccess
															}
														>
															<X
																className={`text-${fileStatus.fileSppkpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileSppkpStatus ==
																		false
																		? "red"
																		: "gray"
																	}-500`}
															/>
														</a>
														<InputError
															message={
																errors.file_sppkp_validate
															}
														/>
													</>
												) : (
													<p>-</p>
												)}
												/
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.expired_sppkp !=
														props.data.revision_vendor
															.vendor
															.expired_sppkp ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.expired_sppkp
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.expired_sppkp
												}
											</p>
											<p className="mb-3 flex justify-between">
												:
												{/* {props.data.latest_vendor !=
                                                null ? (
                                                    props.data.latest_vendor
                                                        .file_siup !=
                                                    props.data.revision_vendor
                                                        .vendor.file_siup ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="red"
                                                            className="w-6 h-6 ml-2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    ""
                                                )} */}
												{props.data.revision_vendor
													.vendor.file_siup != "" ? (
													<>
														<a
															href="javascript:;"
															onClick={(e) =>
																openPopup1(
																	2
																)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_siup",
																	0
																)
															}
															hidden={
																submitSuccess
															}
														>
															<Check
																className={`text-${fileStatus.fileSiupStatus ==
																	null
																	? "gray"
																	: fileStatus.fileSiupStatus ==
																		true
																		? "green"
																		: "gray"
																	}-500`}
															/>
														</a>
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_siup",
																	1
																)
															}
															hidden={
																submitSuccess
															}
														>
															<X
																className={`text-${fileStatus.fileSiupStatus ==
																	null
																	? "gray"
																	: fileStatus.fileSiupStatus ==
																		false
																		? "red"
																		: "gray"
																	}-500`}
															/>
														</a>
														<InputError
															message={
																errors.file_siup_validate
															}
														/>
													</>
												) : (
													<p>-</p>
												)}
												/
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.expired_siup !=
														props.data.revision_vendor
															.vendor.expired_siup ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.expired_siup
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.expired_siup
												}
											</p>
											<p className="mb-3 flex justify-between">
												:
												{/* {props.data.latest_vendor !=
                                                null ? (
                                                    props.data.latest_vendor
                                                        .file_tdp !=
                                                    props.data.revision_vendor
                                                        .vendor.file_tdp ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="red"
                                                            className="w-6 h-6 ml-2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    ""
                                                )} */}
												{props.data.revision_vendor
													.vendor.file_tdp != "" ? (
													<>
														<a
															href="javascript:;"
															onClick={(e) =>
																openPopup1(
																	3
																)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_tdp",
																	0
																)
															}
															hidden={
																submitSuccess
															}
														>
															<Check
																className={`text-${fileStatus.fileTdpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileTdpStatus ==
																		true
																		? "green"
																		: "gray"
																	}-500`}
															/>
														</a>
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_tdp",
																	1
																)
															}
															hidden={
																submitSuccess
															}
														>
															<X
																className={`text-${fileStatus.fileTdpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileTdpStatus ==
																		false
																		? "red"
																		: "gray"
																	}-500`}
															/>
														</a>
														<InputError
															message={
																errors.file_tdp_validate
															}
														/>
													</>
												) : (
													<p>-</p>
												)}
												/
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.expired_tdp !=
														props.data.revision_vendor
															.vendor.expired_tdp ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.expired_tdp
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.expired_tdp
												}
											</p>
											<p className="mb-3 flex justify-between">
												:
												{/* {props.data.latest_vendor !=
                                                null ? (
                                                    props.data.latest_vendor
                                                        .file_nib !=
                                                    props.data.revision_vendor
                                                        .vendor.file_nib ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="red"
                                                            className="w-6 h-6 ml-2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    ""
                                                )} */}
												{props.data.revision_vendor
													.vendor.file_nib != "" ? (
													<>
														<a
															href="javascript:;"
															onClick={(e) =>
																openPopup1(
																	4
																)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_nib",
																	0
																)
															}
															hidden={
																submitSuccess
															}
														>
															<Check
																className={`text-${fileStatus.fileNibStatus ==
																	null
																	? "gray"
																	: fileStatus.fileNibStatus ==
																		true
																		? "green"
																		: "gray"
																	}-500`}
															/>
														</a>
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_nib",
																	1
																)
															}
															hidden={
																submitSuccess
															}
														>
															<X
																className={`text-${fileStatus.fileNibStatus ==
																	null
																	? "gray"
																	: fileStatus.fileNibStatus ==
																		false
																		? "red"
																		: "gray"
																	}-500`}
															/>
														</a>
														<InputError
															message={
																errors.file_nib_validate
															}
														/>
													</>
												) : (
													<p>-</p>
												)}
												/
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.expired_nib !=
														props.data.revision_vendor
															.vendor.expired_nib ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.expired_nib
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.expired_nib
												}
											</p>
											<p className="mb-3 flex justify-between">
												:
												{/* {props.data.latest_vendor !=
                                                null ? (
                                                    props.data.latest_vendor
                                                        .file_board_of_directors_composition !=
                                                    props.data.revision_vendor
                                                        .vendor
                                                        .file_board_of_directors_composition ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="red"
                                                            className="w-6 h-6 ml-2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    ""
                                                )} */}
												{props.data.revision_vendor
													.vendor
													.file_board_of_directors_composition !=
													"" ? (
													<>
														<a
															href="javascript:;"
															onClick={(e) =>
																openPopup1(
																	5
																)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_board_of_directors_composition",
																	0
																)
															}
															hidden={
																submitSuccess
															}
														>
															<Check
																className={`text-${fileStatus.fileBodcStatus ==
																	null
																	? "gray"
																	: fileStatus.fileBodcStatus ==
																		true
																		? "green"
																		: "gray"
																	}-500`}
															/>
														</a>
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_board_of_directors_composition",
																	1
																)
															}
															hidden={
																submitSuccess
															}
														>
															<X
																className={`text-${fileStatus.fileBodcStatus ==
																	null
																	? "gray"
																	: fileStatus.fileBodcStatus ==
																		false
																		? "red"
																		: "gray"
																	}-500`}
															/>
														</a>
														<InputError
															message={
																errors.file_board_of_directors_composition_validate
															}
														/>
													</>
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
											{/* <p className='mb-3 flex justify-between'>: 
                                            {props.data.revision_vendor.vendor.file_front_page_bank != '' ? <a href={props.data.revision_vendor.vendor.file_front_page_bank} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.revision_vendor.vendor.file_bank_account_statement_letter != '' ? <a href={props.data.revision_vendor.vendor.file_bank_account_statement_letter} target='_blank'>
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

							{props.data.revision_vendor.vendor
								.type_of_business == "Non PKP" ? (
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
											<p className="text-sm text-gray-500 mb-4">
												TDP
											</p>
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
											<p className="mb-3 flex justify-between">
												:
												{/* {props.data.latest_vendor !=
                                                null ? (
                                                    props.data.latest_vendor
                                                        .file_npwp !=
                                                    props.data.revision_vendor
                                                        .vendor.file_npwp ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="red"
                                                            className="w-6 h-6 ml-2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    ""
                                                )} */}
												{props.data.revision_vendor
													.vendor.file_npwp != "" ? (
													<>
														<a
															href="javascript:;"
															onClick={(e) =>
																openPopup1(
																	0
																)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_npwp",
																	0
																)
															}
															hidden={
																submitSuccess
															}
														>
															<Check
																className={`text-${fileStatus.fileNpwpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileNpwpStatus ==
																		true
																		? "green"
																		: "gray"
																	}-500`}
															/>
														</a>
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_npwp",
																	1
																)
															}
															hidden={
																submitSuccess
															}
														>
															<X
																className={`text-${fileStatus.fileNpwpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileNpwpStatus ==
																		false
																		? "red"
																		: "gray"
																	}-500`}
															/>
														</a>
														<InputError
															message={
																errors.file_npwp_validate
															}
														/>
													</>
												) : (
													""
												)}
												/ <p>&nbsp;</p>
											</p>
											<p className="mb-3 flex justify-between">
												:
												{/* {props.data.latest_vendor !=
                                                null ? (
                                                    props.data.latest_vendor
                                                        .file_sppkp !=
                                                    props.data.revision_vendor
                                                        .vendor.file_sppkp ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="red"
                                                            className="w-6 h-6 ml-2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    ""
                                                )} */}
												{props.data.revision_vendor
													.vendor.file_sppkp != "" ? (
													<>
														<a
															href="javascript:;"
															onClick={(e) =>
																openPopup1(
																	1
																)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_sppkp",
																	0
																)
															}
															hidden={
																submitSuccess
															}
														>
															<Check
																className={`text-${fileStatus.fileSppkpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileSppkpStatus ==
																		true
																		? "green"
																		: "gray"
																	}-500`}
															/>
														</a>
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_sppkp",
																	1
																)
															}
															hidden={
																submitSuccess
															}
														>
															<X
																className={`text-${fileStatus.fileSppkpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileSppkpStatus ==
																		false
																		? "red"
																		: "gray"
																	}-500`}
															/>
														</a>
														<InputError
															message={
																errors.file_sppkp_validate
															}
														/>
													</>
												) : (
													<p>-</p>
												)}
												/
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.expired_sppkp !=
														props.data.revision_vendor
															.vendor
															.expired_sppkp ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.expired_sppkp
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.expired_sppkp
												}
											</p>
											<p className="mb-3 flex justify-between">
												:
												{/* {props.data.latest_vendor !=
                                                null ? (
                                                    props.data.latest_vendor
                                                        .file_siup !=
                                                    props.data.revision_vendor
                                                        .vendor.file_siup ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="red"
                                                            className="w-6 h-6 ml-2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    ""
                                                )} */}
												{props.data.revision_vendor
													.vendor.file_siup != "" ? (
													<>
														<a
															href="javascript:;"
															onClick={(e) =>
																openPopup1(
																	2
																)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_siup",
																	0
																)
															}
															hidden={
																submitSuccess
															}
														>
															<Check
																className={`text-${fileStatus.fileSiupStatus ==
																	null
																	? "gray"
																	: fileStatus.fileSiupStatus ==
																		true
																		? "green"
																		: "gray"
																	}-500`}
															/>
														</a>
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_siup",
																	1
																)
															}
															hidden={
																submitSuccess
															}
														>
															<X
																className={`text-${fileStatus.fileSiupStatus ==
																	null
																	? "gray"
																	: fileStatus.fileSiupStatus ==
																		false
																		? "red"
																		: "gray"
																	}-500`}
															/>
														</a>
														<InputError
															message={
																errors.file_siup_validate
															}
														/>
													</>
												) : (
													<p>-</p>
												)}
												/
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.expired_siup !=
														props.data.revision_vendor
															.vendor.expired_siup ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.expired_siup
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.expired_siup
												}
											</p>
											<p className="mb-3 flex justify-between">
												:
												{/* {props.data.latest_vendor !=
                                                null ? (
                                                    props.data.latest_vendor
                                                        .file_tdp !=
                                                    props.data.revision_vendor
                                                        .vendor.file_tdp ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="red"
                                                            className="w-6 h-6 ml-2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    ""
                                                )} */}
												{props.data.revision_vendor
													.vendor.file_tdp != "" ? (
													<>
														<a
															href={
																props.data
																	.revision_vendor
																	.vendor
																	.file_tdp
															}
															target="_blank"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_tdp",
																	0
																)
															}
															hidden={
																submitSuccess
															}
														>
															<Check
																className={`text-${fileStatus.fileTdpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileTdpStatus ==
																		true
																		? "green"
																		: "gray"
																	}-500`}
															/>
														</a>
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_tdp",
																	1
																)
															}
															hidden={
																submitSuccess
															}
														>
															<X
																className={`text-${fileStatus.fileTdpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileTdpStatus ==
																		false
																		? "red"
																		: "gray"
																	}-500`}
															/>
														</a>
														<InputError
															message={
																errors.file_tdp_validate
															}
														/>
													</>
												) : (
													<p>-</p>
												)}
												/
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.expired_tdp !=
														props.data.revision_vendor
															.vendor.expired_tdp ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.expired_tdp
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.expired_tdp
												}
											</p>
											<p className="mb-3 flex justify-between">
												:
												{/* {props.data.latest_vendor !=
                                                null ? (
                                                    props.data.latest_vendor
                                                        .file_nib !=
                                                    props.data.revision_vendor
                                                        .vendor.file_nib ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="red"
                                                            className="w-6 h-6 ml-2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    ""
                                                )} */}
												{props.data.revision_vendor
													.vendor.file_nib != "" ? (
													<>
														<a
															href="javascript:;"
															onClick={(e) =>
																openPopup1(
																	3
																)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_nib",
																	0
																)
															}
															hidden={
																submitSuccess
															}
														>
															<Check
																className={`text-${fileStatus.fileNibStatus ==
																	null
																	? "gray"
																	: fileStatus.fileNibStatus ==
																		true
																		? "green"
																		: "gray"
																	}-500`}
															/>
														</a>
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_nib",
																	1
																)
															}
															hidden={
																submitSuccess
															}
														>
															<X
																className={`text-${fileStatus.fileNibStatus ==
																	null
																	? "gray"
																	: fileStatus.fileNibStatus ==
																		false
																		? "red"
																		: "gray"
																	}-500`}
															/>
														</a>
														<InputError
															message={
																errors.file_nib_validate
															}
														/>
													</>
												) : (
													<p>-</p>
												)}
												/
												{props.data.latest_vendor !=
													null ? (
													props.data.latest_vendor
														.expired_nib !=
														props.data.revision_vendor
															.vendor.expired_nib ? (
														<span
															className={`line-through text-red-600 mr-1`}
														>
															{
																props.data
																	.latest_vendor
																	.expired_nib
															}
														</span>
													) : (
														""
													)
												) : (
													""
												)}
												{
													props.data.revision_vendor
														.vendor.expired_nib
												}
											</p>
											<p className="mb-3 flex justify-between">
												:
												{/* {props.data.latest_vendor !=
                                                null ? (
                                                    props.data.latest_vendor
                                                        .file_board_of_directors_composition !=
                                                    props.data.revision_vendor
                                                        .vendor
                                                        .file_board_of_directors_composition ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="red"
                                                            className="w-6 h-6 ml-2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    ""
                                                )} */}
												{props.data.revision_vendor
													.vendor
													.file_board_of_directors_composition !=
													"" ? (
													<>
														<a
															href="javascript:;"
															onClick={(e) =>
																openPopup1(
																	4
																)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_board_of_directors_composition",
																	0
																)
															}
															hidden={
																submitSuccess
															}
														>
															<Check
																className={`text-${fileStatus.fileBodcStatus ==
																	null
																	? "gray"
																	: fileStatus.fileBodcStatus ==
																		true
																		? "green"
																		: "gray"
																	}-500`}
															/>
														</a>
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_board_of_directors_composition",
																	1
																)
															}
															hidden={
																submitSuccess
															}
														>
															<X
																className={`text-${fileStatus.fileBodcStatus ==
																	null
																	? "gray"
																	: fileStatus.fileBodcStatus ==
																		false
																		? "red"
																		: "gray"
																	}-500`}
															/>
														</a>
														<InputError
															message={
																errors.file_board_of_directors_composition_validate
															}
														/>
													</>
												) : (
													<p>-</p>
												)}
												/ <p>&nbsp;</p>
											</p>
											<p className="mb-3 flex justify-between">
												:
												{/* {props.data.latest_vendor !=
                                                null ? (
                                                    props.data.latest_vendor
                                                        .file_non_pkp_statement !=
                                                    props.data.revision_vendor
                                                        .vendor
                                                        .file_non_pkp_statement ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="red"
                                                            className="w-6 h-6 ml-2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    ""
                                                )} */}
												{props.data.revision_vendor
													.vendor
													.file_non_pkp_statement !=
													"" ? (
													<>
														<a
															href="javascript:;"
															onClick={(e) =>
																openPopup1(
																	5
																)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
														<a
															hidden={
																submitSuccess
															}
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_non_pkp_statement",
																	0
																)
															}
														>
															<Check
																className={`text-${fileStatus.fileNonPkpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileNonPkpStatus ==
																		true
																		? "green"
																		: "gray"
																	}-500`}
															/>
														</a>
														<a
															hidden={
																submitSuccess
															}
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_non_pkp_statement",
																	1
																)
															}
														>
															<X
																className={`text-${fileStatus.fileNonPkpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileNonPkpStatus ==
																		false
																		? "red"
																		: "gray"
																	}-500`}
															/>
														</a>
														<InputError
															message={
																errors.file_non_pkp_statement_validate
															}
														/>
													</>
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
											{/* <p className='mb-3 flex justify-between'>: 
                                            {props.data.revision_vendor.vendor.file_front_page_bank != '' ? <a href={props.data.revision_vendor.vendor.file_front_page_bank} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.revision_vendor.vendor.file_bank_account_statement_letter != '' ? <a href={props.data.revision_vendor.vendor.file_bank_account_statement_letter} target='_blank'>
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

							{props.data.revision_vendor.vendor
								.type_of_business == "Pribadi" ? (
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
												Surat Pernyataan Non PKP
											</p>
											{/* <p className='text-sm text-gray-500 mb-3'>E-KTP</p> */}
										</div>
										<div className="border-dashed border-gray-300 text-sm text-gray-500">
											<p className="mb-3">&nbsp;</p>
											<p className="mb-3">
												: Wajib Pajak Orang Pribadi
											</p>
											<p className="mb-3 flex justify-between">
												:
												{/* {props.data.latest_vendor !=
                                                null ? (
                                                    props.data.latest_vendor
                                                        .file_npwp !=
                                                    props.data.revision_vendor
                                                        .vendor.file_npwp ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="red"
                                                            className="w-6 h-6 ml-2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    ""
                                                )} */}
												{props.data.revision_vendor
													.vendor.file_npwp != "" ? (
													<>
														<a
															href="javascript:;"
															onClick={(e) =>
																openPopup1(
																	0
																)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_npwp",
																	0
																)
															}
															hidden={
																submitSuccess
															}
														>
															<Check
																className={`text-${fileStatus.fileNpwpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileNpwpStatus ==
																		true
																		? "green"
																		: "gray"
																	}-500`}
															/>
														</a>
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_npwp",
																	1
																)
															}
															hidden={
																submitSuccess
															}
														>
															<X
																className={`text-${fileStatus.fileNpwpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileNpwpStatus ==
																		false
																		? "red"
																		: "gray"
																	}-500`}
															/>
														</a>
														<InputError
															message={
																errors.file_npwp_validate
															}
														/>
													</>
												) : (
													""
												)}
												<p>&nbsp;</p>
											</p>
											<p className="mb-3 flex justify-between">
												:
												{/* {props.data.latest_vendor !=
                                                null ? (
                                                    props.data.latest_vendor
                                                        .file_non_pkp_statement !=
                                                    props.data.revision_vendor
                                                        .vendor
                                                        .file_non_pkp_statement ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="red"
                                                            className="w-6 h-6 ml-2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    ""
                                                )} */}
												{props.data.revision_vendor
													.vendor
													.file_non_pkp_statement !=
													"" ? (
													<>
														<a
															href="javascript:;"
															onClick={(e) =>
																openPopup1(
																	1
																)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_non_pkp_statement",
																	0
																)
															}
															hidden={
																submitSuccess
															}
														>
															<Check
																className={`text-${fileStatus.fileNonPkpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileNonPkpStatus ==
																		true
																		? "green"
																		: "gray"
																	}-500`}
															/>
														</a>
														<a
															href="javascript:;"
															onClick={(e) =>
																clickStatusFile(
																	"file_non_pkp_statement",
																	1
																)
															}
															hidden={
																submitSuccess
															}
														>
															<X
																className={`text-${fileStatus.fileNonPkpStatus ==
																	null
																	? "gray"
																	: fileStatus.fileNonPkpStatus ==
																		false
																		? "red"
																		: "gray"
																	}-500`}
															/>
														</a>
														<InputError
															message={
																errors.file_non_pkp_statement_validate
															}
														/>
													</>
												) : (
													<p>-</p>
												)}
												<p>&nbsp;</p>
											</p>
											{/* <p className='mb-3 flex justify-between'>: 
                                                {props.data.revision_vendor.vendor.file_ektp != '' ? <a href={props.data.revision_vendor.vendor.file_ektp} target='_blank'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a> : <p>-</p> }
                                                / {props.data.revision_vendor.vendor.expired_ektp}
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
											{/* <p className='mb-3 flex justify-between'>: 
                                            {props.data.revision_vendor.vendor.file_front_page_bank != '' ? <a href={props.data.revision_vendor.vendor.file_front_page_bank} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.revision_vendor.vendor.file_bank_account_statement_letter != '' ? <a href={props.data.revision_vendor.vendor.file_bank_account_statement_letter} target='_blank'>
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

							<form onSubmit={submit}>
								<div>
									<p
										className="font-bold text-black mb-3"
										hidden={submitSuccess}
									>
										Tindakan
									</p>
									<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
										<div className="">
											<div hidden={submitSuccess}>
												<div
													className="mb-3"
													hidden={
														fileStatus.fileNpwpStatus !=
															null
															? fileStatus.fileNpwpStatus
															: true
													}
												>
													<InputLabel
														value="Catatan File NPWP"
														className="font-bold"
													/>
													<textarea
														name="npwp_note"
														className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
														placeholder="catatan file npwp *"
														onChange={(e) =>
															setData(
																"npwp_note",
																e.target.value
															)
														}
														value={data.npwp_note == null ? 'NPWP terdapat kesalahan' : npwpNote}
													/>

													<InputError
														message={
															errors.npwp_note
														}
														className="mt-2"
													/>
												</div>
												{props.data.revision_vendor
													.vendor.type_of_business !=
													"Pribadi" ? (
													<div
														className="mb-3"
														hidden={
															fileStatus.fileSppkpStatus !=
																null
																? fileStatus.fileSppkpStatus
																: true
														}
													>
														<InputLabel
															value="Catatan File SPPKP"
															className="font-bold"
														/>
														<textarea
															name="sppkp_note"
															className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
															placeholder="catatan file sppkp *"
															onChange={(e) =>
																setData(
																	"sppkp_note",
																	e.target
																		.value
																)
															}
															value={
																data.sppkp_note == null ? 'SPPKP terdapat kesalahan' : sppkpNote
															}
														/>

														<InputError
															message={
																errors.sppkp_note
															}
															className="mt-2"
														/>
													</div>
												) : (
													""
												)}
												{props.data.revision_vendor
													.vendor.type_of_business !=
													"Pribadi" ? (
													<div
														className="mb-3"
														hidden={
															fileStatus.fileSiupStatus !=
																null
																? fileStatus.fileSiupStatus
																: true
														}
													>
														<InputLabel
															value="Catatan File SIUP"
															className="font-bold"
														/>
														<textarea
															name="siup_note"
															className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
															placeholder="catatan file siup *"
															onChange={(e) =>
																setData(
																	"siup_note",
																	e.target
																		.value
																)
															}
															value={
																data.siup_note == null ? 'SIUP terdapat kesalahan' : siupNote
															}
														/>

														<InputError
															message={
																errors.siup_note
															}
															className="mt-2"
														/>
													</div>
												) : (
													""
												)}
												{props.data.revision_vendor
													.vendor.type_of_business !=
													"Pribadi" ? (
													<div
														className="mb-3"
														hidden={
															fileStatus.fileTdpStatus !=
																null
																? fileStatus.fileTdpStatus
																: true
														}
													>
														<InputLabel
															value="Catatan File TDP"
															className="font-bold"
														/>
														<textarea
															name="tdp_note"
															className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
															placeholder="catatan file tdp *"
															onChange={(e) =>
																setData(
																	"tdp_note",
																	e.target
																		.value
																)
															}
															value={
																data.tdp_note == null ? 'TDP terdapat kesalahan' : tdpNote
															}
														/>

														<InputError
															message={
																errors.tdp_note
															}
															className="mt-2"
														/>
													</div>
												) : (
													""
												)}
												{props.data.revision_vendor
													.vendor.type_of_business !=
													"Pribadi" ? (
													<div
														className="mb-3"
														hidden={
															fileStatus.fileNibStatus !=
																null
																? fileStatus.fileNibStatus
																: true
														}
													>
														<InputLabel
															value="Catatan File NIB"
															className="font-bold"
														/>
														<textarea
															name="nib_note"
															className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
															placeholder="catatan file nib *"
															onChange={(e) =>
																setData(
																	"nib_note",
																	e.target
																		.value
																)
															}
															value={
																data.nib_note == null ? 'NIB terdapat kesalahan' : nibNote
															}
														/>

														<InputError
															message={
																errors.nib_note
															}
															className="mt-2"
														/>
													</div>
												) : (
													""
												)}
												{props.data.revision_vendor
													.vendor.type_of_business !=
													"Pribadi" ? (
													<div
														className="mb-3"
														hidden={
															fileStatus.fileBodcStatus !=
																null
																? fileStatus.fileBodcStatus
																: true
														}
													>
														<InputLabel
															value="Catatan File Akta Susunan Direksi"
															className="font-bold"
														/>
														<textarea
															name="board_of_directors_composition_note"
															className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
															placeholder="catatan file akta susunan direksi *"
															onChange={(e) =>
																setData(
																	"board_of_directors_composition_note",
																	e.target
																		.value
																)
															}
															value={
																data.board_of_directors_composition_note == null ? 'Akta Susunan Direksi terdapat kesalahan' : bodcNote
															}
														/>

														<InputError
															message={
																errors.board_of_directors_composition_note
															}
															className="mt-2"
														/>
													</div>
												) : (
													""
												)}
												{props.data.revision_vendor
													.vendor.type_of_business !=
													"PKP" ? (
													<div
														className="mb-3"
														hidden={
															fileStatus.fileNonPkpStatus !=
																null
																? fileStatus.fileNonPkpStatus
																: true
														}
													>
														<InputLabel
															value="Catatan File Surat pernyataan non pkp"
															className="font-bold"
														/>
														<textarea
															name="non_pkp_statement_note"
															className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
															placeholder="catatan file Surat pernyataan non pkp *"
															onChange={(e) =>
																setData(
																	"non_pkp_statement_note",
																	e.target
																		.value
																)
															}
															value={
																data.non_pkp_statement_note == null ? 'Surat Pernyataan Non PKP terdapat kesalahan' : nonPkpNote
															}
														/>

														<InputError
															message={
																errors.non_pkp_statement_note
															}
															className="mt-2"
														/>
													</div>
												) : (
													""
												)}
											</div>
											{/* {props.data.approver_revision_done
                                                .length > 0 ? (
                                                <div
                                                    className="w-full mb-3"
                                                    hidden={submitSuccess}
                                                >
                                                    <InputLabel
                                                        value="Approver Vendor"
                                                        className="font-bold"
                                                    />
                                                    <select
                                                        className="select select-bordered w-full mt-1"
                                                        id="approval_role"
                                                        name="approval_role"
                                                        value={
                                                            selectedOptionApproverVendor
                                                        }
                                                        onChange={
                                                            handleApproverVendorChange
                                                        }
                                                    >
                                                        <option value="" hidden>
                                                            Pilih
                                                        </option>
                                                        {props.data.approver_revision_done.map(
                                                            (item, index) => (
                                                                <option
                                                                    value={
                                                                        item.approval_role
                                                                    }
                                                                >
                                                                    {
                                                                        item.approval_role
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>

                                                    <InputError
                                                        message={errors.status}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            ) : (
                                                ""
                                            )} */}
											<div
												className="mb-3"
												hidden={submitSuccess}
											>
												<InputLabel
													value="Catatan"
													className="font-bold"
												/>
												<textarea
													name="note"
													className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
													placeholder="catatan *"
													onChange={(e) =>
														setData(
															"note",
															e.target.value
														)
													}
													value={data.note}
												/>

												<InputError
													message={errors.note}
													className="mt-2"
												/>
											</div>
											<div
												className="mb-3"
												hidden={submitSuccess}
											>
												<InputLabel
													value="Lampiran"
													className="font-bold"
												/>
												<div className="flex items-center align-middle">
													<input
														name="document"
														type="file"
														className="file-input file-input-bordered w-full max-w-xs"
														onChange={(e) =>
															setData(
																"document",
																e.target
																	.files[0]
															)
														}
													/>
													{props.data.revision_vendor
														.document != "" ? (
														<a
															href={
																props.data
																	.revision_vendor
																	.document
															}
															target="_blank"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
												<InputError
													message={errors.document}
													className="mt-2"
												/>

											</div>
											<div className="mb-3">
												<div hidden={submitSuccess}>
													{props.data.permissions.includes(
														"update_ppn_top_vendor_profile"
													) ? (
														<div className={`ml-0`}>
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
																		Ppn
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
														</div>
													) : (
														<div className={`ml-0`}>
															<div className="gap-2 justify-between grid grid-cols-">
																<p className="font-bold">
																	TOP
																</p>
																<p className="font-bold">
																	:
																</p>
																<p className="font-bold">
																	{data.top} Hari
																</p>
																<p className="font-bold">
																	PPN
																</p>
																<p className="font-bold">
																	:
																</p>
																<p className="font-bold">
																	{data.ppn} %
																</p>
															</div>
														</div>
													)}
													{props.data.permissions.includes(
														"update_skb_accounting_vendor_profile"
													) ? (
														<div className={`ml-0`}>
															<div className="mb-3">
																<InputLabel
																	value="SKB"
																	className="font-bold"
																	required={true}
																/>
																<select
																	className="select select-bordered w-full mt-1"
																	id="skb"
																	name="skb"
																	value={
																		selectedOptionSkb
																	}
																	onChange={
																		handleSkbChange
																	}
																>
																	<option value="" hidden>
																		Pilih
																	</option>
																	<option value="ada">
																		Ada
																	</option>
																	<option value="tidak ada">
																		Tidak Ada
																	</option>
																</select>
																<InputError
																	message={errors.skb}
																	className="mt-2"
																/>
															</div>

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
																	<option value="" hidden>
																		Pilih
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

															<div className="mb-3">
																<InputLabel
																	value="Ship To"
																	className="font-bold"
																	required={true}
																/>
																<select
																	className="select select-bordered w-full mt-1"
																	id="ship_to"
																	name="ship_to"
																	value={
																		selectedOptionShipTo
																	}
																	onChange={
																		handleShipToChange
																	}
																>
																	<option
																		value=""
																		hidden
																	>
																		Ship To
																	</option>
																	{props.data.ship_to.map(
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
																	message={
																		errors.ship_to
																	}
																	className="mt-2"
																/>
															</div>

															<div className="mb-3">
																<InputLabel
																	value="Bill To"
																	className="font-bold"
																	required={true}
																/>
																<select
																	className="select select-bordered w-full mt-1"
																	id="bill_to"
																	name="bill_to"
																	value={
																		selectedOptionBillTo
																	}
																	onChange={
																		handleBillToChange
																	}
																>
																	<option
																		value=""
																		hidden
																	>
																		Bill To
																	</option>
																	{props.data.bill_to.map(
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
																	message={
																		errors.bill_to
																	}
																	className="mt-2"
																/>
															</div>

															<InputLabel
																value="Supplier Site"
																className="font-bold"
															/>
															<div>
																{formDataSS.entries.map(
																	(entry, index) => (
																		<div
																			key={index}
																			className="border-2 p-4"
																		>
																			<InputLabel
																				value={`Supplier Site: ${entry.supplier_site}`}
																				className="font-bold"
																			/>
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
																						<div className="grid grid-cols-1 mb-1">
																							<table className="table table-xs">
																								<thead>
																									<tr className="border-t bg-gray-100">
																										<th colSpan="7">{`COA ${coaType.toUpperCase()}`}</th>
																									</tr>
																									<tr></tr>
																								</thead>
																								<tbody>
																									<tr className="border-collapse border-1 border-gray-500">
																										{Array.from(
																											{
																												length: 7,
																											},
																											(
																												_,
																												coaNumber
																											) => (
																												<td
																													className="border-collapse border-1 border-gray-500"
																													key={
																														coaNumber
																													}
																												>
																													{
																														entry[
																														coaType
																														][
																														`${coaType}_${coaNumber +
																														1
																														}`
																														]
																													}
																												</td>
																											)
																										)}
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
															</div>
															{props.data.permissions.includes(
																"update_skb_accounting_vendor_profile"
															) ? (
																<div className="mt-3">
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
															) : (
																""
															)}
														</div>
													) : (
														// <div className={`ml-5`}>
														//     <div className='gap-3 justify-between grid grid-cols-3'>
														//         <p className='font-bold'>SKB</p>
														//         <p className='font-bold'>:</p>
														//         <p className='font-bold'>{data.skb}</p>

														//         <p className='font-bold'>PPH</p>
														//         <p className='font-bold'>:</p>
														//         <p className='font-bold'>{data.pph}</p>

														//         <p className='font-bold'>COA PREPAYMENT</p>
														//         <p className='font-bold'>:</p>
														//         <p className='font-bold'>{data.coa_prepayment}</p>

														//         <p className='font-bold'>COA LIABILITY ACCOUNT</p>
														//         <p className='font-bold'>:</p>
														//         <p className='font-bold'>{data.coa_liability_account}</p>

														//         <p className='font-bold'>COA LIABILITY ACCOUNT</p>
														//         <p className='font-bold'>:</p>
														//         <p className='font-bold'>{data.coa_liability_account}</p>

														//         <p className='font-bold'>COA RECEIVING</p>
														//         <p className='font-bold'>:</p>
														//         <p className='font-bold'>{data.coa_receiving}</p>

														//         <p className='font-bold'>SHIP TO</p>
														//         <p className='font-bold'>:</p>
														//         <p className='font-bold'>{data.ship_to}</p>

														//         <p className='font-bold'>BILL TO</p>
														//         <p className='font-bold'>:</p>
														//         <p className='font-bold'>{data.bill_to}</p>
														//     </div>
														// </div>
														""
													)}
												</div>
												<div
													className={`ml-0`}
													hidden={!submitSuccess}
												>
													<div className="gap-3 justify-between grid grid-cols-3">
														<p className="font-bold">TOP</p>
														<p className="font-bold">:</p>
														<p className="font-bold">
															{data.top} Hari
														</p>

														<p className="font-bold">PPN</p>
														<p className="font-bold">:</p>
														<p className="font-bold">
															{data.ppn}%
														</p>

														{props.data.permissions.includes(
															"update_skb_accounting_vendor_profile"
														) ? (
															<>
																<p className="font-bold">
																	SKB
																</p>
																<p className="font-bold">
																	:
																</p>
																<p className="font-bold">
																	{data.skb}
																</p>

																<p className="font-bold">
																	PPH
																</p>
																<p className="font-bold">
																	:
																</p>
																<p className="font-bold">
																	{data.pph}
																</p>

																{/* <p className='font-bold'>COA PREPAYMENT</p>
                                                        <p className='font-bold'>:</p>
                                                        <p className='font-bold'>{data.coa_prepayment}</p>

                                                        <p className='font-bold'>COA LIABILITY ACCOUNT</p>
                                                        <p className='font-bold'>:</p>
                                                        <p className='font-bold'>{data.coa_liability_account}</p>

                                                        <p className='font-bold'>COA LIABILITY ACCOUNT</p>
                                                        <p className='font-bold'>:</p>
                                                        <p className='font-bold'>{data.coa_liability_account}</p>

                                                        <p className='font-bold'>COA RECEIVING</p>
                                                        <p className='font-bold'>:</p>
                                                        <p className='font-bold'>{data.coa_receiving}</p> */}

																<p className="font-bold">
																	SHIP TO
																</p>
																<p className="font-bold">
																	:
																</p>
																<p className="font-bold">
																	{data.ship_to}
																</p>

																<p className="font-bold">
																	BILL TO
																</p>
																<p className="font-bold">
																	:
																</p>
																<p className="font-bold">
																	{data.bill_to}
																</p>
															</>
														) : (
															""
														)}
													</div>
												</div>
											</div>
											<p className="font-bold mt-12">
												<div className="flex item-end">
													<Link
														href={route(
															"admin.vendor-profile.index"
														)}
													>
														<SecondaryButton>
															Back
														</SecondaryButton>
													</Link>
													<DangerButton
														className="w-full items-center justify-center ml-3"
														hidden={submitSuccess}
														onClick={() =>
															handleStatusChange(
																"ditolak"
															)
														}
													>
														Tolak
													</DangerButton>
													<PrimaryButton
														className="w-full items-center justify-center ml-3"
														hidden={submitSuccess}
														onClick={() =>
															handleStatusChange(
																"disetujui"
															)
														}
													>
														Setuju
													</PrimaryButton>
												</div>
											</p>
										</div>


									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			<Transition
				show={recentlySuccessful}
				enter="transition ease-in-out"
				enterFrom="opacity-0"
				leave="transition ease-in-out"
				leaveTo="opacity-0"
			>
				<div className="toast">
					<div className="alert alert-success">
						<span className="text-white">
							Berhasil verifikasi perubahan data.
						</span>
					</div>
				</div>
			</Transition>

			<Modal show={isModalSSOpen} onClose={closeModalSS}>
				<div className="p-3 mb-3">
					<div className="flex justify-center">
						<InputLabel
							value="Tambah Supplier Site"
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
								<option value="" hidden>
									Pilih
								</option>
								<option value="trade asset">Trade Asset</option>
								<option value="non trade asset">
									Non Trade Asset
								</option>
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
														Pilih
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
														Pilih
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
														Pilih
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
														Pilih
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
														Pilih
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
														Pilih
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
														Pilih
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
							Tutup
						</SecondaryButton>
						<PrimaryButton onClick={addEntry}>Simpan</PrimaryButton>
					</div>
				</div>
			</Modal>
		</AuthenticatedLayout>
	);
}
