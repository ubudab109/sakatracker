import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { typeOfBusiness } from '@/Utils/constant';

export default function Register(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        document_type: 'npwp',
        npwp: '',
        ktp: '',
        ktp_address: '',
        name: '',
        legality: 'PT',
        name_business: '',
        email: '',
        office_address: '',
        npwp_address: '',
        country: '',
        country_id: 102,
        province_id: '',
        city_id: '',
        province_name: '',
        city_name: '',
        postal_code: '',
        phone_number: '',
        mobile_phone_number: '',
        postal_code: '',
        type_of_business: 'Pribadi',
        password: '',
        password_confirmation: '',
        suffix: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    const [selectedOptionCountry, setSelectedOptionCountry] = useState(102);
    const [selectedOptionProvince, setSelectedOptionProvince] = useState('');
    const [selectedOptionCity, setSelectedOptionCity] = useState('');
    const [selectedNameBusiness, setSelectedNameBusiness] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [dataApi, setDataApi] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedOptionLegality, setSelectedOptionLegality] = useState('PT');

    const handleNameBusiness = (event) => {
        data.name_business = event.target.value;
        setSelectedNameBusiness(data.name_business);
    }

    const handleLegalityChange = (event) => {
        data.legality = event.target.value;
        setSelectedOptionLegality(data.legality);
        setData({
            ...data,
            ktp: '',
            npwp: '',
            ktp_address: '',
            npwp_address: ''
        });
        if (event.target.value === 'PT') {
            setData('document_type', 'npwp');
        }
    }

    const [selectedOptionSuffix, setSelectedOptionSuffix] = useState('');
    const handleSuffixChange = (event) => {
        data.suffix = event.target.value;
        setSelectedOptionSuffix(data.suffix);
    }

    /**
     * JANGAN DIHAPUS. TAKUT DIPAKAI NANTI
     */
    // const handleFormattedNpwp = (e) => {
    //     let value = e.target.value
    //     value = value.replace(/[A-Za-z\W\s_]+/g, '');
    //     let split = 6;
    //     const dots = [];

    //     for (let i = 0, len = value.length; i < len; i += split) {
    //         split = i >= 2 && i <= 6 ? 3 : i >= 8 && i <= 12 ? 4 : 2;
    //         dots.push(value.substr(i, split));
    //     }

    //     const temp = dots.join('.');
    //     const formattedNPWP = temp.length > 12 ? `${temp.substr(0, 12)}-${temp.substr(12, 7)}` : temp;

    //     setData('npwp', formattedNPWP);
    // }

    useEffect(() => {

        fetch(`/get-country`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((res) => {
                setDataApi(res);
                setLoading(false);
                fetch(`/get-state?country_id=102`)
                    .then((response) => response.json())
                    .then((res) => {
                        setProvinces(res);
                    })
                    .catch((error) => {
                        console.error('Error fetching states:', error);
                    });
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });

    }, []);

    const handleCountryChange = (event) => {
        data.country_id = event.target.value;

        setSelectedOptionCountry(data.country_id);

        const selectedOption = event.target.selectedOptions[0];
        data.country = selectedOption.label;

        fetch(`/get-state?country_id=${data.country_id}`)
            .then((response) => response.json())
            .then((res) => {
                setProvinces(res);
            })
            .catch((error) => {
                console.error('Error fetching states:', error);
            });
    };

    const handleProvinceChange = (event) => {
        data.province_id = event.target.value;

        setSelectedOptionProvince(data.province_id);

        const selectedOption = event.target.selectedOptions[0];
        data.province_name = selectedOption.label;

        fetch(`/get-city?state_id=${data.province_id}`)
            .then((response) => response.json())
            .then((res) => {
                setCities(res);
            })
            .catch((error) => {
                console.error('Error fetching cities:', error);
            });
    };

    const handleCityChange = (event) => {
        data.city_id = event.target.value;
        const selectedOption = event.target.selectedOptions[0];
        data.city_name = selectedOption.label;

        setSelectedOptionCity(data.city_id);
    }

    const [radioOptionType, setSelectedOption] = useState('Pribadi');

    const handleRadioChange = (event) => {
        const value = event.target.value;
        setSelectedOption(event.target.value);
        data.type_of_business = event.target.value;
        if (value === 'Pribadi' || value === 'Pribadi Non PKP') {
            setData('document_type', 'ktp');
        } else {
            setData('document_type', 'npwp');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <GuestLayout>
            <Head title="Register" />
            <b className='text-2xl mt-4'>Register</b>
            <p className='mt-2'>
                Sudah punya akun?
                <Link href={route('login')} className="text-blue-800 underline ml-1">
                    Masuk
                </Link>
            </p>
            <form onSubmit={submit}>
                <div className='mt-3'>
                    <InputLabel htmlFor="type_of_business" value="Type of Business" required={true} />

                    <div class="flex items-center mb-2 mt-3">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="type_of_business"
                                className="form-checkbox"
                                value="PKP"
                                checked={radioOptionType === 'PKP'}
                                onChange={handleRadioChange}
                            />
                            <span className="ml-2">Wajib Pajak Badan Usaha (PKP)</span>
                        </label>
                    </div>
                    <div class="flex items-center mb-2">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="type_of_business"
                                className="form-checkbox"
                                value="Non PKP"
                                checked={radioOptionType === 'Non PKP'}
                                onChange={handleRadioChange}
                            />
                            <span className="ml-2">Wajib Pajak Badan Usaha (Non PKP)</span>
                        </label>
                    </div>
                    <div class="flex items-center mb-2">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="type_of_business"
                                className="form-checkbox"
                                value="Pribadi"
                                checked={radioOptionType === 'Pribadi'}
                                onChange={handleRadioChange}
                            />
                            <span className="ml-2">Wajib Pajak Orang Pribadi (PKP)</span>
                        </label>
                    </div>
                    <div class="flex items-center">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="type_of_business"
                                className="form-checkbox"
                                value="Pribadi Non PKP"
                                checked={radioOptionType === 'Pribadi Non PKP'}
                                onChange={handleRadioChange}
                            />
                            <span className="ml-2">Wajib Pajak Orang Pribadi (Non PKP)</span>
                        </label>
                    </div>
                    <InputError message={errors.type_of_business} className="mt-2" />
                </div>
                <div className="mt-3">
                    <div className='grid grid-cols-3 gap-3'>
                        <div>
                            <InputLabel value="Prefix" className="font-bold" required={false} />
                            <select className="select select-bordered w-full mt-1"
                                id="legality"
                                name="legality"
                                value={selectedOptionLegality}
                                onChange={handleLegalityChange}
                            >
                                {props.data.prefix.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                                <option value=""></option>
                            </select>

                            <InputError message={errors.legality} className="mt-2" />
                        </div>
                        <div className='mt-1'>
                            <InputLabel htmlFor="name" value="Nama Perusahaan" required={true} />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full h-12"
                                autoComplete="name"
                                placeholder="Nama Perusahaan *"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel value="Suffix" className="font-bold" required={false} />
                            <select className="select select-bordered w-full mt-1"
                                id="suffix"
                                name="suffix"
                                value={selectedOptionSuffix}
                                onChange={handleSuffixChange}
                            >
                                {props.data.suffix.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                                <option value=""></option>
                            </select>

                            <InputError message={errors.suffix} className="mt-2" />
                        </div>
                    </div>
                </div>
                {
                    radioOptionType !== 'Pribadi' && radioOptionType !== 'Pribadi Non PKP' ? (
                        <div className="mt-2">
                            <InputLabel value="Tipe Dokumen" className="font-bold" required={true} />
                            <select className="select select-bordered w-full mt-1"
                                id="document_type"
                                name="document_type"
                                value={data.document_type}
                                onChange={(e) => setData({ ...data, document_type: e.target.value })}
                            >
                                <option value="npwp">NPWP</option>
                                <option value="ktp">NIK</option>
                            </select>

                            <InputError message={errors.document_type} className="mt-2" />
                        </div>
                    ) : null
                }
                <div className="mt-4">
                    <InputLabel htmlFor={data.document_type === 'nwpwp' ? 'npwp' : (data.document_type === 'ktp' ? 'ktp' : 'npwp')} value={data.document_type === 'nwpwp' ? 'NPWP' : (data.document_type === 'ktp' ? 'KTP' : 'NPWP')} required={true} />
                    {
                        data.document_type === 'npwp' && data.type_of_business !== 'Pribadi' && data.type_of_business !== 'Pribadi Non PKP' ? (
                            <>
                                <input
                                    className={
                                        `border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm mt-1 block w-full ${data.type_of_business === "" ? 'bg-gray-200' : ''}`
                                    }
                                    maxLength={16}
                                    minLength={15}
                                    id="npwp"
                                    name="npwp"
                                    value={data.npwp}
                                    type='text'
                                    placeholder="NPWP *"
                                    autoComplete="npwp"
                                    isFocused={true}
                                    onChange={(e) => setData('npwp', e.target.value)}
                                    disabled={data.type_of_business === ""}
                                    required
                                />

                                <InputError message={errors.npwp} className="mt-2" />
                            </>
                        ) : (
                            data.document_type === 'ktp' ? (
                                <>
                                    <input
                                        className={
                                            `border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm mt-1 block w-full ${data.type_of_business === "" ? 'bg-gray-200' : ''}`
                                        }
                                        maxLength={16}
                                        id="ktp"
                                        name="ktp"
                                        value={data.ktp}
                                        type='text'
                                        placeholder="NIK *"
                                        autoComplete="ktp"
                                        disabled={data.type_of_business === ""}
                                        isFocused={true}
                                        onChange={(e) => setData('ktp', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.ktp} className="mt-2" />
                                </>
                            ) : (
                                <>
                                    <input
                                        className={
                                            `border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm mt-1 block w-full ${data.type_of_business === "" ? 'bg-gray-200' : ''}`
                                        }
                                        maxLength={16}
                                        minLength={15}
                                        id="npwp"
                                        name="npwp"
                                        value={data.npwp}
                                        type='text'
                                        disabled={data.type_of_business === ""}
                                        placeholder="NPWP *"
                                        autoComplete="npwp"
                                        isFocused={true}
                                        onChange={(e) => setData('npwp', e.target.value)}

                                        required
                                    />

                                    <InputError message={errors.npwp} className="mt-2" />
                                </>
                            )
                        )
                    }
                </div>

                <div className="mt-3">
                    <InputLabel htmlFor="name_business" value="Jenis Usaha" required={true} />
                    <select className="select select-bordered w-full mt-1"
                        id="type_of_business"
                        name="type_of_business"
                        required
                        value={selectedNameBusiness}
                        onChange={handleNameBusiness}
                    >
                        <option value={''} defaultValue={''} disabled>Jenis Usaha</option>
                        {typeOfBusiness.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.name_business} className="mt-2" />
                </div>

                <div className="mt-3">
                    <InputLabel htmlFor="email" value="Email Address" required={true} />
                    <TextInput
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        placeholder="Email Address *"
                        className="mt-1 block w-full"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-3">
                    <InputLabel htmlFor="office_address" value="Office Address" required={true} />
                    <textarea
                        name="office_address"
                        className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                        placeholder="Office Address *"
                        onChange={(e) => setData('office_address', e.target.value)}
                        value={data.office_address}
                    />

                    <InputError message={errors.office_address} className="mt-2" />
                </div>

                <div className="mt-3">
                    <InputLabel htmlFor="npwp_address" value={data.document_type === 'nwpwp' ? 'NPWP Address' : (data.document_type === 'ktp' ? 'NIK Address' : 'NPWP Address *')} required={true} />
                    <textarea
                        name={data.document_type === 'nwpwp' ? 'npwp_address' : (data.document_type === 'ktp' ? 'ktp_address' : 'npwp_address')}
                        className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                        placeholder={data.document_type === 'nwpwp' ? 'NPWP Address *' : (data.document_type === 'ktp' ? 'NIK Address *' : 'NPWP Address *')}
                        onChange={(e) => setData(e.target.name, e.target.value)}
                        value={data.document_type === 'nwpwp' ? data.npwp_address : (data.document_type === 'ktp' ? data.ktp_address : data.npwp_address)}
                    />

                    <InputError message={data.document_type === 'nwpwp' ? errors.npwp_address : (data.document_type === 'ktp' ? errors.ktp_address : errors.npwp_address)} className="mt-2" />
                </div>

                <div className="grid md:grid-cols-2 gap-4 sm:grid-cols-1 mt-3">
                    <div className="w-full">
                        <InputLabel htmlFor="country_id" value="Negara" required={true} />
                        <select className="select select-bordered w-full mt-1"
                            id="country_id"
                            name="country_id"
                            value={selectedOptionCountry}
                            onChange={handleCountryChange}
                        >
                            <option value="" hidden>Country</option>
                            {dataApi.map((item, index) => (
                                <option value={item.id} label={item.name}>{item.name}</option>
                            ))}
                        </select>

                        <InputError message={errors.country_id} className="mt-2" />
                    </div>
                    <div className="w-full">
                        <InputLabel htmlFor="province_id" value="Province" required={true} />
                        <select className="select select-bordered w-full mt-1"
                            id="province_id"
                            name="province_id"
                            value={selectedOptionProvince}
                            onChange={handleProvinceChange}
                        >
                            <option value="" hidden>Province</option>
                            {provinces.map((province) => (
                                <option key={province.id} value={province.id}>
                                    {province.name}
                                </option>
                            ))}
                        </select>

                        <InputError message={errors.province_id} className="mt-2" />
                    </div>
                </div>


                <div class="grid md:grid-cols-2 gap-4 sm:grid-cols-1 mt-4">
                    <div className="w-full">
                        <InputLabel htmlFor="city_id" value="City" required={true} />
                        <select className="select select-bordered w-full mt-1"
                            id="city_id"
                            name="city_id"
                            value={selectedOptionCity}
                            onChange={handleCityChange}
                        >
                            <option value="" hidden>City</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                        <i className='text-sm text-gray-500'>* Silahkan pilih province untuk memunculkan option city</i>

                        <InputError message={errors.city_id} className="mt-2" />
                    </div>
                    <div className="w-full">
                        <InputLabel htmlFor="postal_code" value="Postal Code" required={true} />
                        <TextInput
                            id="postal_code"
                            name="postal_code"
                            value={data.postal_code}
                            className="mt-1 block w-full"
                            placeholder="Postal Code *"
                            onChange={(e) => setData('postal_code', e.target.value)}
                            required
                        />

                        <InputError message={errors.postal_code} className="mt-2" />
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-4 sm:grid-cols-1 mt-3">
                    <div className="">
                        <InputLabel htmlFor="phone_number" value="Telephone" required={true} />
                        <TextInput
                            id="phone_number"
                            name="phone_number"
                            value={data.phone_number}
                            className="mt-1 block w-full"
                            placeholder="Telephone *"
                            onChange={(e) => setData('phone_number', e.target.value)}
                            required
                        />

                        <InputError message={errors.phone_number} className="mt-2" />
                    </div>

                    <div className="">
                        <InputLabel htmlFor="mobile_phone_number" value="Mobile Number" required={true} />
                        <TextInput
                            id="mobile_phone_number"
                            name="mobile_phone_number"
                            value={data.mobile_phone_number}
                            className="mt-1 block w-full"
                            placeholder="Mobile Number *"
                            onChange={(e) => setData('mobile_phone_number', e.target.value)}
                            required
                        />

                        <InputError message={errors.mobile_phone_number} className="mt-2" />
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-4 sm:grid-cols-1 mt-3">
                    <div>
                        <InputLabel htmlFor="password" value="Password" required={true} />
                        <TextInput
                            id="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            placeholder="Pasword *"
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" required={true} />
                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type="password"
                            placeholder="Confirm Pasword *"
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
