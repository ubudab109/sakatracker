import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import { Head, Link } from '@inertiajs/react';
import React from "react";
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState } from 'react';

export default function Index(props) {
    console.log(props);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Invoice Exchange" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Invoice Exchange List</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item active"><a href="javascript: void(0);">Invoice Exchange</a></li>
                    </ol>
                </div>
            </div>

            <div className="pt-3">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                        <div className="col-sm">
                            <div className="mb-4">
                                {props.data.submissionStatus 
                                ? 
                                    <button type="button" className="btn btn-light waves-effect waves-light" onClick={() => {
                                        openModal();
                                    }}><i className="bx bx-plus me-1"></i> Add Invoice</button>
                                : 
                                    <Link href={route('exchange-invoice.create')}>
                                        <button type="button" className="btn btn-light waves-effect waves-light"><i className="bx bx-plus me-1"></i> Add Invoice</button>
                                    </Link>
                                }
                            </div>
                        </div>
                        <Table data={props.data}/>
                    </div>
                </div>
            </div>

            <Modal show={modalOpen}>
                <div className="p-6 grid grid-cols-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        Financial Information
                    </h2>
                    <p></p>
                    <p></p>

                    <p className="mt-1 text-sm text-gray-600">
                        Type Bank: {props.data.latest.is_virtual_account == 1 ? `Virtual Account` : `Non Virtual Account`}
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                        Bank: {props.data.latest.bank_name} 

                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                        Rekening Number: {props.data.latest.bank_account_number}
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                        Account Name: {props.data.latest.bank_account_name}
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                        Branch: {props.data.latest.branch_of_bank}
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                        Swift Code: {props.data.latest.bank_swift_code}
                    </p>
                </div>
                <div className="mt-6 flex justify-end mb-3 mr-3">
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                    <Link href={route('vendor.company-profile.index')}>
                        <PrimaryButton className="ml-3">
                            Company Profile
                        </PrimaryButton>
                    </Link>
                    <Link href={route('exchange-invoice.create')}>
                        <PrimaryButton className="ml-3">
                            Add
                        </PrimaryButton>
                    </Link>
                </div>
            </Modal>

        </AuthenticatedLayout>
    );
}
