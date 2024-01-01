import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React from "react";
import ChartOutstandingPercentage from './Partials/ChartOutstandingPercentage';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import CardDashboardChart from '@/Components/CardDashboardChart';

export default function Index(props) {
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        month: props.data.month,
    });
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Report</h2>}
        >
            <Head title="Dashboard Report" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Dashboard Report</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item active">Dashboard Report</li>
                    </ol>
                </div>
            </div>

            {/* <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Home</div>
                    </div>
                </div>
            </div> */}

            <div className="pt-6">
                <div className="">
                    <div className="border-0 border-black rounded-lg p-0">
                        <form method="get">
                            <div className='flex gap-3 justify-evenly items-center'>
                                <div className='w-full'>
                                    <br />
                                    <TextInput
                                        id="month"
                                        name="month"
                                        value={data.month}
                                        type="month"
                                        className="mt-1 block w-full"
                                        autoComplete="month"
                                        isFocused={true}
                                        onChange={(e) => setData('month', e.target.value)}

                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="" value="&nbsp;" />
                                    <PrimaryButton>
                                        Filter
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <div className="row mt-5">
                <CardDashboardChart name="New Invoice" data={props.data.card_new_invoice} href={`/vendor/outstanding-purchase-order?month=${props.data.month}`} />
                <CardDashboardChart name="Pending Invoice" data={props.data.card_pending_invoice} />
                <CardDashboardChart name="New Invoice Batch" data={props.data.card_bp_new} />
                <CardDashboardChart name="Pending Invoice Batch" data={props.data.card_bp_pending} />
                <CardDashboardChart name="Reject Invoice Batch" data={props.data.card_bp_rejected} />
                <CardDashboardChart name="Vendor Waiting Approval" data={props.data.card_need_approval_vendor} />
            </div>

            {/* <CardOutstanding className="pt-6" data={props.data.card_outstanding} month={data.month} /> */}
            <div className="row mt-5">
                <ChartOutstandingPercentage data={props.data.chart_outstanding_percentage} />
            </div>

        </AuthenticatedLayout>
    );
}
