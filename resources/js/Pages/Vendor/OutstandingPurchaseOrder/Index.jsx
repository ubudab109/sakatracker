import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import ModifyButton from '@/Components/ModifyButton';
import { Head, Link } from '@inertiajs/react';
import React from "react";
import { ArrowLeft } from 'react-feather';
import { useState } from 'react';

export default function Index(props) {
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Outstanding Purchase Order</h2>}
        >
            <Head title="Outstanding Purchase Order" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Outstanding Purchase Order</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href={route('vendor.report.index')}>Report</a></li>
                        <li className="breadcrumb-item active">Outstanding Purchase Order</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="flex items-center gap-2">
                    <a href={route('vendor.report.index')}><ArrowLeft /></a>
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg w-full">
                        <div className="p-6 text-gray-900 font-bold">Outstanding Purchase Order</div>
                    </div>
                </div>
            </div>

            <div className="pt-3">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                        <p className="font-bold mb-3">List Outstanding Purchase Order</p>
                        <Table data={props.data}/>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
