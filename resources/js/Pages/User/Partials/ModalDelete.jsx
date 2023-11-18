import Modal from '@/Components/Modal';
import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';

export default function ModalDelete({ show, onClose, item }) {
    var [confirmingUserDeletion, setConfirmingUserDeletion] = useState(true);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('user.destroy', item.id), {
            preserveScroll: true,
            onSuccess: () => onClose(),
            onFinish: () => reset(),
        });
    };

    return(
        <div>
            <Modal show={show} onClose={onClose}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your account.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}