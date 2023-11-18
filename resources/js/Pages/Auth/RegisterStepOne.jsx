import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function RegisterStepOne(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        fname: props.data.name,
        fnpwp: props.data.npwp,
        name: props.data != null ? props.data.name : '',
        npwp: props.data != null ? props.data.npwp : '',
        npwp_address: props.data != null ? props.data.npwp_address : '',
        country: props.data != null ? props.data.country : '',
        province_id: props.data != null ? props.data.province_id : '',
        city_id: props.data != null ? props.data.city_id : '',
        subdistrict_id: props.data != null ? props.data.subdistrict_id : '',
        postal_code: props.data != null ? props.data.postal_code : '',
        phone_number: props.data != null ? props.data.phone_number : '',
        mobile_phone_number: props.data != null ? props.data.mobile_phone_number : '',
        email: props.data != null ? props.data.email : '',
        type_of_business: props.data != null ? props.data.type_of_business : '',
    
    });

    const [selectedOptionProvince] = useState(props.data != null ? props.data.province_id : '');
    const [selectedOptionCity] = useState(props.data != null ? props.data.city_id : '');
    const [selectedOptionSubdistrict] = useState(props.data != null ? props.data.subdistrict_id : '');
    const [radioOptionType, setSelectedOption] = useState(props.data != null ? props.data.type_of_business : '');

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value); 
        data.type_of_business = event.target.value;
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register-account.step-1.store'));
    };


    return (
        <GuestLayout>
            <Head title="Register Step 1" />

            <form onSubmit={submit}>

                <h2 className="card-title items-center justify-center my-4">Register</h2>

                <div className='flex items-center justify-center'>
                    <ul className="steps">
                        <li className="step step-success">Kelengkapan Data</li>
                        <li className="step">CP & Financial</li>
                        <li className="step">Dokumen</li>
                        {/* <li className="step">Step 4</li> */}
                    </ul>
                </div>

                <div className="mt-4">
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
                        autoComplete="username"
                        onChange={(e) => setData('npwp', e.target.value)}
                        required
                    />

                    <InputError message={errors.npwp} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="npwp_address" value="NPWP Address" />

                    <TextInput
                        id="npwp_address"
                        name="npwp_address"
                        value={data.npwp_address}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('npwp_address', e.target.value)}
                        required
                    />

                    <InputError message={errors.npwp_address} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="country" value="Country" />

                    <TextInput
                        id="country"
                        name="country"
                        value={data.country}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('country', e.target.value)}
                        required
                    />

                    <InputError message={errors.country} className="mt-2" />
                </div>

                <div class="grid md:grid-cols-1 gap-4 sm:grid-cols-1 mt-4">
                    <div className="w-full">
                        <InputLabel htmlFor="province_id" value="Province" />

                        <select className="select select-bordered w-full"
                            id="province_id"
                            name="province_id"
                            value={selectedOptionProvince} 
                            onChange={(e) => setData('province_id', e.target.value)}
                        >
                            <option value="" hidden>Choose</option>
                            <option value="1">Kalimantan Timur</option>
                            <option value="2">Kalimantan Barat</option>
                        </select>

                        <InputError message={errors.province_id} className="mt-2" />
                    </div>
                    <div className="w-full">
                        <InputLabel htmlFor="city_id" value="City" />

                        <select className="select select-bordered w-full"
                            id="city_id"
                            name="city_id"
                            value={selectedOptionCity} 
                            onChange={(e) => setData('city_id', e.target.value)}
                        >
                            <option value="" hidden>Choose</option>
                            <option value="1">Balikpapan</option>
                            <option value="2">Samarinda</option>
                        </select>

                        <InputError message={errors.city_id} className="mt-2" />
                    </div>
                    <div className="w-full">
                        <InputLabel htmlFor="subdistrict_id" value="Subdisctrict" />

                        <select className="select select-bordered w-full"
                            id="subdistrict_id"
                            name="subdistrict_id"
                            value={selectedOptionSubdistrict} 
                            onChange={(e) => setData('subdistrict_id', e.target.value)}
                        >
                            <option value="" hidden>Choose</option>
                            <option value="1">Balikpapan Timur</option>
                            <option value="2">Balikpapan Kota</option>
                        </select>

                        <InputError message={errors.subdistrict_id} className="mt-2" />
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="postal_code" value="Postal Code" />

                    <TextInput
                        id="postal_code"
                        name="postal_code"
                        value={data.postal_code}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('postal_code', e.target.value)}
                        required
                    />

                    <InputError message={errors.postal_code} className="mt-2" />
                </div>

                <div class="grid md:grid-cols-1 gap-4 sm:grid-cols-1 mt-4">
                    <div className="">
                        <InputLabel htmlFor="phone_number" value="Phone Number" />

                        <TextInput
                            id="phone_number"
                            name="phone_number"
                            value={data.phone_number}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('phone_number', e.target.value)}
                            required
                        />

                        <InputError message={errors.phone_number} className="mt-2" />
                    </div>

                    <div className="">
                        <InputLabel htmlFor="mobile_phone_number" value="Mobile Phone Number" />

                        <TextInput
                            id="mobile_phone_number"
                            name="mobile_phone_number"
                            value={data.mobile_phone_number}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('mobile_phone_number', e.target.value)}
                            required
                        />

                        <InputError message={errors.mobile_phone_number} className="mt-2" />
                    </div>

                    <div className="">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="type_of_business" value="Type of Business" />
                    <div className="grid grid-cols-3 gap-4 mt-2">

                        <label className="inline-flex items-center">
                            <input
                            type="radio"
                            name="type_of_business"
                            className="form-checkbox"
                            value="PKP"
                            checked={radioOptionType === 'PKP'}
                            onChange={handleRadioChange}
                            />
                            <span className="ml-2">PKP</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                            type="radio"
                            name="type_of_business"
                            className="form-checkbox"
                            value="Non PKP"
                            checked={radioOptionType === 'Non PKP'}
                            onChange={handleRadioChange}
                            />
                            <span className="ml-2">Non PKP</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                            type="radio"
                            name="type_of_business"
                            className="form-checkbox"
                            value="Pribadi"
                            checked={radioOptionType === 'Pribadi'}
                            onChange={handleRadioChange}
                            />
                            <span className="ml-2">Pribadi</span>
                        </label>
                        
                    </div>
                    <InputError message={errors.type_of_business} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        Next
                    </PrimaryButton>
                </div>
                <div className="flex justify-center items-center mt-1">
                    <p className="text-gray-800 text-sm">Already have an account?</p>
                    <Link
                        href={route('login')}
                        className="ml-1 underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-gray-800"
                    >
                        Login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
