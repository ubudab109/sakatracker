import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from './Partials/Form'
import { Head } from '@inertiajs/react';

export default function Create({ auth, mustVerifyEmail, status, ...props }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Tambah Locations" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Locations</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href={route('admin.location.index')}>Locations</a></li>
                        <li className="breadcrumb-item active">Tambah Locations</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Tambah Locations</div>
                    </div>
                </div>
            </div>

            <Form data={props.data} title="Tambah" message="Successfully to added Locations." />
        </AuthenticatedLayout>
    );
}