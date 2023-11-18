import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import OutstandingTable from './Partials/OutstandingTable';
import ModifyButton from '@/Components/ModifyButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';
import React from "react";

export default function Index(props) {
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Outstanding Invoice</h2>}
        >
            <Head title="Master User" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Outstanding Invoice</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">Batch Payment</li>
                        <li className="breadcrumb-item active">Outstanding Invoice</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Outstanding Invoice</div>
                    </div>
                </div>
            </div>

            <div className="pt-3">
                <OutstandingTable data={props.data}/>
            </div>



        </AuthenticatedLayout>
    );
}
