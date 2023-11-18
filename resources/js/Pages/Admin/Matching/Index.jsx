import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ModifyButton from '@/Components/ModifyButton';
import { Head, Link, useForm } from '@inertiajs/react';
import React from "react";
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';
import { Transition } from '@headlessui/react';

export default function Index(props) {
    console.log(props.data.invoice);
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        invoice_number: props.data.search,
        status: props.data.invoice.length == 1 ? props.data.invoice[0].status_matching : ''
    });

    const [selectedOptionStatus, setSelectedOptionStatus] = useState(props.data.invoice.length == 1 ? props.data.invoice[0].status_matching : '');
    const handleStatusChange = (event) => {
        data.status = event.target.value;
        setSelectedOptionStatus(event.target.value);
    }

    const submit = (e) => {
        e.preventDefault();

        if(props.data.invoice[0])
        {
            post(route('admin.matching.update', props.data.invoice.length == 1 ? props.data.invoice[0].id : ''));
        }
    };

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${month}-${year}`;
      }
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Matching</h2>}
        >
            <Head title="Matching" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Matching</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item active">Matching</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Matching</div>
                    </div>
                </div>
            </div>

            <div className="pt-3">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                        <div className='text-center'>
                            <p className="font-bold mb-3">Masukkan Nomor Invoie / Efaktur</p>
                            <div className="mb-3">
                                <TextInput 
                                    id="invoice_number"
                                    name="invoice_number"
                                    value={data.invoice_number}
                                    className="mt-1 block w-full"
                                    autoComplete="invoice_number"
                                    placeholder="..."
                                    isFocused={true}
                                    onChange={(e) => setData('invoice_number', e.target.value)}
                                    
                                />
                            </div>
                            <Link href={`/admin/matching?invoice_number=${data.invoice_number}`}>
                                <ModifyButton>Cari</ModifyButton>
                            </Link>
                        </div>
                        <div class="border-dashed border-2 my-3"></div>
                        <div className=''>
                            {props.data.invoice.length > 1 ? 
                                    <div>
                                        {props.data.invoice.map((item, index) => (
                                            <div>
                                                <div className='grid grid-cols-2'>
                                                    <div>
                                                        <p className='text-lg font-bold mb-3'>Detail Dokumen</p>
                                                        <div className='mb-3'>
                                                            <div className='flex justify-around font-bold'>
                                                                <div className='grid grid-cols-3 w-full'>
                                                                    <p>Nama Vendor</p>
                                                                    <p className='text-center'>:</p>
                                                                    <p>{item.vendor.name  }</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <div className='flex justify-around font-bold'>
                                                                <div className='grid grid-cols-3 w-full'>
                                                                    <p>Nomor Dokumen</p>
                                                                    <p className='text-center'>:</p>
                                                                    <p>{item.document_number}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <div className='flex justify-around font-bold'>
                                                                <div className='grid grid-cols-3 w-full'>
                                                                    <p>Nomor Invoice</p>
                                                                    <p className='text-center'>:</p>
                                                                    <p>Invoice 123</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <div className='flex justify-around font-bold'>
                                                                <div className='grid grid-cols-3 w-full'>
                                                                    <p>Total</p>
                                                                    <p className='text-center'>:</p>
                                                                    <p>Rp. {item.total}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <div className='flex justify-around font-bold'>
                                                                <div className='grid grid-cols-3 w-full'>
                                                                    <p>Periode</p>
                                                                    <p className='text-center'>:</p>
                                                                    <p>{formatDate(item.date)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <div className='flex justify-around font-bold'>
                                                                <div className='grid grid-cols-3 w-full'>
                                                                    <p>Lampiran</p>
                                                                    <p className='text-center'>:</p>
                                                                    <p>{item.exchange_invoice_attachments != null ? item.exchange_invoice_attachments.length : 0} Berkas</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='text-center my-auto'>
                                                        <Link href={`/admin/matching?invoice_number=${item.document_number}`}>
                                                            <ModifyButton>Pilih</ModifyButton>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div class="border-dashed border-2 my-3"></div>
                                            </div>
                                        ))}
                                    </div>
                                : 
                                ''
                            }

                            {props.data.invoice.length == 1 ? 
                                <>
                                    <div className='grid grid-cols-2'>
                                        <div>
                                            <p className='text-lg font-bold mb-3'>Detail Dokumen</p>
                                            <div className='mb-3'>
                                                <div className='flex justify-around font-bold'>
                                                    <div className='grid grid-cols-3 w-full'>
                                                        <p>Nama Vendor</p>
                                                        <p className='text-center'>:</p>
                                                        <p>{props.data.invoice[0].vendor.name  }</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <div className='flex justify-around font-bold'>
                                                    <div className='grid grid-cols-3 w-full'>
                                                        <p>Nomor Dokumen</p>
                                                        <p className='text-center'>:</p>
                                                        <p>{props.data.invoice[0].document_number}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <div className='flex justify-around font-bold'>
                                                    <div className='grid grid-cols-3 w-full'>
                                                        <p>Nomor Invoice</p>
                                                        <p className='text-center'>:</p>
                                                        <p>Invoice 123</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <div className='flex justify-around font-bold'>
                                                    <div className='grid grid-cols-3 w-full'>
                                                        <p>Total</p>
                                                        <p className='text-center'>:</p>
                                                        <p>Rp. {props.data.invoice[0].total}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <div className='flex justify-around font-bold'>
                                                    <div className='grid grid-cols-3 w-full'>
                                                        <p>Periode</p>
                                                        <p className='text-center'>:</p>
                                                        <p>{formatDate(props.data.invoice[0].date)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <div className='flex justify-around font-bold'>
                                                    <div className='grid grid-cols-3 w-full'>
                                                        <p>Lampiran</p>
                                                        <p className='text-center'>:</p>
                                                        <p>{props.data.invoice[0].exchange_invoice_attachments != null ? props.data.invoice[0].exchange_invoice_attachments.length : 0} Berkas</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {props.data.permissions.includes('update_matching') ?
                                                <form onSubmit={submit}>
                                                    <p className='text-lg'>&nbsp;</p>
                                                    <div className='mb-3'>
                                                        <p className='font-bold'>Tindakan</p>
                                                    </div>
                                                    <div className='mb-3'>
                                                        <div className='flex justify-around font-bold'>
                                                            <div className='grid grid-cols-1 w-full'>
                                                                    <select className="select select-bordered w-full mt-1"
                                                                        id="status"
                                                                        name="status"
                                                                        value={selectedOptionStatus}
                                                                        onChange={handleStatusChange}
                                                                    >
                                                                        <option value="" hidden>Menunggu Pencocokan</option>
                                                                        <option value="sesuai">Sesuai</option>
                                                                        <option value="tidak sesuai">Tidak Sesuai</option>
                                                                    </select>

                                                                <InputError message={errors.status} className="mt-2" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='mb-3'>
                                                        <div className='flex justify-center font-bold'>
                                                            <div className='grid grid-cols-1 text-center items-center w-full'>
                                                                <PrimaryButton className="w-full justify-center">
                                                                    Kirim
                                                                </PrimaryButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Transition
                                                        show={recentlySuccessful}
                                                        enter="transition ease-in-out"
                                                        enterFrom="opacity-0"
                                                        leave="transition ease-in-out"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <p className="text-sm text-gray-600">Berhasil melakukan tindakan</p>
                                                    </Transition>
                                                </form>
                                            :''}
                                        </div>
                                    </div>
                                </>
                                : ''
                            }

                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
