import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from './Partials/Form';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status, ...props }) {
    console.log(props);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Approver Vendor</h2>}
        >
            <Head title="Edit Approver Vendor" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Approver Vendor</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href={route('approver-vendor.index')}>Approver Vendor</a></li>
                        <li className="breadcrumb-item active">Edit Approver Vendor</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Edit Approver Vendor</div>
                    </div>
                </div>
            </div>

            
            <Form data={props.data} route='approver-vendor.update' id={props.data.approver.id} message="Successfully to updated approver vendor." title="Edit" auth={auth} />
        </AuthenticatedLayout>
    );
}
