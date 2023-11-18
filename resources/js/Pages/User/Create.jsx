import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HeaderUser from './Partials/HeaderUser';
import UserForm from './Partials/UserForm';
import { Head } from '@inertiajs/react';

export default function Create({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderUser title="Tambah" />}
        >
            <Head title="Tambah User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Create data users</div>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UserForm data="" route="user.store" message="Successfully to added user." />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
