import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from "react";
import CardOutstanding from './Partials/CardOutstanding';
import ChartOutstandingPercentage from './Partials/ChartOutstandingPercentage';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import ChartOverdue from './Partials/ChartOverdue';
import ChartOutstandingProcessing from './Partials/ChartOutstandingProcessing';
import CardDashboardChart from '@/Components/CardDashboardChart';
import ChartRevisionVendor from './Partials/ChartRevisionVendor';
import ChartOutstandingInvDept from './Partials/ChartOutstandingInvDept';
import ChartOutstandingInvApproval from './Partials/ChartOutstandingInvApproval';
import { formatYYYYMM } from '@/Utils/helper';

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
                                        dateFormat="MMMM yyyy"
                                        isFocused={true}
                                        onChange={(e) => {
                                            console.log(new Date(e))
                                            let date;
                                            if (e.target) {
                                                date = e.target.value;
                                            } else {
                                                date = formatYYYYMM(e);
                                            }
                                            setData('month', date);
                                        }}

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
                <CardDashboardChart name="PO Outstanding" data={props.data.card_outstanding.po_amount} href={`/vendor/outstanding-purchase-order?month=${props.data.month}`} />
                <CardDashboardChart name="Outstanding Invoice" data={props.data.card_outstanding.invoice_amount} />
                <CardDashboardChart name="Outstanding Invoice Amount" data={props.data.card_outstanding.formated_invoice_total} />
            </div>

            {/* <CardOutstanding className="pt-6" data={props.data.card_outstanding} month={data.month} /> */}
            <div className="row mt-5">
                <ChartOutstandingPercentage data={props.data.chart_outstanding_percentage} />
                <ChartOutstandingProcessing data={props.data.chart_outstanding_processing} />
                <ChartOverdue data={props.data.chart_overdue} month={props.data.month_name} />
            </div>

            <div className="row mt-5">
                <ChartOutstandingInvDept data={props.data.chart_outstanding_percentage} />
                <ChartOutstandingInvApproval data={props.data.chart_outstanding_processing} />
            </div>

        </AuthenticatedLayout>
    );
}
