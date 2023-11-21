import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TableProfile from '@/Pages/Vendor/Profile/Partials/TableProfile';
import { Head, Link } from '@inertiajs/react';
import React from "react";
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState } from 'react';
import PDFPopup from '@/Components/PDFPopup';
import PDFViewer from './Components/PDFViewer';
import ModalViewer from '@/Components/ModalViewer';
import { ArrowLeft } from 'react-feather';

export default function Show(props) {
    console.log(props);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [pdfUrl, setPdfUrl] = useState('');

    const openPopup = (item) => {
        setPdfUrl(item);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setPdfUrl('');
        setIsPopupOpen(false);
    };
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Detail Perubahan Data" />

            <ModalViewer
                files={pdfUrl}
                show={isPopupOpen}
                onClose={closePopup}
            />

            {/* <PDFViewer pdfUrl={props.data.vendor.file_npwp} /> */}

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Perubahan Data</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href="javascript: void(0);">Vendor Management</a></li>
                        <li className="breadcrumb-item"><a href={route('vendor.index')}>Perubahan Data</a></li>
                        <li className="breadcrumb-item active">Detail Perubahan Data</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="flex items-center gap-2">
                    <a href={route('vendor.index')}><ArrowLeft /></a>
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg w-full">
                        <div className="p-6 text-gray-900 font-bold">Detail Perubahan Data</div>
                    </div>
                </div>
            </div>

            
            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">
                            <div className='mb-3'>
                                <p className="font-bold mb-3">Company Information</p>
                                <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 text-sm text-gray-500 p-1'>
                                    <div className=''>
                                        <p className='mb-3'>Nama</p>
                                        <p className='mb-3'>Email Address</p>
                                        <p className='mb-3'>Jenis Usaha</p>
                                        <p className='mb-3'>NPWP</p>
                                        <p className='mb-3'>Alamat Kantor</p>
                                        <p className='mb-3'>Alamat NPWP</p>
                                    </div>
                                    <div className=''>
                                        <p className='mb-3'>: {props.data.vendor.name}, {props.data.vendor.legality}</p>
                                        <p className='mb-3'>: {props.data.vendor.email}</p>
                                        <p className='mb-3'>: {props.data.vendor.name_business}</p>
                                        <p className='mb-3'>: {props.data.vendor.npwp}</p>
                                        <p className='mb-3'>: {props.data.vendor.office_address}</p>
                                        <p className='mb-3'>: {props.data.vendor.npwp_address}</p>
                                    </div>
                                    <div className='lg:ml-5 block'>
                                        <p className='mb-3'>Phone Number</p>
                                        <p className='mb-3'>Mobile Number</p>
                                        <p className='mb-3'>TOP</p>
                                        <p className='mb-3'>PPN</p>
                                        <p className='mb-3'>PPH</p>
                                        <p className='mb-3'>COA Prepayment</p>
                                        <p className='mb-3'>COA Liability Account</p>
                                        <p className='mb-3'>COA Receiving</p>
                                        <p className='mb-3'>Ship To</p>
                                        <p className='mb-3'>Bill To</p>
                                    </div>
                                    <div className='lg:ml-5'>
                                        <p className='mb-3'>: {props.data.vendor.phone_number}</p>
                                        <p className='mb-3'>: {props.data.vendor.mobile_phone_number}</p>
                                        <p className='mb-3'>: {props.data.vendor.top  ? props.data.vendor.top : '-'}</p>
                                        <p className='mb-3'>: {props.data.vendor.ppn  ? props.data.vendor.ppn : '-'}</p>
                                        <p className='mb-3'>: {props.data.vendor.pph  ? props.data.vendor.pph : '-'}</p>
                                        <p className='mb-3'>: {props.data.vendor.coa_prepayment  ? props.data.vendor.coa_prepayment : '-'}</p>
                                        <p className='mb-3'>: {props.data.vendor.coa_liability_account  ? props.data.vendor.coa_liability_account : '-'}</p>
                                        <p className='mb-3'>: {props.data.vendor.coa_receiving  ? props.data.vendor.coa_receiving : '-'}</p>
                                        <p className='mb-3'>: {props.data.vendor.ship_to  ? props.data.vendor.ship_to : '-'}</p>
                                        <p className='mb-3'>: {props.data.vendor.bill_to  ? props.data.vendor.bill_to : '-'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='mb-3'>
                                <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 border-dashed border-y-2 border-gray-300 p-1'>
                                    <div className='border-l-0'>
                                        <p className="font-bold text-black mb-3">Director Information</p>
                                        <p className='text-sm text-gray-500 mb-3'>Nama</p>
                                        <p className='text-sm text-gray-500 mb-3'>Email Address</p>
                                        <p className='text-sm text-gray-500 mb-3'>Phone Number</p>
                                    </div>
                                    <div className='border-dashed border-r-2 border-gray-300 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3'>: {props.data.vendor.director_name}</p>
                                        <p className='mb-3'>: {props.data.vendor.director_email}</p>
                                        <p className='mb-3'>: {props.data.vendor.director_phone_number}</p>
                                    </div>
                                    <div className='lg:ml-5 block'>
                                        <p className="font-bold text-black mb-3">FA Information</p>
                                        <p className='text-sm text-gray-500 mb-3'>Nama</p>
                                        <p className='text-sm text-gray-500 mb-3'>Email Address</p>
                                        <p className='text-sm text-gray-500 mb-3'>Phone Number</p>
                                    </div>
                                    <div className='lg:ml-5 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3'>: {props.data.vendor.fa_name}</p>
                                        <p className='mb-3'>: {props.data.vendor.fa_email}</p>
                                        <p className='mb-3'>: {props.data.vendor.fa_phone_number}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='mb-3'>
                                <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 border-dashed border-b-2 border-gray-300 p-1'>
                                    <div className='border-l-0'>
                                        <p className="font-bold text-black mb-3">Marketing/Key Account Information</p>
                                        <p className='text-sm text-gray-500 mb-3'>Nama</p>
                                        <p className='text-sm text-gray-500 mb-3'>Email Address</p>
                                        <p className='text-sm text-gray-500 mb-3'>Phone Number</p>
                                    </div>
                                    <div className='border-dashed border-r-2 border-gray-300 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3'>: {props.data.vendor.marketing_key_account}</p>
                                        <p className='mb-3'>: {props.data.vendor.marketing_email}</p>
                                        <p className='mb-3'>: {props.data.vendor.marketing_phone_number}</p>
                                    </div>
                                    <div className='lg:ml-5 block'>
                                        <p className="font-bold text-black mb-3">Financial Information</p>
                                        <p className='text-sm text-gray-500 mb-3'>Type Bank</p>
                                        <p className='text-sm text-gray-500 mb-3'>Bank</p>
                                        <p className='text-sm text-gray-500 mb-3'>Nomor Rekening</p>
                                        <p className='text-sm text-gray-500 mb-3'>Nama Akun</p>
                                        <p className='text-sm text-gray-500 mb-3'>Branch</p>
                                        <p className='text-sm text-gray-500 mb-3'>Swift Code</p>
                                    </div>
                                    <div className='lg:ml-5 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3'>: {props.data.vendor.is_virtual_account == 1 ? 'Virtual Account' : 'Non Vitual Account'}</p>
                                        <p className='mb-3'>: {props.data.vendor.is_bca == 1 ? 'BCA' : props.data.vendor.bank_name}</p>
                                        <p className='mb-3'>: {props.data.vendor.bank_account_number}</p>
                                        <p className='mb-3'>: {props.data.vendor.bank_account_name}</p>
                                        <p className='mb-3'>: {props.data.vendor.branch_of_bank}</p>
                                        <p className='mb-3'>: {props.data.vendor.bank_swift_code}</p>
                                    </div>
                                </div>
                            </div>

                            {props.data.vendor.type_of_business == 'PKP' ? <div className='mb-3'>
                                <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 border-dashed border-b-2 border-gray-300 p-1'>
                                    <div className='border-l-0'>
                                        <p className="font-bold text-black mb-3">Business Information</p>
                                        <p className='text-sm text-gray-500 mb-3'>Type</p>
                                        <p className={`text-sm text-${props.data.vendor.status_account == 'ditolak' ? props.data.vendor.npwp_note ? 'red' : 'gray' : 'gray'}-500 mb-3`}>NPWP</p>
                                        <p className={`text-sm text-${props.data.vendor.status_account == 'ditolak' ? props.data.vendor.sppkp_note ? 'red' : 'gray' : 'gray'}-500 mb-3`}>SPPKP</p>
                                        <p className={`text-sm text-${props.data.vendor.status_account == 'ditolak' ? props.data.vendor.siup_note ? 'red' : 'gray' : 'gray'}-500 mb-3`}>SIUP</p>
                                        <p className={`text-sm text-${props.data.vendor.status_account == 'ditolak' ? props.data.vendor.tdp_note ? 'red' : 'gray' : 'gray'}-500 mb-3`}>TDP</p>
                                        <p className={`text-sm text-${props.data.vendor.status_account == 'ditolak' ? props.data.vendor.nib_note ? 'red' : 'gray' : 'gray'}-500 mb-3`}>NIB</p>
                                    </div>
                                    <div className='border-dashed border-gray-300 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3'>: Wajib Pajak Badan Usaha PKP</p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_npwp != '' ? <a href={props.data.vendor.file_npwp} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : '' }
                                            <p>&nbsp;</p>
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_sppkp != '' ? <a href={props.data.vendor.file_sppkp} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            / {props.data.vendor.expired_sppkp}
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_siup != '' ? <a href={props.data.vendor.file_siup} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            / {props.data.vendor.expired_siup}
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_tdp != '' ? <a href={props.data.vendor.file_tdp} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            / {props.data.vendor.expired_tdp}
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_nib != '' ? <a href={props.data.vendor.file_nib} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            / {props.data.vendor.expired_nib}
                                        </p>
                                    </div>
                                    <div className='lg:ml-5 block'>
                                        <p className="font-bold text-black mb-3">&nbsp;</p>
                                        <p className={`text-sm text-${props.data.vendor.status_account == 'ditolak' ? props.data.vendor.board_of_directors_composition_note ? 'red' : 'gray' : 'gray'}-500 mb-3`}>Akta Susunan Direksi</p>
                                        {/* <p className='text-sm text-gray-500 mb-3'>Halaman Depan Rekening</p>
                                        <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Rekening Bank</p> */}
                                    </div>
                                    <div className='lg:ml-5 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_board_of_directors_composition != '' ? <a href={props.data.vendor.file_board_of_directors_composition} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
                                        {/* <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_front_page_bank != '' ? <a href={props.data.vendor.file_front_page_bank} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_bank_account_statement_letter != '' ? <a href={props.data.vendor.file_bank_account_statement_letter} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p> */}
                                    </div>
                                </div>
                            </div> : ''}

                            {props.data.vendor.type_of_business == 'Non PKP' ? <div className='mb-3'>
                                <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 border-dashed border-b-2 border-gray-300 p-1'>
                                    <div className='border-l-0'>
                                        <p className="font-bold text-black mb-3">Business Information</p>
                                        <p className='text-sm text-gray-500 mb-3'>Type</p>
                                        <p className={`text-sm text-${props.data.vendor.status_account == 'ditolak' ? props.data.vendor.npwp_note ? 'red' : 'gray' : 'gray'}-500 mb-3`}>NPWP</p>
                                        <p className={`text-sm text-${props.data.vendor.status_account == 'ditolak' ? props.data.vendor.sppkp_note ? 'red' : 'gray' : 'gray'}-500 mb-3`}>SPPKP</p>
                                        <p className={`text-sm text-${props.data.vendor.status_account == 'ditolak' ? props.data.vendor.siup_note ? 'red' : 'gray' : 'gray'}-500 mb-3`}>SIUP</p>
                                        <p className={`text-sm text-${props.data.vendor.status_account == 'ditolak' ? props.data.vendor.tdp_note ? 'red' : 'gray' : 'gray'}-500 mb-3`}>TDP</p>
                                        <p className={`text-sm text-${props.data.vendor.status_account == 'ditolak' ? props.data.vendor.nib_note ? 'red' : 'gray' : 'gray'}-500 mb-3`}>NIB</p>
                                    </div>
                                    <div className='border-dashed border-gray-300 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3'>: Wajib Pajak Badan Usaha Non PKP</p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_npwp != '' ? <a href={props.data.vendor.file_npwp} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : '' }
                                            <p>&nbsp;</p>
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_sppkp != '' ? <a href={props.data.vendor.file_sppkp} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            / {props.data.vendor.expired_sppkp}
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_siup != '' ? <a href={props.data.vendor.file_siup} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            / {props.data.vendor.expired_siup}
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_tdp != '' ? <a href={props.data.vendor.file_tdp} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            / {props.data.vendor.expired_tdp}
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_nib != '' ? <a href={props.data.vendor.file_nib} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            / {props.data.vendor.expired_nib}
                                        </p>
                                    </div>
                                    <div className='lg:ml-5 block'>
                                        <p className="font-bold text-black mb-3">&nbsp;</p>
                                        <p className={`text-sm text-${props.data.vendor.status_account == 'ditolak' ? props.data.vendor.board_of_directors_composition_note ? 'red' : 'gray' : 'gray'}-500 mb-3`}>Akta Susunan Direksi</p>
                                        {/* <p className='text-sm text-gray-500 mb-3'>Halaman Depan Rekening</p>
                                        <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Rekening Bank</p> */}
                                        <p className={`text-sm text-${props.data.vendor.status_account == 'ditolak' ? props.data.vendor.non_pkp_statement_note ? 'red' : 'gray' : 'gray'}-500 mb-3`}>Surat Pernyataan Non PKP</p>
                                    </div>
                                    <div className='lg:ml-5 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_board_of_directors_composition != '' ? <a href={props.data.vendor.file_board_of_directors_composition} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
                                        {/* <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_front_page_bank != '' ? <a href={props.data.vendor.file_front_page_bank} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_bank_account_statement_letter != '' ? <a href={props.data.vendor.file_bank_account_statement_letter} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p> */}
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_non_pkp_statement != '' ? <a href={props.data.vendor.file_non_pkp_statement} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
                                    </div>
                                </div>
                            </div> : ''}

                            {props.data.vendor.type_of_business == 'Pribadi' ? <div className='mb-3'>
                                <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 border-dashed border-b-2 border-gray-300 p-1'>
                                    <div className='border-l-0'>
                                        <p className="font-bold text-black mb-3">Business Information</p>
                                        <p className='text-sm text-gray-500 mb-3'>Type</p>
                                        <p className={`text-sm text-${props.data.vendor.status_account == 'ditolak' ? props.data.vendor.npwp_note ? 'red' : 'gray' : 'gray'}-500 mb-3`}>NPWP</p>
                                        {/* <p className='text-sm text-gray-500 mb-3'>E-KTP</p> */}
                                    </div>
                                    <div className='border-dashed border-gray-300 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3'>: Wajib Pajak Orang Pribadi</p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_npwp != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_npwp)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : '' }
                                            <p>&nbsp;</p>
                                        </p>
                                        {/* <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_ektp != '' ? <a href={props.data.vendor.file_ektp} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            / {props.data.vendor.expired_ektp}
                                        </p> */}
                                    </div>
                                    <div className='lg:ml-5 block'>
                                        <p className="font-bold text-black mb-3">&nbsp;</p>
                                        {/* <p className='text-sm text-gray-500 mb-3'>Halaman Depan Rekening</p>
                                        <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Rekening Bank</p> */}
                                        <p className={`text-sm text-${props.data.vendor.status_account == 'ditolak' ? props.data.vendor.non_pkp_statement_note ? 'red' : '' : ''}-500 mb-3`}>Surat Pernyataan Non PKP</p>
                                    </div>
                                    <div className='lg:ml-5 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        {/* <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_front_page_bank != '' ? <a href={props.data.vendor.file_front_page_bank} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_bank_account_statement_letter != '' ? <a href={props.data.vendor.file_bank_account_statement_letter} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p> */}
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_non_pkp_statement != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_non_pkp_statement)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p>
                                    </div>
                                </div>
                            </div> : ''}
                        </div>
                        
                        {props.data.vendor.status_account == 'ditolak' ?
                        <div className='p-6'>
                            {props.data.vendor.npwp_note ? 
                                <>
                                    <p className="font-bold">Catatan File NPWP :</p>
                                    <p>{props.data.vendor.npwp_note}</p>
                                    <hr className='mb-3'></hr>
                                </>
                            : ''
                            }
                            {props.data.vendor.sppkp_note ? 
                                <>
                                    <p className="font-bold">Catatan File SPPKP :</p>
                                    <p>{props.data.vendor.sppkp_note}</p>
                                    <hr className='mb-3'></hr>
                                </>
                            : ''
                            }
                            {props.data.vendor.siup_note ? 
                                <>
                                    <p className="font-bold">Catatan File SIUP :</p>
                                    <p>{props.data.vendor.siup_note}</p>
                                    <hr className='mb-3'></hr>
                                </>
                            : ''
                            }
                            {props.data.vendor.tdp_note ? 
                                <>
                                    <p className="font-bold">Catatan File TDP :</p>
                                    <p>{props.data.vendor.tdp_note}</p>
                                    <hr className='mb-3'></hr>
                                </>
                            : ''
                            }
                            {props.data.vendor.nib_note ? 
                                <>
                                    <p className="font-bold">Catatan File NIB :</p>
                                    <p>{props.data.vendor.nib_note}</p>
                                    <hr className='mb-3'></hr>
                                </>
                            : ''
                            }
                            {props.data.vendor.board_of_directors_composition_note ? 
                                <>
                                    <p className="font-bold">Catatan File Akta Susunan Direksi :</p>
                                    <p>{props.data.vendor.board_of_directors_composition_note}</p>
                                    <hr className='mb-3'></hr>
                                </>
                            : ''
                            }
                            {props.data.vendor.non_pkp_statement_note ? 
                                <>
                                    <p className="font-bold">Catatan File Surat Pernyataan Non PKP :</p>
                                    <p>{props.data.vendor.non_pkp_statement_note}</p>
                                    <hr className='mb-3'></hr>
                                </>
                            : ''
                            }
                        </div> 
                        : ''}

                        {props.data.timeline != '' ? 
                            <div className='p-6'>
                                <p className="font-bold mb-3">Timeline Pengajuan</p>
                                <ul className="steps mb-12">
                                    {props.data.timeline.map((item) => (
                                        <li className={`step 
                                                ${item.status == `disetujui` ? `step-success` : ``}
                                                ${item.status == `ditolak` ? `step-error` : ``}
                                            `}
                                        >
                                            {item.status} {item.approval_role}
                                        </li>
                                    ))}
                                </ul>
                                {props.data.timeline.map((item) => (
                                    <div className={`${item.note != null ? `` : `hidden`}`}>
                                        <p className="font-bold mb-3">Catatan ({item.approval_role})</p>
                                        <div className='text-sm text-gray-500 p-1'>
                                            <div className='flex items-center align-middle'>
                                                <a href={item.document} target='_blank'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a>
                                                <p className='mb-3 ml-3'>{item.note}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div> 
                        : ''}

                        <p className="font-bold mb-3 p-6">
                            <Link href={route('vendor.index')}>
                                <SecondaryButton>
                                    Back
                                </SecondaryButton>
                            </Link>
                            <Link href={route('vendor.edit', props.data.vendor.id)}>
                                {props.data.checkRejectedData != null ? 
                                    <PrimaryButton className='ml-3'>
                                        Revisi Pengajuan
                                    </PrimaryButton>
                                : ''}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
