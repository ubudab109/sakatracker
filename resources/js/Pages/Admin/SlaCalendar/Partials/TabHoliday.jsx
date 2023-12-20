import React, { useEffect, useRef, useState } from 'react';
import ModalDelete from './ModalDelete';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Dropdown from '@/Components/Dropdown';
import $ from 'jquery';
import 'datatables.net';
import { Edit, Trash, X, Check } from 'react-feather';
import ModifyButton from '@/Components/ModifyButton';
import { Link, useForm } from '@inertiajs/react';
import Modal from "@/Components/Modal";
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import { Transition } from '@headlessui/react';

export default function Table(props) {
    console.log(props);
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        excel: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);


    const tableRef = useRef(null);

    useEffect(() => {
        $(tableRef.current).DataTable();
    }, []);

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.sla-holiday.import'), {
            onSuccess: closeModal()
        });
    };

    return (
        <div className="pt-6">
            {props.data.permissions.includes('store_sla_calendar') ?
                <div className="mb-3 text-end">
                    <ModifyButton type="button" onClick={(e) => openModal(e)}>
                        Import
                    </ModifyButton>
                    <Link href={route('admin.sla-holiday.create')}>
                        <ModifyButton>
                            Add
                        </ModifyButton>
                    </Link>
                </div>
            :''}
            <div className="max-w-7xl mx-auto">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full overflow-x-auto">
                    <table ref={tableRef} className="w-full">
                        <thead>
                            <tr>
                                {props.permissions.includes('update_sla_calendar') || props.permissions.includes('delete_sla_calendar') ?
                                    <th>Action</th>
                                :''}
                                <th>Date</th>
                                <th>Description</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.sla_holidays.map((item, index) => (
                                <tr className="border-t bg-gray-100">
                                    {props.permissions.includes('update_sla_calendar') || props.permissions.includes('delete_sla_calendar') ?
                                        <td className='border border-slate-600'>
                                            <div className='flex gap-1'>
                                                {props.permissions.includes('update_sla_calendar') ?
                                                    <a href={route('admin.sla-holiday.edit', item.id)} className='text-blue-500'>
                                                        <Edit />
                                                    </a>
                                                :''}
                                                {props.permissions.includes('delete_sla_calendar') ?
                                                    <a href='javascript:;' className='text-red-500' onClick={() => { setShowModal(true); setItemToDelete(item); }}>
                                                        <Trash />
                                                    </a>
                                                :''}
                                            </div>
                                        </td>
                                        :''}
                                    <td className='border border-slate-600'>{item.date}</td>
                                    <td className='border border-slate-600'>{item.description}</td>
                                    <td className='border border-slate-600'>{formatDate(item.created_at)}</td>
                                    <td className='border border-slate-600'>{formatDate(item.updated_at)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={isModalOpen} onClose={closeModal}>
                <form method="post" onSubmit={submit}>
                    <div className='border-b-2 p-3'>
                        <b>Import Data</b>
                        <p>excel column must consist of 2 Rows: </p>
                        <p>Row 1 = date in Y-m-d format</p>
                        <p>Row 2 = holiday description</p>
                        <p>*note without header</p>
                        <div className="mb-1 mt-3">
                            <InputLabel htmlFor="excel" value="Attach File Excel" required={true} />

                            <div className="flex items-center align-middle">
                                <input name="excel" type="file" className="file-input file-input-bordered w-full max-w-xs" 
                                    onChange={(e) => setData('excel', e.target.files[0])}
                                />
                            </div>

                            <InputError 
                                message={errors.excel}
                                className="mt-2"
                            />

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                                <ModifyButton className="ml-3" disabled={processing}>
                                    Import
                                </ModifyButton>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
            {itemToDelete && (
                <ModalDelete
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    item={itemToDelete}
                />
            )}
        </div>
    );
}