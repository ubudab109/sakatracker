import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';

export default function RegisterStepTwo(props) {
    console.log(props);
    const { data, setData, post, processing, errors, reset } = useForm({
        fname: props.data.name,
        fnpwp: props.data.npwp,
        director_name: props.data != null ? props.data.director_name : '',
        director_phone_number: props.data != null ? props.data.director_phone_number : '',
        director_email: props.data != null ? props.data.director_email : '',
        fa_name: props.data != null ? props.data.fa_name : '',
        fa_phone_number: props.data != null ? props.data.fa_phone_number : '',
        fa_email: props.data != null ? props.data.fa_email : '',
        marketing_key_account: props.data != null ? props.data.marketing_key_account : '',
        marketing_phone_number: props.data != null ? props.data.marketing_phone_number : '',
        marketing_email: props.data != null ? props.data.marketing_email : '',
        is_virtual_account: props.data != null ? props.data.is_virtual_account : '',
        is_bca: props.data != null ? props.data.is_bca : '',
        bank_account_name: props.data != null ? props.data.bank_account_name : '',
        bank_account_number: props.data != null ? props.data.bank_account_number : '',
        branch_of_bank: props.data != null ? props.data.branch_of_bank : '',
        bank_swift_code: props.data != null ? props.data.bank_swift_code : '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register-account.step-2.store'));
    };

    const [selectedOptionVirtualAccount] = useState(props.data != null ? props.data.is_virtual_account : '');
    const [selectedOptionBCA] = useState(props.data != null ? props.data.is_bca : '');


    return (
        <GuestLayout>
            <Head title="Register Step 2" />

            <form onSubmit={submit}>

                <h2 className="card-title items-center justify-center my-4">Register</h2>

                <div className='flex items-center justify-center'>
                    <ul className="steps">
                        <li className="step step-success">Kelengkapan Data</li>
                        <li className="step step-success">CP & Financial</li>
                        <li className="step">Kelengkapan Dokumen</li>
                        {/* <li className="step">Step 4</li> */}
                    </ul>
                </div>

                <div class="grid md:grid-cols-1 gap-4 sm:grid-cols-1 mt-4">
                    <div className="">
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
                    </div>

                    <div className="">
                        <InputLabel htmlFor="director_phone_number" value="Director Phone Number" />

                        <TextInput
                            id="director_phone_number"
                            name="director_phone_number"
                            value={data.director_phone_number}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('director_phone_number', e.target.value)}
                            required
                        />

                        <InputError message={errors.director_phone_number} className="mt-2" />
                    </div>

                    <div className="">
                        <InputLabel htmlFor="director_email" value="Director Email" />

                        <TextInput
                            id="director_email"
                            name="director_email"
                            type="email"
                            value={data.director_email}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('director_email', e.target.value)}
                            required
                        />

                        <InputError message={errors.director_email} className="mt-2" />
                    </div>

                    <div className="">
                        <InputLabel htmlFor="fa_name" value="PIC FA Name" />

                        <TextInput
                            id="fa_name"
                            name="fa_name"
                            value={data.fa_name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('fa_name', e.target.value)}
                            required
                        />

                        <InputError message={errors.fa_name} className="mt-2" />
                    </div>

                    <div className="">
                        <InputLabel htmlFor="fa_phone_number" value="PIC FA Phone Number" />

                        <TextInput
                            id="fa_phone_number"
                            name="fa_phone_number"
                            value={data.fa_phone_number}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('fa_phone_number', e.target.value)}
                            required
                        />

                        <InputError message={errors.fa_phone_number} className="mt-2" />
                    </div>

                    <div className="">
                        <InputLabel htmlFor="fa_email" value="PIC FA Email" />

                        <TextInput
                            id="fa_email"
                            name="fa_email"
                            value={data.fa_email}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('fa_email', e.target.value)}
                            required
                        />

                        <InputError message={errors.fa_email} className="mt-2" />
                    </div>

                    <div className="">
                        <InputLabel htmlFor="marketing_key_account" value="PIC Marketing/Key Account" />

                        <TextInput
                            id="marketing_key_account"
                            name="marketing_key_account"
                            value={data.marketing_key_account}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('marketing_key_account', e.target.value)}
                            required
                        />

                        <InputError message={errors.marketing_key_account} className="mt-2" />
                    </div>

                    <div className="">
                        <InputLabel htmlFor="marketing_phone_number" value="PIC Marketing Phone Number" />

                        <TextInput
                            id="marketing_phone_number"
                            name="marketing_phone_number"
                            value={data.marketing_phone_number}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('marketing_phone_number', e.target.value)}
                            required
                        />

                        <InputError message={errors.marketing_phone_number} className="mt-2" />
                    </div>

                    <div className="">
                        <InputLabel htmlFor="marketing_email" value="PIC Marketing Email" />

                        <TextInput
                            id="marketing_email"
                            name="marketing_email"
                            value={data.marketing_email}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('marketing_email', e.target.value)}
                            required
                        />

                        <InputError message={errors.marketing_email} className="mt-2" />
                    </div>

                    <div className="">
                        <InputLabel htmlFor="is_virtual_account" value="Virtual/Non Virtual" />

                        <select className="select select-bordered w-full"
                            id="is_virtual_account"
                            name="is_virtual_account"
                            value={selectedOptionVirtualAccount} 
                            onChange={(e) => setData('is_virtual_account', e.target.value)}
                        >
                            <option value="" hidden>Choose</option>
                            <option value="1">Virtual</option>
                            <option value="0">Non Virtual</option>
                        </select>

                        <InputError message={errors.is_virtual_account} className="mt-2" />
                    </div>

                    <div className="">
                        <InputLabel htmlFor="is_bca" value="BCA/Non BCA" />

                        <select className="select select-bordered w-full"
                            id="is_bca"
                            name="is_bca"
                            value={selectedOptionBCA} 
                            onChange={(e) => setData('is_bca', e.target.value)}
                        >
                            <option value="" hidden>Choose</option>
                            <option value="1">BCA</option>
                            <option value="0">Non BCA</option>
                        </select>

                        <InputError message={errors.is_bca} className="mt-2" />
                    </div>

                    <div className="">
                        <InputLabel htmlFor="bank_account_name" value="Account Name" />

                        <TextInput
                            id="bank_account_name"
                            name="bank_account_name"
                            value={data.bank_account_name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('bank_account_name', e.target.value)}
                            required
                        />

                        <InputError message={errors.bank_account_name} className="mt-2" />
                    </div>

                    <div className="">
                        <InputLabel htmlFor="bank_account_number" value="Account Number" />

                        <TextInput
                            id="bank_account_number"
                            name="bank_account_number"
                            value={data.bank_account_number}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('bank_account_number', e.target.value)}
                            required
                        />

                        <InputError message={errors.bank_account_number} className="mt-2" />
                    </div>

                    <div className="">
                        <InputLabel htmlFor="branch_of_bank" value="Branch of Bank" />

                        <TextInput
                            id="branch_of_bank"
                            name="branch_of_bank"
                            value={data.branch_of_bank}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('branch_of_bank', e.target.value)}
                            required
                        />

                        <InputError message={errors.branch_of_bank} className="mt-2" />
                    </div>

                    <div className="">
                        <InputLabel htmlFor="bank_swift_code" value="Swift Code" />

                        <TextInput
                            id="bank_swift_code"
                            name="bank_swift_code"
                            value={data.bank_swift_code}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('bank_swift_code', e.target.value)}
                            required
                        />

                        <InputError message={errors.bank_swift_code} className="mt-2" />
                    </div>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link href={route('register-account.step-1', {'npwp' : props.data.npwp, 'name' : props.data.name})}>
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
