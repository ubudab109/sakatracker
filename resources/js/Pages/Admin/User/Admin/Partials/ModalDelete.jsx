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

        destroy(route('admin.destroy', item.id), {
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
                        Are you sure you want to delete this data?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once data is deleted, all resources and their data are permanently deleted. Are you sure you want to delete this data?
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