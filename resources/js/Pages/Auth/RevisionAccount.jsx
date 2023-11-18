import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function RevisionAccount(props) {
    return (
        <div className="px-6">
            <Head title="Revision Account" />
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link href="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Selamat Datang!</h2>
                    <p>{props.data.name}, saat ini status akun anda <span className={props.data.status_account == 'aktif' ? 'text-green-500' : 'text-red-500'}>{props.data.status_account}</span></p>
                </div>
                <div className="card-footer px-6 mb-6">
                    <ul className="steps">
                        <li className={parseInt(props.data.step_account) >= 1 ? 'step step-success' : 'step'}>
                            <Link href={route('register-account.step-1', {'npwp' : props.data.npwp, 'name' : props.data.name})}>
                                Kelengkapan Data
                            </Link>
                        </li>
                        <li className={parseInt(props.data.step_account) >= 2 ? 'step step-success' : 'step'}>
                            <Link href={route('register-account.step-2', {'npwp' : props.data.npwp, 'name' : props.data.name})}>
                                CP & Financial
                            </Link>
                        </li>
                            <li className={parseInt(props.data.step_account) >= 3 ? 'step step-success' : 'step'}>
                                <Link href={route('register-account.step-3', {'npwp' : props.data.npwp, 'name' : props.data.name})}>
                                    Kelengkapan Dokumen
                                </Link>
                            </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
