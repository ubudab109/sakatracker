import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from './Partials/Form';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status, ...props }) {
    console.log(props);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Approver Invoice Item</h2>}
        >
            <Head title="Edit Approver Invoice" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Edit Approver Invoice</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href={route('approver-invoice.index')}>Approver Invoice</a></li>
                        <li className="breadcrumb-item"><a href={route('approver-invoice.show', props.data.approver.id)}>Detail Master Approver Invoice</a></li>
                        <li className="breadcrumb-item active">Edit Approver Invoice</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Edit Approver Invoice</div>
                    </div>
                </div>
            </div>

            
            <Form data={props.data} route='approver-invoice-item.update' id={props.data.approver_item.id} message="Successfully to updated approver invoice item." title="Edit" auth={auth} />
        </AuthenticatedLayout>
    );
}
