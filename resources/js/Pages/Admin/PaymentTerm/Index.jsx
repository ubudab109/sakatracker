import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import ModifyButton from '@/Components/ModifyButton';
import { Head, Link } from '@inertiajs/react';
import React from "react";

export default function Index(props) {
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Payment Term</h2>}
        >
            <Head title="Payment Term" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Payment Term</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item active">Payment Term</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Payment Term</div>
                    </div>
                </div>
            </div>
            
            {props.data.permissions.includes('store_payment_term') ?
                <div className="mt-3 text-end">
                    <Link href={route('payment-term.create')}>
                        <ModifyButton>
                            Tambah
                        </ModifyButton>
                    </Link>    
                </div>
            : ''}

            <div className="pt-3">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                        <p className="font-bold mb-3">List Payment Term</p>
                        <Table data={props.data.payment_terms} routeEdit="payment-term.edit" permissions={props.data.permissions} />
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
