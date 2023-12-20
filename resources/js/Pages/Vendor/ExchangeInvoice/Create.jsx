import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from './Partials/Form'
import { Head } from '@inertiajs/react';

export default function Create({ auth, status, ...props }) {
    // console.log(props);
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Add Invoice Exchange" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Invoice Exchange</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href={route('exchange-invoice.index')}>Invoice Exchange</a></li>
                        <li className="breadcrumb-item active">Add Invoice Exchange</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Add Invoice Exchange</div>
                    </div>
                </div>
            </div>

            <Form data={props.data} />
        </AuthenticatedLayout>
    );
}
