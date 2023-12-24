<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Styles -->
    <style>
        body {
            font-family: sans-serif;
            font-size: 10px;
        }

        .text-center {
            text-align: center;
        }

        .mb-6 {
            margin-bottom: 10px;
            /* You can adjust the value as needed */
        }

        .grid {
            display: grid;
            /* ... (add grid styles) */
        }

        .grid-cols-1 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
            /* ... (define columns for small screens) */
        }

        .md\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            /* ... (define columns for medium screens and above) */
        }

        .font-bold {
            font-weight: bold;
        }

        /* Define grid styles */
        .grid {
            /* Add grid properties */
            gap: 1rem;
            /* Spacing between grid elements */
        }

        .grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            /* Define columns for the grid */
        }

        /* Flex and text styles */
        .flex {
            display: flex;
            /* Add flex properties */
            align-items: center;
            /* Align items vertically */
        }

        .font-semibold {
            font-weight: 600;
            /* Or any desired font weight */
        }

        /* Layout adjustments */
        /* For responsiveness: media queries */
        @media screen and (max-width: 768px) {
            .grid-cols-2 {
                grid-template-columns: repeat(1, minmax(0, 1fr));
                /* Adjust columns for smaller screens */
            }

            /* Add other responsive adjustments as needed */
        }

        /* Margin top */
        .mt-3 {
            margin-top: 0.75rem;
            /* Adjust the value as needed */
        }

        /* Table styles */
        .table {
            width: 100%;
            border-collapse: collapse;
            /* Other common table styles */
        }

        .table-xs {
            font-size: 10px;
            /* Adjust font size for 'table-xs' */
        }

        .text-center {
            text-align: center;
        }

        .p-0 {
            padding: 0;
        }

        /* Border styles */
        .border-2 {
            border: 1px solid black;
            /* Add border styles */
        }

        /* Table Header/Footer adjustments */
        tfoot th {
            /* Footer specific styles */
        }

        /* Table Row styles */
        tbody tr:nth-child(even) {
            /* Style for even rows */
        }

        tbody tr:nth-child(odd) {
            /* Style for odd rows */
        }

        /* Adjust column spans */
        tfoot th[colspan="2"],
        tfoot th[colspan="3"],
        tfoot th[colspan="2"] {
            /* Adjust column span styles */
        }

        p {
            margin: 5px;
            font-weight: 200;
        }

        .title {
            width: 6px !important;
        }
    </style>
</head>

<body class="antialiased">
    <div style="margin-top: 10px;" ref={props.ref}>
        <div class="">
            <div class="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                <div class='text-center mb-6'>
                    <h1 class='text-3xl font-bold'>REQUEST FOR PAYMENT</h1>
                </div>
                <table style="width: 100%;">
                    <tr>
                        <td width="20%">Invoice Type</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ count($outstanding_invoice) > 0 ? $outstanding_invoice[0]['invoice_type'] : '-' }}</td>
                        <td width="20%">Page</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">1 of 1</td>
                    </tr>
                    <tr>
                        <td width="20%">Supplier Number</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ count($outstanding_invoice) > 0 ? $outstanding_invoice[0]['supp_code'] : '-' }}</td>
                        <td width="20%">Printed Date</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ date('d-m-Y H:i:s') }}</td>
                    </tr>
                    <tr>
                        <td width="20%">Supplier Name</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ count($outstanding_invoice) > 0 ? $outstanding_invoice[0]['supp_name'] : '-' }}</td>
                        <td width="20%">User Created</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ count($outstanding_invoice) > 0 ? $outstanding_invoice[0]['user_created'] : '-' }}</td>
                    </tr>
                    <tr>
                        <td width="20%">Supplier NPWP</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ count($outstanding_invoice) > 0 ? $outstanding_invoice[0]['supp_npwp'] : '-' }}</td>
                        <td width="20%">PO TYPE</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $outstanding_invoice[0]['po_type'] ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td width="20%">Supplier Site</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $outstanding_invoice[0]['supp_site'] ?? '-' }}</td>
                        <td width="20%">Invoice Due Date</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $outstanding_invoice[0]['invoice_due_date'] ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td width="20%">Pay Group</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $outstanding_invoice[0]['pay_group'] ?? '-' }}</td>
                        <td width="20%">Invoice Currency</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $outstanding_invoice[0]['invoice_currency'] ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td width="20%"></td>
                        <td width="2%" style="text-align: right;"></td>
                        <td width="28%"></td>
                        <td width="20%">Invoice Total Amount</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">
                            {{ number_format(count($outstanding_invoice) > 0 ? (float) $outstanding_invoice[0]['invoice_total_amount'] : 0, 2) }}
                        </td>
                    </tr>
                </table>

                <hr class='mb-3'>
                </hr>
                <table style="width: 100%;">
                    <tr>
                        <td width="20%">RFP Number</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $outstanding_invoice['rfp'] ?? '-' }}</td>
                        <td width="20%">GL Date</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{date('d-M-Y', strtotime($outstanding_invoice[0]['gl_date'] ?? ''))}}</td>
                    </tr>
                    <tr>
                        <td width="20%">Voucher Number</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $outstanding_invoice[0]['voucher_number'] ?? '-' }}</td>
                        <td width="20%">Invoice Receipt Date</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">
                            {{ date('d-M-Y', strtotime($outstanding_invoice[0]['invoice_receipt_date'] ?? '')) }}
                        </td>
                    </tr>
                    <tr>
                        <td width="20%">Invoice Batch Name</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $outstanding_invoice[0]['invoice_batch_name'] ?? '-' }}</td>
                        <td width="20%">Supplier Tax Invoice Num</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $outstanding_invoice[0]['supp_tax_invoice_num'] ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td width="20%">Invoice Number</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $outstanding_invoice[0]['invoice_number'] ?? '-' }}</td>
                        <td width="20%">Due Date Determination Reason</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%"></td>
                    </tr>
                    <tr>
                        <td width="20%">Invoice Date</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $outstanding_invoice[0]['invoice_date'] ?? '-' }}</td>
                        <td width="20%">Rate Type</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $outstanding_invoice[0]['rate_type'] ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td width="20%">Description</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $outstanding_invoice[0]['invoice_description'] ?? '-' }}</td>
                        <td width="20%">Rate Date</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">
                            {{$outstanding_invoice[0]['rate_date'] ? date('d-M-Y', strtotime($outstanding_invoice[0]['rate_date'] ?? '-')) : '-' }}</td>
                    </tr>
                    <tr>
                        <td width="20%">Activity Code</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%"></td>
                        <td width="20%">Tax Name</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $outstanding_invoice[0]['supp_name'] ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td width="20%">Status</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $outstanding_invoice[0]['invoice_status'] ?? '-' }}</td>
                        <td width="20%">Tax NPWP</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $outstanding_invoice[0]['tax_npwp'] ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td width="20%">Bank Name</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $vendor->bank_name ?? '-' }}</td>
                        <td width="20%"></td>
                        <td width="2%" style="text-align: right;"></td>
                        <td width="28%"></td>
                    </tr>
                    <tr>
                        <td width="20%">Account Name</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $vendor->bank_account_name ?? '-' }}</td>
                        <td width="20%"></td>
                        <td width="2%" style="text-align: right;"></td>
                        <td width="28%"></td>
                    </tr>
                    <tr>
                        <td width="20%">Bank Account Number</td>
                        <td width="2%" style="text-align: right;">:</td>
                        <td width="28%">{{ $vendor->bank_account_number ?? '-' }}</td>
                        <td width="20%"></td>
                        <td width="2%" style="text-align: right;"></td>
                        <td width="28%"></td>
                    </tr>
                </table>
                <div class='mt-3'>
                    <table class="table table-xs text-center p-0">
                        <thead>
                            <tr>
                                <th class='border-2' rowspan="2">GL Date <br>Distribution</th>
                                <th class='border-2' rowspan="2">Account</th>
                                <th class='border-2' rowspan="2">Description</th>
                                <th class='border-2' colspan="2">Entered Amount (Data)</th>
                                <th class='border-2' colspan="2">Accounted Amount (IDR)</th>
                            </tr>
                            <tr>
                                <th class='border-2'>D</th>
                                <th class='border-2'>C</th>
                                <th class='border-2'>D</th>
                                <th class='border-2'>C</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class='border-2'>{{ date('d-M-Y', strtotime($outstanding_invoice[0]['gl_date_dist'] ?? '')) }}</td>
                                <td class='border-2 text-start'>
                                    {{ $outstanding_invoice[0]['tax_account'] ?? '-' }}</td>
                                <td class='border-2 text-start'>{{ $outstanding_invoice[0]['tax_code'] ?? '-' }}
                                </td>
                                <td class='border-2'>
                                    {{ number_format((float) $total_debit * 11/100, 2) }}
                                </td>
                                <td class='border-2'></td>
                                <td class='border-2'>
                                    {{ number_format((float) $total_debit * 11/100, 2) }}
                                </td>
                                <td class='border-2'></td>
                            </tr>
                            @foreach ($outstanding_invoice as $data)
                                <tr>
                                    <td class='border-2'>{{ date('d-M-Y', strtotime($data['gl_date_dist'])) }}</td>
                                    <td class='border-2 text-start'>{{ $data['account_dist'] }}</td>
                                    <td class='border-2 text-start'>{{ $data['description_dist'] }}</td>
                                    <td class='border-2'>
                                        {{ (float) $data['amount_dist'] > 0 ? number_format((float) $data['amount_dist'], 2) : '' }}
                                    </td>
                                    <td class='border-2'>
                                        {{ (float) $data['amount_dist'] < 0 ? number_format((float) $data['amount_dist'], 2) : '' }}
                                    </td>
                                    <td class='border-2'>
                                        {{ (float) $data['amount_dist'] > 0 ? number_format((float) $data['amount_dist'], 2) : '' }}
                                    </td>
                                    <td class='border-2'>
                                        {{ (float) $data['amount_dist'] < 0 ? number_format((float) $data['amount_dist'], 2) : '' }}
                                    </td>
                                </tr>
                            @endforeach
                            <tr>
                                <td class='border-2'>{{ date('d-M-Y', strtotime($outstanding_invoice[0]['gl_date_dist'] ?? '')) }}</td>
                                <td class='border-2 text-start'>
                                    {{ $outstanding_invoice[0]['ap_account'] ?? '-' }}</td>
                                <td class='border-2 text-start'>
                                    {{ $outstanding_invoice[0]['description_dist'] ?? '-' }}</td>
                                <td class='border-2'></td>
                                <td class='border-2'>
                                    {{ number_format((float) $total_credit, 2) }}</td>
                                <td class='border-2'></td>
                                <td class='border-2'>
                                    {{ number_format((float) $total_credit, 2) }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th class='border-2' colspan="3">TOTAL</th>
                                <th class='border-2'>{{ number_format((float) $total_debit, 2) }}</th>
                                <th class='border-2'>{{ number_format((float) $total_credit, 2) }}</th>
                                <th class='border-2'>{{ number_format((float) $total_debit, 2) }}</th>
                                <th class='border-2'>{{ number_format((float) $total_credit, 2) }}</th>
                            </tr>
                            <tr>
                                <th class='border-2' colspan="3">Amount Remaining</th>
                                <th class='border-2'>{{ number_format((float) $total_debit, 2) }}</th>
                                <th class='border-2'>{{ number_format((float) $total_credit, 2) }}</th>
                                <th class='border-2'>{{ number_format((float) $total_debit, 2) }}</th>
                                <th class='border-2'>{{ number_format((float) $total_credit, 2) }}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div class='mt-3'>
                    <table class="table table-xs text-center p-0">
                        <thead>
                            <tr>
                                <th class='border-2'>PO Num/IR <br>Number</th>
                                <th class='border-2'>Receipt Num- <br>Line</th>
                                <th class='border-2'>Item Code</th>
                                <th class='border-2'>Billed <br> Quantity</th>
                                <th class='border-2'>UOM</th>
                                <th class='border-2'>Unit Price</th>
                                <th class='border-2'>PO Account</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($outstanding_invoice as $data)
                                <tr>
                                    <td class='border-2'>{{ $data['po_number'] }}</td>
                                    <td class='border-2'>{{ $data['receipt_num_line'] }}</td>
                                    <td class='border-2'>{{ $data['item_code'] }}</td>
                                    <td class='border-2'>{{ $data['billed_qty'] }}</td>
                                    <td class='border-2'>{{ $data['uom'] }}</td>
                                    <td class='border-2'>{{ $data['unit_price'] }}</td>
                                    <td class='border-2'>{{ $data['po_account'] }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                        <tfoot>
                            <tr>
                                <th class='border-2' colspan="2">Reference :</th>
                                <th class='border-2' colspan="3">FUI Num :</th>
                                <th class='border-2' colspan="2">Landed Cost :</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <table style="width: 100%;">
                    <tr>
                        <td width="20%">Grand Total Amount Remaining IDR</td>
                        <td width="5%" style="text-align: right;">:</td>
                        <td width="20%">{{ number_format((float) $total_debit - $total_credit, 2) }}</td>
                        <td width="30%"></td>
                        <td width="5%" style="text-align: right;">:</td>
                        <td width="20%">{{ number_format((float) $total_debit - $total_credit, 2) }}</td>
                    </tr>
                </table>

                <div class='mt-3'>
                    <table class="table table-xs text-center p-0">
                    <thead>
                            <tr>
                                <th class='border-t-2 border-s-2 text-start' colspan="2">Paid From:</th>
                                <th class='border-t-2 text-start' colspan="3">Lorem Ipsum</th>
                                <th class='border-t-2 text-start' colspan="2">Received By:</th>
                                <th class='border-t-2 border-e-2 text-start' colspan="2">Lorem Ipsum</th>
                            </tr>
                            <tr>
                                <th class='border-b-2 border-s-2 text-start' colspan="2">Paid To:</th>
                                <th class='border-b-2 text-start' colspan="3">Lorem Ipsum</th>
                                <th class='border-b-2 text-start' colspan="2">Date:</th>
                                <th class='border-b-2 border-e-2 text-start' colspan="2">29-AUG-23</th>
                            </tr>
                            <tr>
                                <th class='border-2' colspan="2">Department <br> Requestor</th>
                                <th class='border-2' colspan="2">Director</th>
                                <th class='border-2' colspan="2">Tax</th>
                                <th class='border-2' colspan="2">Accounting</th>
                                <th class='border-2' colspan="1">Finance</th>
                            </tr>
                            <tr>
                                <th class='border-2'>Issued By</th>
                                <th class='border-2'>Approved By</th>
                                <th class='border-2'>Approver By</th>
                                <th class='border-2'>Checked By</th>
                                <th class='border-2'>Approved By</th>
                                <th class='border-2'>Coded By</th>
                                <th class='border-2'>Checked By</th>
                                <th class='border-2'>Approved By</th>
                                <th class='border-2'>Passed for payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class='border-2'>
                                    <div style="height: 36px;"></div>
                                </td>
                                <td class='border-2'></td>
                                <td class='border-2'></td>
                                <td class='border-2'></td>
                                <td class='border-2'></td>
                                <td class='border-2'></td>
                                <td class='border-2'></td>
                                <td class='border-2'></td>
                                <td class='border-2'></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>

</html>