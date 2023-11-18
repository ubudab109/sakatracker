import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import ModifyButton from '@/Components/ModifyButton';
import { Head, Link } from '@inertiajs/react';
import React from "react";

export default function Index(props) {
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Request GR</h2>}
        >
            <Head title="Request GR" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Request GR</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item active">Request GR</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Request GR</div>
                    </div>
                </div>
            </div>
            
            <div className="mt-3 text-end">
                <Link href={route('request-good-receipt.create')}>
                    <ModifyButton>
                        Tambah
                    </ModifyButton>
                </Link>    
            </div>

            <div className="pt-3">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                        <p className="font-bold mb-3">List Request GR</p>
                        <Table data={props.data.request_good_receipts} routeEdit="request-good-receipt.edit"/>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
