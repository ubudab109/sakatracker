
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
        approver_invoice_id: props.data.approver != null ? props.data.approver.id : '',
        user_id: props.data.approver_item != null ? props.data.approver_item.user_id : '',
        start_fee: props.data.approver_item != null ? props.data.approver_item.start_fee : '',
        end_fee: props.data.approver_item != null ? props.data.approver_item.end_fee : '',
        sla: props.data.approver_item != null ? props.data.approver_item.sla : '',
        // name: props.data != null ? props.data.approver.name : '',
    });

    const [selectedOptionUser, setSelectedOptionUser] = useState(props.data.approver_item != null ? props.data.approver_item.user_id : '');

    const submit = (e) => {
        e.preventDefault();

        if(props.title == 'Tambah') {
            post(route(props.route));
        } else {
            post(route(props.route, props.id));
        }
    };
    
    const handleUserChange = (event) => {
        data.user_id = event.target.value;

        setSelectedOptionUser(data.user_id);
    }

    return (
        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg mt-6 p-6">
            <form onSubmit={submit}>
                <div className="mb-3">
                    <InputLabel value="User" className="font-bold" required={true}/>
                    <select className="select select-bordered w-full mt-1"
                        id="user_id"
                        name="user_id"
                        value={selectedOptionUser}
                        onChange={handleUserChange}
                    >
                        <option value="" hidden>User</option>
                        {props.data.users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>

                    <InputError message={errors.user_id} className="mt-2" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="mb-3">
                        <InputLabel htmlFor="start_fee" value="Start Nominal" required={true} />

                        <TextInput 
                            id="start_fee"
                            name="start_fee"
                            value={data.start_fee}
                            type="number"
                            className="mt-1 block w-full"
                            autoComplete="start_fee"
                            placeholder="0"
                            isFocused={true}
                            onChange={(e) => setData('start_fee', e.target.value)}
                            
                        />

                        <InputError 
                            message={errors.start_fee}
                            className="mt-2"
                        />
                    </div>
                    <div className="mb-3">
                        <InputLabel htmlFor="end_fee" value="End Nominal" required={true} />

                        <TextInput 
                            id="end_fee"
                            name="end_fee"
                            value={data.end_fee}
                            type="number"
                            className="mt-1 block w-full"
                            autoComplete="end_fee"
                            placeholder="0"
                            isFocused={true}
                            onChange={(e) => setData('end_fee', e.target.value)}
                            
                        />

                        <InputError 
                            message={errors.end_fee}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <InputLabel htmlFor="sla" value="SLA (Jam)" required={true} />

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