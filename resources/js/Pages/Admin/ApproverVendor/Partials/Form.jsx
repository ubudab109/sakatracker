
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
        role_id: props.data.approver != null ? props.data.approver.role_id : '',
        sla: props.data.approver != null ? props.data.approver.sla : '',
        // level: props.data.approver != null ? props.data.approver.level : '',
    });

    const [selectedOptionRole, setSelectedOptionRole] = useState(props.data.approver != null ? props.data.approver.role_id : '');

    const submit = (e) => {
        e.preventDefault();

        if(props.title == 'Tambah') {
            post(route(props.route));
        } else {
            post(route(props.route, props.id));
        }
    };
    
    const handleRoleChange = (event) => {
        data.role_id = event.target.value;

        setSelectedOptionRole(data.role_id);
    }

    return (
        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg mt-6 p-6">
            <form onSubmit={submit}>
                <div className="mb-3">
                <InputLabel value="Role" className="font-bold" required={true}/>
                <select className="select select-bordered w-full mt-1"
                    id="role_id"
                    name="role_id"
                    value={selectedOptionRole}
                    onChange={handleRoleChange}
                >
                    <option value="" hidden>Role</option>
                    {props.data.roles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.name}
                        </option>
                    ))}
                </select>

                <InputError message={errors.role_id} className="mt-2" />
                </div>

                {/* <div className="mb-3">
                    <InputLabel htmlFor="level" value="Level" required={true} />

                    <TextInput 
                        id="level"
                        name="level"
                        value={data.level}
                        type="number"
                        className="mt-1 block w-full"
                        autoComplete="level"
                        placeholder="level.."
                        isFocused={true}
                        onChange={(e) => setData('level', e.target.value)}
                        
                    />

                    <InputError 
                        message={errors.level}
                        className="mt-2"
                    />
                </div> */}

                <div className="mb-3">
                    <InputLabel htmlFor="sla" value="SLA (Hour)" required={true} />

                    <TextInput 
                        id="sla"
                        name="sla"
                        type="number"
                        value={data.sla}
                        className="mt-1 block w-full"
                        autoComplete="sla"
                        placeholder="0"
                        isFocused={true}
                        onChange={(e) => setData('sla', e.target.value)}
                        
                    />

                    <InputError 
                        message={errors.sla}
                        className="mt-2"
                    />
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                    <PrimaryButton>
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