import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from './Partials/Form';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status, ...props }) {
    console.log(props);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User</h2>}
        >
            <Head title="Edit suffix" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">suffix</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href={route('suffix.index')}>suffix</a></li>
                        <li className="breadcrumb-item active">Edit suffix</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Edit suffix</div>
                    </div>
                </div>
            </div>

            
            <Form data={props.data} route='suffix.update' id={props.data.suffix.id} message="Successfully to updated suffix." title="Edit" auth={auth} />
        </AuthenticatedLayout>
    );
}
