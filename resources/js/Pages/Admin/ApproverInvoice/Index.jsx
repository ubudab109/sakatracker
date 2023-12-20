import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import ModifyButton from '@/Components/ModifyButton';
import { Head, Link } from '@inertiajs/react';
import React from "react";

export default function Index(props) {
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Master Approver Invoice</h2>}
        >
            <Head title="Master Approver Invoice" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Master Approver Invoice</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item active">Master Approver Invoice</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Master Approver Invoice</div>
                    </div>
                </div>
            </div>

            {props.data.permissions.includes('store_approver_invoice') ?
                <div className="mt-3 text-end">
                    <Link href={route('approver-invoice.create')}>
                        <ModifyButton>
                            Add
                        </ModifyButton>
                    </Link>    
                </div>
            :''}

            <div className="pt-3">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                        <p className="font-bold mb-3">List Approver Invoice</p>
                        <Table data={props.data.approvers} routeEdit="approver-invoice.edit" permissions={props.data.permissions} />
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
