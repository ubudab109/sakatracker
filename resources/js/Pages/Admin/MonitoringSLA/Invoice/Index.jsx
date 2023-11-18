import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import ModifyButton from '@/Components/ModifyButton';
import { Head, Link } from '@inertiajs/react';
import {useState} from "react";

export default function Index(props) {

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tax</h2>}
        >
            <Head title="SLA Monitoring Invoice" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">SLA Monitoring Invoice</h4>
            </div>

            {props.data.approver_invoices.map((item, index) => (
                <div className="pt-3">
                    <div className="">
                        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.name}</p>
                            <Table data={item}/>
                        </div>
                    </div>
                </div>
            ))}

        </AuthenticatedLayout>
    );
}
