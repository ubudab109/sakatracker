import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from '@/Pages/Admin/BillTo/Partials/Table';
// import TableUser from '@/Pages/User/Partials/TableUser';
import ModifyButton from '@/Components/ModifyButton';
import { Head, Link } from '@inertiajs/react';
import React from "react";

export default function Index(props) {
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">BillTo</h2>}
        >
            <Head title="Role" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">BillTo</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item active">BillTo</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">BillTo</div>
                    </div>
                </div>
            </div>
            <div className="mt-3 text-end">
                <Link href={route('bill-to.create')}>
                    <ModifyButton>
                        Tambah
                    </ModifyButton>
                </Link>    
            </div>

            <div className="pt-3">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                        <p className="font-bold mb-3">List BillTo</p>
                        <Table data={props.data.datas} routeEdit="bill-to.edit" />
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
