import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import TabButton from './Components/TabButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Transition } from '@headlessui/react';
import PDFPopup from '@/Components/PDFPopup';
import { typeOfBusiness } from '@/Utils/constant';
import { convertMb } from '@/Utils/helper';
import ModalViewer from '@/Components/ModalViewer';


export default function Edit(props) {
    console.log(props);
    const { data, setData, post, clearErrors, hasErrors, processing, errors, recentlySuccessful, setError, reset } = useForm({
        name: props.data.vendor.name != null ? props.data.vendor.name : '',
        email: props.data.vendor.user.email != null ? props.data.vendor.user.email : '',
        npwp: props.data.vendor.npwp != null ? props.data.vendor.npwp : '',
        name_business: props.data.vendor.name_business != null ? props.data.vendor.name_business : '',
        office_address: props.data.vendor.office_address != null ? props.data.vendor.office_address : '',
        npwp_address: props.data.vendor.npwp_address != null ? props.data.vendor.npwp_address : '',
        country_id: props.data.vendor.country_id != null ? props.data.vendor.country_id : '',
        country: props.data.vendor.country != null ? props.data.vendor.country : '',
        province_id: props.data.vendor.province_id != null ? props.data.vendor.province_id : '',
        province_name: props.data.vendor.province_name != null ? props.data.vendor.province_name : '',
        city_id: props.data.vendor.city_id != null ? props.data.vendor.city_id : '',
        city_name: props.data.vendor.city_name != null ? props.data.vendor.city_name : '',
        postal_code: props.data.vendor.postal_code != null ? props.data.vendor.postal_code : '',
        phone_number: props.data.vendor.phone_number != null ? props.data.vendor.phone_number : '',
        mobile_phone_number: props.data.vendor.mobile_phone_number != null ? props.data.vendor.mobile_phone_number : '',
        type_of_business: props.data.vendor.type_of_business != null ? props.data.vendor.type_of_business : '',
        director_name: props.data.vendor.director_name != null ? props.data.vendor.director_name : '',
        director_phone_number: props.data.vendor.director_phone_number != null ? props.data.vendor.director_phone_number : '',
        director_email: props.data.vendor.director_email != null ? props.data.vendor.director_email : '',
        marketing_key_account: props.data.vendor.marketing_key_account != null ? props.data.vendor.marketing_key_account : '',
        marketing_phone_number: props.data.vendor.marketing_phone_number != null ? props.data.vendor.marketing_phone_number : '',
        marketing_email: props.data.vendor.marketing_email != null ? props.data.vendor.marketing_email : '',
        fa_name: props.data.vendor.fa_name != null ? props.data.vendor.fa_name : '',
        fa_phone_number: props.data.vendor.fa_phone_number != null ? props.data.vendor.fa_phone_number : '',
        fa_email: props.data.vendor.fa_email != null ? props.data.vendor.fa_email : '',
        is_bca: props.data.vendor.is_bca != null ? props.data.vendor.is_bca == '1' ? '1' : '0' : '0',
        bank_name: props.data.vendor.bank_name != null ? props.data.vendor.bank_name : '',
        is_virtual_account: props.data.vendor.is_virtual_account != null ? props.data.vendor.is_virtual_account == '1' ? '1' : '0' : '0',
        bank_account_name: props.data.vendor.bank_account_name != null ? props.data.vendor.bank_account_name : '',
        bank_account_number: props.data.vendor.bank_account_number != null ? props.data.vendor.bank_account_number : '',
        branch_of_bank: props.data.vendor.branch_of_bank != null ? props.data.vendor.branch_of_bank : '',
        bank_swift_code: props.data.vendor.bank_swift_code != null ? props.data.vendor.bank_swift_code : '',
        file_npwp: props.data.vendor.file_npwp != null ? props.data.vendor.file_npwp : '',
        expired_npwp: props.data.vendor.expired_npwp != null ? props.data.vendor.expired_npwp : '',
        file_sppkp: props.data.vendor.file_sppkp != null ? props.data.vendor.file_sppkp : '',
        expired_sppkp: props.data.vendor.expired_sppkp != null ? props.data.vendor.expired_sppkp : '',
        file_siup: props.data.vendor.file_siup != null ? props.data.vendor.file_siup : '',
        expired_siup: props.data.vendor.expired_siup != null ? props.data.vendor.expired_siup : '',
        file_tdp: props.data.vendor.file_tdp != null ? props.data.vendor.file_tdp : '',
        expired_tdp: props.data.vendor.expired_tdp != null ? props.data.vendor.expired_tdp : '',
        file_nib: props.data.vendor.file_nib != null ? props.data.vendor.file_nib : '',
        expired_nib: props.data.vendor.expired_nib != null ? props.data.vendor.expired_nib : '',
        file_board_of_directors_composition: props.data.vendor.file_board_of_directors_composition != null ? props.data.vendor.file_board_of_directors_composition : '',
        file_front_page_bank: props.data.vendor.file_front_page_bank != null ? props.data.vendor.file_front_page_bank : '',
        file_bank_account_statement_letter: props.data.vendor.file_bank_account_statement_letter != null ? props.data.vendor.file_bank_account_statement_letter : '',
        file_non_pkp_statement: props.data.vendor.file_non_pkp_statement != null ? props.data.vendor.file_non_pkp_statement : '',
        file_ektp: props.data.vendor.file_ektp != null ? props.data.vendor.file_ektp : '',
        expired_ektp: props.data.vendor.expired_ektp != null ? props.data.vendor.expired_ektp : '',
        legality: props.data.vendor.legality != null ? props.data.vendor.legality : '',
        suffix: props.data.vendor.suffix != null ? props.data.vendor.suffix : '',
        term_condition: '',
        status_submit: '',

        document_type: props.data.vendor.type_of_business == 'PKP' || props.data.vendor.type_of_business == 'Non PKP'  ? 'npwp' : 'ktp',
        ktp: props.data.vendor.ktp != null ? props.data.vendor.ktp : '',
        ktp_address: props.data.vendor.ktp_address != null ? props.data.vendor.ktp_address : '',
    });

    const [selectedNameBusiness, setSelectedNameBusiness] = useState(props.data.vendor.name_business != null ? props.data.vendor.name_business : '');

    const handleNameBusiness = (event) => {
        data.name_business = event.target.value;
        setSelectedNameBusiness(data.name_business);
    }  

    const submit = (e) => {
        e.preventDefault();
        
        post(route('vendor.update', props.data.vendor.id), {
            onError: checkErrorValidatorTab(props.errors)
        });
    };

    const [selectedOptionCountry, setSelectedOptionCountry] = useState(props.data.vendor.country_id);
    const [selectedOptionProvince, setSelectedOptionProvince] = useState(props.data.vendor.province_id);
    const [selectedOptionCity, setSelectedOptionCity] = useState(props.data.vendor.city_id);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedBankBca, setSelectedBankBca] = useState(props.data.vendor.is_bca != null ? props.data.vendor.is_bca == '1' ? '1' : '0' : '0');
    const [selectedVirtualBank, setSelectedVirtualBank] = useState(props.data.vendor.is_virtual_account != null ? props.data.vendor.is_virtual_account == '1' ? '1' : '0' : '0');

    const [tabPane1, setTabPane1] = useState('');
    const [tabPane2, setTabPane2] = useState('hidden');
    const [tabPane3, setTabPane3] = useState('hidden');
    const [tabPane4, setTabPane4] = useState('hidden');
    const [tabPane5, setTabPane5] = useState('hidden');

    const checkErrorValidatorTab = (column) => {
        if(column.name 
            || column.email 
            || column.name_business 
            || column.npwp 
            || column.npwp_address 
            || column.ktp
            || column.ktp_address 
            || column.postal_code 
            || column.province_id 
            || column.phone_number
            || column.mobile_phone_number
            || column.type_of_business
        )
        {
            openCard1Clicked(0);
        } else if(column.director_name 
            || column.director_phone_number 
            || column.director_email 
            || column.fa_name 
            || column.fa_phone_number 
            || column.fa_email 
            || column.marketing_email 
            || column.marketing_phone_number
            || column.marketing_key_account
        )
        {
            openCard2Clicked(1);
        } else if(column.bank_name 
            || column.bank_account_number 
            || column.bank_account_name 
            || column.branch_of_bank 
            || column.bank_swift_code 
        )
        {
            openCard3Clicked(2);
        } else if(column.file_nib 
            || column.file_npwp 
            || column.file_siup 
            || column.file_sppkp 
            || column.file_tdp 
            || column.file_board_of_directors_composition 
            || column.file_non_pkp_statement 
            || column.expired_nib
            || column.expired_siup
            || column.expired_sppkp
            || column.expired_tdp
        )
        {
            openCard4Clicked(3);
        } else if(column.term_condition 
        )
        {
            openCard5Clicked(4);
        } else {
            openCard5Clicked(4);
        }
    }

    const handleCardClicked = (index) => {
        const tabPaneStates = ['hidden', 'hidden', 'hidden', 'hidden', 'hidden']; // Assuming you have 5 tab panes
        
        tabPaneStates[index] = '';
        
        setTabPane1(tabPaneStates[0]);
        setTabPane2(tabPaneStates[1]);
        setTabPane3(tabPaneStates[2]);
        setTabPane4(tabPaneStates[3]);
        setTabPane5(tabPaneStates[4]);
    }

    const openCard1Clicked = () => {
        handleCardClicked(0);
    }
    
    const openCard2Clicked = () => {
        handleCardClicked(1);
    }
    
    const openCard3Clicked = () => {
        handleCardClicked(2);
    }
    
    const openCard4Clicked = () => {
        handleCardClicked(3);
    }
    
    const openCard5Clicked = () => {
        handleCardClicked(4);
    }

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [pdfUrl, setPdfUrl] = useState('');

    const openPopup = (item) => {
        // console.log(item);
        setPdfUrl(item); 
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const [tabPkp, setTabPkp] = useState(data.type_of_business == 'PKP' ? '' : 'hidden');
    const [tabNonPkp, setTabNonPkp] = useState(data.type_of_business == 'Non PKP' ? '' : 'hidden');
    const [tabPribadi, setTabPribadi] = useState(data.type_of_business == 'Pribadi' || data.type_of_business == 'Pribadi Non PKP' ? '' : 'hidden');

    const [radioOptionType, setSelectedOption] = useState(data.type_of_business);

    const [checkboxTermCondition, setCheckboxTermCondition] = useState();

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value); 
        data.type_of_business = event.target.value;
        data.type_of_business == 'PKP' ? setTabPkp('') : setTabPkp('hidden');
        data.type_of_business == 'Non PKP' ? setTabNonPkp('') : setTabNonPkp('hidden');
        data.type_of_business == 'Pribadi' || data.type_of_business == 'Pribadi Non PKP' ? setTabPribadi('') : setTabPribadi('hidden');
        if (value === 'Pribadi' || value === 'Pribadi Non PKP') {
            setData('document_type', 'ktp');
        } else {
            setData('document_type', 'npwp');
        }
    };

    const [isCheckedTermCondition, setIsCheckedTermCondition] = useState(false);

    const handleCheckboxTermConditionChange = (event) => {
        setCheckboxTermCondition(event.target.value); 
        if(!isCheckedTermCondition) {
            setIsCheckedTermCondition(true);
            data.term_condition = event.target.value;
        } else {
            setIsCheckedTermCondition(false);
            data.term_condition = '';
        }
    };

    const submitDraft = () => {
        data.status_submit = 'draft';
    };

    const submitNonDraft = () => {
        data.status_submit = 'pengajuan perubahan';
    };

    const [dataApi, setDataApi] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError1] = useState(null);

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
        })
        .catch((error) => {
            setError1(error);
            setLoading(false);
        });

        fetch(`/get-state?country_id=${data.country_id}`)
            .then((response) => response.json())
        .then((res) => {
            setProvinces(res);
        })
        .catch((error) => {
            console.error('Error fetching states:', error);
        });

        fetch(`/get-city?state_id=${data.province_id}`)
        .then((response) => response.json())
        .then((res) => {
            setCities(res);
        })
        .catch((error) => {
            console.error('Error fetching cities:', error);
        });

    }, []);

    const [npwpFile, setNpwpFile] = useState(props.data.vendor.status_account == 'ditolak' ? props.data.vendor.npwp_note != 'acc' ? 'No File Chosen' : props.data.vendor.file_npwp_name : props.data.vendor.file_npwp == null ? "No file chosen" : props.data.vendor.file_npwp_name);
    const [sppkpFile, setSppkpFile] = useState(props.data.vendor.status_account == 'ditolak' ? props.data.vendor.sppkp_note != 'acc' ? 'No File Chosen' : props.data.vendor.file_sppkp_name : props.data.vendor.file_sppkp == null ? "No file chosen" : props.data.vendor.file_sppkp_name);
    const [siupFile, setSiupFile] = useState(props.data.vendor.status_account == 'ditolak' ? props.data.vendor.siup_note != 'acc' ? 'No File Chosen' : props.data.vendor.file_siup_name : props.data.vendor.file_siup == null ? "No file chosen" : props.data.vendor.file_siup_name);
    const [tdpFile, setTdpFile] = useState(props.data.vendor.status_account == 'ditolak' ? props.data.vendor.tdp_note != 'acc' ? 'No File Chosen' : props.data.vendor.file_tdp_name : props.data.vendor.file_tdp == null ? "No file chosen" : props.data.vendor.file_tdp_name);
    const [nibFile, setNibFile] = useState(props.data.vendor.status_account == 'ditolak' ? props.data.vendor.nib_note != 'acc' ? 'No File Chosen' : props.data.vendor.file_nib_name : props.data.vendor.file_nib == null ? "No file chosen" : props.data.vendor.file_nib_name);
    const [bodcFile, setBodcFile] = useState(props.data.vendor.status_account == 'ditolak' ? props.data.vendor.board_of_directors_composition_note != 'acc' ? 'No File Chosen' : props.data.vendor.file_board_of_directors_composition_name : props.data.vendor.file_board_of_directors_composition == null ? "No file chosen" : props.data.vendor.file_board_of_directors_composition_name);
    const [nonPkpFile, setNonPkpFile] = useState(props.data.vendor.status_account == 'ditolak' ? props.data.vendor.non_pkp_statement_note != 'acc' ? 'No File Chosen' : props.data.vendor.file_non_pkp_statement_name : props.data.vendor.file_non_pkp_statement == null ? "No file chosen" : props.data.vendor.file_non_pkp_statement_name);

    const handleFile = (e, setter) => {
        if (convertMb(e.target.files[0].size) > 5) {
            console.log(e.target.name);
            setError(e.target.name, 'Max file size should not be greater than 5mb')
        } else {
            clearErrors(e.target.name);
            setData(e.target.name, e.target.files[0]);
            setter(e.target.files[0].name.substring(0, 35) + '...');
        }
    }

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

    const [showBankName, setShowBankName] = useState(props.data.vendor.is_bca != null ? props.data.vendor.is_bca == '1' ? true : false : false);
    const handleBcaChange = (event) => {
        data.is_bca = event.target.value;
        if(data.is_bca == '1')
        {
            data.bank_name = 'bca';
            setShowBankName(true);
        } else {
            data.bank_name = '';
            setShowBankName(false);
        }
        setSelectedBankBca(data.is_bca);
    }

    const handleVirtualBankChange = (event) => {
        data.is_virtual_account = event.target.value;
        setSelectedVirtualBank(data.is_virtual_account);
    }

    const [npwp, setNPWP] = useState(props.data.vendor.npwp != null ? props.data.vendor.npwp : '');
    
    const handleNPWPChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        const formattedNPWP = formatNPWP(value);
        data.npwp = formattedNPWP;
        setNPWP(formattedNPWP);
    };
    
    const formatNPWP = (npwpValue) => {
        const npwpWithoutDots = npwpValue.replace(/\./g, ''); // Remove existing dots
        const formattedNPWP = npwpWithoutDots
        .slice(0, 15) // Limit to 15 characters
        .replace(/(\d{2})(\d{2})(\d{3})(\d{3})(\d{3})/, '$1.$2.$3.$4.$5');
    
        return formattedNPWP;
    };
    
    const [selectedOptionLegality, setSelectedOptionLegality] = useState(props.data.vendor ? props.data.vendor.legality : '');
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

    const [selectedOptionSuffix, setSelectedOptionSuffix] = useState(props.data.vendor.suffix ? props.data.vendor.suffix : '');
    const handleSuffixChange = (event) => {
        data.suffix = event.target.value;
        setSelectedOptionSuffix(data.suffix);
    }
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <AuthenticatedLayout
            user={props.data.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Edit Perubahan Data" />

            <ModalViewer
                files={pdfUrl}
                show={isPopupOpen}
                onClose={closePopup}
            />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Data Change</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href="javascript: void(0);">Vendor Management</a></li>
                        <li className="breadcrumb-item"><a href={route('vendor.index')}>Data Change</a></li>
                        <li className="breadcrumb-item active">Edit Data Change</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Edit Detail Information</div>
                    </div>
                </div>
            </div>

            <div className="pt-5 ">

                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
                        <div onClick={openCard1Clicked}>
                            <TabButton title="Company" class={`${tabPane1 != 'hidden' ? 'bg-red-500 text-white' : ''}`} />
                        </div>
                        <div onClick={openCard2Clicked}>
                            <TabButton title="Contact Person" class={`${tabPane2 != 'hidden' ? 'bg-red-500 text-white' : ''}`} />
                        </div>
                        <div onClick={openCard3Clicked}>
                            <TabButton title="Financial" class={`${tabPane3 != 'hidden' ? 'bg-red-500 text-white' : ''}`} />
                        </div>
                        <div onClick={openCard4Clicked}>
                            <TabButton title="Business Information" class={`${tabPane4 != 'hidden' ? 'bg-red-500 text-white' : ''}`} />
                        </div>
                        <div onClick={openCard5Clicked}>
                            <TabButton title="Term & Condition" class={`${tabPane5 != 'hidden' ? 'bg-red-500 text-white' : ''}`} />
                        </div>
                    </nav>
                </div>

                <div className="bg-white shadow-lg p-6">
                    <form onSubmit={submit}>
                        <div id="card-type-tab-1" className={`${tabPane1}`} role="tabpanel" aria-labelledby="card-type-tab-item-1">
                            <p className="font-bold mb-3">Company Information</p>
                            <div className="grid grid-cols-2">
                                <div>
                                    <div className="mb-3">
                                        <InputLabel value="Name" className="font-bold" required={true}/>
                                        <TextInput 
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            autoComplete="name"
                                            placeholder="name.."
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                            readonly="true"
                                        />
                                        <InputError 
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <InputLabel value="Prefix" className="font-bold" required={true}/>
                                        <select className="select select-bordered w-full mt-1"
                                            id="legality"
                                            name="legality"
                                            value={selectedOptionLegality}
                                            onChange={handleLegalityChange}
                                        >
                                            <option value="" hidden>Prefix</option>
                                            {props.data.prefix.map((item) => (
                                                <option key={item.id} value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError 
                                            message={errors.legality}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <InputLabel value="Suffix" className="font-bold" required={true}/>
                                        <select className="select select-bordered w-full mt-1"
                                            id="suffix"
                                            name="suffix"
                                            value={selectedOptionSuffix}
                                            onChange={handleSuffixChange}
                                        >
                                            <option value="" hidden>Suffix</option>
                                            {props.data.suffix.map((item) => (
                                                <option key={item.id} value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError 
                                            message={errors.suffix}
                                            className="mt-2"
                                        />
                                    </div>

                                    {
                                        radioOptionType !== 'Pribadi' && radioOptionType !== 'Pribadi Non PKP' ? (
                                            <div className="mb-3">
                                                <InputLabel value="Document Type" className="font-bold" required={true} />
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

                                    <div className="mb-3">
                                        <InputLabel value="Email Address" className="font-bold" required={true}/>
                                        <TextInput 
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={data.email}
                                            readOnly
                                            className="mt-1 block w-full"
                                            autoComplete="email"
                                            placeholder="email.."
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                            
                                        />
                                        <InputError 
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-3 mb-3">
                                        <InputLabel htmlFor="name_business" value="Business Name" required={true} />
                                        <select className="select select-bordered w-full mt-1"
                                            id="type_of_business"
                                            name="type_of_business"
                                            value={selectedNameBusiness}
                                            onChange={handleNameBusiness}
                                        >
                                            <option value={''} defaultValue={''} disabled>Business Name</option>
                                            {typeOfBusiness.map((item, index) => (
                                                <option key={index} value={item.value}>
                                                    {item.title}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.name_business} className="mt-2" />
                                    </div>

                                    <div className="mb-3">
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

                                                            
                                                        />

                                                        <InputError message={errors.npwp} className="mt-2" />
                                                    </>
                                                )
                                            )
                                        }
                                    </div>

                                    <div className="mb-3">
                                        <InputLabel value="Office Address" className="font-bold" required={true}/>
                                        <textarea 
                                            name="office_address"
                                            className="mt-1 block w-full border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm"
                                            placeholder="Office Address *"
                                            onChange={(e) => setData('office_address', e.target.value)}
                                            value={data.office_address}
                                        />

                                        <InputError message={errors.office_address} className="mt-2" />
                                    </div>

                                    <div className="mb-3">
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
                                </div>
                                <div className="ml-5">
                                    <div className=''>
                                        <InputLabel htmlFor="type_of_business" value="Type of Business" className="font-bold" required={true} />

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

                                        <div className='mt-3 font-bold grid grid-cols-3'>
                                            {/* <p>TOP </p>
                                            <p>: </p>
                                            <p>{props.data.vendor.top ? props.data.vendor.top : '-'} Hari </p>

                                            <p>PPN </p>
                                            <p>: </p>
                                            <p>{props.data.vendor.ppn  ? props.data.vendor.ppn : '-'} % </p>

                                            <p>PPH </p>
                                            <p>: </p>
                                            <p>{props.data.vendor.pph  ? props.data.vendor.pph : '-'}</p> */}

                                            {/* <p>COA Prepayment </p>
                                            <p>: </p>
                                            <p>{props.data.vendor.coa_prepayment  ? props.data.vendor.coa_prepayment : '-'}</p>

                                            <p>COA Liability Account </p>
                                            <p>: </p>
                                            <p>{props.data.vendor.coa_liability_account  ? props.data.vendor.coa_liability_account : '-'}</p>
                                            
                                            <p>COA Receiving </p>
                                            <p>: </p>
                                            <p>{props.data.vendor.coa_receiving  ? props.data.vendor.coa_receiving : '-'}</p> */}

                                            {/* <p>Ship To </p>
                                            <p>: </p>
                                            <p>{props.data.vendor.ship_to  ? props.data.vendor.ship_to : '-'}</p>

                                            <p>Bill To </p>
                                            <p>: </p>
                                            <p>{props.data.vendor.bill_to  ? props.data.vendor.bill_to : '-'}</p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div>
                                    {/* <div className="w-full mb-3">
                                        <InputLabel value="Negara" className="font-bold" required={true}/>
                                        <TextInput
                                            id="country"
                                            name="country"
                                            value={data.country}
                                            className="mt-1 block w-full"
                                            placeholder="country"
                                            onChange={(e) => setData('country', e.target.value)}
                                            required
                                        />

                                        <InputError message={errors.country} className="mt-2" />
                                    </div> */}

                                    <div className="w-full mb-3">
                                        <InputLabel value="Country" className="font-bold" required={true}/>
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

                                    <div className="w-full mb-3">
                                        <InputLabel value="City" className="font-bold" required={true}/>
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

                                        <InputError message={errors.country} className="mt-2" />
                                    </div>

                                    <div className="mb-3">
                                        <InputLabel value="Phone Number" className="font-bold" required={true}/>
                                        <TextInput
                                            id="phone_number"
                                            name="phone_number"
                                            value={data.phone_number}
                                            className="mt-1 block w-full"
                                            placeholder="Phone Number"
                                            onChange={(e) => setData('phone_number', e.target.value)}
                                        />

                                        <InputError message={errors.phone_number} className="mt-2" />
                                    </div>

                                    <div className="mb-3">
                                        <InputLabel value="Mobile Number" className="font-bold" required={true}/>
                                        <TextInput
                                            id="mobile_phone_number"
                                            name="mobile_phone_number"
                                            value={data.mobile_phone_number}
                                            className="mt-1 block w-full"
                                            placeholder="Mobile Number"
                                            onChange={(e) => setData('mobile_phone_number', e.target.value)}
                                        />

                                        <InputError message={errors.mobile_phone_number} className="mt-2" />
                                    </div>
                                </div>
                                <div className='ml-5'>
                                    <div className="w-full mb-3">
                                        <InputLabel value="Province" className="font-bold" required={true}/>
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
                                    <div className="mb-3">
                                        <InputLabel value="Postal Code" className="font-bold" required={true}/>
                                        <TextInput
                                            id="postal_code"
                                            name="postal_code"
                                            value={data.postal_code}
                                            className="mt-1 block w-full"
                                            placeholder="Postal Code"
                                            onChange={(e) => setData('postal_code', e.target.value)}
                                        />

                                        <InputError message={errors.postal_code} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="card-type-tab-2" className={`${tabPane2}`} role="tabpanel" aria-labelledby="card-type-tab-item-2">
                            <div className="grid grid-cols-2">
                                <div>
                                    <p className="font-bold mb-3">Director Information</p>
                                    <div className="mb-3">
                                        <InputLabel value="Director Name" className="font-bold" required={true}/>
                                        <TextInput 
                                            id="director_name"
                                            name="director_name"
                                            value={data.director_name}
                                            className="mt-1 block w-full"
                                            autoComplete="director_name"
                                            placeholder="director name.."
                                            isFocused={true}
                                            onChange={(e) => setData('director_name', e.target.value)}
                                            
                                        />
                                        <InputError 
                                            message={errors.director_name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputLabel value="Director Phone Number" className="font-bold" required={true}/>
                                        <TextInput 
                                            id="director_phone_number"
                                            name="director_phone_number"
                                            value={data.director_phone_number}
                                            className="mt-1 block w-full"
                                            autoComplete="director_phone_number"
                                            placeholder="director phone number.."
                                            isFocused={true}
                                            onChange={(e) => setData('director_phone_number', e.target.value)}
                                            
                                        />
                                        <InputError 
                                            message={errors.director_phone_number}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputLabel value="Director Email" className="font-bold" required={true}/>
                                        <TextInput 
                                            id="director_email"
                                            name="director_email"
                                            type="email"
                                            value={data.director_email}
                                            className="mt-1 block w-full"
                                            autoComplete="director_email"
                                            placeholder="director email.."
                                            isFocused={true}
                                            onChange={(e) => setData('director_email', e.target.value)}
                                            
                                        />
                                        <InputError 
                                            message={errors.director_email}
                                            className="mt-2"
                                        />
                                    </div>

                                    <p className="font-bold mb-3">Marketing/Key Account Information</p>
                                    <div className="mb-3">
                                        <InputLabel value="Marketing Key Account" className="font-bold" required={true}/>
                                        <TextInput 
                                            id="marketing_key_account"
                                            name="marketing_key_account"
                                            value={data.marketing_key_account}
                                            className="mt-1 block w-full"
                                            autoComplete="marketing_key_account"
                                            placeholder="Marketing key account.."
                                            isFocused={true}
                                            onChange={(e) => setData('marketing_key_account', e.target.value)}
                                            
                                        />
                                        <InputError 
                                            message={errors.marketing_key_account}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputLabel value="Marketing Phone Number" className="font-bold" required={true}/>
                                        <TextInput 
                                            id="marketing_phone_number"
                                            name="marketing_phone_number"
                                            value={data.marketing_phone_number}
                                            className="mt-1 block w-full"
                                            autoComplete="marketing_phone_number"
                                            placeholder="marketing phone number.."
                                            isFocused={true}
                                            onChange={(e) => setData('marketing_phone_number', e.target.value)}
                                            
                                        />
                                        <InputError 
                                            message={errors.marketing_phone_number}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputLabel value="Marketing Email" className="font-bold" required={true}/>
                                        <TextInput 
                                            id="marketing_email"
                                            name="marketing_email"
                                            type="email"
                                            value={data.marketing_email}
                                            className="mt-1 block w-full"
                                            autoComplete="marketing_email"
                                            placeholder="marketing email.."
                                            isFocused={true}
                                            onChange={(e) => setData('marketing_email', e.target.value)}
                                            
                                        />
                                        <InputError 
                                            message={errors.marketing_email}
                                            className="mt-2"
                                        />
                                    </div>

                                </div>
                                <div className="ml-5">
                                    <p className="font-bold mb-3">FA Information</p>
                                        <div className="mb-3">
                                            <InputLabel value="FA Name" className="font-bold" required={true}/>
                                            <TextInput 
                                                id="fa_name"
                                                name="fa_name"
                                                value={data.fa_name}
                                                className="mt-1 block w-full"
                                                autoComplete="fa_name"
                                                placeholder="fa name.."
                                                isFocused={true}
                                                onChange={(e) => setData('fa_name', e.target.value)}
                                                
                                            />
                                            <InputError 
                                                message={errors.fa_name}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="FA Phone Number" className="font-bold" required={true}/>
                                            <TextInput 
                                                id="fa_phone_number"
                                                name="fa_phone_number"
                                                value={data.fa_phone_number}
                                                className="mt-1 block w-full"
                                                autoComplete="fa_phone_number"
                                                placeholder="fa phone number.."
                                                isFocused={true}
                                                onChange={(e) => setData('fa_phone_number', e.target.value)}
                                                
                                            />
                                            <InputError 
                                                message={errors.fa_phone_number}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="FA Email" className="font-bold" required={true}/>
                                            <TextInput 
                                                id="fa_email"
                                                name="fa_email"
                                                type="email"
                                                value={data.fa_email}
                                                className="mt-1 block w-full"
                                                autoComplete="fa_email"
                                                placeholder="FA email.."
                                                isFocused={true}
                                                onChange={(e) => setData('fa_email', e.target.value)}
                                                
                                            />
                                            <InputError 
                                                message={errors.fa_email}
                                                className="mt-2"
                                            />
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div id="card-type-tab-3" className={`${tabPane3}`} role="tabpanel" aria-labelledby="card-type-tab-item-3">
                            <div className="grid grid-cols-2">
                                <div className="w-full mb-3">
                                    <InputLabel value="Bank" className="font-bold" required={true}/>
                                    <select className="select select-bordered w-full mt-1"
                                        id="is_bca"
                                        name="is_bca"
                                        onChange={handleBcaChange}
                                        value={selectedBankBca}
                                    >
                                        <option value="" defaultValue={''} disabled>Bank</option>
                                        <option value="1">BCA</option>
                                        <option value="0">Non BCA</option>
                                    </select>

                                    <InputError message={errors.is_bca} className="mt-2" />
                                </div>
                                <div className="w-full ml-5 mb-3">
                                    <InputLabel value="Account Type" className="font-bold" required={true}/>
                                    <select className="select select-bordered w-full mt-1"
                                        id="is_virtual_account"
                                        name="is_virtual_account"
                                        value={selectedVirtualBank}
                                        onChange={handleVirtualBankChange}
                                    >
                                        <option value="" defaultValue={''} disabled>Account Type</option>
                                        <option value="1">Virtual Account</option>
                                        <option value="0">Non Vitrual Account</option>
                                    </select>

                                    <InputError message={errors.is_virtual_account} className="mt-2" />
                                </div>
                                <div className="mb-3" hidden={showBankName}>
                                    <InputLabel value="Bank Name" className="font-bold" required={true}/>
                                    <TextInput 
                                        id="bank_name"
                                        name="bank_name"
                                        value={data.bank_name}
                                        className="mt-1 block w-full"
                                        placeholder="Bank name.."
                                        isFocused={true}
                                        onChange={(e) => setData('bank_name', e.target.value)}
                                        
                                    />
                                    <InputError 
                                        message={errors.bank_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div hidden={showBankName}></div>
                            </div>

                            <div className='grid grid-cols-2'>
                                <div>
                                    <p className="font-bold mb-3">Bank Details</p>
                                    <div className="mb-3">
                                        <InputLabel value="Account Name" className="font-bold" required={true}/>
                                        <TextInput 
                                            id="bank_account_name"
                                            name="bank_account_name"
                                            value={data.bank_account_name}
                                            className="mt-1 block w-full"
                                            autoComplete="bank_account_name"
                                            placeholder="bank account name.."
                                            isFocused={true}
                                            onChange={(e) => setData('bank_account_name', e.target.value)}
                                            
                                        />
                                        <InputError 
                                            message={errors.bank_account_name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <InputLabel value="Account Number" className="font-bold" required={true}/>
                                        <TextInput 
                                            id="bank_account_number"
                                            name="bank_account_number"
                                            value={data.bank_account_number}
                                            className="mt-1 block w-full"
                                            autoComplete="bank_account_number"
                                            placeholder="bank account number.."
                                            isFocused={true}
                                            onChange={(e) => setData('bank_account_number', e.target.value)}
                                            
                                        />
                                        <InputError 
                                            message={errors.bank_account_number}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <InputLabel value="Branch" className="font-bold" required={true}/>
                                        <TextInput 
                                            id="branch_of_bank"
                                            name="branch_of_bank"
                                            value={data.branch_of_bank}
                                            className="mt-1 block w-full"
                                            autoComplete="branch_of_bank"
                                            placeholder="branch.."
                                            isFocused={true}
                                            onChange={(e) => setData('branch_of_bank', e.target.value)}
                                            
                                        />
                                        <InputError 
                                            message={errors.branch_of_bank}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <InputLabel value="Swift Code" className="font-bold" required={true}/>
                                        <TextInput 
                                            id="bank_swift_code"
                                            name="bank_swift_code"
                                            value={data.bank_swift_code}
                                            className="mt-1 block w-full"
                                            autoComplete="bank_swift_code"
                                            placeholder="swift code.."
                                            isFocused={true}
                                            onChange={(e) => setData('bank_swift_code', e.target.value)}
                                            
                                        />
                                        <InputError 
                                            message={errors.bank_swift_code}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="card-type-tab-4" className={`${tabPane4}`} role="tabpanel" aria-labelledby="card-type-tab-item-3">
                            <div className={`${tabPkp}`}>
                                <p className="font-bold mb-3">Type of Business: Wajib Pajak Badan Usaha - PKP</p>
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="">
                                    <div className="mb-3">
                                        <InputLabel value="NPWP" className="font-bold" required={true}/>
                                        <div className="flex">
                                            <label htmlFor={`${props.data.vendor.status_account == 'ditolak' ? npwpFile ? npwpFile != 'No File Chosen' ? '' : 'file-npwp' : 'file-npwp' : 'file-npwp' }`} className="border-1 p-3 rounded-s-lg w-15 m-0 text-white bg-slate-800">
                                                {props.data.vendor.status_account == 'ditolak' ? npwpFile ? npwpFile != 'No File Chosen' ? 'FILENAME' : 'CHOOSE FILE' : 'CHOOSE FILE' : 'CHOOSE FILE' }
                                            </label>
                                            <div className="border-1 p-3 rounded-e-lg w-50 break-all">{npwpFile ? npwpFile : 'No file chosen'}</div>
                                            {props.data.vendor.file_npwp != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_npwp)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : '' }
                                            <input
                                                type="file"
                                                id="file-npwp"
                                                className="hidden-input"
                                                name="file_npwp"
                                                hidden={true}
                                                onChange={(e) => handleFile(e, setNpwpFile)}
                                            />
                                        </div>
                                        <i className='text-muted'>* Max: 5mb</i>
                                        <InputError 
                                            message={errors.file_npwp}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputLabel value="SPPKP" className="font-bold" required={true}/>
                                        <div className="flex">
                                            <label htmlFor={`${props.data.vendor.status_account == 'ditolak' ? sppkpFile ? sppkpFile != 'No File Chosen' ? '' : 'file-sppkp' : 'file-sppkp' : 'file-sppkp'}`} className="border-1 p-3 rounded-s-lg w-15 m-0 text-white bg-slate-800">
                                                {props.data.vendor.status_account == 'ditolak' ? sppkpFile ? sppkpFile != 'No File Chosen' ? 'FILENAME' : 'CHOOSE FILE' : 'CHOOSE FILE' : 'CHOOSE FILE' }
                                            </label>
                                            <div className="border-1 p-3 rounded-e-lg w-50 break-all">{sppkpFile ? sppkpFile : 'No file chosen'}</div>
                                            {props.data.vendor.file_sppkp != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_sppkp)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : '' }
                                            <input
                                                type="file"
                                                id="file-sppkp"
                                                className="hidden-input"
                                                name="file_sppkp"
                                                hidden={true}
                                                onChange={(e) => handleFile(e, setSppkpFile)}
                                            />
                                        </div>
                                        <i className='text-muted'>* Max: 5mb</i>
                                        <InputError 
                                            message={errors.file_sppkp}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputLabel value="SIUP" className="font-bold" required={true}/>
                                        <div className="flex">
                                            <label htmlFor={`${props.data.vendor.status_account == 'ditolak' ? siupFile ? siupFile != 'No File Chosen' ? '' : 'file-siup' : 'file-siup' : 'file-siup' }`} className="border-1 p-3 rounded-s-lg w-15 m-0 text-white bg-slate-800">
                                                {props.data.vendor.status_account == 'ditolak' ? siupFile ? siupFile != 'No File Chosen' ? 'FILENAME' : 'CHOOSE FILE' : 'CHOOSE FILE' : 'CHOOSE FILE' }
                                            </label>
                                            <div className="border-1 p-3 rounded-e-lg w-50 break-all">{siupFile ? siupFile : 'No file chosen'}</div>
                                            {props.data.vendor.file_siup != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_siup)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : '' }
                                            <input
                                                type="file"
                                                id="file-siup"
                                                className="hidden-input"
                                                name="file_siup"
                                                hidden={true}
                                                onChange={(e) => handleFile(e, setSiupFile)}
                                            />
                                        </div>
                                        <i className='text-muted'>* Max: 5mb</i>
                                        <InputError 
                                            message={errors.file_siup}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputLabel value="TDP" className="font-bold" required={true}/>
                                        <div className="flex">
                                            <label htmlFor={`${props.data.vendor.status_account == 'ditolak' ? tdpFile ? tdpFile != 'No File Chosen' ? '' : 'file-tdp' : 'file-tdp' : 'file-tdp' }`} className="border-1 p-3 rounded-s-lg w-15 m-0 text-white bg-slate-800">
                                                {props.data.vendor.status_account == 'ditolak' ? tdpFile ? tdpFile != 'No File Chosen' ? 'FILENAME' : 'CHOOSE FILE' : 'CHOOSE FILE' : 'CHOOSE FILE' }
                                            </label>
                                            <div className="border-1 p-3 rounded-e-lg w-50 break-all">{tdpFile ? tdpFile : 'No file chosen'}</div>
                                            {props.data.vendor.file_tdp != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_tdp)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : '' }
                                            <input
                                                type="file"
                                                id="file-tdp"
                                                className="hidden-input"
                                                name="file_tdp"
                                                hidden={true}
                                                onChange={(e) => handleFile(e, setTdpFile)}
                                            />
                                        </div>
                                        <i className='text-muted'>* Max: 5mb</i>
                                        <InputError 
                                            message={errors.file_tdp}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputLabel value="NIB" className="font-bold" required={true}/>
                                        <div className="flex">
                                            <label htmlFor={`${props.data.vendor.status_account == 'ditolak' ? nibFile ? nibFile != 'No File Chosen' ? '' : 'file-nib' : 'file-nib' : 'file-nib' }`} className="border-1 p-3 rounded-s-lg w-15 m-0 text-white bg-slate-800">
                                                {props.data.vendor.status_account == 'ditolak' ? nibFile ? nibFile != 'No File Chosen' ? 'FILENAME' : 'CHOOSE FILE' : 'CHOOSE FILE' : 'CHOOSE FILE' }
                                            </label>
                                            <div className="border-1 p-3 rounded-e-lg w-50 break-all">{nibFile ? nibFile : 'No file chosen'}</div>
                                            {props.data.vendor.file_nib != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_nib)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : '' }
                                            <input
                                                type="file"
                                                id="file-nib"
                                                className="hidden-input"
                                                name="file_nib"
                                                hidden={true}
                                                onChange={(e) => handleFile(e, setNibFile)}
                                            />
                                        </div>
                                        <i className='text-muted'>* Max: 5mb</i>
                                        <InputError 
                                            message={errors.file_nib}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputLabel value="Akta Susunan Direksi" className="font-bold" required={true}/>
                                        <div className="flex">
                                            <label htmlFor={`${props.data.vendor.status_account == 'ditolak' ? bodcFile ? bodcFile != 'No File Chosen' ? '' : 'file-bodc' : 'file-bodc' : 'file-bodc' }`} className="border-1 p-3 rounded-s-lg w-15 m-0 text-white bg-slate-800">
                                                {props.data.vendor.status_account == 'ditolak' ? bodcFile ? bodcFile != 'No File Chosen' ? 'FILENAME' : 'CHOOSE FILE' : 'CHOOSE FILE' : 'CHOOSE FILE' }
                                            </label>
                                            <div className="border-1 p-3 rounded-e-lg w-50 break-all">{bodcFile ? bodcFile : 'No file chosen'}</div>
                                            {props.data.vendor.file_board_of_directors_composition != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_board_of_directors_composition)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </a> : '' }
                                            <input
                                                type="file"
                                                id="file-bodc"
                                                className="hidden-input"
                                                name="file_board_of_directors_composition"
                                                hidden={true}
                                                onChange={(e) => handleFile(e, setBodcFile)}
                                            />
                                        </div>
                                        <i className='text-muted'>* Max: 5mb</i>
                                        <InputError 
                                            message={errors.file_board_of_directors_composition}
                                            className="mt-2"
                                        />
                                    </div>
                                        {/* <div className="mb-3"> */}
                                            {/* <InputLabel value="Halaman Depan Rekening" className="font-bold" required={true}/>
                                            <div className="flex items-center align-middle">
                                                <input name="file_front_page_bank" type="file" className="file-input file-input-bordered w-full max-w-xs" 
                                                    onChange={(e) => setData('file_front_page_bank', e.target.files[0])}
                                                />
                                                {props.data.vendor.file_front_page_bank != '' ? <a href={props.data.vendor.file_front_page_bank} target='_blank'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a> : '' }
                                            </div>
                                            <InputError 
                                                message={errors.file_front_page_bank}
                                                className="mt-2"
                                            /> */}
                                        {/* </div> */}
                                        {/* <div className="mb-3"> */}
                                            {/* <InputLabel value="Surat Pernyataan Rekening Bank (Bila Berbeda)" className="font-bold" required={true}/>
                                            <div className='flex items-center align-middle'>
                                                <input name="file_bank_account_statement_letter" type="file" className="file-input file-input-bordered w-full max-w-xs" 
                                                    onChange={(e) => setData('file_bank_account_statement_letter', e.target.files[0])}
                                                />
                                                {props.data.vendor.file_bank_account_statement_letter != '' ? <a href={props.data.vendor.file_bank_account_statement_letter} target='_blank'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a> : '' }
                                            </div>
                                            <InputError 
                                                message={errors.file_bank_account_statement_letter}
                                                className="mt-2"
                                            /> */}
                                        {/* </div> */}
                                    </div>
                                    <div className='ml-5'>
                                        <div className="md:mb-24">
                                            {/* <InputLabel value="Tanggal Expired NPWP" className="font-bold" required={true}/>
                                            <TextInput 
                                                id="expired_npwp"
                                                name="expired_npwp"
                                                type="date"
                                                value={data.expired_npwp}
                                                className="mt-1 block w-full"
                                                autoComplete="expired_npwp"
                                                isFocused={true}
                                                onChange={(e) => setData('expired_npwp', e.target.value)}
                                                
                                            />
                                            <InputError 
                                                message={errors.expired_npwp}
                                                className="mt-2"
                                            /> */}
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Tanggal Expired SPPKP" className="font-bold" required={true}/>
                                            <TextInput 
                                                id="expired_sppkp"
                                                name="expired_sppkp"
                                                type="date"
                                                value={data.expired_sppkp}
                                                className="mt-1 block w-full"
                                                autoComplete="expired_sppkp"
                                                isFocused={true}
                                                onChange={(e) => setData('expired_sppkp', e.target.value)}
                                                
                                            />
                                            <InputError 
                                                message={errors.expired_sppkp}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Tanggal Expired SIUP" className="font-bold" required={true}/>
                                            <TextInput 
                                                id="expired_siup"
                                                name="expired_siup"
                                                type="date"
                                                value={data.expired_siup}
                                                className="mt-1 block w-full"
                                                autoComplete="expired_siup"
                                                isFocused={true}
                                                onChange={(e) => setData('expired_siup', e.target.value)}
                                                
                                            />
                                            <InputError 
                                                message={errors.expired_siup}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Tanggal Expired TDP" className="font-bold" required={true}/>
                                            <TextInput 
                                                id="expired_tdp"
                                                name="expired_tdp"
                                                type="date"
                                                value={data.expired_tdp}
                                                className="mt-1 block w-full"
                                                autoComplete="expired_tdp"
                                                isFocused={true}
                                                onChange={(e) => setData('expired_tdp', e.target.value)}
                                                
                                            />
                                            <InputError 
                                                message={errors.expired_tdp}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Tanggal Expired NIB" className="font-bold" required={true}/>
                                            <TextInput 
                                                id="expired_nib"
                                                name="expired_nib"
                                                type="date"
                                                value={data.expired_nib}
                                                className="mt-1 block w-full"
                                                autoComplete="expired_nib"
                                                isFocused={true}
                                                onChange={(e) => setData('expired_nib', e.target.value)}
                                                
                                            />
                                            <InputError 
                                                message={errors.expired_nib}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${tabNonPkp}`}>
                                <p className="font-bold mb-3">Type of Business: Wajib Pajak Badan Usaha - Non PKP</p>
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div>
                                        <div className="mb-3">
                                            <InputLabel value="NPWP" className="font-bold" required={true}/>
                                            <div className="flex">
                                                <label htmlFor={`${props.data.vendor.status_account == 'ditolak' ? npwpFile ? npwpFile != 'No File Chosen' ? '' : 'file-npwp' : 'file-npwp' : 'file-npwp' }`} className="border-1 p-3 rounded-s-lg w-15 m-0 text-white bg-slate-800">
                                                    {props.data.vendor.status_account == 'ditolak' ? npwpFile ? npwpFile != 'No File Chosen' ? 'FILENAME' : 'CHOOSE FILE' : 'CHOOSE FILE' : 'CHOOSE FILE' }
                                                </label>
                                                <div className="border-1 p-3 rounded-e-lg w-50 break-all">{npwpFile ? npwpFile : 'No file chosen'}</div>
                                                {props.data.vendor.file_npwp != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_npwp)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a> : '' }
                                                <input
                                                    type="file"
                                                    id="file-npwp"
                                                    className="hidden-input"
                                                    name="file_npwp"
                                                    hidden={true}
                                                    onChange={(e) => handleFile(e, setNpwpFile)}
                                                />
                                            </div>
                                            <i className='text-muted'>* Max: 5mb</i>
                                            <InputError 
                                                message={errors.file_npwp}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="SPPKP" className="font-bold" required={true}/>
                                            <div className="flex">
                                                <label htmlFor={`${props.data.vendor.status_account == 'ditolak' ? sppkpFile ? sppkpFile != 'No File Chosen' ? '' : 'file-sppkp' : 'file-sppkp' : 'file-sppkp'}`} className="border-1 p-3 rounded-s-lg w-15 m-0 text-white bg-slate-800">
                                                    {props.data.vendor.status_account == 'ditolak' ? sppkpFile ? sppkpFile != 'No File Chosen' ? 'FILENAME' : 'CHOOSE FILE' : 'CHOOSE FILE' : 'CHOOSE FILE' }
                                                </label>
                                                <div className="border-1 p-3 rounded-e-lg w-50 break-all">{sppkpFile ? sppkpFile : 'No file chosen'}</div>
                                                {props.data.vendor.file_sppkp != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_sppkp)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a> : '' }
                                                <input
                                                    type="file"
                                                    id="file-sppkp"
                                                    className="hidden-input"
                                                    name="file_sppkp"
                                                    hidden={true}
                                                    onChange={(e) => handleFile(e, setSppkpFile)}
                                                />
                                            </div>
                                            <i className='text-muted'>* Max: 5mb</i>
                                            <InputError 
                                                message={errors.file_sppkp}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="SIUP" className="font-bold" required={true}/>
                                            <div className="flex">
                                                <label htmlFor={`${props.data.vendor.status_account == 'ditolak' ? siupFile ? siupFile != 'No File Chosen' ? '' : 'file-siup' : 'file-siup' : 'file-siup' }`} className="border-1 p-3 rounded-s-lg w-15 m-0 text-white bg-slate-800">
                                                    {props.data.vendor.status_account == 'ditolak' ? siupFile ? siupFile != 'No File Chosen' ? 'FILENAME' : 'CHOOSE FILE' : 'CHOOSE FILE' : 'CHOOSE FILE' }
                                                </label>
                                                <div className="border-1 p-3 rounded-e-lg w-50 break-all">{siupFile ? siupFile : 'No file chosen'}</div>
                                                {props.data.vendor.file_siup != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_siup)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a> : '' }
                                                <input
                                                    type="file"
                                                    id="file-siup"
                                                    className="hidden-input"
                                                    name="file_siup"
                                                    hidden={true}
                                                    onChange={(e) => handleFile(e, setSiupFile)}
                                                />
                                            </div>
                                            <i className='text-muted'>* Max: 5mb</i>
                                            <InputError 
                                                message={errors.file_siup}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="TDP" className="font-bold" required={true}/>
                                            <div className="flex">
                                                <label htmlFor={`${props.data.vendor.status_account == 'ditolak' ? tdpFile ? tdpFile != 'No File Chosen' ? '' : 'file-tdp' : 'file-tdp' : 'file-tdp' }`} className="border-1 p-3 rounded-s-lg w-15 m-0 text-white bg-slate-800">
                                                    {props.data.vendor.status_account == 'ditolak' ? tdpFile ? tdpFile != 'No File Chosen' ? 'FILENAME' : 'CHOOSE FILE' : 'CHOOSE FILE' : 'CHOOSE FILE' }
                                                </label>
                                                <div className="border-1 p-3 rounded-e-lg w-50 break-all">{tdpFile ? tdpFile : 'No file chosen'}</div>
                                                {props.data.vendor.file_tdp != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_tdp)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a> : '' }
                                                <input
                                                    type="file"
                                                    id="file-tdp"
                                                    className="hidden-input"
                                                    name="file_tdp"
                                                    hidden={true}
                                                    onChange={(e) => handleFile(e, setTdpFile)}
                                                />
                                            </div>
                                            <i className='text-muted'>* Max: 5mb</i>
                                            <InputError 
                                                message={errors.file_tdp}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="NIB" className="font-bold" required={true}/>
                                            <div className="flex">
                                                <label htmlFor={`${props.data.vendor.status_account == 'ditolak' ? nibFile ? nibFile != 'No File Chosen' ? '' : 'file-nib' : 'file-nib' : 'file-nib' }`} className="border-1 p-3 rounded-s-lg w-15 m-0 text-white bg-slate-800">
                                                    {props.data.vendor.status_account == 'ditolak' ? nibFile ? nibFile != 'No File Chosen' ? 'FILENAME' : 'CHOOSE FILE' : 'CHOOSE FILE' : 'CHOOSE FILE' }
                                                </label>
                                                <div className="border-1 p-3 rounded-e-lg w-50 break-all">{nibFile ? nibFile : 'No file chosen'}</div>
                                                {props.data.vendor.file_nib != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_nib)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a> : '' }
                                                <input
                                                    type="file"
                                                    id="file-nib"
                                                    className="hidden-input"
                                                    name="file_nib"
                                                    hidden={true}
                                                    onChange={(e) => handleFile(e, setNibFile)}
                                                />
                                            </div>
                                            <i className='text-muted'>* Max: 5mb</i>
                                            <InputError 
                                                message={errors.file_nib}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Akta Susunan Direksi" className="font-bold" required={true}/>
                                            <div className="flex">
                                                <label htmlFor={`${props.data.vendor.status_account == 'ditolak' ? bodcFile ? bodcFile != 'No File Chosen' ? '' : 'file-bodc' : 'file-bodc' : 'file-bodc' }`} className="border-1 p-3 rounded-s-lg w-15 m-0 text-white bg-slate-800">
                                                    {props.data.vendor.status_account == 'ditolak' ? bodcFile ? bodcFile != 'No File Chosen' ? 'FILENAME' : 'CHOOSE FILE' : 'CHOOSE FILE' : 'CHOOSE FILE' }
                                                </label>
                                                <div className="border-1 p-3 rounded-e-lg w-50 break-all">{bodcFile ? bodcFile : 'No file chosen'}</div>
                                                {props.data.vendor.file_board_of_directors_composition != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_board_of_directors_composition)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a> : '' }
                                                <input
                                                    type="file"
                                                    id="file-bodc"
                                                    className="hidden-input"
                                                    name="file_board_of_directors_composition"
                                                    hidden={true}
                                                    onChange={(e) => handleFile(e, setBodcFile)}
                                                />
                                            </div>
                                            <i className='text-muted'>* Max: 5mb</i>
                                            <InputError 
                                                message={errors.file_board_of_directors_composition}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Surat Pernyataan Non PKP (Bermaterai)" className="font-bold" required={true}/>
                                            <div className="flex">
                                                <label htmlFor={`${props.data.vendor.status_account == 'ditolak' ? nonPkpFile ? nonPkpFile != 'No File Chosen' ? '' : 'file-non-kpk' : 'file-non-kpk' : 'file-non-kpk' }`} className="border-1 p-3 rounded-s-lg w-15 m-0 text-white bg-slate-800">
                                                    {props.data.vendor.status_account == 'ditolak' ? nonPkpFile ? nonPkpFile != 'No File Chosen' ? 'FILENAME' : 'CHOOSE FILE' : 'CHOOSE FILE' : 'CHOOSE FILE' }
                                                </label>
                                                <div className="border-1 p-3 rounded-e-lg w-50 break-all">{nonPkpFile ? nonPkpFile : 'No file chosen'}</div>
                                                {props.data.vendor.file_non_pkp_statement != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_non_pkp_statement)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a> : '' }
                                                <input
                                                    type="file"
                                                    id="file-non-kpk"
                                                    className="hidden-input"
                                                    name="file_non_pkp_statement"
                                                    hidden={true}
                                                    onChange={(e) => handleFile(e, setNonPkpFile)}
                                                />
                                            </div>
                                            <i className='text-muted'>* Max: 5mb</i>
                                            <InputError 
                                                message={errors.file_non_pkp_statement}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="md:mb-24">
                                            {/* <InputLabel value="Tanggal Expired NPWP" className="font-bold" required={true}/>
                                            <TextInput 
                                                id="expired_npwp"
                                                name="expired_npwp"
                                                type="date"
                                                value={data.expired_npwp}
                                                className="mt-1 block w-full"
                                                autoComplete="expired_npwp"
                                                isFocused={true}
                                                onChange={(e) => setData('expired_npwp', e.target.value)}
                                                
                                            />
                                            <InputError 
                                                message={errors.expired_npwp}
                                                className="mt-2"
                                            /> */}
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Tanggal Expired SPPKP" className="font-bold" required={true}/>
                                            <TextInput 
                                                id="expired_sppkp"
                                                name="expired_sppkp"
                                                type="date"
                                                value={data.expired_sppkp}
                                                className="mt-1 block w-full"
                                                autoComplete="expired_sppkp"
                                                isFocused={true}
                                                onChange={(e) => setData('expired_sppkp', e.target.value)}
                                                
                                            />
                                            <InputError 
                                                message={errors.expired_sppkp}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Tanggal Expired SIUP" className="font-bold" required={true}/>
                                            <TextInput 
                                                id="expired_siup"
                                                name="expired_siup"
                                                type="date"
                                                value={data.expired_siup}
                                                className="mt-1 block w-full"
                                                autoComplete="expired_siup"
                                                isFocused={true}
                                                onChange={(e) => setData('expired_siup', e.target.value)}
                                                
                                            />
                                            <InputError 
                                                message={errors.expired_siup}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Tanggal Expired TDP" className="font-bold" required={true}/>
                                            <TextInput 
                                                id="expired_tdp"
                                                name="expired_tdp"
                                                type="date"
                                                value={data.expired_tdp}
                                                className="mt-1 block w-full"
                                                autoComplete="expired_tdp"
                                                isFocused={true}
                                                onChange={(e) => setData('expired_tdp', e.target.value)}
                                                
                                            />
                                            <InputError 
                                                message={errors.expired_tdp}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Tanggal Expired NIB" className="font-bold" required={true}/>
                                            <TextInput 
                                                id="expired_nib"
                                                name="expired_nib"
                                                type="date"
                                                value={data.expired_nib}
                                                className="mt-1 block w-full"
                                                autoComplete="expired_nib"
                                                isFocused={true}
                                                onChange={(e) => setData('expired_nib', e.target.value)}
                                                
                                            />
                                            <InputError 
                                                message={errors.expired_nib}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${tabPribadi}`}>
                                <p className="font-bold mb-3">Type of Business: Wajib Pajak Pribadi {data.type_of_business == 'Pribadi' ? '(PKP)' : ''} {data.type_of_business == 'Pribadi Non PKP' ? '(Non PKP)' : ''}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div>
                                        <div className="mb-3">
                                            <InputLabel value="NPWP/KTP" className="font-bold" required={true}/>
                                            <div className="flex">
                                                <label htmlFor={`${props.data.vendor.status_account == 'ditolak' ? npwpFile ? npwpFile != 'No File Chosen' ? '' : 'file-npwp' : 'file-npwp' : 'file-npwp' }`} className="border-1 p-3 rounded-s-lg w-15 m-0 text-white bg-slate-800">
                                                    {props.data.vendor.status_account == 'ditolak' ? npwpFile ? npwpFile != 'No File Chosen' ? 'FILENAME' : 'CHOOSE FILE' : 'CHOOSE FILE' : 'CHOOSE FILE' }
                                                </label>
                                                <div className="border-1 p-3 rounded-e-lg w-50 break-all">{npwpFile ? npwpFile : 'No file chosen'}</div>
                                                {props.data.vendor.file_npwp != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_npwp)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a> : '' }
                                                <input
                                                    type="file"
                                                    id="file-npwp"
                                                    className="hidden-input"
                                                    name="file_npwp"
                                                    hidden={true}
                                                    onChange={(e) => handleFile(e, setNpwpFile)}
                                                />
                                            </div>
                                            <i className='text-muted'>* Max: 5mb</i>
                                            <InputError 
                                                message={errors.file_npwp}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Surat Pernyataan Non PKP (Bermaterai)" className="font-bold" required={true}/>
                                            <div className="flex">
                                                <label htmlFor={`${props.data.vendor.status_account == 'ditolak' ? nonPkpFile ? nonPkpFile != 'No File Chosen' ? '' : 'file-non-kpk' : 'file-non-kpk' : 'file-non-kpk' }`} className="border-1 p-3 rounded-s-lg w-15 m-0 text-white bg-slate-800">
                                                    {props.data.vendor.status_account == 'ditolak' ? nonPkpFile ? nonPkpFile != 'No File Chosen' ? 'FILENAME' : 'CHOOSE FILE' : 'CHOOSE FILE' : 'CHOOSE FILE' }
                                                </label>
                                                <div className="border-1 p-3 rounded-e-lg w-50 break-all">{nonPkpFile ? nonPkpFile : 'No file chosen'}</div>
                                                {props.data.vendor.file_non_pkp_statement != '' ? <a href="javascrip:;" onClick={() => openPopup(props.data.vendor.file_non_pkp_statement)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a> : '' }
                                                <input
                                                    type="file"
                                                    id="file-non-kpk"
                                                    className="hidden-input"
                                                    name="file_non_pkp_statement"
                                                    hidden={true}
                                                    onChange={(e) => handleFile(e, setNonPkpFile)}
                                                />
                                            </div>
                                            <i className='text-muted'>* Max: 5mb</i>
                                            <InputError 
                                                message={errors.file_non_pkp_statement}
                                                className="mt-2"
                                            />
                                        </div>
                                        {/* <div className="mb-3">
                                            <InputLabel value="E-KTP" className="font-bold" required={true}/>
                                            <div className="flex items-center align-middle">
                                                <input name="file_ektp" type="file" className="file-input file-input-bordered w-full max-w-xs" 
                                                    onChange={(e) => setData('file_ektp', e.target.files[0])}
                                                />
                                                {props.data.vendor.file_ektp != '' ? <a href={props.data.vendor.file_ektp} target='_blank'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a> : '' }
                                            </div>
                                            <InputError 
                                                message={errors.file_ektp}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Halaman Depan Rekening" className="font-bold" required={true}/>
                                            <div className='flex items-center align-middle'>
                                                <input name="file_front_page_bank" type="file" className="file-input file-input-bordered w-full max-w-xs" 
                                                    onChange={(e) => setData('file_front_page_bank', e.target.files[0])}
                                                />
                                                {props.data.vendor.file_front_page_bank != '' ? <a href={props.data.vendor.file_front_page_bank} target='_blank'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a> : '' }
                                            </div>
                                            <InputError 
                                                message={errors.file_front_page_bank}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Surat Pernyataan Rekening Bank (Bila Berbeda)" className="font-bold" required={true}/>
                                            <div className='flex items-center align-middle'>
                                                <input name="file_bank_account_statement_letter" type="file" className="file-input file-input-bordered w-full max-w-xs" 
                                                    onChange={(e) => setData('file_bank_account_statement_letter', e.target.files[0])}
                                                />
                                                {props.data.vendor.file_bank_account_statement_letter != '' ? <a href={props.data.vendor.file_bank_account_statement_letter} target='_blank'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                </a> : '' }
                                            </div>
                                            <InputError 
                                                message={errors.file_bank_account_statement_letter}
                                                className="mt-2"
                                            />
                                        </div> */}
                                    </div>
                                    <div>
                                        {/* <div className="mb-3"> */}
                                            {/* <InputLabel value="Tanggal Expired NPWP" className="font-bold" required={true}/>
                                            <TextInput 
                                                id="expired_npwp"
                                                name="expired_npwp"
                                                type="date"
                                                value={data.expired_npwp}
                                                className="mt-1 block w-full"
                                                autoComplete="expired_npwp"
                                                isFocused={true}
                                                onChange={(e) => setData('expired_npwp', e.target.value)}
                                                
                                            />
                                            <InputError 
                                                message={errors.expired_npwp}
                                                className="mt-2"
                                            /> */}
                                        {/* </div> */}
                                        {/* <div className="mb-3">
                                            <InputLabel value="Tanggal Expired E-KTP" className="font-bold" required={true}/>
                                            <TextInput 
                                                id="expired_ektp"
                                                name="expired_ektp"
                                                type="date"
                                                value={data.expired_ektp}
                                                className="mt-1 block w-full"
                                                autoComplete="expired_ektp"
                                                isFocused={true}
                                                onChange={(e) => setData('expired_ektp', e.target.value)}
                                                
                                            />
                                            <InputError 
                                                message={errors.expired_npwp}
                                                className="mt-2"
                                            />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="card-type-tab-5" className={`${tabPane5}`} role="tabpanel" aria-labelledby="card-type-tab-item-3">
                            <div>
                                <p className='text-lg mb-3 font-bold'>Terms and Conditions</p>
        
                                <ol style={{ listStyleType: "number" }} className='p-2'>
                                    <li className='mb-1'>Formulir Pendaftaran Pemasok Baru diisi sebagai syarat pemasok akan menjadi pemasok tetap Kalbe Consumer Health.</li>
                                    <li className='mb-1'>Pemasok akan didaftarkan dalam sistem Kalbe Consumer Health setelah terjadi minimal 3 ( tiga) transaksi penjualan ke Kalbe Consumer Health, mengisi formulir Pendaftaran Pemasok Baru dengan baik dan benar, dan melampirkan dokumen pendukung yang disyaratkan.</li>
                                    <li className='mb-1'>Tanggal Term of Payment berdasarkan tanggal terima invoice oleh bagian Tukar Faktur yang sudah diverifikasi dengan baik dan benar.</li>
                                    <li className='mb-1'>Jangka waktu pembayaran sesuai dengan Term of Payment yang telah disepakati kedua belah pihak.</li>
                                    <li className='mb-1'>Apabila terjadi koreksi tagihan maka pembayaran akan dihitung setelah tagihan tagihan diterima dengan baik dan benar.</li>
                                    <li className='mb-1'>Pemasok dan Kalbe Consumer Health sepakat untuk menaati ketentuan dan peraturan yang berlaku terkait Etika Bisnis, baik selama maupun setelah berakhirnya kerjasama ini. Masing-masing Pihak melarang tenaga kerjanya melakukan persekongkolan yang termasuk tetapi tidak terbatas pada: penggelapan, penipuan, penyuapan baik dalam bentuk uang atau dalam bentuk lain, pemberian komisi, pemberian janji apapun kepada salah satu pihak dan/atau tindakan lain yang dilakukan oleh salah satu pihak bersama-sama dengan pihak lainnya, secara melawan hukum dan yang dapat mengakibatkan timbulnya kerugian terutama bagi salah satu Pihak dalam kerjasama. Serta berusaha semaksimal mungkin agar tenaga kerja masing-masing Pihak yang terkait dengan pelaksanaan kerjasama ini tidak terlibat dalam persekongkolan.</li>
                                    <li className='mb-1'>Apabila ada indikasi maupun bukti terjadinya persekongkolan sebagaimana dimaksud dalam point 6, maka Para Pihak sepakat untuk mengambil tindakan tegas sesegera mungkin untuk memutuskan hubungan kerja dengan tenaga kerja tersebut, dan pihak yang dirugikan dapat mengambil tindakan hukum yang dianggap perlu, termasuk melaporkan kepada pihak Kepolisian dan/atau melakukan gugatan perdata dan/atau pidana terkait kerugian yang timbul.</li>
                                </ol>
                                <div className=''>
                                        <div class="flex items-center mb-2 mt-3">
                                            <label className="inline-flex items-center">
                                                <input
                                                type="checkbox"
                                                name="term_condition"
                                                className="form-checkbox"
                                                value="1"
                                                checked={isCheckedTermCondition}
                                                onChange={handleCheckboxTermConditionChange}
                                                />
                                                <span className="ml-2">I have read and agreed to the Terms and Conditions</span>
                                            </label>
                                        </div>
                                        <InputError message={errors.term_condition} className="mt-2" />
                                    </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-end mt-12">
                            <Link href={route('vendor.index')}>
                                <SecondaryButton>
                                    Back
                                </SecondaryButton>
                            </Link>
                            <div className="ml-3" onClick={submitDraft}>
                                <PrimaryButton disabled={processing}>
                                    Save Draft
                                </PrimaryButton>
                            </div>
                            <div className="ml-3" onClick={submitNonDraft}>
                                <PrimaryButton disabled={processing}>
                                    Submit
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
            
            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <div className="toast">
                    <div className="alert alert-success">
                        <span className='text-white'>Successfully made data changes.</span>
                    </div>
                </div>
            </Transition>
        </AuthenticatedLayout>
    );
}
