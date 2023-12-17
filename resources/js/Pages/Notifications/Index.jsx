import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TableProfile from '@/Pages/Vendor/Profile/Partials/TableProfile';
import { Head, Link } from '@inertiajs/react';
import React from "react";
import PrimaryButton from '@/Components/PrimaryButton';
import TableNotification from './Partials/TableNotification';

export default function Index(props) {
    console.log(props);
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Notifikasi" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Notifikasi</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href="javascript: void(0);">Notifikasi</a></li>
                        <li className="breadcrumb-item active">Notifikasi</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Notifikasi</div>
                    </div>
                </div>
            </div>

            <div className="pt-3">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                        <TableNotification data={props.data.notifications} latestData={props.data.latest} />
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
