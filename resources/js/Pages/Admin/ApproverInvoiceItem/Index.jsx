import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import ModifyButton from '@/Components/ModifyButton';
import { Head, Link } from '@inertiajs/react';
import React from "react";
import { ArrowLeft } from 'react-feather';

export default function Index(props) {
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Master Approver Invoice</h2>}
        >
            <Head title="Detail Master Approver Invoice" />
            
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Detail Master Approver Invoice</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href={route('approver-invoice.index')}>Master Approver Invoice</a></li>
                        <li className="breadcrumb-item active">Master Approver Invoice Item</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="flex items-center gap-2">
                    <a href={route('approver-invoice.index')}><ArrowLeft /></a>
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg w-full">
                        <div className="p-6 text-gray-900 font-bold">Master Approver Invoice Item</div>
                    </div>
                </div>
            </div>

            {props.data.permissions.includes('store_approver_invoice') ?
                <div className="mt-3 text-end">
                    <Link href={route('approver-invoice-item.create') + '?id=' + props.data.approver.id}>
                        <ModifyButton>
                            Tambah
                        </ModifyButton>
                    </Link>    
                </div>
            :''}

            <div className="pt-3">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                        <p className="font-bold mb-3">List Approver Invoice ({props.data.approver.name})</p>
                        <Table data={props.data.approver_items} routeEdit="approver-invoice-item.edit" permissions={props.data.permissions} />
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
