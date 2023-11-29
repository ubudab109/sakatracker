import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TableProfile from '@/Pages/Vendor/Profile/Partials/TableProfile';
import { Head, Link } from '@inertiajs/react';
import React from "react";
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState } from 'react';
import PDFPopup from '@/Components/PDFPopup';

export default function Show(props) {
    console.log(props);
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
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Detail Company Profile" />

            <PDFPopup
                pdfUrl={pdfUrl}
                show={isPopupOpen}
                onClose={closePopup}
            />

            {/* <PDFViewer pdfUrl={props.data.vendor.file_npwp} /> */}

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Company Profile</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href="javascript: void(0);">Vendor Management</a></li>
                        <li className="breadcrumb-item active">Company Profile</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Detail Company Profile</div>
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
                                        <p className='mb-3 break-all'>: {props.data.vendor.name}, {props.data.vendor.legality}</p>
                                        <p className='mb-3 break-all'>: {props.data.vendor.email}</p>
                                        <p className='mb-3'>: {props.data.vendor.name_business}</p>
                                        <p className='mb-3'>: {props.data.vendor.npwp}</p>
                                        <p className='mb-3'>: {props.data.vendor.office_address}</p>
                                        <p className='mb-3'>: {props.data.vendor.npwp_address}</p>
                                    </div>
                                    <div className='lg:ml-5 block'>
                                        <p className='mb-3'>Phone Number</p>
                                        <p className='mb-3'>Mobile Number</p>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3'>&nbsp;</p>
                                        {/* <p className='mb-3'>TOP</p>
                                        <p className='mb-3'>PPN</p>
                                        <p className='mb-3'>PPH</p>
                                        <p className='mb-3'>COA Prepayment</p>
                                        <p className='mb-3'>COA Liability Account</p>
                                        <p className='mb-3'>COA Receiving</p>
                                        <p className='mb-3'>Ship To</p>
                                        <p className='mb-3'>Bill To</p> */}
                                    </div>
                                    <div className='lg:ml-5'>
                                        <p className='mb-3'>: {props.data.vendor.phone_number}</p>
                                        <p className='mb-3'>: {props.data.vendor.mobile_phone_number}</p>
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
                                        <p className='mb-3'>: {props.data.vendor.is_bca == 1 ? 'BCA' : 'Non BCA'}</p>
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
                                        <p className='text-sm text-gray-500 mb-3'>NPWP</p>
                                        <p className='text-sm text-gray-500 mb-4'>SPPKP</p>
                                        <p className='text-sm text-gray-500 mb-4'>SIUP</p>
                                        <p className='text-sm text-gray-500 mb-4'>TDP</p>
                                        <p className='text-sm text-gray-500 mb-4'>NIB</p>
                                        <p className='text-sm text-gray-500 mb-3'>Akta Susunan Direksi</p>
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
                                            / <p>&nbsp;</p>
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
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_board_of_directors_composition != '' ? <a href={props.data.vendor.file_board_of_directors_composition} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            / <p>&nbsp;</p>
                                        </p>
                                    </div>
                                    <div className='lg:ml-5 block'>
                                        <p className="font-bold text-black mb-3">&nbsp;</p>
                                        <p className="mb-3">&nbsp;</p>
                                        {/* <p className='text-sm text-gray-500 mb-3'>Akta Susunan Direksi</p> */}
                                        {/* <p className='text-sm text-gray-500 mb-3'>Halaman Depan Rekening</p>
                                        <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Rekening Bank</p> */}
                                    </div>
                                    <div className='lg:ml-5 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className="mb-3">&nbsp;</p>
                                        {/* <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_board_of_directors_composition != '' ? <a href={props.data.vendor.file_board_of_directors_composition} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p> */}
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
                                        <p className='text-sm text-gray-500 mb-3'>NPWP</p>
                                        <p className='text-sm text-gray-500 mb-3'>SPPKP</p>
                                        <p className='text-sm text-gray-500 mb-4'>SIUP</p>
                                        <p className='text-sm text-gray-500 mb-4'>TDP</p>
                                        <p className='text-sm text-gray-500 mb-4'>NIB</p>
                                        <p className='text-sm text-gray-500 mb-4'>Akta Susunan Direksi</p>
                                        <p className='text-sm text-gray-500 mb-4'>Surat Pernyataan Non PKP</p>
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
                                            / <p>&nbsp;</p>
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
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_board_of_directors_composition != '' ? <a href={props.data.vendor.file_board_of_directors_composition} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            / <p>&nbsp;</p>
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_non_pkp_statement != '' ? <a href={props.data.vendor.file_non_pkp_statement} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            / <p>&nbsp;</p>
                                        </p>
                                    </div>
                                    <div className='lg:ml-5 block'>
                                        <p className="font-bold text-black mb-3">&nbsp;</p>
                                        <p className="mb-3">&nbsp;</p>
                                        {/* <p className='text-sm text-gray-500 mb-3'>Akta Susunan Direksi</p> */}
                                        {/* <p className='text-sm text-gray-500 mb-3'>Halaman Depan Rekening</p>
                                        <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Rekening Bank</p> */}
                                        {/* <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Non PKP</p> */}
                                    </div>
                                    <div className='lg:ml-5 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className="mb-3">&nbsp;</p>
                                        {/* <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_board_of_directors_composition != '' ? <a href={props.data.vendor.file_board_of_directors_composition} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p> */}
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
                                        {/* <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_non_pkp_statement != '' ? <a href={props.data.vendor.file_non_pkp_statement} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p> */}
                                    </div>
                                </div>
                            </div> : ''}

                            {props.data.vendor.type_of_business == 'Pribadi' ? <div className='mb-3'>
                                <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 border-dashed border-b-2 border-gray-300 p-1'>
                                    <div className='border-l-0'>
                                        <p className="font-bold text-black mb-3">Business Information</p>
                                        <p className='text-sm text-gray-500 mb-3'>Type</p>
                                        <p className='text-sm text-gray-500 mb-3'>NPWP</p>
                                        <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Non PKP</p>
                                        {/* <p className='text-sm text-gray-500 mb-3'>E-KTP</p> */}
                                    </div>
                                    <div className='border-dashed border-gray-300 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className='mb-3'>: Wajib Pajak Orang Pribadi</p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_npwp != '' ? <a href={props.data.vendor.file_npwp} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : '' }
                                            <p>&nbsp;</p>
                                        </p>
                                        <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_non_pkp_statement != '' ? <a href={props.data.vendor.file_non_pkp_statement} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
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
                                        <p className="mb-3">&nbsp;</p>
                                        {/* <p className='text-sm text-gray-500 mb-3'>Halaman Depan Rekening</p>
                                        <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Rekening Bank</p> */}
                                        {/* <p className='text-sm text-gray-500 mb-3'>Surat Pernyataan Non PKP</p> */}
                                    </div>
                                    <div className='lg:ml-5 text-sm text-gray-500'>
                                        <p className='mb-3'>&nbsp;</p>
                                        <p className="mb-3">&nbsp;</p>
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
                                        {/* <p className='mb-3 flex justify-between'>: 
                                            {props.data.vendor.file_non_pkp_statement != '' ? <a href={props.data.vendor.file_non_pkp_statement} target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : <p>-</p> }
                                            <p>&nbsp;</p>
                                        </p> */}
                                    </div>
                                </div>
                            </div> : ''}
                            <div className='grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 border-dashed border-b-2 border-gray-300 p-1'>
                                <div className='border-l-0'>
                                    <p className="font-bold text-black mb-3">Additional Information</p>
                                    <p className='mb-3 text-gray-500'>TOP: {props.data.vendor.top ?? '-'} Hari</p>
                                    <p className='mb-3 text-gray-500'>PPN: {props.data.vendor.ppn ?? '-'}%</p>
                                    <p className='mb-3 text-gray-500'>SKB: {props.data.vendor.skb ?? '-'}</p>
                                    <p className='mb-3 text-gray-500'>PPH: {props.data.vendor.pph ?? '-'}</p>
                                    <p className='mb-3 text-gray-500'>Ship To: {props.data.vendor.ship_to ?? '-'}</p>
                                    <p className='mb-3 text-gray-500'>Bill To: {props.data.vendor.bill_to ?? '-'}</p>
                                    <hr></hr>
                                    {props.data.vendor.coas.map((item, index) => (
                                        <>
                                            <hr></hr>
                                            <p className='mb-3 text-gray-500'>Supplier Site: {item.supplier_site ?? '-'}</p>
                                            <p className='mb-3 text-gray-500'>COA Prepayment: {item.coa_prepayment_1 ?? '-'} | {item.coa_prepayment_2 ?? '-'} | {item.coa_prepayment_3 ?? '-'} | {item.coa_prepayment_4 ?? '-'} | {item.coa_prepayment_5 ?? '-'} | {item.coa_prepayment_6 ?? '-'} | {item.coa_prepayment_7 ?? '-'}</p>
                                            <p className='mb-3 text-gray-500'>COA Liability Account: {item.coa_liability_account_1 ?? '-'} | {item.coa_liability_account_2 ?? '-'} | {item.coa_liability_account_3 ?? '-'} | {item.coa_liability_account_4 ?? '-'} | {item.coa_liability_account_5 ?? '-'} | {item.coa_liability_account_6 ?? '-'} | {item.coa_liability_account_7 ?? '-'}</p>
                                            <p className='mb-3 text-gray-500'>COA Receiving: {item.coa_receiving_1 ?? '-'} | {item.coa_receiving_2 ?? '-'} | {item.coa_receiving_3 ?? '-'} | {item.coa_receiving_4 ?? '-'} | {item.coa_receiving_5 ?? '-'} | {item.coa_receiving_6 ?? '-'} | {item.coa_receiving_7 ?? '-'}</p>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <p className="font-bold mb-3 p-6">
                            <Link href={route('vendor.index')}>
                                <SecondaryButton>
                                    Back
                                </SecondaryButton>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
