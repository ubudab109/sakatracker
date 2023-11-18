import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from "react";
import PrimaryButton from '@/Components/PrimaryButton';
import TableVendorProfile from './Partials/TableVendorProfile';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import PDFPopup from '@/Components/PDFPopup';
import ModalViewer from "@/Components/ModalViewer";
import { ArrowLeft, Check, CheckSquare, X } from 'react-feather';
import DangerButton from '@/Components/DangerButton';

export default function Index(props) {
    // console.log(props);
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        status: '',
        note: props.data.revision_vendor.note,
        document: '',
        top: props.data.revision_vendor.vendor.top,
        ppn: props.data.revision_vendor.vendor.ppn,
        skb: props.data.revision_vendor.vendor.skb,
        pph: props.data.revision_vendor.vendor.pph,
        coa_prepayment: props.data.revision_vendor.vendor.coa_prepayment,
        coa_liability_account: props.data.revision_vendor.vendor.coa_liability_account,
        coa_receiving: props.data.revision_vendor.vendor.coa_receiving,
        ship_to: props.data.revision_vendor.vendor.ship_to,
        bill_to: props.data.revision_vendor.vendor.bill_to,
        approval_role: '',
        
        npwp_note: props.data.revision_vendor.vendor.npwp_note,
        sppkp_note: props.data.revision_vendor.vendor.sppkp_note,
        siup_note: props.data.revision_vendor.vendor.siup_note,
        tdp_note: props.data.revision_vendor.vendor.tdp_note,
        nib_note: props.data.revision_vendor.vendor.nib_note,
        board_of_directors_composition_note: props.data.revision_vendor.vendor.board_of_directors_composition_note,
        non_pkp_statement_note: props.data.revision_vendor.vendor.non_pkp_statement_note,
    });

    const [selectedOptionTop, setSelectedOptionTop] = useState(props.data.revision_vendor.vendor.top);
    const [selectedOptionPpn, setSelectedOptionPpn] = useState(props.data.revision_vendor.vendor.ppn);

    const handleTopChange = (event) => {
        data.top = event.target.value;
        setSelectedOptionTop(data.top);
    }

    const handlePpnChange = (event) => {
        data.ppn = event.target.value;
        setSelectedOptionPpn(data.ppn);
    }

    const [submitSuccess, setSubmitSuccess] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.vendor-profile.update', props.data.revision_vendor.id), {
            onSuccess: () => setSubmitSuccess(true),
        });
    };
    const [selectedOptionStatus, setSelectedOptionStatus] = useState(props.data.revision_vendor.status);
    const [selectedOptionApprover, setSelectedOptionApprover] = useState(props.data.revision_vendor.status == 'ditolak' ? false : true);
    const [selectedOptionApproverVendor, setSelectedOptionApproverVendor] = useState();
    const handleStatusChange = (event) => {
        if(event == 'ditolak')
        {
            setSelectedOptionApprover(false)
        } else {
            setSelectedOptionApprover(true)
        }
        data.status = event;
        setSelectedOptionStatus(event);
    }

    const handleApproverVendorChange = (event) => {
        data.approval_role = event.target.value;
        setSelectedOptionApproverVendor(event.target.value);
    }

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

    const openPopup1 = () => {
        console.info(props.newdocs);
        setIsPopupOpen1(true);
    };

    const closePopup1 = () => {
        setIsPopupOpen1(false);
    };

    const initialState = {
        fileNpwpStatus: props.data.revision_vendor.vendor.npwp_note ? false : true,
        fileSppkpStatus: props.data.revision_vendor.vendor.sppkp_note ? false : true,
        fileSiupStatus: props.data.revision_vendor.vendor.siup_note ? false : true,
        fileTdpStatus: props.data.revision_vendor.vendor.tdp_note ? false : true,
        fileNibStatus: props.data.revision_vendor.vendor.nib_note ? false : true,
        fileBodcStatus: props.data.revision_vendor.vendor.board_of_directors_composition_note ? false : true,
        fileNonPkpStatus: props.data.revision_vendor.vendor.non_pkp_statement_note ? false : true,
      };
      
      const [fileStatus, setFileStatus] = useState(initialState);
      
      const clickStatusFile = (name, stat) => {
        const setDataAndStatus = (fileName, statusKey) => {
          if (name === fileName && stat === 1) {
            setFileStatus((prevStatus) => ({ ...prevStatus, [statusKey]: false }));
          } 
          if (name === fileName && stat === 0) {
            setFileStatus((prevStatus) => ({ ...prevStatus, [statusKey]: true }));
            data[fileName] = ''; // Assuming 'data' is defined somewhere
          }
        };
        
        setDataAndStatus('file_npwp', 'fileNpwpStatus');
        setDataAndStatus('file_sppkp', 'fileSppkpStatus');
        setDataAndStatus('file_siup', 'fileSiupStatus');
        setDataAndStatus('file_tdp', 'fileTdpStatus');
        setDataAndStatus('file_nib', 'fileNibStatus');
        setDataAndStatus('file_board_of_directors_composition', 'fileBodcStatus');
        setDataAndStatus('file_non_pkp_statement', 'fileNonPkpStatus');
        // Add more conditions as needed for other files
      };

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
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
                show={isPopupOpen1}
                onClose={closePopup1}
                props={props}
                datas={data}
            />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Perubahan Data</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href={route('admin.vendor-profile.index')}>Perubahan Data</a></li>
                        <li className="breadcrumb-item active"><a href="javascript: void(0);">Verifikasi Perubahan Data</a></li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="flex items-center gap-2">
                    <a href={route('admin.vendor-profile.index')}><ArrowLeft /></a>
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg w-full">
                        <div className="p-6 text-gray-900 font-bold">Verifikasi Perubahan Data</div>
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">
                            <div className='mb-3'>
                                <p className="font-bold mb-3">Company Information</p>
                                <div className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 text-sm text-gray-500 p-1'>
                                    <div className=''>
                                        <div className='flex'>
                                            <p className='mb-3'>
                                                Nama
                                            </p>
                                            <p className='mb-3 ml-24'>&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.name != props.data.revision_vendor.vendor.name ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.name}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.name}, 
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.legality != props.data.revision_vendor.vendor.legality ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.legality}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.legality}
                                            </p>
                                        </div>
                                        <div className='flex'>
                                            <p className='mb-3'>
                                                Email Address
                                            </p>
                                            <p className='mb-3 ml-11'>&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.email != props.data.revision_vendor.vendor.email ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.email}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.email}
                                            </p>
                                        </div>
                                        <div className='flex'>
                                            <p className='mb-3'>
                                                Jenis Usaha
                                            </p>
                                            <p className='mb-3 ml-14'>&nbsp;&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.name_business != props.data.revision_vendor.vendor.name_business ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.name_business}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.name_business}
                                            </p>
                                        </div>
                                        <div className='flex'>
                                            <p className='mb-3'>
                                                NPWP
                                            </p>
                                            <p className='mb-3 ml-24'>:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.npwp != props.data.revision_vendor.vendor.npwp ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.npwp}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.npwp}
                                            </p>
                                        </div>
                                        <div className='flex'>
                                            <p className='mb-3'>
                                                Alamat Kantor
                                            </p>
                                            <p className='mb-3 ml-11'>&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.office_address != props.data.revision_vendor.vendor.office_address ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.office_address}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.office_address}
                                            </p>
                                        </div>
                                        <div className='flex'>
                                            <p className='mb-3'>
                                                Alamat NPWP
                                            </p>
                                            <p className='mb-3 ml-12'>:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.npwp_address != props.data.revision_vendor.vendor.npwp_address ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.npwp_address}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.npwp_address}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='lg:ml-5 block'>
                                        <div className='flex'>
                                            <p className='mb-3'>
                                                Phone Number
                                            </p>
                                            <p className='mb-3 ml-12'>&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.phone_number != props.data.revision_vendor.vendor.phone_number ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.phone_number}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.phone_number}
                                            </p>
                                        </div>
                                        <div className='flex'>
                                            <p className='mb-3'>
                                            Mobile Number
                                            </p>
                                            <p className='mb-3 ml-12'>:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.mobile_phone_number != props.data.revision_vendor.vendor.mobile_phone_number ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.mobile_phone_number}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.mobile_phone_number}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mb-3'>
                                <div className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 border-dashed border-y-2 border-gray-300 p-1'>
                                    <div className='border-l-0'>
                                        <p className="font-bold text-black mb-3">Director Information</p>
                                        <div className='flex text-sm text-gray-500 mb-3'>
                                            <p className='mb-3'>
                                                Nama
                                            </p>
                                            <p className='mb-3 ml-24'>&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.director_name != props.data.revision_vendor.vendor.director_name ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.director_name}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.director_name}
                                            </p>
                                        </div>
                                        <div className='flex text-sm text-gray-500 mb-3'>
                                            <p className='mb-3'>
                                                Email Address
                                            </p>
                                            <p className='mb-3 ml-11'>&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.director_email != props.data.revision_vendor.vendor.director_email ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.director_email}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.director_email}
                                            </p>
                                        </div>
                                        <div className='flex text-sm text-gray-500 mb-3'>
                                            <p className='mb-3'>
                                                Phone Number
                                            </p>
                                            <p className='mb-3 ml-10'>&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.director_phone_number != props.data.revision_vendor.vendor.director_phone_number ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.director_phone_number}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.director_phone_number}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='lg:ml-5 block'>
                                        <p className="font-bold text-black mb-3">FA Information</p>
                                        <div className='flex text-sm text-gray-500 mb-3'>
                                            <p className='mb-3'>
                                                Nama
                                            </p>
                                            <p className='mb-3 ml-24'>&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.fa_name != props.data.revision_vendor.vendor.fa_name ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.fa_name}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.fa_name}
                                            </p>
                                        </div>
                                        <div className='flex text-sm text-gray-500 mb-3'>
                                            <p className='mb-3'>
                                                Email Address
                                            </p>
                                            <p className='mb-3 ml-11'>&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.fa_email != props.data.revision_vendor.vendor.fa_email ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.fa_email}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.fa_email}
                                            </p>
                                        </div>
                                        <div className='flex text-sm text-gray-500 mb-3'>
                                            <p className='mb-3'>
                                                Phone Number
                                            </p>
                                            <p className='mb-3 ml-10'>&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.fa_phone_number != props.data.revision_vendor.vendor.fa_phone_number ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.fa_phone_number}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.fa_phone_number}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mb-3'>
                                <div className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 border-dashed border-b-2 border-gray-300 p-1'>
                                    <div className='border-l-0'>
                                        <p className="font-bold text-black mb-3">Marketing/Key Account Information</p>
                                        <div className='flex text-sm text-gray-500 mb-3'>
                                            <p className='mb-3'>
                                                Nama
                                            </p>
                                            <p className='mb-3 ml-24'>&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.marketing_key_account != props.data.revision_vendor.vendor.marketing_key_account ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.marketing_key_account}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.marketing_key_account}
                                            </p>
                                        </div>
                                        <div className='flex text-sm text-gray-500 mb-3'>
                                            <p className='mb-3'>
                                                Email Address
                                            </p>
                                            <p className='mb-3 ml-11'>&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.marketing_email != props.data.revision_vendor.vendor.marketing_email ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.marketing_email}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.marketing_email}
                                            </p>
                                        </div>
                                        <div className='flex text-sm text-gray-500 mb-3'>
                                            <p className='mb-3'>
                                                Phone Number
                                            </p>
                                            <p className='mb-3 ml-10'>&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.marketing_phone_number != props.data.revision_vendor.vendor.marketing_phone_number ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.marketing_phone_number}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.marketing_phone_number}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='lg:ml-5 block'>
                                        <p className="font-bold text-black mb-3">Financial Information</p>
                                        <div className='flex text-sm text-gray-500 mb-3'>
                                            <p className=''>
                                                Type Bank
                                            </p>
                                            <p className='ml-16'>&nbsp;&nbsp;&nbsp;:
                                                {props.data.revision_vendor.vendor.is_virtual_account == 1 ? 'Virtual Account' : 'Non Vitual Account'}
                                            </p>
                                        </div>
                                        <div className='flex text-sm text-gray-500 mb-3'>
                                            <p className=''>
                                                Bank
                                            </p>
                                            <p className='ml-24'>&nbsp;&nbsp;&nbsp;&nbsp;:
                                                {props.data.revision_vendor.vendor.is_bca == 1 ? 'BCA' : props.data.revision_vendor.vendor.bank_name}
                                            </p>
                                        </div>
                                        <div className='flex text-sm text-gray-500 mb-3'>
                                            <p className=''>
                                                Nomor Rekening
                                            </p>
                                            <p className='mb-3 ml-8'>&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.bank_account_number != props.data.revision_vendor.vendor.bank_account_number ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.bank_account_number}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.bank_account_number}
                                            </p>
                                        </div>
                                        <div className='flex text-sm text-gray-500 mb-3'>
                                            <p className=''>
                                                Nama Akun
                                            </p>
                                            <p className='ml-16'>&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.bank_account_name != props.data.revision_vendor.vendor.bank_account_name ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.bank_account_name}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.bank_account_name}
                                            </p>
                                        </div>
                                        <div className='flex text-sm text-gray-500 mb-3'>
                                            <p className=''>
                                                Branch
                                            </p>
                                            <p className='ml-24'>:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.branch_of_bank != props.data.revision_vendor.vendor.branch_of_bank ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.branch_of_bank}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.branch_of_bank}
                                            </p>
                                        </div>
                                        <div className='flex text-sm text-gray-500 mb-3'>
                                            <p className=''>
                                                Swift Code
                                            </p>
                                            <p className='ml-16'>&nbsp;&nbsp;:
                                                {props.data.latest_vendor != null ? props.data.latest_vendor.bank_swift_code != props.data.revision_vendor.vendor.bank_swift_code ? <span className={`line-through text-red-600 mr-1`}>{props.data.latest_vendor.bank_swift_code}</span> : '' : ''}
                                                {props.data.revision_vendor.vendor.bank_swift_code}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {props.data.revision_vendor.vendor.type_of_business == 'PKP' ? <div className='mb-3'>
                                <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 border-dashed border-b-2 border-gray-300 p-1'>
                                    <div className='border-l-0'>
                                        <p className="font-bold text-black mb-3">Business Information</p>
                                        <p className='text-sm text-gray-500 mb-3'>Type</p>
                                        <p className='text-sm text-gray-500 mb-3'>NPWP</p>
                                        <p className='text-sm text-gray-500 mb-3'>SPPKP</p>
                                        <p className='text-sm text-gray-500 mb-3'>SIUP</p>
                                        <p className='text-sm text-gray-500 mb-3'>TDP</p>
                                        <p className='text-sm text-gray-500 mb-3'>NIB</p>
                                    </div>
                                    <div className='border-dashed border-gray-300 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3'>: Wajib Pajak Badan Usaha PKP</p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {
                                                    props.data.latest_vendor != null 
                                                    ? props.data.latest_vendor.file_npwp != props.data.revision_vendor.vendor.file_npwp
                                                    ? 
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
                                                    : '' 
                                                    : ''
                                            }
                                            {props.data.revision_vendor.vendor.file_npwp != '' ?
                                                <>
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
                                                    </a>
                                                    <a href="javascript:;" onClick={(e) => clickStatusFile('file_npwp', 0)} hidden={submitSuccess}>
                                                        <Check className='text-green-500' />
                                                    </a>
                                                    <a href="javascript:;" onClick={(e) => clickStatusFile('file_npwp', 1)} hidden={submitSuccess}>
                                                        <X className='text-red-500' />
                                                    </a>
                                                </>
                                             : '' }
                                            <p>&nbsp;</p>
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                        {
                                                props.data.latest_vendor != null 
                                                ? props.data.latest_vendor.file_sppkp != props.data.revision_vendor.vendor.file_sppkp
                                                ? 
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
                                                : '' 
                                                : ''
                                        }
                                            {props.data.revision_vendor.vendor.file_sppkp != '' ? 
                                                <>
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
                                                    </a>
                                                    <a href="javascript:;" onClick={(e) => clickStatusFile('file_sppkp', 0)} hidden={submitSuccess}>
                                                        <Check className='text-green-500' />
                                                    </a>
                                                    <a href="javascript:;" onClick={(e) => clickStatusFile('file_sppkp', 1)} hidden={submitSuccess}>
                                                        <X className='text-red-500' />
                                                    </a>
                                                </>
                                            : <p>-</p> }
                                            / 
                                            {props.data.latest_vendor != null 
                                            ? props.data.latest_vendor.expired_sppkp != props.data.revision_vendor.vendor.expired_sppkp 
                                            ? <span className={`line-through text-red-600 mr-1`}>
                                                {props.data.latest_vendor.expired_sppkp}
                                            </span> 
                                            : '' 
                                            : ''}
                                            {props.data.revision_vendor.vendor.expired_sppkp}
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                        {
                                                props.data.latest_vendor != null 
                                                ? props.data.latest_vendor.file_siup != props.data.revision_vendor.vendor.file_siup
                                                ? 
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
                                                : '' 
                                                : ''
                                        }
                                            {props.data.revision_vendor.vendor.file_siup != '' ? 
                                                <>
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
                                                    </a>
                                                    <a href="javascript:;" onClick={(e) => clickStatusFile('file_siup', 0)} hidden={submitSuccess}>
                                                        <Check className='text-green-500' />
                                                    </a>
                                                    <a href="javascript:;" onClick={(e) => clickStatusFile('file_siup', 1)} hidden={submitSuccess}>
                                                        <X className='text-red-500' />
                                                    </a>
                                                </>
                                            : <p>-</p> }
                                            / 
                                            {props.data.latest_vendor != null 
                                            ? props.data.latest_vendor.expired_siup != props.data.revision_vendor.vendor.expired_siup 
                                            ? <span className={`line-through text-red-600 mr-1`}>
                                                {props.data.latest_vendor.expired_siup}
                                            </span> 
                                            : '' 
                                            : ''}
                                            {props.data.revision_vendor.vendor.expired_siup}
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                        {
                                                props.data.latest_vendor != null 
                                                ? props.data.latest_vendor.file_tdp != props.data.revision_vendor.vendor.file_tdp
                                                ? 
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
                                                : '' 
                                                : ''
                                        }
                                            {props.data.revision_vendor.vendor.file_tdp != '' ? 
                                                <>
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
                                                    </a>
                                                    <a href="javascript:;" onClick={(e) => clickStatusFile('file_tdp', 0)} hidden={submitSuccess}>
                                                        <Check className='text-green-500' />
                                                    </a>
                                                    <a href="javascript:;" onClick={(e) => clickStatusFile('file_tdp', 1)} hidden={submitSuccess}>
                                                        <X className='text-red-500' />
                                                    </a>
                                                </>
                                            : <p>-</p> }
                                            / 
                                            {props.data.latest_vendor != null 
                                            ? props.data.latest_vendor.expired_tdp != props.data.revision_vendor.vendor.expired_tdp 
                                            ? <span className={`line-through text-red-600 mr-1`}>
                                                {props.data.latest_vendor.expired_tdp}
                                            </span> 
                                            : '' 
                                            : ''}
                                            {props.data.revision_vendor.vendor.expired_tdp}
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                        {
                                                props.data.latest_vendor != null 
                                                ? props.data.latest_vendor.file_nib != props.data.revision_vendor.vendor.file_nib
                                                ? 
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
                                                : '' 
                                                : ''
                                        }
                                            {props.data.revision_vendor.vendor.file_nib != '' ? 
                                                <>
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
                                                    </a>
                                                    <a href="javascript:;" onClick={(e) => clickStatusFile('file_nib', 0)} hidden={submitSuccess}>
                                                        <Check className='text-green-500' />
                                                    </a>
                                                    <a href="javascript:;" onClick={(e) => clickStatusFile('file_nib', 1)} hidden={submitSuccess}>
                                                        <X className='text-red-500' />
                                                    </a>
                                                </>
                                            : <p>-</p> }
                                            / 
                                            {props.data.latest_vendor != null 
                                            ? props.data.latest_vendor.expired_nib != props.data.revision_vendor.vendor.expired_nib 
                                            ? <span className={`line-through text-red-600 mr-1`}>
                                                {props.data.latest_vendor.expired_nib}
                                            </span> 
                                            : '' 
                                            : ''}
                                            {props.data.revision_vendor.vendor.expired_nib}
                                        </p>
                                    </div>
                                    <div className='lg:ml-5 block'>
                                        <p className="font-bold text-black mb-3">&nbsp;</p>
                                        <p className='text-sm text-gray-500 mb-3'>Akta Susunan Direksi</p>
                                        {/* <p className='text-sm text-gray-500 mb-3'>Halaman Depan Rekening</p>
                                        <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Rekening Bank</p> */}
                                    </div>
                                    <div className='lg:ml-5 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3 flex justify-between'>: 
                                        {
                                                props.data.latest_vendor != null 
                                                ? props.data.latest_vendor.file_board_of_directors_composition != props.data.revision_vendor.vendor.file_board_of_directors_composition
                                                ? 
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
                                                : '' 
                                                : ''
                                        }
                                            {props.data.revision_vendor.vendor.file_board_of_directors_composition != '' ? 
                                                <>
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
                                                    </a>
                                                    <a href="javascript:;" onClick={(e) => clickStatusFile('file_board_of_directors_composition', 0)} hidden={submitSuccess}>
                                                        <Check className='text-green-500' />
                                                    </a>
                                                    <a href="javascript:;" onClick={(e) => clickStatusFile('file_board_of_directors_composition', 1)} hidden={submitSuccess}>
                                                        <X className='text-red-500' />
                                                    </a>
                                                </>
                                            : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
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
                            </div> : ''}

                            {props.data.revision_vendor.vendor.type_of_business == 'Non PKP' ? <div className='mb-3'>
                                <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 border-dashed border-b-2 border-gray-300 p-1'>
                                    <div className='border-l-0'>
                                        <p className="font-bold text-black mb-3">Business Information</p>
                                        <p className='text-sm text-gray-500 mb-3'>Type</p>
                                        <p className='text-sm text-gray-500 mb-3'>NPWP</p>
                                        <p className='text-sm text-gray-500 mb-3'>SPPKP</p>
                                        <p className='text-sm text-gray-500 mb-3'>SIUP</p>
                                        <p className='text-sm text-gray-500 mb-3'>TDP</p>
                                        <p className='text-sm text-gray-500 mb-3'>NIB</p>
                                    </div>
                                    <div className='border-dashed border-gray-300 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3'>: Wajib Pajak Badan Usaha Non PKP</p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {
                                                props.data.latest_vendor != null 
                                                ? props.data.latest_vendor.file_npwp != props.data.revision_vendor.vendor.file_npwp
                                                ? 
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
                                                : '' 
                                                : ''
                                            }
                                            {props.data.revision_vendor.vendor.file_npwp != '' ? 
                                                <>
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
                                                    </a>
                                                    <a href="javascript:;" onClick={(e) => clickStatusFile('file_npwp', 0)} hidden={submitSuccess}>
                                                        <Check className='text-green-500' />
                                                    </a>
                                                    <a href="javascript:;" onClick={(e) => clickStatusFile('file_npwp', 1)} hidden={submitSuccess}>
                                                        <X className='text-red-500' />
                                                    </a>
                                                </>
                                            : '' }
                                            <p>&nbsp;</p>
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {
                                                props.data.latest_vendor != null 
                                                ? props.data.latest_vendor.file_sppkp != props.data.revision_vendor.vendor.file_sppkp
                                                ? 
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
                                                : '' 
                                                : ''
                                            }
                                            {props.data.revision_vendor.vendor.file_sppkp != '' ? 
                                            <>
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
                                                </a>
                                                <a href="javascript:;" onClick={(e) => clickStatusFile('file_sppkp', 0)} hidden={submitSuccess}>
                                                    <Check className='text-green-500' />
                                                </a>
                                                <a href="javascript:;" onClick={(e) => clickStatusFile('file_sppkp', 1)} hidden={submitSuccess}>
                                                    <X className='text-red-500' />
                                                </a>
                                            </>
                                            : <p>-</p> }
                                            / 
                                            {props.data.latest_vendor != null 
                                            ? props.data.latest_vendor.expired_sppkp != props.data.revision_vendor.vendor.expired_sppkp 
                                            ? <span className={`line-through text-red-600 mr-1`}>
                                                {props.data.latest_vendor.expired_sppkp}
                                            </span> 
                                            : '' 
                                            : ''}
                                            {props.data.revision_vendor.vendor.expired_sppkp}
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {
                                                props.data.latest_vendor != null 
                                                ? props.data.latest_vendor.file_siup != props.data.revision_vendor.vendor.file_siup
                                                ? 
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
                                                : '' 
                                                : ''
                                            }
                                            {props.data.revision_vendor.vendor.file_siup != '' ? 
                                            <>
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
                                                </a>
                                                <a href="javascript:;" onClick={(e) => clickStatusFile('file_siup', 0)} hidden={submitSuccess}>
                                                    <Check className='text-green-500' />
                                                </a>
                                                <a href="javascript:;" onClick={(e) => clickStatusFile('file_siup', 1)} hidden={submitSuccess}>
                                                    <X className='text-red-500' />
                                                </a>
                                            </>
                                            : <p>-</p> }
                                            / 
                                            {props.data.latest_vendor != null 
                                            ? props.data.latest_vendor.expired_siup != props.data.revision_vendor.vendor.expired_siup 
                                            ? <span className={`line-through text-red-600 mr-1`}>
                                                {props.data.latest_vendor.expired_siup}
                                            </span> 
                                            : '' 
                                            : ''}
                                            {props.data.revision_vendor.vendor.expired_siup}
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {
                                                props.data.latest_vendor != null 
                                                ? props.data.latest_vendor.file_tdp != props.data.revision_vendor.vendor.file_tdp
                                                ? 
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
                                                : '' 
                                                : ''
                                            }
                                            {props.data.revision_vendor.vendor.file_tdp != '' ? 
                                            <>
                                                <a href={props.data.revision_vendor.vendor.file_tdp} target='_blank'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a> 
                                                <a href="javascript:;" onClick={(e) => clickStatusFile('file_tdp', 0)} hidden={submitSuccess}>
                                                    <Check className='text-green-500' />
                                                </a>
                                                <a href="javascript:;" onClick={(e) => clickStatusFile('file_tdp', 1)} hidden={submitSuccess}>
                                                    <X className='text-red-500' />
                                                </a>
                                            </>
                                            : <p>-</p> }
                                            / 
                                            {props.data.latest_vendor != null 
                                            ? props.data.latest_vendor.expired_tdp != props.data.revision_vendor.vendor.expired_tdp 
                                            ? <span className={`line-through text-red-600 mr-1`}>
                                                {props.data.latest_vendor.expired_tdp}
                                            </span> 
                                            : '' 
                                            : ''}
                                            {props.data.revision_vendor.vendor.expired_tdp}
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {
                                                props.data.latest_vendor != null 
                                                ? props.data.latest_vendor.file_nib != props.data.revision_vendor.vendor.file_nib
                                                ? 
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
                                                : '' 
                                                : ''
                                            }
                                            {props.data.revision_vendor.vendor.file_nib != '' ?
                                            <>
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
                                                </a>
                                                <a href="javascript:;" onClick={(e) => clickStatusFile('file_nib', 0)}hidden={submitSuccess} >
                                                    <Check className='text-green-500' />
                                                </a>
                                                <a href="javascript:;" onClick={(e) => clickStatusFile('file_nib', 1)}hidden={submitSuccess} >
                                                    <X className='text-red-500' />
                                                </a>
                                            </>
                                            : <p>-</p> }
                                            / 
                                            {props.data.latest_vendor != null 
                                            ? props.data.latest_vendor.expired_nib != props.data.revision_vendor.vendor.expired_nib 
                                            ? <span className={`line-through text-red-600 mr-1`}>
                                                {props.data.latest_vendor.expired_nib}
                                            </span> 
                                            : '' 
                                            : ''}
                                            {props.data.revision_vendor.vendor.expired_nib}
                                        </p>
                                    </div>
                                    <div className='lg:ml-5 block'>
                                        <p className="font-bold text-black mb-3">&nbsp;</p>
                                        <p className='text-sm text-gray-500 mb-3'>Akta Susunan Direksi</p>
                                        {/* <p className='text-sm text-gray-500 mb-3'>Halaman Depan Rekening</p>
                                        <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Rekening Bank</p> */}
                                        <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Non PKP</p>
                                    </div>
                                    <div className='lg:ml-5 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {
                                                props.data.latest_vendor != null 
                                                ? props.data.latest_vendor.file_board_of_directors_composition != props.data.revision_vendor.vendor.file_board_of_directors_composition
                                                ? 
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
                                                : '' 
                                                : ''
                                            }
                                            {props.data.revision_vendor.vendor.file_board_of_directors_composition != '' ? 
                                            <>
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
                                                </a>
                                                <a href="javascript:;" onClick={(e) => clickStatusFile('file_board_of_directors_composition', 0)} hidden={submitSuccess}>
                                                    <Check className='text-green-500' />
                                                </a>
                                                <a href="javascript:;" onClick={(e) => clickStatusFile('file_board_of_directors_composition', 1)}hidden={submitSuccess}>
                                                    <X className='text-red-500' />
                                                </a>
                                            </>
                                            : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
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
                                        <p className='mb-3 flex justify-between'>: 
                                            {
                                                    props.data.latest_vendor != null 
                                                    ? props.data.latest_vendor.file_non_pkp_statement != props.data.revision_vendor.vendor.file_non_pkp_statement
                                                    ? 
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
                                                    : '' 
                                                    : ''
                                            }
                                            {props.data.revision_vendor.vendor.file_non_pkp_statement != '' ?
                                            <>
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
                                                </a>
                                                <a hidden={submitSuccess} href="javascript:;" onClick={(e) => clickStatusFile('file_non_pkp_statement', 0)} >
                                                    <Check className='text-green-500' />
                                                </a>
                                                <a hidden={submitSuccess} href="javascript:;" onClick={(e) => clickStatusFile('file_non_pkp_statement', 1)} >
                                                    <X className='text-red-500' />
                                                </a>
                                            </>
                                            : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
                                    </div>
                                </div>
                            </div> : ''}

                            {props.data.revision_vendor.vendor.type_of_business == 'Pribadi' ? <div className='mb-3'>
                                <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 border-dashed border-b-2 border-gray-300 p-1'>
                                    <div className='border-l-0'>
                                        <p className="font-bold text-black mb-3">Business Information</p>
                                        <p className='text-sm text-gray-500 mb-3'>Type</p>
                                        <p className='text-sm text-gray-500 mb-3'>NPWP</p>
                                        {/* <p className='text-sm text-gray-500 mb-3'>E-KTP</p> */}
                                    </div>
                                    <div className='border-dashed border-gray-300 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3'>: Wajib Pajak Orang Pribadi</p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {
                                                props.data.latest_vendor != null 
                                                ? props.data.latest_vendor.file_npwp != props.data.revision_vendor.vendor.file_npwp
                                                ? 
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
                                                : '' 
                                                : ''
                                            }
                                            {props.data.revision_vendor.vendor.file_npwp != '' ? 
                                                <>
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
                                                    </a>
                                                    <a href="javascript:;" onClick={(e) => clickStatusFile('file_npwp', 0)}hidden={submitSuccess} >
                                                        <Check className='text-green-500' />
                                                    </a>
                                                    <a href="javascript:;" onClick={(e) => clickStatusFile('file_npwp', 1)}hidden={submitSuccess} >
                                                        <X className='text-red-500' />
                                                    </a>
                                                </>
                                            : '' }
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
                                    <div className='lg:ml-5 block'>
                                        <p className="font-bold text-black mb-3">&nbsp;</p>
                                        {/* <p className='text-sm text-gray-500 mb-3'>Halaman Depan Rekening</p>
                                        <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Rekening Bank</p> */}
                                        <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Non PKP</p>
                                    </div>
                                    <div className='lg:ml-5 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
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
                                        <p className='mb-3 flex justify-between'>: 
                                            {
                                                props.data.latest_vendor != null 
                                                ? props.data.latest_vendor.file_non_pkp_statement != props.data.revision_vendor.vendor.file_non_pkp_statement
                                                ? 
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
                                                : '' 
                                                : ''
                                            }
                                            {props.data.revision_vendor.vendor.file_non_pkp_statement != '' ? 
                                            <>
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
                                                </a>
                                                <a href="javascript:;" onClick={(e) => clickStatusFile('file_non_pkp_statement', 0)} hidden={submitSuccess}>
                                                    <Check className='text-green-500' />
                                                </a>
                                                <a href="javascript:;" onClick={(e) => clickStatusFile('file_non_pkp_statement', 1)}hidden={submitSuccess} >
                                                    <X className='text-red-500' />
                                                </a>
                                            </>
                                            : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
                                    </div>
                                </div>
                            </div> : ''}
                            
                            <form onSubmit={submit}>
                                <div>
                                    <p className="font-bold text-black mb-3"  hidden={submitSuccess}>Tindakan</p>
                                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
                                        <div className=''>
                                            <div hidden={submitSuccess}>
                                                <div className="mb-3" hidden={fileStatus.fileNpwpStatus}>
                                                    <InputLabel value="Catatan File NPWP" className="font-bold"/>
                                                    <textarea 
                                                        name="npwp_note"
                                                        className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                                        placeholder="catatan file npwp *"
                                                        onChange={(e) => setData('npwp_note', e.target.value)}
                                                        value={data.npwp_note}
                                                    />

                                                    <InputError message={errors.npwp_note} className="mt-2" />
                                                </div>
                                                <div className="mb-3" hidden={fileStatus.fileSppkpStatus}>
                                                    <InputLabel value="Catatan File SPPKP" className="font-bold"/>
                                                    <textarea 
                                                        name="sppkp_note"
                                                        className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                                        placeholder="catatan file sppkp *"
                                                        onChange={(e) => setData('sppkp_note', e.target.value)}
                                                        value={data.sppkp_note}
                                                    />

                                                    <InputError message={errors.sppkp_note} className="mt-2" />
                                                </div>
                                                <div className="mb-3" hidden={fileStatus.fileSiupStatus}>
                                                    <InputLabel value="Catatan File SIUP" className="font-bold"/>
                                                    <textarea 
                                                        name="siup_note"
                                                        className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                                        placeholder="catatan file siup *"
                                                        onChange={(e) => setData('siup_note', e.target.value)}
                                                        value={data.siup_note}
                                                    />

                                                    <InputError message={errors.siup_note} className="mt-2" />
                                                </div>
                                                <div className="mb-3" hidden={fileStatus.fileTdpStatus}>
                                                    <InputLabel value="Catatan File TDP" className="font-bold"/>
                                                    <textarea 
                                                        name="tdp_note"
                                                        className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                                        placeholder="catatan file tdp *"
                                                        onChange={(e) => setData('tdp_note', e.target.value)}
                                                        value={data.tdp_note}
                                                    />

                                                    <InputError message={errors.tdp_note} className="mt-2" />
                                                </div>
                                                <div className="mb-3" hidden={fileStatus.fileNibStatus}>
                                                    <InputLabel value="Catatan File NIB" className="font-bold"/>
                                                    <textarea 
                                                        name="nib_note"
                                                        className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                                        placeholder="catatan file nib *"
                                                        onChange={(e) => setData('nib_note', e.target.value)}
                                                        value={data.nib_note}
                                                    />

                                                    <InputError message={errors.nib_note} className="mt-2" />
                                                </div>
                                                <div className="mb-3" hidden={fileStatus.fileBodcStatus}>
                                                    <InputLabel value="Catatan File Akta Susunan Direksi" className="font-bold"/>
                                                    <textarea 
                                                        name="board_of_directors_composition_note"
                                                        className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                                        placeholder="catatan file akta susunan direksi *"
                                                        onChange={(e) => setData('board_of_directors_composition_note', e.target.value)}
                                                        value={data.board_of_directors_composition_note}
                                                    />

                                                    <InputError message={errors.board_of_directors_composition_note} className="mt-2" />
                                                </div>
                                                <div className="mb-3" hidden={fileStatus.fileNonPkpStatus}>
                                                    <InputLabel value="Catatan File Surat pernyataan non pkp" className="font-bold"/>
                                                    <textarea 
                                                        name="non_pkp_statement_note"
                                                        className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                                        placeholder="catatan file Surat pernyataan non pkp *"
                                                        onChange={(e) => setData('non_pkp_statement_note', e.target.value)}
                                                        value={data.non_pkp_statement_note}
                                                    />

                                                    <InputError message={errors.non_pkp_statement_note} className="mt-2" />
                                                </div>
                                            </div>
                                            {props.data.approver_revision_done.length > 0 ?
                                                <div className="w-full mb-3"  hidden={submitSuccess}>
                                                    <InputLabel value="Approver Vendor" className="font-bold" />
                                                    <select className="select select-bordered w-full mt-1"
                                                        id="approval_role"
                                                        name="approval_role"
                                                        value={selectedOptionApproverVendor}
                                                        onChange={handleApproverVendorChange}
                                                    >
                                                        <option value="" hidden>Pilih</option>
                                                        {props.data.approver_revision_done.map((item, index) => (
                                                            <option value={item.approval_role}>{item.approval_role}</option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.status} className="mt-2" />
                                                </div>
                                            : ''}
                                            <div className="mb-3" hidden={submitSuccess}>
                                                <InputLabel value="Catatan" className="font-bold"/>
                                                <textarea 
                                                    name="note"
                                                    className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                                    placeholder="catatan *"
                                                    onChange={(e) => setData('note', e.target.value)}
                                                    value={data.note}
                                                />

                                                <InputError message={errors.note} className="mt-2" />
                                            </div>
                                            <div className="mb-3" hidden={submitSuccess}>
                                                <InputLabel value="Lampiran" className="font-bold"/>
                                                <div className='flex items-center align-middle'>
                                                    <input name="document" type="file" className="file-input file-input-bordered w-full max-w-xs" 
                                                        onChange={(e) => setData('document', e.target.files[0])}
                                                    />
                                                    {props.data.revision_vendor.document != '' ? <a href={props.data.revision_vendor.document} target='_blank'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                        </svg>
                                                    </a> : '' }
                                                </div>
                                                <InputError 
                                                    message={errors.document}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <p className="font-bold mt-12">
                                                <div className='flex'>
                                                    <Link href={route('admin.vendor-profile.index')}>
                                                        <SecondaryButton>
                                                            Back
                                                        </SecondaryButton>
                                                    </Link>
                                                    <DangerButton className='w-full items-center justify-center ml-3'  hidden={submitSuccess} onClick={() => handleStatusChange('ditolak')}>
                                                        Tolak
                                                    </DangerButton>
                                                    <PrimaryButton className='w-full items-center justify-center ml-3'  hidden={submitSuccess} onClick={() => handleStatusChange('disetujui')}>
                                                        Setuju
                                                    </PrimaryButton>
                                                </div>
                                            </p>
                                        </div>
                                        
                                        <div hidden={submitSuccess}>
                                            {props.data.permissions.includes('update_ppn_top_vendor_profile') ?
                                                <div className={`ml-5`}>
                                                    <div className="mb-3">
                                                        <InputLabel value="Top" className="font-bold" required={true}/>
                                                        <select className="select select-bordered w-full mt-1"
                                                            id="top"
                                                            name="top"
                                                            value={selectedOptionTop}
                                                            onChange={handleTopChange}
                                                        >
                                                            <option value="" hidden>Top</option>
                                                            {props.data.payment_terms.map((item) => (
                                                                <option key={item.id} value={item.day}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <InputError 
                                                            message={errors.top}
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                    <InputLabel value="PPN" className="font-bold" required={true}/>
                                                        <select className="select select-bordered w-full mt-1"
                                                            id="ppn"
                                                            name="ppn"
                                                            value={selectedOptionPpn}
                                                            onChange={handlePpnChange}
                                                        >
                                                            <option value="" hidden>Ppn</option>
                                                            {props.data.taxes.map((item) => (
                                                                <option key={item.id} value={item.tax}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <InputError 
                                                            message={errors.ppn}
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            : 
                                                <div className={`ml-5`}>
                                                    <div className='gap-3 justify-between grid grid-cols-3'>
                                                        <p className='font-bold'>TOP</p>
                                                        <p className='font-bold'>:</p>
                                                        <p className='font-bold'>{data.top} Hari</p>
                                                        <p className='font-bold'>PPN</p>
                                                        <p className='font-bold'>:</p>
                                                        <p className='font-bold'>{data.ppn} %</p>
                                                    </div>
                                                </div>
                                            }
                                            {props.data.permissions.includes('update_skb_accounting_vendor_profile') ?
                                                <div className={`ml-5`}>
                                                    <div className="mb-3">
                                                        <InputLabel htmlFor="skb" value="SKB" required={true} />

                                                        <TextInput 
                                                            id="skb"
                                                            name="skb"
                                                            value={data.skb}
                                                            className="mt-1 block w-full"
                                                            autoComplete="skb"
                                                            placeholder="skb.."
                                                            isFocused={true}
                                                            onChange={(e) => setData('skb', e.target.value)}
                                                            
                                                        />

                                                        <InputError 
                                                            message={errors.skb}
                                                            className="mt-2"
                                                        />
                                                    </div>

                                                    <div className="mb-3">
                                                        <InputLabel htmlFor="pph" value="PPH" required={true} />

                                                        <TextInput 
                                                            id="pph"
                                                            name="pph"
                                                            value={data.pph}
                                                            className="mt-1 block w-full"
                                                            autoComplete="pph"
                                                            placeholder="pph.."
                                                            isFocused={true}
                                                            onChange={(e) => setData('pph', e.target.value)}
                                                            
                                                        />

                                                        <InputError 
                                                            message={errors.pph}
                                                            className="mt-2"
                                                        />
                                                    </div>

                                                    <div className="mb-3">
                                                        <InputLabel htmlFor="coa_prepayment" value="COA PREPAYMENT" required={true} />

                                                        <TextInput 
                                                            id="coa_prepayment"
                                                            name="coa_prepayment"
                                                            value={data.coa_prepayment}
                                                            className="mt-1 block w-full"
                                                            autoComplete="coa_prepayment"
                                                            placeholder="coa prepayment.."
                                                            isFocused={true}
                                                            onChange={(e) => setData('coa_prepayment', e.target.value)}
                                                            
                                                        />

                                                        <InputError 
                                                            message={errors.coa_prepayment}
                                                            className="mt-2"
                                                        />
                                                    </div>

                                                    <div className="mb-3">
                                                        <InputLabel htmlFor="coa_liability_account" value="COA LIABILITY ACCOUNT" required={true} />

                                                        <TextInput 
                                                            id="coa_liability_account"
                                                            name="coa_liability_account"
                                                            value={data.coa_liability_account}
                                                            className="mt-1 block w-full"
                                                            autoComplete="coa_liability_account"
                                                            placeholder="coa liability account.."
                                                            isFocused={true}
                                                            onChange={(e) => setData('coa_liability_account', e.target.value)}
                                                            
                                                        />

                                                        <InputError 
                                                            message={errors.coa_liability_account}
                                                            className="mt-2"
                                                        />
                                                    </div>

                                                    <div className="mb-3">
                                                        <InputLabel htmlFor="coa_receiving" value="COA RECEIVING" required={true} />

                                                        <TextInput 
                                                            id="coa_receiving"
                                                            name="coa_receiving"
                                                            value={data.coa_receiving}
                                                            className="mt-1 block w-full"
                                                            autoComplete="coa_receiving"
                                                            placeholder="coa receiving.."
                                                            isFocused={true}
                                                            onChange={(e) => setData('coa_receiving', e.target.value)}
                                                            
                                                        />

                                                        <InputError 
                                                            message={errors.coa_receiving}
                                                            className="mt-2"
                                                        />
                                                    </div>

                                                    <div className="mb-3">
                                                        <InputLabel htmlFor="ship_to" value="SHIP TO" required={true} />

                                                        <TextInput 
                                                            id="ship_to"
                                                            name="ship_to"
                                                            value={data.ship_to}
                                                            className="mt-1 block w-full"
                                                            autoComplete="ship_to"
                                                            placeholder="ship to.."
                                                            isFocused={true}
                                                            onChange={(e) => setData('ship_to', e.target.value)}
                                                            
                                                        />

                                                        <InputError 
                                                            message={errors.ship_to}
                                                            className="mt-2"
                                                        />
                                                    </div>

                                                    <div className="mb-3">
                                                        <InputLabel htmlFor="bill_to" value="BILL TO" required={true} />

                                                        <TextInput 
                                                            id="bill_to"
                                                            name="bill_to"
                                                            value={data.bill_to}
                                                            className="mt-1 block w-full"
                                                            autoComplete="bill_to"
                                                            placeholder="bill to.."
                                                            isFocused={true}
                                                            onChange={(e) => setData('bill_to', e.target.value)}
                                                            
                                                        />

                                                        <InputError 
                                                            message={errors.bill_to}
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            : 
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
                                                ''
                                            }

                                        </div>
                                        <div className={`ml-5`} hidden={!submitSuccess}>
                                            
                                            <div className='gap-3 justify-between grid grid-cols-3'>
                                                <p className='font-bold'>TOP</p>
                                                <p className='font-bold'>:</p>
                                                <p className='font-bold'>{data.top} Hari</p>

                                                <p className='font-bold'>PPN</p>
                                                <p className='font-bold'>:</p>
                                                <p className='font-bold'>{data.ppn}%</p>
                                            
                                                {props.data.permissions.includes('update_skb_accounting_vendor_profile') ?
                                                    <>
                                                        <p className='font-bold'>SKB</p>
                                                        <p className='font-bold'>:</p>
                                                        <p className='font-bold'>{data.skb}</p>

                                                        <p className='font-bold'>PPH</p>
                                                        <p className='font-bold'>:</p>
                                                        <p className='font-bold'>{data.pph}</p>

                                                        <p className='font-bold'>COA PREPAYMENT</p>
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
                                                        <p className='font-bold'>{data.coa_receiving}</p>

                                                        <p className='font-bold'>SHIP TO</p>
                                                        <p className='font-bold'>:</p>
                                                        <p className='font-bold'>{data.ship_to}</p>

                                                        <p className='font-bold'>BILL TO</p>
                                                        <p className='font-bold'>:</p>
                                                        <p className='font-bold'>{data.bill_to}</p>
                                                    </>
                                                :''
                                                }
                                            </div>
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
                        <span className='text-white'>Berhasil verifikasi perubahan data.</span>
                    </div>
                </div>
            </Transition>

        </AuthenticatedLayout>
    );
}
