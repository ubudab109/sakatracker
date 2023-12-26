import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import ModifyButton from '@/Components/ModifyButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';
import React from "react";

export default function Index(props) {
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Batch Payment</h2>}
        >
            <Head title="Master User" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Batch Payment</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item active">Batch Payment</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Batch Payment</div>
                    </div>
                </div>
            </div>

            <div className="mt-3 text-end">
                {/* {props.data.permissions.includes('store_batch_payment') ?
                :''} */}
                    <Link href={route('admin.batch-payment.outstanding-invoice')}>
                        <PrimaryButton>
                            Oustanding Invoice
                        </PrimaryButton>
                    </Link>    
            </div>

            <div className="pt-3">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                        <Table data={props.data}/>
                    </div>
                </div>
            </div>



        </AuthenticatedLayout>
    );
}
