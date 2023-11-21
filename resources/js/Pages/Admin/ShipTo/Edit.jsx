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
            <Head title="Edit ShipTo" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">ShipTo</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href={route('ship-to.index')}>ShipTo</a></li>
                        <li className="breadcrumb-item active">Edit ShipTo</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Edit ShipTo</div>
                    </div>
                </div>
            </div>

            
            <Form data={props.data} route='ship-to.update' id={props.data.ship_to.id} message="Successfully to updated ShipTo." title="Edit" auth={auth} />
        </AuthenticatedLayout>
    );
}
