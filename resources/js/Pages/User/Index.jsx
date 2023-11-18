import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AboutUser from '@/Pages/User/Partials/AboutUser';
import TableUser from '@/Pages/User/Partials/TableUser';
import ModifyButton from '@/Components/ModifyButton';
import { Head, Link } from '@inertiajs/react';
import React from "react";

export default function Index(props) {
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User</h2>}
        >
            <Head title="User" />

            <AboutUser />

            <div className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 text-end">
                <Link href={route('user.create')}>
                    <ModifyButton>
                        ADD USER
                    </ModifyButton>
                </Link>
            </div>

            <TableUser data={props.data.users} />
        </AuthenticatedLayout>
    );
}
