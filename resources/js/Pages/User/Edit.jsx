import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HeaderUser from './Partials/HeaderUser';
import UserForm from './Partials/UserForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status, ...props }) {
    console.log(props);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderUser title="Edit" />}
        >
            <Head title="Edit User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Edit data users
                            <br />
                            <b className="text-muted text-xs text-opacity-10">NOTE:</b>
                            <br />
                            <i className="text-muted text-xs text-opacity-10">Leave the new password column, if you don't want to change the password.</i>
                        </div>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UserForm data={props.data} route="user.update" id={props.data.id} message="Successfully to updated user." />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
