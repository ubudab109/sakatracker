import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function CheckStatusAccount(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        npwp: '',
    
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('check-status-account'));
    };

    return (
        <GuestLayout>
            <Head title="Check Status Account" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" required={true} />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="npwp" value="NPWP" required={true} />

                    <TextInput
                        id="npwp"
                        name="npwp"
                        value={data.npwp}
                        className="mt-1 block w-full"
                        autoComplete="npwp"
                        isFocused={true}
                        onChange={(e) => setData('npwp', e.target.value)}
                        required
                    />

                    <InputError message={errors.npwp} className="mt-2" />
                </div>

                {
                    props.message == 'Akun tidak ditemukan, silahkan mendaftar terlebih dahulu.' ? 
                    <div className="flex items-center justify-start mt-4">
                        <Transition
                            show={true}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-red-600">{props.message}</p>
                        </Transition>
                    </div>
                    : ''
                }

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        Check
                    </PrimaryButton>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <p className="text-sm text-gray-800">Already have an account?</p>
                    <Link
                        href={route('login')}
                        className="ml-1 underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
