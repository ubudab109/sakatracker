
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import ModifyButton from "@/Components/ModifyButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

export default function Form(props) {
    console.log(props);
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        name: props.data.role != null ? props.data.role.name : '',
        permissions: props.data.role != null ? props.data.arrayPermissions : []
    });

    const submit = (e) => {
        e.preventDefault();

        if(props.title == 'Tambah') {
            post(route(props.route));
        } else {
            post(route(props.route, props.id));
        }
    };

    const [selectedItems, setSelectedItems] = useState(props.data.role != null ? props.data.arrayPermissions : []);

    const handleCheckboxChange = (item) => {
        console.log(item);
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(selectedItems => selectedItems !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const submitModal = () => {
        data.permissions = selectedItems;
    }

    return (
        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg mt-6 p-6">
            <form onSubmit={submit}>
                <div className="mb-3">
                    <InputLabel htmlFor="name" value="Name" required={true} />

                    <TextInput 
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        placeholder="name.."
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        
                    />

                    <InputError 
                        message={errors.name}
                        className="mt-2"
                    />
                </div>

                <div className="mb-3">
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                        {props.data.array_permissions.map((item1, index1) => (
                            <div>
                                <b className='capitalize'>{item1.title}</b>
                                <ul>
                                    {item1.permission.map((item2, index2) => (
                                        <li className='flex'>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="permissions[]"
                                                    className="form-checkbox"
                                                    checked={selectedItems.includes(item2 + '_' + item1.name)}
                                                    onChange={() => handleCheckboxChange(item2 + '_' + item1.name)}
                                                />
                                            </label>
                                            &nbsp; {item1.label[index2]}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                    <PrimaryButton onClick={submitModal}>
                        Save
                    </PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">{props.message}</p>
                    </Transition>
                </div>
            </form>
        </div>
    );    
}