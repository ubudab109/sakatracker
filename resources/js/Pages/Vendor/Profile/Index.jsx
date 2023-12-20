import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TableProfile from '@/Pages/Vendor/Profile/Partials/TableProfile';
import { Head, Link } from '@inertiajs/react';
import React from "react";
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';

export default function Index(props) {
    console.log(props);
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Data Change" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Data Change</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href="javascript: void(0);">Vendor Management</a></li>
                        <li className="breadcrumb-item active">Data Change</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Data Change</div>
                    </div>
                </div>
            </div>

            <div className="pt-3">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                        <Link href={route('vendor.create')}>
                            <button type="button" className="btn btn-light waves-effect waves-light"><i className="bx bx-plus me-1"></i> Add Data Change Submission</button>
                        </Link>
                        <TableProfile data={props.data.vendors} latestData={props.data.latest} />
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
