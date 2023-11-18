import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';

export default function RegisterStepThree(props) {
    console.log(props);
    const { data, setData, post, processing, errors, reset } = useForm({
        fname: props.data.name,
        fnpwp: props.data.npwp,
        director_name: props.data != null ? props.data.director_name : '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register-account.step-3.store'));
    };

    return (
        <GuestLayout>
            <Head title="Register Step 2" />

            <form onSubmit={submit}>

                <h2 className="card-title items-center justify-center my-4">Register</h2>

                <div className='flex items-center justify-center'>
                    <ul className="steps">
                        <li className="step step-success">Kelengkapan Data</li>
                        <li className="step step-success">CP & Financial</li>
                        <li className="step step-success">Kelengkapan Dokumen</li>
                        {/* <li className="step">Step 4</li> */}
                    </ul>
                </div>

                <div class="grid md:grid-cols-1 gap-4 sm:grid-cols-1 mt-4">
                    {/* <div className="">
                        <InputLabel htmlFor="director_name" value="Director Name" />

                        <TextInput
                            id="director_name"
                            name="director_name"
                            value={data.director_name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('director_name', e.target.value)}
                            required
                        />

                        <InputError message={errors.director_name} className="mt-2" />
                    </div> */}
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link href={route('register-account.step-2', {'npwp' : props.data.npwp, 'name' : props.data.name})}>
                        <SecondaryButton className="w-sm justify-center mr-2" disabled={processing}>
                            Back
                        </SecondaryButton>
                    </Link>
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        Next
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
